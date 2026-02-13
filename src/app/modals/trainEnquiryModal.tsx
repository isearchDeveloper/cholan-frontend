"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "flatpickr/dist/themes/material_orange.css";
import "react-toastify/dist/ReactToastify.css";
import { XPublicToken } from "@/app/urls/apiUrls";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { isValidPhoneNumber } from "libphonenumber-js";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useForm } from "../context/FormContext";

export default function TrainEnquiryModal({
  openModal,
  setopenModal,
  trainName,
  slug,
}: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryIso: "in",
    dialCode: "91",
    message: "",
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (!openModal) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryIso: "in",
        dialCode: "91",
        message: "",
      });
      setErrors({});
      setIsSubmitting(false);
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  }, [openModal]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
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
        formData.email,
      ) ||
      /\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // olde phone code
    // if (!formData.phone || !formData.phone.trim())
    //   newErrors.phone = "Phone number is required";
    // else if (!isValidPhoneNumber("+" + formData.phone))
    //   newErrors.phone =
    //     "Please enter a valid phone number for the selected country";

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain digits only";
    } else if (formData.phone.length > 20) {
      newErrors.phone = "Phone number cannot exceed 20 digits";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters long";
    else if (/<[^>]+>/.test(formData.message))
      newErrors.message = "HTML tags are not allowed in the message";
    else {
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

  const handleSubmit = async (e: any) => {
    if (isSubmitting) return;
    if (!validateForm()) {
      const errorMsg = "Please fix the errors in the form";
      // toast.error(errorMsg, { toastId: errorMsg });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      return;
    }
    setIsSubmitting(true);
    setLoading(true);
    const apiBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      train_name: trainName,
      message: formData.message,
      train_slug: slug,
      current_url: currentUrl || "",
      ip: combinedData || "",
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/enquiries/train`,
        apiBody,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
        },
      );
      // if (res.data.success) {
      //   const successMsg = res?.data?.message || "Enquiry submitted successfully!";
      //   toast.success(successMsg, {
      //     autoClose: 5000,
      //     toastId: successMsg,
      //     onClose: () => {
      //       setopenModal(false);
      //       setIsSubmitting(false);
      //     },
      //   });
      //     setFormData({
      //   name: "",
      //   email: "",
      //   phone: "",
      //   countryIso: "in",
      //   dialCode: "91",
      //   message: "",
      // });
      //   setRecaptchaToken(null);
      //   recaptchaRef.current?.reset();
      // }
      if (res.data.success) {
        const successMsg =
          res?.data?.message || "Enquiry submitted successfully!";
        setHasValidSubmission(true);
        route.push("/thank-you");

        // toast.success(successMsg, {
        //   autoClose: 5000,
        //   toastId: successMsg,

        //   // ✅ When toast appears on screen → reset form and recaptcha
        //   onOpen: () => {
        //     setFormData({
        //       name: "",
        //       email: "",
        //       phone: "",
        //       countryIso: "in",
        //       dialCode: "91",
        //       message: "",
        //     });
        //     setRecaptchaToken(null);
        //     recaptchaRef.current?.reset();
        //   },

        //   // ✅ When toast closes → close modal & reset submission flag
        //   onClose: () => {
        //     setopenModal(false);
        //     setIsSubmitting(false);
        //   },
        // });
      } else {
        const errorMsg =
          res.data.message || "Submission failed. Please try again.";
        // toast.error(errorMsg, { toastId: errorMsg });
        setIsSubmitting(false);
      }
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong.";
      // toast.error(errorMsg, { toastId: errorMsg });
      setIsSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  if (!openModal) return null;

  return (
    <>
      <ToastContainer />
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setopenModal(false)}
              aria-label="Close"
            ></button>
            <div className="modal-body p-4">
              <div className="row">
                <div className="col-lg-5 d-none d-md-flex flex-column justify-content-center">
                  <div className="rounded-3 p-4 text-center h-100 modal-left-bg custom-hover">
                    <div className="banner-overlay"></div>
                    {/* <div className="banner-content-left">
                      <h4 className="fw-bold text-white">Ready to Explore?</h4>
                      <p className="text-white">
                        Let us craft your perfect journey.
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="mb-4">
                    <h3 className="fw-bold mb-1">Let’s Begin Your Journey</h3>
                    <p className="text-muted">
                      Experience the Journey of a Lifetime Aboard a Luxury Train
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        placeholder="Name *"
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="col-lg-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Email *"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="col-lg-6 mb-3">
                      {/* <PhoneInput
                        country={formData.countryIso}
                        value={formData.phone}
                        onChange={(value, countryData: any) => {
                          setFormData((prev) => ({
                            ...prev,
                            phone: value,
                            countryIso: countryData.country,
                            dialCode: countryData.dialCode,
                          }));
                          setErrors((prev: any) => ({ ...prev, phone: "" }));
                        }}
                        inputClass={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        inputStyle={{ width: "100%" }}
                        enableSearch={true}
                        placeholder="Phone Number *"
                      /> */}

                      <PhoneInput
                        country={formData.countryIso}
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
                    <div className="col-lg-6 mb-3">
                      <input
                        type="text"
                        value={trainName}
                        disabled
                        className="form-control"
                        placeholder="Train Name"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-control ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      placeholder="Additional Info *"
                      rows={4}
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
                      <div className="invalid-feedback d-block">
                        {errors.recaptcha}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn blue-btn w-100"
                      onClick={handleSubmit}
                      disabled={loading || isSubmitting}
                    >
                      {loading ? "Submitting..." : "Submit Inquiry"}
                      <span>
                        <Image
                          width={23}
                          height={23}
                          sizes="100vw"
                          src="/images/button-arrow.png"
                          alt="arrow icon"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
