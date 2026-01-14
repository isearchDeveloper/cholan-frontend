"use client";
import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Image from "next/image";
import { XPublicToken } from "@/app/urls/apiUrls";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/context/FormContext";

export default function TrainEnquiryFormClient({ trainOverviewData, trainSlug }: any) {
  
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    message: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const lastErrorMessageRef = useRef<string>("");
  const { setHasValidSubmission } = useForm();
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const [ipAddress, setIpAddress] = useState<string>("");
  const [browserName, setBrowserName] = useState<string>("Unknown");
  const [deviceType, setDeviceType] = useState<string>("Unknown");
  const [combinedData, setCombinedData] = useState<string>("");
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

  const resetLastError = () => { lastErrorMessageRef.current = ""; };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: any = {};
    const nameValue = formData.name.trim();
    if (!nameValue) newErrors.name = "Name is required";
    else if (nameValue.length < 2)
      newErrors.name = "Name must be at least 2 characters long";
    else if (!/^[A-Za-z\s]+$/.test(nameValue))
      newErrors.name = "Name can only contain letters and spaces";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      ) ||
      /\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = "Please enter a valid email address";

    if (!formData.phone || !formData.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!isValidPhoneNumber("+" + formData.phone))
      newErrors.phone =
        "Please enter a valid phone number for the selected country";

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    } else if (/<[^>]+>/.test(formData.message)) {
      newErrors.message = "HTML tags are not allowed in the message";
    } else {
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
    e.preventDefault();
    if (!validateForm()) {
      const msg = "Please fix errors in the form";
      if (msg !== lastErrorMessageRef.current) {
        // toast.error(msg, { onClose: resetLastError });
        lastErrorMessageRef.current = msg;
      }
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const apiBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      train_name: trainOverviewData|| "",
      train_slug: trainSlug || "",
      message: formData.message,
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
        }
      );

      if (res.data.success) {
        // toast.success(res?.data?.message || "Enquiry submitted successfully!");
        setHasValidSubmission(true);
         route.push("/thank-you");
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "in",
          message: "",
        });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        const msg = res.data.message || "Submission failed. Please try again.";
        if (msg !== lastErrorMessageRef.current) {
          // toast.error(msg, { onClose: resetLastError });
          lastErrorMessageRef.current = msg;
        }
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      if (msg !== lastErrorMessageRef.current) {
        // toast.error(msg, { onClose: resetLastError });
        lastErrorMessageRef.current = msg;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Luxury Trains", href: "/luxury-trains" },
    { label: `${trainOverviewData?.data?.train?.title}`, isCurrent: true },
  ];

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-lg-6 mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Name"
              disabled={isSubmitting}
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
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="col-lg-6 mb-3">
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
              disabled={isSubmitting}
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
            value={trainOverviewData}
              disabled
              className="form-control"
              placeholder="Train Name"
            />
          </div>
          <div className="mb-3">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              placeholder="Additional Info"
              rows={4}
              disabled={isSubmitting}
            ></textarea>
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={(token) => setRecaptchaToken(token || null)}
          />{" "}
          {errors.recaptcha && (
            <div className="invalid-feedback d-block">
              {errors.recaptcha}
            </div>
          )}
          <div className="d-flex justify-content-end mt-3">
            <button
              type="submit"
              className="btn blue-btn d-flex align-items-center gap-2 w-100"
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
                  Submit Enquiry
                  <Image
                    width={23}
                    height={23}
                    src="/images/button-arrow.png"
                    alt="icon"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
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
    </>
  );
}