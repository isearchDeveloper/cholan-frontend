"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import styles from "./bookingModal.module.css";

const API_BASE = process.env.NEXT_PUBLIC_UAT_URL || "";
const X_PUBLIC_TOKEN =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

const apiHeaders = {
  "Content-Type": "application/json",
  "X-Public-Token": X_PUBLIC_TOKEN,
};

interface DepartureDate {
  id: number;
  departure_date: string;
  date: string;
  month: string;
  year: string;
  day: string;
  price: string;       // formatted "1,23,456"
  seats: number;
  status?: string;
}

interface GroupTourBookingModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  packageId: number;
  title: string;
  selectedDate: DepartureDate | null;
  availableDates: DepartureDate[];
  basePrice: number;
  onBookingSuccess?: (departureId: number, passengers: number) => void;
}

const GST_RATE = 0.05;

const GroupTourBookingModal: React.FC<GroupTourBookingModalProps> = ({
  openModal,
  setOpenModal,
  packageId,
  title,
  selectedDate,
  availableDates,
  basePrice,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<"details" | "success">("details");
  const router = useRouter();

  // Form state
  const [date, setDate] = useState<DepartureDate | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infant, setInfant] = useState<number>(0);
  const [roomType, setRoomType] = useState<string>("twin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<number | null>(null);

  // Sync selected date from parent
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    } else if (availableDates?.length > 0) {
      setDate(availableDates[0]);
    }
  }, [selectedDate, availableDates]);

  // Reset on open
  useEffect(() => {
    if (openModal) {
      setStep("details");
      setIsProcessing(false);
    }
  }, [openModal]);

  // ── Price calculation (mirrors backend logic exactly) ──
  const pricePerAdult = date?.price
    ? Number(date.price.replace(/,/g, ""))
    : basePrice;

  const adultTotal = pricePerAdult * adults;
  const childTotal = (pricePerAdult * 0.5) * children;
  const subTotal = adultTotal + childTotal;
  const gstAmount = Math.round(subTotal * GST_RATE);
  const totalPrice = subTotal + gstAmount;

  // ── Load Razorpay SDK ──
  const loadRazorpay = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  // ── Verify payment with backend after Razorpay success ──
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

          // Optimistically decrease seat count on the parent page immediately
          if (date && onBookingSuccess) {
            onBookingSuccess(date.id, adults + children);
          }

          router.refresh();
        } else {
          toast.error(
            res.data?.message ||
              "Payment received but confirmation failed. Please contact support with Booking ID: " +
                booking_id
          );
        }
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          "Payment received but confirmation failed. Please contact support with Booking ID: " +
            booking_id;
        toast.error(msg);
      }
    };

  // ── Main submit handler ──
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: must have a date selected
    if (!date) {
      toast.error("Please select a departure date.");
      return;
    }

    // Guard: must have a valid journey_date_id from backend
    if (!date.id) {
      toast.error("This date is not yet bookable. The backend has not returned a valid Date ID. Please contact the administrator.");
      return;
    }

    if (!packageId) {
      toast.error("Invalid package. Please refresh and try again.");
      return;
    }

    // Validate seat availability
    if (date.seats > 0 && adults + children > date.seats) {
      toast.error(`Only ${date.seats} seat(s) available for this departure.`);
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create Razorpay order via backend
      const orderRes = await axios.post(
        `${API_BASE}/api/v1/booking/create-order`,
        {
          package_id: packageId,
          journey_date_id: date.id,
          adults,
          child: children,
          infant,
          room_type: roomType,
          customer_name: name,
          customer_email: email,
          customer_mobile: phone,
        },
        { headers: apiHeaders }
      );

      if (!orderRes.data?.success || !orderRes.data?.order_id) {
        toast.error(orderRes.data?.message || "Failed to create booking order.");
        setIsProcessing(false);
        return;
      }

      const { order_id, amount, booking_id, key_id } = orderRes.data;

      // Step 2: Load Razorpay SDK
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        toast.error("Failed to load payment gateway. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      // Step 3: Open Razorpay checkout
      const options = {
        key: key_id,
        amount,
        currency: "INR",
        name: "Cholan Tours",
        description: title,
        order_id,
        handler: async function (response: any) {
          // Step 4: Verify payment signature with backend
          await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            booking_id
          );
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        theme: { color: "#ef6d27" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error(
          "Payment failed: " + (response.error?.description || "Please try again.")
        );
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      const status = err?.response?.status;
      let errorMsg =
        err?.response?.data?.message || err.message || "Something went wrong.";

      if (status === 422 && err?.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors).flat()[0] as string;
        errorMsg = firstError || errorMsg;
      }

      toast.error(errorMsg);
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      setStep("details");
      setIsProcessing(false);
    }, 300);
  };

  if (!openModal) return null;

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
            {/* Header */}
            <div className={styles.header}>
              <h5 className="m-0 text-white fw-bold">
                {step === "details" ? "Book Your Tour" : "Booking Confirmed"}
              </h5>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className={styles.body}>
              {/* ── STEP: DETAILS + PAYMENT ── */}
              {step === "details" && (
                <form onSubmit={handleProceedToPayment}>
                  <div className="row g-4">
                    {/* Left: Form */}
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
                            <option value="" disabled>
                              -- Select a date --
                            </option>
                            {availableDates.map((d) => (
                              <option key={d.departure_date} value={d.departure_date}>
                                {d.date} {d.month} {d.year} — ₹{d.price}
                                {d.seats > 0 ? ` (${d.seats} seats left)` : " (Sold Out)"}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-muted small">
                            No upcoming departure dates available.
                          </p>
                        )}
                      </div>

                      {/* Passengers */}
                      <div className="row g-3 mb-4">
                        <div className="col-4">
                          <label className="form-label text-muted small mb-1">
                            Adults <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control shadow-none"
                            min="1"
                            max={date?.seats || 50}
                            value={adults}
                            onChange={(e) =>
                              setAdults(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            required
                          />
                        </div>
                        <div className="col-4">
                          <label className="form-label text-muted small mb-1">
                            Children (2–12y)
                          </label>
                          <input
                            type="number"
                            className="form-control shadow-none"
                            min="0"
                            value={children}
                            onChange={(e) =>
                              setChildren(Math.max(0, parseInt(e.target.value) || 0))
                            }
                          />
                        </div>
                        <div className="col-4">
                          <label className="form-label text-muted small mb-1">
                            Infants (&lt;2y)
                          </label>
                          <input
                            type="number"
                            className="form-control shadow-none"
                            min="0"
                            value={infant}
                            onChange={(e) =>
                              setInfant(Math.max(0, parseInt(e.target.value) || 0))
                            }
                          />
                        </div>
                      </div>

                      {/* Room Type */}
                      <div className="mb-3">
                        <label className="form-label text-muted small mb-1">
                          Room Type
                        </label>
                        <select
                          className="form-select shadow-none"
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                        >
                          <option value="single">Single Room</option>
                          <option value="twin">Twin Sharing</option>
                          <option value="double">Double Room</option>
                          <option value="triple">Triple Room</option>
                        </select>
                      </div>

                      {/* Lead Passenger */}
                      <h6 className="fw-bold mb-3 text-dark border-top pt-3">
                        Lead Passenger Details
                      </h6>
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

                    {/* Right: Price Summary */}
                    <div className="col-lg-5">
                      <div className={styles.summaryCard}>
                        <h6 className="fw-bold border-bottom pb-2 mb-3">
                          Price Summary
                        </h6>

                        {/* Departure info */}
                        {date && (
                          <div className="mb-3 p-2 rounded" style={{ background: "#fff8f4", border: "1px solid #f0d5c8" }}>
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

                        <div className="d-flex justify-content-between mb-2 small">
                          <span className="text-muted">
                            Adults × {adults} @ ₹{pricePerAdult.toLocaleString("en-IN")}
                          </span>
                          <span>₹{adultTotal.toLocaleString("en-IN")}</span>
                        </div>

                        {children > 0 && (
                          <div className="d-flex justify-content-between mb-2 small">
                            <span className="text-muted">
                              Children × {children} @ ₹
                              {Math.round(pricePerAdult * 0.5).toLocaleString("en-IN")}
                            </span>
                            <span>₹{Math.round(childTotal).toLocaleString("en-IN")}</span>
                          </div>
                        )}

                        {infant > 0 && (
                          <div className="d-flex justify-content-between mb-2 small">
                            <span className="text-muted">Infants × {infant}</span>
                            <span className="text-success">Free</span>
                          </div>
                        )}

                        <div className="d-flex justify-content-between mb-2 small border-top pt-2 mt-2">
                          <span className="text-muted">Subtotal</span>
                          <span>₹{Math.round(subTotal).toLocaleString("en-IN")}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3 small">
                          <span className="text-muted">GST (5%)</span>
                          <span className="text-danger">
                            + ₹{gstAmount.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between border-top pt-3 mt-3 fw-bold fs-5">
                          <span>Total</span>
                          <span className="text-primary">
                            ₹{Math.round(totalPrice).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="mt-2 small text-muted">
                          Room: <span className="text-capitalize fw-semibold">{roomType}</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isProcessing || !date || availableDates.length === 0}
                          className={`btn w-100 mt-4 ${styles.primaryBtn}`}
                        >
                          {isProcessing ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              />
                              Processing...
                            </>
                          ) : (
                            "Proceed to Payment"
                          )}
                        </button>
                        <p
                          className="text-center text-muted mt-2"
                          style={{ fontSize: "11px" }}
                        >
                          🔒 Payments secured by Razorpay
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* ── STEP: SUCCESS ── */}
              {step === "success" && (
                <div className="text-center py-5">
                  <div className={styles.successIcon}>
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
                        <div className="fw-semibold text-capitalize">{roomType}</div>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">Total Paid</span>
                        <div className="fw-semibold text-primary">
                          ₹{Math.round(totalPrice).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`btn mt-4 px-5 ${styles.primaryBtn}`}
                    onClick={closeModal}
                  >
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
