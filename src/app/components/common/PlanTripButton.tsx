"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XPublicToken } from "@/app/urls/apiUrls";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { isValidPhoneNumber } from "libphonenumber-js";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "@/app/context/FormContext";

export default function PlanTripButton({
  openModal,
  setOpenModal,
  setIsOpen,
  hideButton,
}: any = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const isSubmittingRef = useRef(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    country: "",
    city: "",
    per_person_budget: "",
    no_of_travellers: "",
    month: "",
    arrival_city: "",
    departure_city: "",
    message: "",
  });

  const countryOptions = [
    { value: "", label: "Select Country" },
    ...[
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea, North",
      "Korea, South",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar (Burma)",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "North Macedonia",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent",
      "Samoa",
      "San Marino",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ].map((c) => ({ value: c, label: c })),
  ];

  useEffect(() => {
    if (openModal === true) {
      setIsModalOpen(true);
    }
  }, [openModal]);

  useEffect(() => {
    const closeToasts = () => {
      // toast.dismiss({ containerId: "planTripContainer" });
    };

    if (isModalOpen) {
      const timer = setTimeout(() => {
        closeToasts();
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        closeToasts();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [ipAddress, setIpAddress] = useState<string>("");
  const [browserName, setBrowserName] = useState<string>("Unknown");
  const [deviceType, setDeviceType] = useState<string>("Unknown");
  const [combinedData, setCombinedData] = useState<string>("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  let route = useRouter();
  const { setHasValidSubmission } = useForm();
  const pathname = usePathname();

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

    // phone validation old code
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

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City or State is required";
    }
    if (!formData.no_of_travellers?.trim()) {
      newErrors.no_of_travellers = "Number of travellers is required";
    } else {
      const num = Number(formData.no_of_travellers);
      if (isNaN(num) || num <= 0) {
        newErrors.no_of_travellers = "Enter a valid number of travellers";
      } else if (num < 1) {
        newErrors.no_of_travellers = "Number of travellers must be at least 1";
      } else if (num > 50) {
        newErrors.no_of_travellers = "Number of travellers cannot exceed 50";
      }
    }
    if (formData.per_person_budget.trim()) {
      const numericValue = formData.per_person_budget.replace(/,/g, "");
      if (!/^\d+$/.test(numericValue)) {
        newErrors.per_person_budget =
          "Enter a valid budget (whole numbers only)";
      } else {
        const num = parseInt(numericValue, 10);
        if (num <= 0) {
          newErrors.per_person_budget = "Budget must be greater than 0";
        } else if (num > 1000000) {
          newErrors.per_person_budget =
            "Budget cannot exceed ₹10,00,000 per person";
        }
      }
    }
    // if (!formData.month.trim()) {
    //   newErrors.month = "Travel month is required";
    // } else if (
    //   !/^(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)$/i.test(
    //     formData.month.trim()
    //   )
    // ) {
    //   newErrors.month = "Enter a valid month name (e.g. October or Oct)";
    // }
    if (!formData.month.trim()) {
      newErrors.month = "Travel month is required";
    } else {
      const value = formData.month.trim();

      // Allowed month formats
      const monthPattern =
        "january|february|march|april|may|june|july|august|september|october|november|december|" +
        "jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec";

      // Month + optional separator + optional 2/4 digit year
      const regex = new RegExp(
        `^(${monthPattern})([\\s,-\\/]*)(\\d{2}|\\d{4})?$`,
        "i",
      );

      // STEP 1: Basic validation
      if (!regex.test(value)) {
        newErrors.month =
          "Enter a valid month (e.g. Feb 2025, October, Feb-25)";
      } else {
        const monthNames = [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ];

        // STEP 2: Extract month safely
        const monthMatch = value.match(new RegExp(monthPattern, "i"));

        if (!monthMatch) {
          newErrors.month = "Enter a valid month name";
        } else {
          const monthText = monthMatch[0].slice(0, 3).toLowerCase();
          const userMonthIndex = monthNames.indexOf(monthText);

          // STEP 3: Extract year (optional)
          const yearMatch = value.match(/(\d{2}|\d{4})$/);
          let userYear = null;

          if (yearMatch) {
            userYear = yearMatch[1];

            // Convert 2-digit year → 4-digit
            if (userYear.length === 2) {
              userYear = "20" + userYear;
            }
            userYear = parseInt(userYear, 10);
          }

          // STEP 4: Current date
          const now = new Date();
          const currentMonthIndex = now.getMonth(); // 0 = Jan
          const currentYear = now.getFullYear();

          // STEP 5: Block past years
          if (userYear && userYear < currentYear) {
            newErrors.month = "Please enter a current or future year";
          }

          // STEP 6: Block past months in same year
          if (userYear === currentYear && userMonthIndex < currentMonthIndex) {
            newErrors.month = "Please enter a current or future month";
          }
        }
      }
    }

    const cityRegex = /^[A-Za-z\s.-]+$/;
    if (!formData.arrival_city.trim()) {
      newErrors.arrival_city = "Arrival city is required";
    } else if (!cityRegex.test(formData.arrival_city.trim())) {
      newErrors.arrival_city =
        "Arrival city can only contain letters, spaces, dots, or hyphens";
    }
    if (!formData.departure_city.trim()) {
      newErrors.departure_city = "Departure city is required";
    } else if (!cityRegex.test(formData.departure_city.trim())) {
      newErrors.departure_city =
        "Departure city can only contain letters, spaces, dots, or hyphens";
    }
    // if (
    //   formData.arrival_city.trim() &&
    //   formData.departure_city.trim() &&
    //   formData.arrival_city.trim().toLowerCase() ===
    //   formData.departure_city.trim().toLowerCase()
    // ) {
    //   newErrors.departure_city = "Departure city cannot be the same as arrival city";
    // }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    } else if (/<[^>]+>/.test(formData.message)) {
      newErrors.message = "HTML tags are not allowed in the message";
    } else {
      const cleanText = formData.message.replace(/\s+/g, " ").trim();
      const wordCount = cleanText.split(" ").length;
      if (wordCount > 1000) {
        newErrors.message = `Message cannot exceed 400 words (currently ${wordCount})`;
      }
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value)) && value !== "") {
      value = Number(value).toLocaleString("en-IN");
    }
    setFormData((prev) => ({ ...prev, per_person_budget: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;

    if (!validateForm()) {
      // toast.error("Please fix the errors in the form", {
      //   toastId: "form-errors",
      //   autoClose: 4000,
      //   containerId: "planTripContainer",
      // });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        message: formData.message.trim(),
        country: formData.country.trim(),
        city: formData.city.trim(),
        per_person_budget: formData.per_person_budget.trim(),
        no_of_travellers: formData.no_of_travellers.trim(),
        month: formData.month.trim(),
        arrival_city: formData.arrival_city.trim(),
        departure_city: formData.departure_city.trim(),
        current_url: currentUrl || "",
        ip: combinedData || "",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/enquiries/plan_trip`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
        },
      );

      if (response.status === 200 && response.data.success) {
        // toast.success(
        //   response.data.message || "Enquiry submitted successfully!",
        //   {
        //     autoClose: 4000,
        //     containerId: "planTripContainer"
        //   }
        // );
        setHasValidSubmission(true);
        resetForm();
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        setIsSubmitting(false);
        isSubmittingRef.current = false;

        // Set redirect state and close modal
        setShouldRedirect(true);
        handleCloseModal();

        route.push("/thank-you");
        resetForm();
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        setIsSubmitting(false);
        isSubmittingRef.current = false;

        setTimeout(() => {
          handleCloseModal();
          // toast.dismiss({ containerId: "planTripContainer" });
        }, 4200);
      } else {
        // toast.error(
        //   response.data.message ||
        //     "Failed to submit enquiry. Please try again.",
        //   {
        //     toastId: "form-errors",
        //     autoClose: 4000,
        //     containerId: "planTripContainer",
        //   }
        // );
        setIsSubmitting(false);
        isSubmittingRef.current = false;
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      // toast.error(
      //   error.response?.data?.message || "An error occurred. Please try again.",
      //   {
      //     toastId: "form-errors",
      //     autoClose: 4000,
      //     containerId: "planTripContainer",
      //   }
      // );
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  // Handle redirect after modal closes
  useEffect(() => {
    if (shouldRedirect && !isModalOpen) {
      const timer = setTimeout(() => {
        setHasValidSubmission(true);
        route.push("/thank-you");
        setShouldRedirect(false);
      }, 100); // Small delay to ensure smooth transition

      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, isModalOpen, route]);

  // Reset redirect state when path changes
  useEffect(() => {
    setShouldRedirect(false);
  }, [pathname]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      countryCode: "in",
      country: "",
      city: "",
      per_person_budget: "",
      no_of_travellers: "",
      month: "",
      arrival_city: "",
      departure_city: "",
      message: "",
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    resetForm();
    setIsModalOpen(false);
    setOpenModal?.(false);
    setIsOpen?.(true);
    // toast.dismiss({ containerId: "planTripContainer" });
  };

  if (pathname === "/thank-you") {
    return null;
  }

  return (
    <>
      <ToastContainer
        containerId="planTripContainer"
        position="top-right"
        autoClose={5000}
      />
      {!hideButton && (
        <button className="floating-button" onClick={() => setIsModalOpen(true)}>
          Plan Your Trip
        </button>
      )}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4">
              <button
                type="button"
                className="btn-close btn-close-dark"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-lg-5 d-none d-md-flex flex-column justify-content-center">
                    <div className="rounded-3 p-4 text-center h-100 modal-left-bg custom-hover">
                      <div className="banner-overlay"></div>
                      {/* <div className="banner-content-left">
                        <h4 className="fw-bold text-white">Ready to Explore?</h4>
                        <p className="text-white">Let us craft your perfect journey.</p>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="mb-4">
                      <h3 className="fw-bold mb-1">Plan Your Dream Trip</h3>
                      {/* <p className="text-muted">
                        Fill out your preferences and we'll take care of the
                        rest.
                      </p> */}
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="mt-4 mb-space"
                      noValidate
                    >
                      <div className="row g-3">
                        <div className="col-6">
                          <input
                            type="text"
                            name="name"
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                            placeholder="Full Name*"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email Address*"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name="country"
                            className={`form-control ${
                              errors.country ? "is-invalid" : ""
                            }`}
                            placeholder="Enter Country *"
                            value={formData.country}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />

                          {errors.country && (
                            <div className="invalid-feedback">
                              {errors.country}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          {/* <PhoneInput
                            country={formData.countryCode}
                            value={formData.phone}
                            onChange={(value, countryData: any) => {
                              setFormData((prev) => ({
                                ...prev,
                                phone: value,
                                countryCode: countryData.countryCode,
                              }));
                              if (errors.phone) {
                                setErrors((prev: any) => ({
                                  ...prev,
                                  phone: undefined,
                                }));
                              }
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
                                countryCode: countryData.countryCode,
                              }));
                            }}
                            enableSearch
                            autoFormat={false}
                            enableLongNumbers
                            inputClass={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            inputStyle={{ width: "100%" }}
                            inputProps={{
                              maxLength: 20, // 🔥 HARD BLOCK at DOM level
                            }}
                          />

                          {errors.phone && (
                            <div className="invalid-feedback d-block">
                              {errors.phone}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name="city"
                            className={`form-control ${
                              errors.city ? "is-invalid" : ""
                            }`}
                            placeholder="City or State*"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          {errors.city && (
                            <div className="invalid-feedback">
                              {errors.city}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name="per_person_budget"
                            className={`form-control ${
                              errors.per_person_budget ? "is-invalid" : ""
                            }`}
                            placeholder="Budget per Person (e.g. 12,000)"
                            value={formData.per_person_budget}
                            onChange={handleBudgetChange}
                            disabled={isSubmitting}
                          />
                          {errors.per_person_budget && (
                            <div className="invalid-feedback">
                              {errors.per_person_budget}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name="no_of_travellers"
                            placeholder="No. of Travellers*"
                            className={`form-control ${
                              errors.no_of_travellers ? "is-invalid" : ""
                            }`}
                            value={formData.no_of_travellers}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            inputMode="numeric"
                            disabled={isSubmitting}
                          />
                          {errors.no_of_travellers && (
                            <div className="invalid-feedback">
                              {errors.no_of_travellers}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          {/* <input
                            type="text"
                            name="month"
                            placeholder="Travel Month*"
                            className={`form-control ${
                              errors.month ? "is-invalid" : ""
                            }`}
                            value={formData.month}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          /> */}
                          <input
                            type="text"
                            name="month"
                            className={`form-control ${errors.month ? "is-invalid" : ""}`}
                            placeholder="Preferred Travel Month & Year * Example: Feb 2025, February 25"
                            value={formData.month}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />

                          {errors.month && (
                            <div className="invalid-feedback">
                              {errors.month}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name="arrival_city"
                            placeholder="Arrival City*"
                            className={`form-control ${
                              errors.arrival_city ? "is-invalid" : ""
                            }`}
                            value={formData.arrival_city}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          {errors.arrival_city && (
                            <div className="invalid-feedback">
                              {errors.arrival_city}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            name="departure_city"
                            placeholder="Departure City*"
                            className={`form-control ${
                              errors.departure_city ? "is-invalid" : ""
                            }`}
                            value={formData.departure_city}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          {errors.departure_city && (
                            <div className="invalid-feedback">
                              {errors.departure_city}
                            </div>
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
                            placeholder="Describe your travel requirement*"
                            rows={3}
                            disabled={isSubmitting}
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
                            onChange={(token) =>
                              setRecaptchaToken(token || null)
                            }
                          />
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
                          {isSubmitting ? "Submitting..." : "Submit"}
                          <span>
                            <Image
                              width={23}
                              height={23}
                              sizes="100vw"
                              src="/images/button-arrow.png"
                              alt=""
                            />
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
