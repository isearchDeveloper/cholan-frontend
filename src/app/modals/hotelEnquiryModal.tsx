"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XPublicToken } from "@/app/urls/apiUrls";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { isValidPhoneNumber } from "libphonenumber-js";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useForm } from "../context/FormContext";

interface Props {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  slug: string;
  trainName?: string;
  selectedRoom?: string;
  rooms?: { title: string }[];
}

const HotelEnquiryModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  slug,
  trainName,
  selectedRoom,
  rooms = [],
}) => {
  const checkinRef = useRef<HTMLInputElement>(null);
  const checkoutRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    checkin_date: "",
    checkout_date: "",
    adult: "",
    child: "",
    room_type: "",
    message: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [ipAddress, setIpAddress] = useState<string>("");
  const [browserName, setBrowserName] = useState<string>("Unknown");
  const [deviceType, setDeviceType] = useState<string>("Unknown");
  const [combinedData, setCombinedData] = useState<string>("");
  let route = useRouter();
  const { setHasValidSubmission } = useForm();

  // 🔹 Detect Browser
  function detectBrowser(ua: string): string {
    if (/OPR|Opera/i.test(ua)) return "Opera";
    if (/Edg\//i.test(ua)) return "Edge";
    if (/Chrome\/\d+/i.test(ua) && !/Edg\//i.test(ua) && !/OPR/i.test(ua))
      return "Chrome";
    if (/Safari\/\d+/i.test(ua) && !/Chrome\/\d+/i.test(ua)) return "Safari";
    if (/Firefox\/\d+/i.test(ua)) return "Firefox";
    if (/MSIE|Trident\//i.test(ua)) return "Internet Explorer";
    return "Unknown";
  }

  // 🔹 Detect Device
  function detectDevice(ua: string): string {
    if (/Mobi|Android|iPhone|iPod|IEMobile|BlackBerry|Opera Mini/i.test(ua))
      return "Mobile";
    if (/Tablet|iPad/i.test(ua)) return "Tablet";
    return "Desktop";
  }

  // ✅ 1st useEffect → Get IP, browser, device info
  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues

    const ua = navigator.userAgent;
    const bName = detectBrowser(ua);
    const dType = detectDevice(ua);
    setBrowserName(bName);
    setDeviceType(dType);

    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const ip = data?.ip || "";
        setIpAddress(ip);
        setCombinedData(`${ip}-${dType.toLowerCase()}-${bName}`);
      })
      .catch(() => {
        setCombinedData(`unknown-${dType.toLowerCase()}-${bName}`);
      });
  }, []);

  const parseDMY = (str: string) => {
    if (!str) return null;
    const m = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (!m) return null;
    const [, dd, mm, yyyy] = m;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  };

  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const validateForm = (): boolean => {
    const newErrors: any = {};
    const today = normalizeDate(new Date());
    const checkinDate = parseDMY(formData.checkin_date);
    const checkoutDate = parseDMY(formData.checkout_date);
    const checkinNormalized = checkinDate ? normalizeDate(checkinDate) : null;
    const checkoutNormalized = checkoutDate
      ? normalizeDate(checkoutDate)
      : null;

    const nameValue = formData.name.trim();
    if (!nameValue) newErrors.name = "Name is required";
    else if (nameValue.length < 2)
      newErrors.name = "Name must be at least 2 characters long";
    else if (!/^[A-Za-z\s]+$/.test(nameValue))
      newErrors.name = "Name can only contain letters and spaces";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email,
      ) ||
      /\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = "Invalid email";
    // old phone code
    // if (!formData.phone || !formData.phone.trim()) {
    //   newErrors.phone = "Phone number is required";
    // } else if (!isValidPhoneNumber("+" + formData.phone)) {
    //   newErrors.phone =
    //     "Please enter a valid phone number for the selected country";
    // }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain digits only";
    } else if (formData.phone.length > 20) {
      newErrors.phone = "Phone number cannot exceed 20 digits";
    }

    if (!formData.checkin_date.trim())
      newErrors.checkin_date = "Check-in date is required";
    else if (!checkinNormalized)
      newErrors.checkin_date = "Invalid check-in date";
    else if (checkinNormalized < today)
      newErrors.checkin_date = "Check-in cannot be in the past";

    if (!formData.checkout_date.trim())
      newErrors.checkout_date = "Check-out date is required";
    else if (!checkoutNormalized)
      newErrors.checkout_date = "Invalid check-out date";
    else if (checkinNormalized && checkoutNormalized <= checkinNormalized)
      newErrors.checkout_date = "Check-out must be after check-in";

    if (!formData.adult.trim()) {
      newErrors.adult = "Number of adults is required";
    } else {
      const adultValue = formData.adult.trim();
      if (/^\d*\.\d*$/.test(adultValue)) {
        newErrors.adult = "Adults cannot contain decimal values";
      } else {
        const adultNum = Number(adultValue);
        if (isNaN(adultNum)) newErrors.adult = "Adults must be a number";
        else if (adultNum < 1) newErrors.adult = "Adults must be at least 1";
        else if (adultNum > 50) newErrors.adult = "Adults cannot exceed 50";
      }
    }
    if (formData.child && formData.child.trim() !== "") {
      const childValue = formData.child.trim();
      if (/^\d*\.\d*$/.test(childValue)) {
        newErrors.child = "Children cannot contain decimal values";
      } else {
        const childNum = Number(childValue);
        if (isNaN(childNum)) newErrors.child = "Children must be a number";
        else if (childNum < 0) newErrors.child = "Children cannot be negative";
        else if (childNum > 50) newErrors.child = "Children cannot exceed 50";
      }
    }

    if (formData.message.trim()) {
      if (formData.message.trim().length < 10)
        newErrors.message = "Message must be at least 10 characters long";
      else if (/<[^>]+>/.test(formData.message))
        newErrors.message = "HTML tags are not allowed in the message";
      else {
        const cleanText = formData.message.replace(/\s+/g, " ").trim();
        const wordCount = cleanText.split(" ").length;
        if (wordCount > 1000) {
          newErrors.message = `Message cannot exceed 400 words (currently ${wordCount})`;
        }
      }
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!openModal) return;
    const today = new Date();
    const checkinPicker = flatpickr(checkinRef.current!, {
      dateFormat: "d-m-Y",
      disableMobile: true,
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, checkin_date: dateStr }));
        if (errors.checkin_date)
          setErrors((prev: any) => ({ ...prev, checkin_date: undefined }));

        if ((checkoutRef.current as any)?._flatpickr) {
          (checkoutRef.current as any)._flatpickr.set(
            "minDate",
            selectedDates[0] || today,
          );
        }
      },
    });
    const checkoutPicker = flatpickr(checkoutRef.current!, {
      dateFormat: "d-m-Y",
      disableMobile: true,
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, checkout_date: dateStr }));
        if (errors.checkout_date)
          setErrors((prev: any) => ({ ...prev, checkout_date: undefined }));
      },
    });
    return () => {
      checkinPicker.destroy();
      checkoutPicker.destroy();
    };
  }, [openModal, errors.checkin_date, errors.checkout_date]);

  useEffect(() => {
    if (selectedRoom) {
      setFormData((prev) => ({
        ...prev,
        room_type: selectedRoom,
      }));
    }
  }, [selectedRoom]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const toIsoDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const m = dateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (m) {
      const [, dd, mm, yyyy] = m;
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    }
    return dateStr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) {
      // toast.error("Please fix errors in the form", {
      //   toastId: "validation-error",
      // });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        hotel_slug: slug,
        ...formData,
        room_type: selectedRoom || formData.room_type,
        checking_date: toIsoDate(formData.checkin_date),
        checkout_date: toIsoDate(formData.checkout_date),
        adult_count: Number(formData.adult),
        child_count: formData.child !== "" ? Number(formData.child) : 0,
        current_url: currentUrl || "",
        ip: combinedData || "",
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/enquiries/hotel`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
        },
      );
      if (response.data.success) {
        // toast.success(response.data.message || 'Enquiry submitted!', {
        //   autoClose: 5000,
        //   toastId: 'success-toast',
        //   onClose: () => setOpenModal(false),
        // });
        setHasValidSubmission(true);
        route.push("/thank-you");
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "in",
          checkin_date: "",
          checkout_date: "",
          adult: "",
          child: "",
          room_type: "",
          message: "",
        });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        // toast.error(response.data.message || "Submission failed", {
        //   toastId: "submission-error",
        // });
      }
    } catch (err: any) {
      // toast.error(err.response?.data?.message || "Submission failed", {
      //   toastId: "submission-error",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "in",
        checkin_date: "",
        checkout_date: "",
        adult: "",
        child: "",
        room_type: "",
        message: "",
      });
      setErrors({});
    }
  }, [openModal]);

  if (!openModal) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close btn-close-dark"
              onClick={() => setOpenModal(false)}
            ></button>
            <div className="modal-body p-4">
              <div className="row g-4">
                <div className="col-lg-5 d-none d-md-flex align-items-center justify-content-center hotel-modal-left-bg text-white rounded-3 p-4">
                  {/* <div>
                    <h4 className="fw-bold text-white">Book Your Perfect Stay</h4>
                    <p>Experience comfort and convenience with us.</p>
                  </div>

                  </div> */}
                </div>
                <div className="col-lg-7">
                  <h2 className="fs-3 mb-1">Experience Luxury Stays</h2>
                  <p className="mb-4">
                    Fill out your preferences and we’ll take care of the rest.
                  </p>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3 mb-0">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        {/* <PhoneInput
                          country={formData.countryCode}
                          value={formData.phone}
                          onChange={(value, countryData: any) => {
                            setFormData((prev) => ({
                              ...prev,
                              phone: value,
                              countryCode: countryData.countryCode,
                            }));
                          }}
                          inputClass={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          inputStyle={{ width: "100%" }}
                          enableSearch={true}
                          placeholder="Phone Number *"
                          disabled={isSubmitting}
                        /> */}
                        <PhoneInput
                          country={formData.countryCode}
                          value={formData.phone}
                          onChange={(value, countryData: any) => {
                            const digitsOnly = value.replace(/\D/g, "");
                            const trimmed = digitsOnly.slice(0, 20);

                            setFormData((prev) => ({
                              ...prev,
                              phone: trimmed,
                              countryIso: countryData.countryCode,
                              dialCode: countryData.dialCode,
                            }));

                            if (errors.phone) {
                              setErrors((prev: any) => ({
                                ...prev,
                                phone: "",
                              }));
                            }
                          }}
                          enableSearch
                          autoFormat={false}
                          enableLongNumbers
                          countryCodeEditable={false}
                          inputClass={`form-control ${errors.phone ? "is-invalid" : ""}`}
                          inputStyle={{ width: "100%" }}
                          inputProps={{
                            maxLength: 20,
                            inputMode: "numeric",
                          }}
                          placeholder="Phone Number *"
                        />

                        {errors.phone && (
                          <div className="invalid-feedback d-block">
                            {errors.phone}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Email *"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                      <div className="col-md-6 position-relative">
                        <input
                          ref={checkinRef}
                          type="text"
                          name="checkin_date"
                          className={`form-control ${
                            errors.checkin_date ? "is-invalid" : ""
                          }`}
                          placeholder="Check-in Date *"
                          value={formData.checkin_date}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {/* <Image
                          src="/images/calendar-icon.svg"
                          alt="Calendar"
                          width={20}
                          height={20}
                          className="position-absolute end-0 top-50 translate-middle-y me-3"
                        /> */}
                        {errors.checkin_date && (
                          <div className="invalid-feedback">
                            {errors.checkin_date}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 position-relative">
                        <input
                          ref={checkoutRef}
                          type="text"
                          name="checkout_date"
                          className={`form-control ${
                            errors.checkout_date ? "is-invalid" : ""
                          }`}
                          placeholder="Check-out Date *"
                          value={formData.checkout_date}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        {/* <Image
                          src="/images/calendar-icon.svg"
                          alt="Calendar"
                          width={20}
                          height={20}
                          className="position-absolute end-0 top-50 translate-middle-y me-3"
                        /> */}
                        {errors.checkout_date && (
                          <div className="invalid-feedback">
                            {errors.checkout_date}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          name="adult"
                          min="1"
                          max="50"
                          onKeyDown={(e) => {
                            if (
                              e.key === "-" ||
                              e.key === "+" ||
                              e.key === "e" ||
                              e.key === "."
                            ) {
                              e.preventDefault();
                            }
                          }}
                          className={`form-control ${
                            errors.adult ? "is-invalid" : ""
                          }`}
                          placeholder="Adults *"
                          value={formData.adult}
                          onChange={handleChange}
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                        {errors.adult && (
                          <div className="invalid-feedback">{errors.adult}</div>
                        )}
                      </div>
                      {/* <div className="col-md-6">
                        <input
                          type="number"
                          name="child"
                          min="0"
                          max="50"
                          onKeyDown={(e) => {
                            if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === '.') {
                              e.preventDefault();
                            }
                          }}
                          className={`form-control ${errors.child ? 'is-invalid' : ''}`}
                          placeholder="Children "
                          value={formData.child}
                          onChange={handleChange}
                          onWheel={(e) => e.currentTarget.blur()}
                        />
                        {errors.child && <div className="invalid-feedback">{errors.child}</div>}
                      </div> */}
                      <div className="col-md-6">
                        <input
                          type="number"
                          name="child"
                          min="0"
                          max="50"
                          onKeyDown={(e) => {
                            if (["-", "+", "e", "."].includes(e.key))
                              e.preventDefault();
                          }}
                          onWheel={(e) => e.currentTarget.blur()}
                          onPaste={(e) => {
                            const pastedText = e.clipboardData.getData("text");
                            if (!/^\d+$/.test(pastedText)) {
                              e.preventDefault(); // ❌ block paste if not a number
                            } else {
                              const num = parseInt(pastedText, 10);
                              if (num < 0 || num > 50) e.preventDefault(); // ❌ block if outside range
                            }
                          }}
                          className={`form-control ${
                            errors.child ? "is-invalid" : ""
                          }`}
                          placeholder="Children "
                          value={formData.child}
                          onChange={handleChange}
                        />
                        {errors.child && (
                          <div className="invalid-feedback">{errors.child}</div>
                        )}
                      </div>
                      <div className="col-12">
                        {selectedRoom ? (
                          <input
                            type="text"
                            name="room_type"
                            className="form-control"
                            value={selectedRoom}
                            disabled
                          />
                        ) : (
                          <select
                            name="room_type"
                            className="form-select"
                            value={formData.room_type}
                            onChange={handleChange}
                          >
                            <option value="">
                              Select Room Type Preference (Optional)
                            </option>
                            <option value="Standard">Standard</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                            <option value="Premium Deluxe">
                              Premium Deluxe
                            </option>
                            <option value="Executive Suite">
                              Executive Suite
                            </option>
                          </select>
                        )}
                      </div>
                      <div className="col-12">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`form-control ${
                            errors.message ? "is-invalid" : ""
                          }`}
                          id="floatingMessage"
                          placeholder="Additional Info"
                          rows={4}
                        ></textarea>
                        {errors.message && (
                          <div className="invalid-feedback">
                            {errors.message}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                          }
                          onChange={(token) => setRecaptchaToken(token || null)}
                        />{" "}
                        {errors.recaptcha && (
                          <div className="invalid-feedback d-block">
                            {errors.recaptcha}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn blue-btn w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Enquiry
                            <Image
                              src="/images/button-arrow.png"
                              alt="arrow"
                              width={20}
                              height={20}
                              className="ms-2"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelEnquiryModal;
