"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import styles from "./bookingModal.module.css";
import {
  fetchRoomOptions,
  calculateRoomPrice,
  type RoomOption,
  type RoomPriceBreakdown,
} from "@/app/services/groupTourService";

// ─────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────

const MAX_PERSONS = 6;
const GST_RATE    = 0.05;

const API_BASE = process.env.NEXT_PUBLIC_UAT_URL || "";
const X_PUBLIC_TOKEN =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

const apiHeaders = {
  "Content-Type": "application/json",
  "X-Public-Token": X_PUBLIC_TOKEN,
};

// ─────────────────────────────────────────────────────────────────
// Helper — extract a usable total from any price breakdown shape
// ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────
// Helper — extract usable values from the actual API response:
// {
//   "final_amount": 19740,
//   "summary": {
//     "sub_total": 18800,
//     "gst_amount": 940,
//     "gst_rate": 5,
//     ...
//   }
// }
// ─────────────────────────────────────────────────────────────────

function resolveTotalFromBreakdown(bd: RoomPriceBreakdown | null): number | null {
  if (!bd) return null;
  return bd.final_amount != null ? Number(bd.final_amount) : null;
}

function resolveGstFromBreakdown(bd: RoomPriceBreakdown | null): number | null {
  if (!bd) return null;
  return bd.summary?.gst_amount != null ? Number(bd.summary.gst_amount) : null;
}

function resolveBaseFromBreakdown(bd: RoomPriceBreakdown | null): number | null {
  if (!bd) return null;
  return bd.summary?.original_amount != null ? Number(bd.summary.original_amount) : null;
}

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

interface DepartureDate {
  id: number;
  departure_date: string;
  date: string;
  month: string;
  year: string;
  day: string;
  price: string;   // formatted "1,23,456"
  seats: number;
  status?: string;
}

interface GroupTourBookingModalProps {
  openModal:        boolean;
  setOpenModal:     (open: boolean) => void;
  packageId:        number;
  packageSlug:      string;          // ← NEW: needed for room-options API
  title:            string;
  selectedDate:     DepartureDate | null;
  availableDates:   DepartureDate[];
  basePrice:        number;
  onBookingSuccess?: (departureId: number, passengers: number) => void;
}

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────

