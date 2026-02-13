"use client";
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XPublicToken } from "@/app/urls/apiUrls";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { isValidPhoneNumber } from "libphonenumber-js";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchcontactmetaData } from "@/app/services/contactservice";
import LocationCard from "./LocationCard";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/context/FormContext";

export default function ContactSection({ pageData }: { pageData?: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    message: "",
    city: "",
    travel_type: "",
    month: "",
    country: "",
  });
  const staticBreadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", isCurrent: true },
  ];
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
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
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [ipAddress, setIpAddress] = useState<string>("");
  const [browserName, setBrowserName] = useState<string>("Unknown");
  const [deviceType, setDeviceType] = useState<string>("Unknown");
  const [combinedData, setCombinedData] = useState<string>("");
  let route = useRouter();
  const { setHasValidSubmission } = useForm();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

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

  function detectDevice(ua: string): string {
    if (/Mobi|Android|iPhone|iPod|IEMobile|BlackBerry|Opera Mini/i.test(ua))
      return "Mobile";
    if (/Tablet|iPad/i.test(ua)) return "Tablet";
    return "Desktop";
  }

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safety
    setCurrentUrl(window.location.href);
    // get IP
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const ip = data?.ip || "";
        setIpAddress(ip);

        // detect browser & device
        const ua = window.navigator.userAgent || "";
        const bName = detectBrowser(ua);
        const dType = detectDevice(ua);

        setBrowserName(bName);
        setDeviceType(dType);

        // combined string (you can change the format)
        setCombinedData(`${ip}-${dType.toLowerCase()}-${bName}`);
      })
      .catch((err) => {
        // don't block the form if IP fetch fails
        console.warn("IP fetch failed:", err);
        const ua =
          typeof window !== "undefined" ? window.navigator.userAgent : "";
        setBrowserName(detectBrowser(ua));
        setDeviceType(detectDevice(ua));
        setCombinedData(`-unknown-${detectBrowser(ua)}`);
      });
  }, []);

  const validate = (): boolean => {
    const newErrors: any = {};
    let isValid = true;
    // 🔹 Name validation
    const nameValue = formData.name.trim();
    if (!nameValue) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (nameValue.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      newErrors.name = "Name can only contain letters and spaces";
      isValid = false;
    }
    // 🔹 Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email,
      ) ||
      /\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    // 🔹 Phone validation
    // if (!formData.phone || !formData.phone.trim()) {
    //   newErrors.phone = "Phone number is required";
    //   isValid = false;
    // } else if (!isValidPhoneNumber("+" + formData.phone)) {
    //   newErrors.phone =
    //     "Please enter a valid phone number for the selected country";
    //   isValid = false;
    // }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain digits only";
      isValid = false;
    } else if (formData.phone.length > 20) {
      newErrors.phone = "Phone number cannot exceed 20 digits";
      isValid = false;
    }

    // 🔹 City / State validation
    const cityRegex = /^[A-Za-z\s.\-]+$/;
    if (!formData.city.trim()) {
      newErrors.city = "State or City is required";
      isValid = false;
    } else if (!cityRegex.test(formData.city.trim())) {
      newErrors.city = "Please enter a valid city/state name (letters only)";
      isValid = false;
    }
    const validTextRegex = /^[A-Za-z\s-]+$/;
    // 🔹 Country validation
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    } else if (!validTextRegex.test(formData.country.trim())) {
      newErrors.country = "Country must contain only letters and spaces";
      isValid = false;
    }
    if (formData.travel_type.trim()) {
      if (!validTextRegex.test(formData.travel_type.trim())) {
        newErrors.travel_type =
          "Travel type must contain only letters and spaces";
        isValid = false;
      }
    }

    // if (formData.month.trim()) {
    //   if (
    //     !/^(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)$/i.test(
    //       formData.month.trim()
    //     )
    //   ) {
    //     newErrors.month = "Enter a valid month name (e.g. October or Oct)";
    //     isValid = false;
    //   }
    // }
    if (!formData.month.trim()) {
      newErrors.month = "Travel month is required";
      isValid = false;
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
        isValid = false;
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
          isValid = false;
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
            isValid = false;
          }

          // STEP 6: Block past months in same year
          if (userYear === currentYear && userMonthIndex < currentMonthIndex) {
            newErrors.month = "Please enter a current or future month";
            isValid = false;
          }
        }
      }
    }

    // 🔹 Message validation
    if (formData.message.trim()) {
      if (formData.message.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters long";
        isValid = false;
      } else if (/<[^>]+>/.test(formData.message)) {
        newErrors.message = "HTML tags are not allowed in the message";
        isValid = false;
      } else {
        // 🔹 Normalize multiple spaces/newlines before counting
        const cleanText = formData.message.replace(/\s+/g, " ").trim();
        const wordCount = cleanText.split(" ").length;
        if (wordCount > 400) {
          newErrors.message = `Message cannot exceed 400 words (currently ${wordCount})`;
          isValid = false;
        }
      }
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // toast.error("Please fix the errors in the form", {
      //   toastId: "form-validation-error",
      // });
      setRecaptchaToken(null); // Reset on error
      recaptchaRef.current?.reset();
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        city: formData.city,
        travel_type: formData.travel_type,
        month: formData.month,
        country: formData.country,
        is_get_in_touch: 0,
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
        },
      );
      // toast.success(response.data.message || "Enquiry submitted successfully!", { toastId: "form-success" });
      setHasValidSubmission(true);
      route.push("/thank-you");
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "in",
        message: "",
        city: "",
        travel_type: "",
        month: "",
        country: "",
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset(); // New: Reset reCAPTCHA on success
    } catch (error) {
      console.error(error);
      // toast.error("Failed to send message. Please try again later.", {
      //   toastId: "form-submit-error",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-vh-100 bg-light">
      <ToastContainer />

      <section
        className="banner py-5 bg-dark-contact text-white"
        style={{
          backgroundImage: `url(${
            pageData?.banner_image || "/images/banner.webp"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
        aria-label={
          pageData.banner_image_alt || pageData.title || "Banner image"
        }
      >
        <img
          src={pageData.banner_image || "/images/banner.jpg"}
          alt={pageData.banner_image_alt || "CSR Banner"}
          className="d-none"
        />
        <div className="container py-5 text-center">
          {/* <h1 className="display-4 fw-bold mb-2 text-white">
            {pageData?.title || "Contact Us"}
          </h1> */}
          {/* <p className="lead text-white">
      Cholan Tours is committed to protecting your personal information.
    </p> */}
        </div>
      </section>

      {pageData?.short_description?.trim() && (
        <section className="pt-4">
          <div className="container">
            <Breadcrumb items={staticBreadcrumbItems} />
            <div
              dangerouslySetInnerHTML={{
                __html: pageData.short_description,
              }}
            />
          </div>
        </section>
      )}

      <section className="bg-light">
        <div className="container py-5">
          <div className="row gap-4 gap-md-0 gap-lg-0  align-items-center">
            <div className="col-md-6 col-lg-6">
              <div className="tourCard shadow-none p-4">
                <h2 className="fw-bold mb-1">Contact Us</h2>
                {/* <p>Have a question or need a custom quote?</p> */}
                <form onSubmit={handleSubmit} noValidate className="mt-3">
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      {/* Name */}
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Your Name *"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      {/* Email */}
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter email *"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      {/* Phone */}
                      <div>
                        {/* <PhoneInput
                          country={formData.countryCode}
                          value={formData.phone}
                          onChange={(value, countryData: any) => {
                            setFormData((prev) => ({
                              ...prev,
                              phone: value,
                              countryCode: countryData.countryCode, // store selected country (e.g. 'in', 'us')
                            }));
                          }}
                          placeholder="Phone Number *"
                          inputClass={`form-control ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          inputStyle={{ width: "100%" }}
                          enableSearch={true}
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      {/* City */}
                      <div>
                        <input
                          type="text"
                          name="city"
                          placeholder="State or City *"
                          className={`form-control ${
                            errors.city ? "is-invalid" : ""
                          }`}
                          value={formData.city}
                          onChange={handleChange}
                        />
                        {errors.city && (
                          <div className="invalid-feedback">{errors.city}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      {/* Travel Type */}
                      <div>
                        <input
                          type="text"
                          name="travel_type"
                          placeholder="Type of travel "
                          className={`form-control ${
                            errors.travel_type ? "is-invalid" : ""
                          }`}
                          value={formData.travel_type}
                          onChange={handleChange}
                        />
                        {errors.travel_type && (
                          <div className="invalid-feedback">
                            {errors.travel_type}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      {/* Month */}
                      <div>
                        {/* <input
                          type="text"
                          name="month"
                          placeholder="Planning to travel in the month of "
                          className={`form-control ${
                            errors.month ? "is-invalid" : ""
                          }`}
                          value={formData.month}
                          onChange={handleChange}
                        /> */}
                        <input
                          type="text"
                          name="month"
                          className={`form-control ${errors.month ? "is-invalid" : ""}`}
                          placeholder="Preferred Travel Month & Year * Example: Feb 2025, February 25"
                          value={formData.month}
                          onChange={handleChange}
                        />
                        {errors.month && (
                          <div className="invalid-feedback">{errors.month}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      {/* Country */}
                      <div>
                        <input
                          type="text"
                          name="country"
                          className={`form-control ${errors.country ? "is-invalid" : ""}`}
                          placeholder="Enter Country *"
                          value={formData.country}
                          onChange={handleChange}
                        />
                        {errors.country && (
                          <div className="invalid-feedback">
                            {errors.country}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      {/* Message */}
                      <div>
                        <textarea
                          name="message"
                          placeholder="Your message "
                          rows={4}
                          className={`form-control ${
                            errors.message ? "is-invalid" : ""
                          }`}
                          value={formData.message}
                          onChange={handleChange}
                        />
                        {errors.message && (
                          <div className="invalid-feedback">
                            {errors.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
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
                  </div>
                  {/* <button type="submit" className="btn blue-btn w-100 py-2">
                    Submit
                    <span>
                      <Image
                        width={23}
                        height={23}
                        sizes="100vw"
                        src="/images/button-arrow.png"
                        alt=""
                        className="ms-2"
                      />
                    </span>
                  </button> */}
                  <button
                    type="submit"
                    className="btn blue-btn w-100 py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                    <span>
                      <Image
                        width={23}
                        height={23}
                        src="/images/button-arrow.png"
                        alt="icon"
                        className="ms-2"
                      />
                    </span>
                  </button>
                </form>
              </div>
            </div>
            {/* Contact Info Section */}
            {/* <div className="col-lg-6">
              <div className="mb-5 text-center text-md-start">
                <h3 className="fw-semibold text-dark mb-2">
                  We’d love to connect with you
                </h3>
                <p>
                  Please email{" "}
                  <a
                    href="mailto:enquiry@cholantours.com"
                    className="text-decoration-none text-primary"
                  >
                    enquiry@cholantours.com
                  </a>{" "}
                  for general assistance with tour planning.
                </p>
              </div>
              <div className="row g-4">
                <div className="col-lg-6 col-lg-6 text-center text-md-start">
                  <h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                      width={30}
                      height={30}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </h6>
                  <h2 className="h5 fw-medium text-dark mb-2">Email</h2>
                  <p className="small mb-0">
                    Our friendly team is here to help.
                  </p>
                  <p className="color-blue small mb-0">
                    <Link href="mailto:enquiry@cholantours.com">
                      enquiry@cholantours.com
                    </Link>
                  </p>
                </div>
                <div className="col-lg-6 col-lg-6 text-center text-md-start">
                  <h6>
                    <svg
                      width={30}
                      height={30}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </h6>
                  <h2 className="h5 fw-medium text-dark mb-2">Office</h2>
                  <p className="small mb-0">
                    Come say hello at our office HQ.
                  </p>
                  <p className="color-blue small mb-0">
                    No 4, Annai Avenue, Srirangam, Trichy, Tamil Nadu 620006,
                    India.
                  </p>
                </div>
                <div className="col-lg-6 col-lg-6 text-center text-md-start">
                  <h6>
                    <svg
                      width={30}
                      height={30}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                  </h6>
                  <h2 className="h5 fw-medium text-dark mb-2">Phone</h2>
                  <p className="small mb-0">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <p className="color-blue small mb-0">
                    <Link
                      href="tel:+914314226100"
                      className="text-decoration-none color-blue"
                    >
                      +91 431 4226100
                    </Link>
                  </p>
                </div>
             
              </div>
            </div> */}
            {pageData?.description?.trim() && (
              <div
                className="col-md-6 col-lg-6"
                dangerouslySetInnerHTML={{
                  __html: pageData.description,
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <h2 className="fs-3 mb-4 text-center">
            <span>Branches of Cholan Tours in India</span>
          </h2>

          <LocationCard />
        </div>
      </section>
    </div>
  );
}
