"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XPublicToken } from "@/app/urls/apiUrls";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import Image from "next/image";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/context/FormContext";
const BusEnquiryForm: React.FC<any> = () => {
  const startDateRef = useRef<HTMLInputElement>(null);
  const returnDateRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    from_city: "",
    vehicle_type: "",
    start_location: "",
    start_date: "",
    return_date: "",
    end_location: "",
    adult: "",
    child: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [ipAddress, setIpAddress] = useState<string>("");
  const [browserName, setBrowserName] = useState<string>("Unknown");
  const [deviceType, setDeviceType] = useState<string>("Unknown");
  const [combinedData, setCombinedData] = useState<string>("");
  let route = useRouter();
  const { setHasValidSubmission } = useForm();
  const parseDMY = (str: string) => {
    const [day, month, year] = str.split("-")?.map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };
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
    const newErrors: any = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = parseDMY(formData.start_date);
    const returnDate = parseDMY(formData.return_date);

    const nameValue = formData.name.trim();
    if (!nameValue) {
      newErrors.name = "Name is required";
    } else if (nameValue?.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      ) ||
      /\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = "Invalid email address";

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber("+" + formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number for the selected country";
    }
    const vehicleRegex = /^[A-Za-z\s.\-]+$/; // allowed characters only

    if (formData.vehicle_type && formData.vehicle_type.trim()) {
      const value = formData.vehicle_type.trim();

      // Check for HTML tags like <div>, <script>, etc.
      const hasHtmlTags = /<[^>]*>/.test(value);

      if (hasHtmlTags) {
        newErrors.vehicle_type = "HTML tags are not allowed in vehicle name";
      } else if (!vehicleRegex.test(value)) {
        newErrors.vehicle_type =
          "Please enter a valid vehicle name (letters, numbers, spaces only)";
      }
    }

    if (!formData.from_city.trim())
      newErrors.from_city = "From city is required";

    const validLocationRegex = /^[A-Za-z\s.'-]+$/;
    const isGarbageInput = (value: string): boolean => {
      const compact = value.replace(/\s+/g, "");
      return (
        compact.length < 3 ||
        /(.)\1{2,}/.test(compact) ||
        compact.match(/[aeiou]/gi)?.length === 0 ||
        compact.length > 50
      );
    };

    if (!formData.start_location.trim()) {
      newErrors.start_location = "Travel start location is required";
    } else if (!validLocationRegex.test(formData.start_location.trim())) {
      newErrors.start_location = "Only letters and spaces are allowed";
    } else if (isGarbageInput(formData.start_location.trim())) {
      newErrors.start_location = "Please enter a valid location name";
    }

    if (!formData.end_location.trim()) {
      newErrors.end_location = "Travel end location is required";
    } else if (!validLocationRegex.test(formData.end_location.trim())) {
      newErrors.end_location = "Only letters and spaces are allowed";
    } else if (isGarbageInput(formData.end_location.trim())) {
      newErrors.end_location = "Please enter a valid location name";
    }

    if (!formData.start_date.trim()) {
      newErrors.start_date = "Travel start date is required";
    } else if (!startDate) {
      newErrors.start_date = "Invalid start date format";
    } else if (startDate < today) {
      newErrors.start_date = "Start date cannot be in the past";
    }

    if (!formData.return_date.trim()) {
      newErrors.return_date = "Return date is required";
    } else if (!returnDate) {
      newErrors.return_date = "Invalid return date format";
    } else if (startDate && returnDate <= startDate) {
      newErrors.return_date = "Return date must be after start date";
    }

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
    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };
  useEffect(() => {
    const today = new Date();
    const startPicker = flatpickr(startDateRef.current!, {
      dateFormat: "d-m-Y",
      disableMobile: true,
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, start_date: dateStr }));
        if (errors.start_date)
          setErrors((prev: any) => ({ ...prev, start_date: undefined }));
        if ((returnDateRef.current as any)?._flatpickr) {
          (returnDateRef.current as any)._flatpickr.set(
            "minDate",
            selectedDates[0] || today
          );
        }
      },
    });
    const returnPicker = flatpickr(returnDateRef.current!, {
      dateFormat: "d-m-Y",
      disableMobile: true,
      minDate: today,
      onChange: (selectedDates, dateStr) => {
        setFormData((prev) => ({ ...prev, return_date: dateStr }));
        if (errors.return_date)
          setErrors((prev: any) => ({ ...prev, return_date: undefined }));
      },
    });
    return () => {
      startPicker.destroy();
      returnPicker.destroy();
    };
  }, [errors.start_date, errors.return_date]);

  const toIsoDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const s = dateStr.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

    const m = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (m) {
      const [, dd, mm, yyyy] = m;
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    }

    const parsed = new Date(s);
    if (!isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const mon = String(parsed.getMonth() + 1).padStart(2, "0");
      const day = String(parsed.getDate()).padStart(2, "0");
      return `${y}-${mon}-${day}`;
    }

    return s;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = recaptchaRef.current?.getValue();

    if (!validateForm()) {
    //   toast.error("Please fix the errors in the form", {
    //     toastId: "form-validation-errors",
    //   });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      return;
    }
    setIsSubmitting(true);
    try {
      const formattedStart = toIsoDate(formData.start_date);
      const formattedReturn = toIsoDate(formData.return_date);

      const payload: any = {
        ...formData,
        start_date: formattedStart,
        return_date: formattedReturn,
        adult_count: formData.adult !== "" ? Number(formData.adult) : "",
        child_count: formData.child !== "" ? Number(formData.child) : "",
        current_url: currentUrl || "",
        ip: combinedData || "",
        type: "Bus",
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/enquiries/car`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
        }
      );
      if (response.data.success) {
        // toast.success(response.data.message || 'Enquiry submitted successfully!', { toastId: 'form-success' });
        setHasValidSubmission(true);
        route.push("/thank-you");
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "in",
          from_city: "",
          vehicle_type: "",
          start_location: "",
          start_date: "",
          return_date: "",
          end_location: "",
          adult: "",
          child: "",
        });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        // toast.error(response.data.message || "Submission failed. Try again.", {
        //   toastId: "form-submission-failed",
        // });
      }
    } catch (err: any) {
    //   toast.error(err.response?.data?.message || "Error submitting enquiry", {
    //     toastId: "form-api-error",
    //   });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="tourCard mb-lg-0 shadow-sm p-lg-4 mt-lg-0">
        <h2 className="mb-1 fw-bold fs-3">Rent a Bus Easily</h2>
        <p>
          Affordable, Reliable, and Convenient Bus Rentals for Every Journey
        </p>
        <form onSubmit={handleSubmit} className="mt-4" noValidate>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <PhoneInput
              country={formData.countryCode}
              value={formData.phone}
              onChange={(value, countryData: any) => {
                setFormData((prev) => ({
                  ...prev,
                  phone: value,
                  countryCode: countryData.countryCode,
                }));
              }}
              inputClass={`form-control ${errors.phone ? "is-invalid" : ""}`}
              inputStyle={{ width: "100%" }}
              enableSearch={true}
              placeholder="Phone Number *"
            />
            {errors.phone && (
              <div className="invalid-feedback d-block">{errors.phone}</div>
            )}
          </div>

          <div className="row">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="from_city"
                className={`form-control ${
                  errors.from_city ? "is-invalid" : ""
                }`}
                placeholder="From City *"
                value={formData.from_city}
                onChange={handleChange}
              />
              {errors.from_city && (
                <div className="invalid-feedback">{errors.from_city}</div>
              )}
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="vehicle_type"
                className={`form-control ${
                  errors.vehicle_type ? "is-invalid" : ""
                }`}
                placeholder="Vehicle (Optional)"
                value={formData.vehicle_type}
                onChange={handleChange}
              />
              {errors.vehicle_type && (
                <div className="invalid-feedback">{errors.vehicle_type}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="start_location"
                className={`form-control ${
                  errors.start_location ? "is-invalid" : ""
                }`}
                placeholder="Travel Start Location *"
                value={formData.start_location}
                onChange={handleChange}
              />
              {errors.start_location && (
                <div className="invalid-feedback">{errors.start_location}</div>
              )}
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="end_location"
                className={`form-control ${
                  errors.end_location ? "is-invalid" : ""
                }`}
                placeholder="Travel End Location *"
                value={formData.end_location}
                onChange={handleChange}
              />
              {errors.end_location && (
                <div className="invalid-feedback">{errors.end_location}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-3 position-relative">
              <input
                ref={startDateRef}
                type="text"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={`form-control date-input ${
                  errors.start_date ? "is-invalid" : ""
                }`}
                placeholder="Travel Start Date *"
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
              {errors.start_date && (
                <div className="invalid-feedback">{errors.start_date}</div>
              )}
            </div>
            <div className="col-lg-6 mb-3 position-relative">
              <input
                ref={returnDateRef}
                type="text"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
                className={`form-control date-input ${
                  errors.return_date ? "is-invalid" : ""
                }`}
                placeholder="Return Date *"
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
              {errors.return_date && (
                <div className="invalid-feedback">{errors.return_date}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="adult"
                inputMode="numeric"
                className={`form-control ${errors.adult ? "is-invalid" : ""}`}
                placeholder="Adult (10+ yrs) *"
                value={formData.adult}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFormData((prev) => ({ ...prev, adult: value }));
                    if (errors.adult)
                      setErrors((prev: any) => ({ ...prev, adult: undefined }));
                  }
                }}
                onBlur={(e) => {
                  const num = Number(e.target.value);
                  if (num > 50) {
                    setErrors((prev: any) => ({
                      ...prev,
                      adult: "Adults cannot exceed 50",
                    }));
                  } else if (num < 1) {
                    setErrors((prev: any) => ({
                      ...prev,
                      adult: "Adults must be at least 1",
                    }));
                  }
                }}
              />
              {errors.adult && (
                <div className="invalid-feedback">{errors.adult}</div>
              )}
            </div>

            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="child"
                inputMode="numeric"
                className={`form-control ${errors.child ? "is-invalid" : ""}`}
                placeholder="Child (6–10 yrs) "
                value={formData.child}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFormData((prev) => ({ ...prev, child: value }));
                    if (errors.child)
                      setErrors((prev: any) => ({ ...prev, child: undefined }));
                  }
                }}
                onPaste={(e) => {
                  const pastedData = e.clipboardData.getData("text");
                  if (!/^\d*$/.test(pastedData)) {
                    e.preventDefault();
                  }
                }}
                onBlur={(e) => {
                  const num = Number(e.target.value);
                  if (num > 50) {
                    setErrors((prev: any) => ({
                      ...prev,
                      child: "Children cannot exceed 50",
                    }));
                  } else if (num < 0) {
                    setErrors((prev: any) => ({
                      ...prev,
                      child: "Children cannot be negative",
                    }));
                  }
                }}
              />
              {errors.child && (
                <div className="invalid-feedback">{errors.child}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => setRecaptchaToken(token || null)}
            />{" "}
            {errors.recaptcha && (
              <div className="invalid-feedback d-block">{errors.recaptcha}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn blue-btn w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
            <span>
              <Image
                width={23}
                height={23}
                src="/images/button-arrow.png"
                alt="icon"
              />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
export default BusEnquiryForm;