const GroupTourBookingModal: React.FC<GroupTourBookingModalProps> = ({
  openModal,
  setOpenModal,
  packageId,
  packageSlug,
  title,
  selectedDate,
  availableDates,
  basePrice,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<"details" | "success">("details");
  const router = useRouter();

  // ── Form state ──
  const [date,     setDate]     = useState<DepartureDate | null>(null);
  const [adults,   setAdults]   = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infant,   setInfant]   = useState<number>(0);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<number | null>(null);

  // ── Room options state ──
  const [showRoomOptions,    setShowRoomOptions]    = useState(false);
  const [roomOptions,        setRoomOptions]        = useState<RoomOption[]>([]);
  const [roomOptionsLoading, setRoomOptionsLoading] = useState(false);
  const [roomOptionsError,   setRoomOptionsError]   = useState<string | null>(null);
  const [selectedOption,     setSelectedOption]     = useState<RoomOption | null>(null);

  // ── Price state (from backend) ──
  const [priceBreakdown, setPriceBreakdown] = useState<RoomPriceBreakdown | null>(null);
  const [priceLoading,   setPriceLoading]   = useState(false);

  // Ref to abort in-flight fetches when user changes inputs fast
  const roomFetchRef  = useRef<AbortController | null>(null);
  const priceFetchRef = useRef<AbortController | null>(null);

  // ─────────────────────────────────────────────────
  // Sync selected date from parent
  // ─────────────────────────────────────────────────
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    } else if (availableDates?.length > 0) {
      setDate(availableDates[0]);
    }
  }, [selectedDate, availableDates]);

  // ─────────────────────────────────────────────────
  // Reset everything when modal opens
  // ─────────────────────────────────────────────────
  useEffect(() => {
    if (openModal) {
      setStep("details");
      setIsProcessing(false);
      setShowRoomOptions(false);
      setRoomOptions([]);
      setRoomOptionsError(null);
      setSelectedOption(null);
      setPriceBreakdown(null);
    }
  }, [openModal]);

  // ─────────────────────────────────────────────────
  // Reset room & price when passengers or date change
  // ─────────────────────────────────────────────────
  useEffect(() => {
    setShowRoomOptions(false);
    setRoomOptions([]);
    setRoomOptionsError(null);
    setSelectedOption(null);
    setPriceBreakdown(null);
  }, [adults, children, infant, date]);

  // Clamp children when adults goes up
  useEffect(() => {
    const maxChildren = MAX_PERSONS - adults;
    if (children > maxChildren) setChildren(maxChildren);
  }, [adults]);

  // ─────────────────────────────────────────────────
  // Fetch Room Options from API
  // ─────────────────────────────────────────────────
  const handleSelectRoomType = useCallback(async () => {
    if (!date?.id) {
      toast.error("Please select a departure date first.");
      return;
    }
    if (!packageSlug) {
      toast.error("Invalid package. Please refresh and try again.");
      return;
    }

    // Abort previous in-flight request
    roomFetchRef.current?.abort();
    const controller = new AbortController();
    roomFetchRef.current = controller;

    setShowRoomOptions(true);
    setRoomOptionsLoading(true);
    setRoomOptionsError(null);
    setRoomOptions([]);
    setSelectedOption(null);
    setPriceBreakdown(null);

    try {
      const result = await fetchRoomOptions(
        packageSlug,
        date.id,
        adults,
        children,
        infant
      );

      if (controller.signal.aborted) return;

      if (!result || !result.options?.length) {
        setRoomOptionsError("No room options available for this combination. Please try different passenger count.");
        setRoomOptionsLoading(false);
        return;
      }

      setRoomOptions(result.options);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setRoomOptionsError("Failed to load room options. Please try again.");
    } finally {
      setRoomOptionsLoading(false);
    }
  }, [date, packageSlug, adults, children, infant]);

  // ─────────────────────────────────────────────────
  // Fetch Price when room option selected
  // ─────────────────────────────────────────────────
  const handleRoomSelect = useCallback(async (option: RoomOption) => {
    setSelectedOption(option);
    setPriceBreakdown(null);

    if (!date?.id || !packageId) return;

    // Abort previous in-flight request
    priceFetchRef.current?.abort();
    const controller = new AbortController();
    priceFetchRef.current = controller;

    setPriceLoading(true);

    try {
      const breakdown = await calculateRoomPrice({
        package_id:       packageId,
        schedule_id:      date.id,
        room_selection:   option.rooms,
        adults,
        child_with_bed:    option.passengers.child_with_bed,
        child_without_bed: option.passengers.child_without_bed,
        infants:           infant,
        extra_bed:         0,
      });

      if (controller.signal.aborted) return;
      setPriceBreakdown(breakdown);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      // Price fetch failed — fall back to base price calculation silently
      console.warn("[calculateRoomPrice] Failed:", err);
    } finally {
      setPriceLoading(false);
    }
  }, [date, packageId, adults, infant]);

  // ─────────────────────────────────────────────────
  // Derived price values
  // ─────────────────────────────────────────────────

  // Try backend price first; fall back to base price × passengers
  const basePricePerAdult = date?.price
    ? Number(date.price.replace(/,/g, ""))
    : basePrice;

  const fallbackSubTotal  = basePricePerAdult * adults + (basePricePerAdult * 0.5) * children;
  const fallbackGst       = Math.round(fallbackSubTotal * GST_RATE);
  const fallbackTotal     = fallbackSubTotal + fallbackGst;

  const apiTotal    = resolveTotalFromBreakdown(priceBreakdown);
  const apiGst      = resolveGstFromBreakdown(priceBreakdown);
  const apiBase     = resolveBaseFromBreakdown(priceBreakdown);

  // What we actually show:
  const displayTotal   = apiTotal   ?? fallbackTotal;
  const displayGst     = apiGst     ?? fallbackGst;
  const displaySubTotal = apiBase   ?? fallbackSubTotal;

  const isPriceFromApi = apiTotal !== null;

  // ─────────────────────────────────────────────────
  // Load Razorpay SDK
  // ─────────────────────────────────────────────────
  const loadRazorpay = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload  = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  // ─────────────────────────────────────────────────
  // Verify payment after Razorpay success
  // ─────────────────────────────────────────────────
  const verifyPayment = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    booking_id: number
  ) => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/v1/booking/verify-payment`,
        { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id },
        { headers: apiHeaders }
      );
      if (res.data?.success) {
        setConfirmedBookingId(booking_id);
        setStep("success");
        if (date && onBookingSuccess) onBookingSuccess(date.id, adults + children);
        router.refresh();
      } else {
        toast.error(
          res.data?.message ||
          "Payment received but confirmation failed. Please contact support. Booking ID: " + booking_id
        );
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Payment received but confirmation failed. Please contact support. Booking ID: " + booking_id
      );
    }
  };

  // ─────────────────────────────────────────────────
  // Submit handler
  // ─────────────────────────────────────────────────
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a departure date.");
      return;
    }
    if (!date.id) {
      toast.error("This date is not yet bookable. Please contact the administrator.");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select a room type.");
      return;
    }
    if (!packageId) {
      toast.error("Invalid package. Please refresh and try again.");
      return;
    }
    if (date.seats > 0 && adults + children > date.seats) {
      toast.error(`Only ${date.seats} seat(s) available for this departure.`);
      return;
    }

    setIsProcessing(true);

    try {
      // Derive a simple room_type string from the room selection
      const { single, double: dbl, triple } = selectedOption.rooms;
      const room_type =
        triple > 0 && dbl === 0 && single === 0 ? "triple" :
        dbl   > 0 && triple === 0 && single === 0 ? "double" :
        "single";

      const orderRes = await axios.post(
        `${API_BASE}/api/v1/booking/create-order`,
        {
          package_id:       packageId,
          journey_date_id:  date.id,
          adults,
          child:            children,
          infant,
          option_id:        selectedOption.option_id,
          room_type,
          room_selection:   selectedOption.rooms,
          customer_name:    name,
          customer_email:   email,
          customer_mobile:  phone,
        },
        { headers: apiHeaders }
      );

      if (!orderRes.data?.success || !orderRes.data?.order_id) {
        toast.error(orderRes.data?.message || "Failed to create booking order.");
        setIsProcessing(false);
        return;
      }

      const { order_id, amount, booking_id, key_id } = orderRes.data;

      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        toast.error("Failed to load payment gateway. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: key_id,
        amount,
        currency: "INR",
        name: "Cholan Tours",
        description: title,
        order_id,
        handler: async function (response: any) {
          await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            booking_id
          );
        },
        prefill: { name, email, contact: phone },
        modal: { ondismiss: () => setIsProcessing(false) },
        theme: { color: "#ef6d27" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error("Payment failed: " + (response.error?.description || "Please try again."));
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      const status = err?.response?.status;
      let errorMsg = err?.response?.data?.message || err.message || "Something went wrong.";
      if (status === 422 && err?.response?.data?.errors) {
        const errors = err.response.data.errors;
        errorMsg = (Object.values(errors).flat()[0] as string) || errorMsg;
      }
      toast.error(errorMsg);
      setIsProcessing(false);
    }
  };

  // ─────────────────────────────────────────────────
  // Close
  // ─────────────────────────────────────────────────
  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      setStep("details");
      setIsProcessing(false);
    }, 300);
  };

  if (!openModal) return null;

  // ─────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className={`modal-content ${styles.modalContent}`}>

            {/* ── Header ── */}
            <div className={styles.header}>
              <h5 className="m-0 text-white fw-bold">
                {step === "details" ? "Book Your Tour" : "Booking Confirmed"}
              </h5>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                style={{
                  background: "transparent", border: "none", color: "white",
                  fontSize: "32px", fontWeight: "bold", cursor: "pointer",
                  lineHeight: 1, padding: "0", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                &times;
              </button>
            </div>

            {/* ── Body ── */}
            <div className={styles.body}>

              {/* ════════ STEP: DETAILS ════════ */}
              {step === "details" && (
                <form onSubmit={handleProceedToPayment}>
                  <div className="row g-4">

                    {/* ── Left: Form ── */}
                    <div className="col-lg-7">
                      <h6 className="fw-bold mb-3 text-dark">{title}</h6>

                      {/* Departure Date */}
                      <div className="mb-3">
                        <label className="form-label text-muted small mb-1">
                          Select Departure Date <span className="text-danger">*</span>
                        </label>
                        {availableDates.length > 0 ? (
                          <select
                            className="form-select shadow-none"
                            value={date?.departure_date ?? ""}
                            onChange={(e) => {
                              const found = availableDates.find(
                                (d) => d.departure_date === e.target.value
                              );
                              if (found) setDate(found);
                            }}
                            required
                          >
                            <option value="" disabled>-- Select a date --</option>
                            {availableDates.map((d) => (
                              <option key={d.departure_date} value={d.departure_date}>
                                {d.date} {d.month} {d.year} — ₹{d.price}
                                {d.seats > 0 ? ` (${d.seats} seats left)` : " (Sold Out)"}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-muted small">No upcoming departure dates available.</p>
                        )}
                      </div>

                      {/* Passengers */}
                      <div className="row g-3 mb-3">
                        <div className="col-4">
                          <label className="form-label text-muted small mb-1">
                            Adults (12+ Yrs) <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select shadow-none"
                            value={adults}
                            onChange={(e) => setAdults(parseInt(e.target.value))}
                            required
                          >
                            {Array.from({ length: MAX_PERSONS }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-4">
                          <label className="form-label text-muted small mb-1">
                            Child (6–11 Yrs)
                          </label>
                          <select
                            className="form-select shadow-none"
                            value={children}
                            onChange={(e) => setChildren(parseInt(e.target.value))}
                          >
                            {(() => {
                              const maxChildren = MAX_PERSONS - adults;
                              const opts = [];
                              for (let i = 0; i <= maxChildren; i++) {
                                opts.push(<option key={i} value={i}>{i}</option>);
                              }
                              if (maxChildren === 0) {
                                opts.push(<option key="limit" value={0} disabled>Limit Reached</option>);
                              }
                              return opts;
                            })()}
                          </select>
                        </div>
                        <div className="col-4">
                          <label className="form-label text-muted small mb-1">
                            Infant (0–5 Yrs)
                          </label>
                          <select
                            className="form-select shadow-none"
                            value={infant}
                            onChange={(e) => setInfant(parseInt(e.target.value))}
                          >
                            {[0, 1, 2, 3].map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* ── Room Type Section ── */}
                      <div className="mb-3">
                        <div className="d-flex justify-content-center mb-2">
                          <button
                            type="button"
                            className="btn"
                            style={{
                              background: "#1a4b8c", color: "#fff",
                              fontWeight: 600, padding: "8px 28px", borderRadius: "4px",
                            }}
                            onClick={handleSelectRoomType}
                            disabled={roomOptionsLoading || !date}
                          >
                            {roomOptionsLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                Loading Rooms...
                              </>
                            ) : showRoomOptions && roomOptions.length > 0 ? (
                              "Change Room Type"
                            ) : (
                              "Select Room Type"
                            )}
                          </button>
                        </div>

                        {/* Error state */}
                        {roomOptionsError && (
                          <div className="alert alert-warning py-2 small text-center" role="alert">
                            {roomOptionsError}
                          </div>
                        )}

                        {/* Room options list */}
                        {showRoomOptions && !roomOptionsLoading && roomOptions.length > 0 && (
                          <div
                            className="p-3 rounded"
                            style={{ background: "#f0f4f8", border: "1px solid #dce3ec" }}
                          >
                            <div className="fw-bold mb-2" style={{ fontSize: "1rem" }}>
                              Choose Room Combination
                            </div>
                            <div className="small text-muted mb-3">
                              {children > 0
                                ? "Options include child accommodation based on your selection."
                                : "Showing adult room combinations for your group."}
                            </div>

                            {roomOptions.map((option) => (
                              <div key={option.option_id} className="form-check mb-2">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id={`room-opt-${option.option_id}`}
                                  name="roomType"
                                  value={option.option_id}
                                  checked={selectedOption?.option_id === option.option_id}
                                  onChange={() => handleRoomSelect(option)}
                                />
                                <label
                                  className="form-check-label small"
                                  htmlFor={`room-opt-${option.option_id}`}
                                >
                                  {option.label}
                                  {/* Show child breakdown if applicable */}
                                  {(option.passengers.child_with_bed > 0 || option.passengers.child_without_bed > 0) && (
                                    <span className="text-muted ms-1">
                                      ({option.passengers.child_with_bed > 0 && `${option.passengers.child_with_bed} with bed`}
                                      {option.passengers.child_with_bed > 0 && option.passengers.child_without_bed > 0 && ", "}
                                      {option.passengers.child_without_bed > 0 && `${option.passengers.child_without_bed} without bed`})
                                    </span>
                                  )}
                                </label>
                              </div>
                            ))}

                            {/* Price loading indicator under options */}
                            {priceLoading && (
                              <div className="text-muted small mt-2">
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
                                Calculating price...
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Lead Passenger */}
                      <h6 className="fw-bold mb-3 text-dark border-top pt-3">Lead Passenger Details</h6>
                      <div className="mb-3">
                        <label className="form-label text-muted small mb-1">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-none"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label text-muted small mb-1">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control shadow-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-muted small mb-1">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control shadow-none"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="10-digit mobile number"
                            pattern="[0-9]{10}"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Right: Price Summary ── */}
                    <div className="col-lg-5">
                      <div className={styles.summaryCard}>
                        <h6 className="fw-bold border-bottom pb-2 mb-3">Price Summary</h6>

                        {/* Departure info */}
                        {date && (
                          <div
                            className="mb-3 p-2 rounded"
                            style={{ background: "#fff8f4", border: "1px solid #f0d5c8" }}
                          >
                            <div className="small text-muted">Departure Date</div>
                            <div className="fw-semibold small">
                              {date.date} {date.month} {date.year}
                            </div>
                            {date.seats > 0 && (
                              <div style={{ fontSize: "11px", color: "#d85711" }}>
                                {date.seats} seats left
                              </div>
                            )}
                          </div>
                        )}

                        {/* Passengers summary */}
                        <div className="d-flex justify-content-between mb-1 small">
                          <span className="text-muted">Adults</span>
                          <span>{adults}</span>
                        </div>
                        {children > 0 && (
                          <div className="d-flex justify-content-between mb-1 small">
                            <span className="text-muted">Children</span>
                            <span>{children}</span>
                          </div>
                        )}
                        {infant > 0 && (
                          <div className="d-flex justify-content-between mb-1 small">
                            <span className="text-muted">Infants</span>
                            <span className="text-success">{infant} (Free)</span>
                          </div>
                        )}

                        {/* Room selection info */}
                        {selectedOption && (
                          <div
                            className="my-2 p-2 rounded small"
                            style={{ background: "#eef6ee", border: "1px solid #c3dfc3" }}
                          >
                            <div className="text-muted" style={{ fontSize: "11px" }}>Selected Room</div>
                            <div className="fw-semibold">{selectedOption.label}</div>
                          </div>
                        )}

                        <div className="border-top pt-2 mt-2">
                          {/* Show price breakdown if we have it from API */}
                          {priceLoading ? (
                            <div className="text-center py-3 text-muted small">
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                              Calculating price...
                            </div>
                          ) : selectedOption ? (
                            <>
                              {/* Subtotal */}
                              <div className="d-flex justify-content-between mb-2 small">
                                <span className="text-muted">Subtotal</span>
                                <span>₹{Math.round(displaySubTotal).toLocaleString("en-IN")}</span>
                              </div>
                              {/* GST */}
                              <div className="d-flex justify-content-between mb-2 small">
                                <span className="text-muted">GST (5%)</span>
                                <span className="text-danger">
                                  + ₹{Math.round(displayGst).toLocaleString("en-IN")}
                                </span>
                              </div>
                              {/* Source badge */}
                              {isPriceFromApi && (
                                <div className="text-end mb-1">
                                  <span
                                    style={{
                                      fontSize: "10px", background: "#d4edda",
                                      color: "#155724", padding: "1px 6px", borderRadius: "8px",
                                    }}
                                  >
                                    ✓ Confirmed by server
                                  </span>
                                </div>
                              )}
                              {/* Total */}
                              <div className="d-flex justify-content-between border-top pt-3 mt-1 fw-bold fs-5">
                                <span>Total</span>
                                <span className="text-primary">
                                  ₹{Math.round(displayTotal).toLocaleString("en-IN")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="text-muted small text-center py-2">
                              Select a room type to see the final price
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={
                            isProcessing ||
                            !date ||
                            !selectedOption ||
                            availableDates.length === 0 ||
                            priceLoading
                          }
                          className={`btn w-100 mt-4 ${styles.primaryBtn}`}
                        >
                          {isProcessing ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                              Processing...
                            </>
                          ) : (
                            "Proceed to Payment"
                          )}
                        </button>
                        <p className="text-center text-muted mt-2" style={{ fontSize: "11px" }}>
                          🔒 Payments secured by Razorpay
                        </p>
                      </div>
                    </div>

                  </div>
                </form>
              )}

              {/* ════════ STEP: SUCCESS ════════ */}
              {step === "success" && (
                <div className="text-center py-5">
                  <div className={styles.successIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="fw-bold mt-4 text-dark">Booking Confirmed!</h3>
                  <p className="text-muted">
                    Thank you, <strong>{name}</strong>. Your booking for{" "}
                    <strong>{title}</strong> is confirmed
                    {date ? ` for ${date.date} ${date.month} ${date.year}` : ""}.
                  </p>
                  {confirmedBookingId && (
                    <p className="text-muted small">
                      Booking ID: <strong>#{confirmedBookingId}</strong>
                    </p>
                  )}
                  <p className="text-muted small">
                    A confirmation email has been sent to <strong>{email}</strong>.
                  </p>
                  <div className="mt-3 p-3 rounded" style={{ background: "#f8f9fa" }}>
                    <div className="row text-start small">
                      <div className="col-6 mb-2">
                        <span className="text-muted">Passengers</span>
                        <div className="fw-semibold">
                          {adults} Adult{adults > 1 ? "s" : ""}
                          {children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}
                          {infant > 0 ? `, ${infant} Infant${infant > 1 ? "s" : ""}` : ""}
                        </div>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Room Type</span>
                        <div className="fw-semibold text-capitalize">{selectedOption?.label ?? "—"}</div>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">Total Paid</span>
                        <div className="fw-semibold text-primary">
                          ₹{Math.round(displayTotal).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className={`btn mt-4 px-5 ${styles.primaryBtn}`} onClick={closeModal}>
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupTourBookingModal;
