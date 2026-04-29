"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XPublicToken } from "../urls/apiUrls";
import styles from "./bookingModal.module.css";

interface GroupTourBookingModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  packageId: number;
  title: string;
  selectedDate: any | null;
  availableDates: any[];
  basePrice: number;
}

const GroupTourBookingModal: React.FC<GroupTourBookingModalProps> = ({
  openModal,
  setOpenModal,
  packageId,
  title,
  selectedDate,
  availableDates,
  basePrice,
}) => {
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  
  // Form State
  const [date, setDate] = useState<any>(selectedDate);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infant, setInfant] = useState<number>(0);
  const [roomType, setRoomType] = useState<string>("twin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Update date if selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    } else if (availableDates && availableDates.length > 0) {
      setDate(availableDates[0]);
    }
  }, [selectedDate, availableDates]);

  // Reset step when modal opens
  useEffect(() => {
    if (openModal) {
      setStep("details");
    }
  }, [openModal]);

  const currentPrice = date?.price ? Number(date.price.replace(/,/g, "")) : basePrice;
  const subTotal = currentPrice * adults + (currentPrice * 0.5) * children; 
  const gstAmount = subTotal * 0.05;
  const totalPrice = subTotal + gstAmount;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
       toast.error("Please select a departure date from the dropdown.");
       return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        package_id: packageId || 839, // HARDCODED FOR TESTING: Remove '|| 839' later
        journey_date_id: date?.id || 25, // HARDCODED FOR TESTING: Remove '|| 25' later
        adults: adults,
        child: children,
        infant: infant,
        room_type: roomType,
        customer_name: name,
        customer_email: email,
        customer_mobile: phone,
      };

      console.log("Booking Request Payload:", payload);

      const res = await axios.post("https://cholan.isearchsolution.com/crm/api/v1/booking/create-order", payload, {
          headers: { 
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken
          }
      });

      if (res.data && (res.data.success || res.data.order_id)) {
          const resLoaded = await loadRazorpay();
          if (!resLoaded) {
             toast.error("Failed to load Razorpay SDK. Check your internet connection.");
             setIsProcessing(false);
             return;
          }

          const options = {
            key: res.data.key || "rzp_test_SjCBbICvb6KoBJ", // Will use backend key if provided
            amount: res.data.amount,
            currency: "INR",
            name: "Cholan Tours",
            description: title,
            order_id: res.data.order_id,
            handler: function (response: any) {
               console.log("Payment Success: ", response);
               // Here you would typically call your verify-payment API
               setStep("success");
            },
            prefill: {
              name: name,
              email: email,
              contact: phone,
            },
            theme: { color: "#ef6d27" }
          };

          const rzp1 = new (window as any).Razorpay(options);
          rzp1.on("payment.failed", function (response: any){
             toast.error("Payment failed: " + (response.error.description || ""));
          });
          rzp1.open();
      } else {
          toast.error("Failed to create order: " + (res.data.message || JSON.stringify(res.data) || "Unknown error"));
      }
    } catch (err: any) {
       console.error("Booking API Response:", err?.response?.data);
       
       let errorMsg = err?.response?.data?.message || err.message || "Something went wrong while initiating booking.";
       
       // Extract specific field validation errors for 422 responses
       if (err?.response?.status === 422 && err?.response?.data?.errors) {
           const errors = err.response.data.errors;
           const firstError = Object.values(errors).flat()[0];
           if (firstError) {
               errorMsg = `Validation Error: ${firstError}`;
           } else {
               errorMsg = `Validation Error: ${JSON.stringify(errors)}`;
           }
       }
       
       toast.error(errorMsg);
    } finally {
       setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => setStep("details"), 300); // reset after animation
  };

  if (!openModal) return null;

  return (
    <>
    <ToastContainer />
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
            {step === "details" && "Booking Details"}
            {step === "payment" && "Secure Payment"}
            {step === "success" && "Booking Confirmed"}
          </h5>
          <button 
            type="button" 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); closeModal(); }} 
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
              justifyContent: "center"
            }}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {step === "details" && (
            <form onSubmit={handleProceedToPayment}>
              <div className="row g-4">
                {/* Left Col: Details */}
                <div className="col-lg-7">
                  <h6 className="fw-bold mb-3 text-dark">{title}</h6>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">Select Departure Date</label>
                    <select 
                      className="form-select shadow-none" 
                      value={date ? JSON.stringify(date) : ""}
                      onChange={(e) => setDate(JSON.parse(e.target.value))}
                      required
                    >
                      {availableDates.map((d, i) => (
                        <option key={i} value={JSON.stringify(d)}>
                          {d.date} {d.month} {d.year} - ₹{d.price} {d.seats > 0 ? `(${d.seats} Seats Left)` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-4">
                      <label className="form-label text-muted small mb-1">Adults</label>
                      <input 
                        type="number" 
                        className="form-control shadow-none" 
                        min="1" 
                        value={adults} 
                        onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                        required 
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label text-muted small mb-1">Children (2-12y)</label>
                      <input 
                        type="number" 
                        className="form-control shadow-none" 
                        min="0" 
                        value={children} 
                        onChange={(e) => setChildren(parseInt(e.target.value) || 0)} 
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label text-muted small mb-1">Infants (&lt;2y)</label>
                      <input 
                        type="number" 
                        className="form-control shadow-none" 
                        min="0" 
                        value={infant} 
                        onChange={(e) => setInfant(parseInt(e.target.value) || 0)} 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">Room Type</label>
                    <select 
                      className="form-select shadow-none" 
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      required
                    >
                      <option value="single">Single Room</option>
                      <option value="twin">Twin Sharing</option>
                      <option value="double">Double Room</option>
                      <option value="triple">Triple Room</option>
                    </select>
                  </div>

                  <h6 className="fw-bold mb-3 text-dark border-top pt-3">Lead Passenger Details</h6>
                  
                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">Full Name</label>
                    <input type="text" className="form-control shadow-none" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter full name" />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label text-muted small mb-1">Email</label>
                      <input type="email" className="form-control shadow-none" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email address" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small mb-1">Phone</label>
                      <input type="tel" className="form-control shadow-none" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Phone number" />
                    </div>
                  </div>
                </div>

                {/* Right Col: Summary */}
                <div className="col-lg-5">
                  <div className={styles.summaryCard}>
                    <h6 className="fw-bold border-bottom pb-2 mb-3">Price Summary</h6>
                    
                    <div className="d-flex justify-content-between mb-2 small">
                      <span className="text-muted">Adults (x{adults})</span>
                      <span>₹{(currentPrice * adults).toLocaleString("en-IN")}</span>
                    </div>
                    
                    {children > 0 && (
                      <div className="d-flex justify-content-between mb-2 small">
                        <span className="text-muted">Children (x{children})</span>
                        <span>₹{((currentPrice * 0.5) * children).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-between mb-2 small border-top pt-2 mt-2">
                      <span className="text-muted">Subtotal</span>
                      <span>₹{subTotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3 small">
                      <span className="text-muted">GST (5%)</span>
                      <span className="text-danger">+ ₹{Math.round(gstAmount).toLocaleString("en-IN")}</span>
                    </div>

                    <div className="d-flex justify-content-between border-top pt-3 mt-3 fw-bold fs-5">
                      <span>Total</span>
                      <span className="text-primary">₹{Math.round(totalPrice).toLocaleString("en-IN")}</span>
                    </div>

                    <button type="submit" disabled={isProcessing} className={`btn w-100 mt-4 ${styles.primaryBtn}`}>
                      {isProcessing ? "Processing..." : "Proceed to Payment"}
                    </button>
                    <p className="text-center text-muted mt-2" style={{ fontSize: "11px" }}>Payments are secured by Razorpay</p>
                  </div>
                </div>
              </div>
            </form>
          )}



          {step === "success" && (
            <div className="text-center py-5">
              <div className={styles.successIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="fw-bold mt-4 text-dark">Booking Confirmed!</h3>
              <p className="text-muted">Thank you, {name}. Your booking for {title} is confirmed for {date?.date} {date?.month} {date?.year}.</p>
              <p className="text-muted small">A confirmation email has been sent to {email}.</p>
              <button className={`btn mt-4 px-5 ${styles.primaryBtn}`} onClick={closeModal}>
                View My Bookings
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
