"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import flatpickr from "flatpickr";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XPublicToken } from "@/app/urls/apiUrls";
import "flatpickr/dist/themes/material_orange.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/context/FormContext";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  travelDate?: string;
  people?: string;
  message?: string;
  recaptcha?: string;
}

const GetInTouchForm: React.FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    travelDate: "",
    people: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [ipAddress, setIpAddress] = useState<string>("");
  const [browserName, setBrowserName] = useState<string>("Unknown");
  const [deviceType, setDeviceType] = useState<string>("Unknown");
  const [combinedData, setCombinedData] = useState<string>("");
  const { setHasValidSubmission } = useForm();
  let route = useRouter();

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    // 🔹 Name validation
    const nameValue = formData.name.trim();
    if (!nameValue) {
      newErrors.name = "Name is required";
    } else if (nameValue.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      ) ||
      /\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    // Phone validation
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber("+" + formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number for the selected country";
    }
    // Travel date validation
    if (!formData.travelDate) {
      newErrors.travelDate = "Travel date is required";
    } else {
      const selectedDate = new Date(
        formData.travelDate.split("-").reverse().join("-")
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.travelDate = "Travel date cannot be in the past";
      }
    }
    // People validation
    if (!formData.people) {
      newErrors.people = "Number of people is required";
    } else if (parseInt(formData.people) < 1) {
      newErrors.people = "Number of people must be at least 1";
    } else if (parseInt(formData.people) > 50) {
      newErrors.people = "Number of people cannot exceed 50";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    } else if (/<[^>]+>/.test(formData.message)) {
      newErrors.message = "HTML tags are not allowed in the message";
    } else {
      // 🔹 Normalize multiple spaces/newlines before counting
      const cleanText = formData.message.replace(/\s+/g, " ").trim();
      const wordCount = cleanText.split(" ").length;
      if (wordCount > 400) {
        newErrors.message = `Message cannot exceed 400 words (currently ${wordCount})`;
      }
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string, countryData: any) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
      countryCode: countryData.countryCode,
    }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // toast.error("Please fix the errors in the form", {
      //   toastId: "form-validation-error",
      // });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        message: formData.message.trim(),
        no_of_travellers: parseInt(formData.people),
        start_date: formData.travelDate.split("-").reverse().join("-"),
        is_get_in_touch: 1,
        current_url: currentUrl || "",
        ip: combinedData || "",
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/enquiries/general`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
        }
      );
      if (response.data.success) {
        // toast.success(response.data.message || "Enquiry submitted successfully!");
        setHasValidSubmission(true);
        route.push("/thank-you");
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "in",
          travelDate: "",
          people: "",
          message: "",
        });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        // toast.dismiss("form-validation-error"); // Dismiss validation error toast if it exists
      } else {
        // toast.error(
        //   response.data.message ||
        //     "Failed to submit enquiry. Please try again.",
        //   { toastId: "api-error" }
        // );
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      // toast.error(errorMessage, { toastId: "api-error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (dateInputRef.current) {
      const fp = flatpickr(dateInputRef.current, {
        dateFormat: "d-m-Y",
        disableMobile: true,
        monthSelectorType: "dropdown",
        minDate: "today",
        onChange: (selectedDates, dateStr) => {
          setFormData((prev) => ({ ...prev, travelDate: dateStr }));
          if (errors.travelDate) {
            setErrors((prev) => ({ ...prev, travelDate: undefined }));
          }
        },
      });
      return () => {
        if (fp) {
          fp.destroy();
        }
      };
    }
  }, [errors.travelDate]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="tourCard mb-lg-5 shadow-sm p-4 p-lg-4 mt-4 mt-lg-0">
        <h4 className="mb-1 fw-bold">Your Holiday, Your Way</h4>
        {/* <p>Design a one-of-a-kind travel experience </p> */}
        <form onSubmit={handleSubmit} className="mt-4" noValidate>
          {/* Name */}
         <div className="row mb-3"> 
          <div className="col-6 mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Name*"
              disabled={isSubmitting}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          {/* Email */}
          <div className="col-6 mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email*"
              disabled={isSubmitting}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          {/* Phone */}
          <div className="col-12">
            <PhoneInput
              country={formData.countryCode}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass={`form-control ${errors.phone ? "is-invalid" : ""}`}
              inputStyle={{ width: "100%" }}
              enableSearch
              placeholder="Phone Number*"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <div className="invalid-feedback d-block">{errors.phone}</div>
            )}
          </div>
          </div>
          {/* Travel Date and People in one row */}
          <div className="row mb-3">
            {/* Travel Date */}
            <div className="col-6 mb-2 mb-md-0">
              <div className="position-relative">
                <input
                  ref={dateInputRef}
                  type="text"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className={`form-control date-input ${
                    errors.travelDate ? "is-invalid" : ""
                  }`}
                  id="floatingDate"
                  placeholder="Travel Date*"
                  disabled={isSubmitting}
                />
                {/* <span className="calendar-icon position-absolute end-0 top-50 translate-middle-y me-3">
                  <Image
                    src="/images/calendar-icon.svg"
                    alt="Calendar Icon"
                    width={20}
                    height={20}
                  />
                </span> */}
                {errors.travelDate && (
                  <div className="invalid-feedback d-block">
                    {errors.travelDate}
                  </div>
                )}
              </div>
            </div>
            {/* People */}
            <div className="col-6">
              <input
                type="number"
                name="people"
                value={formData.people}
                onChange={handleChange}
                className={`form-control ${errors.people ? "is-invalid" : ""}`}
                id="floatingPeople"
                placeholder="Number of People*"
                min="1"
                max="50"
                disabled={isSubmitting}
              />
              {errors.people && (
                <div className="invalid-feedback d-block">{errors.people}</div>
              )}
            </div>
          </div>
          {/* Message */}
          <div className="mb-3">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              placeholder="Message*"
              rows={4}
              disabled={isSubmitting}
            ></textarea>
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}
          </div>
          <div className="mb-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => setRecaptchaToken(token || null)}
            />
            {errors.recaptcha && (
              <div className="invalid-feedback d-block">{errors.recaptcha}</div>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn blue-btn w-100 d-flex align-items-center justify-content-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Submitting...
              </>
            ) : (
              <>
                Submit
                <Image
                  width={23}
                  height={23}
                  src="/images/button-arrow.png"
                  alt=""
                />
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default GetInTouchForm;
