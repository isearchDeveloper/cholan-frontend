"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { isValidPhoneNumber } from "libphonenumber-js";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useForm } from "@/app/context/FormContext";
import { XPublicToken } from "@/app/urls/apiUrls";

const CityEnquiryForm: React.FC<any> = ({ title = "Send Enquiry" }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { setHasValidSubmission } = useForm();
  const route = useRouter();

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

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [combinedData, setCombinedData] = useState<string>("");

  // ===== Device/IP =====
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setCombinedData(data.ip);
      });
  }, []);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    // if (!isValidPhoneNumber("+" + formData.phone))
    //   newErrors.phone = "Valid phone required";

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain digits only";
    } else if (formData.phone.length > 20) {
      newErrors.phone = "Phone number cannot exceed 20 digits";
    }
    if (!formData.city.trim()) newErrors.city = "City required";
    if (!formData.country.trim()) newErrors.country = "Country required";
    if (!formData.month.trim()) newErrors.month = "Month required";
    if (!formData.message.trim()) newErrors.message = "Message required";
    if (!recaptchaToken) newErrors.recaptcha = "Complete captcha";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, "").slice(0, 20),
        city: formData.city.trim(),
        country: formData.country.trim(),
        month: formData.month.trim(),
        per_person_budget: formData.per_person_budget.replace(/,/g, ""),
        no_of_travellers: formData.no_of_travellers,
        arrival_city: formData.arrival_city.trim(),
        departure_city: formData.departure_city.trim(),
        message: formData.message.trim(),
        ip: combinedData,
        current_url: currentUrl,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/enquiries/plan_trip`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
        },
      );

      setHasValidSubmission(true);
      route.push("/thank-you");
      recaptchaRef.current?.reset();
    } catch (err) {
      console.error(err);
    //   console.log("STATUS:", err.response?.status);
    //   console.log("BACKEND:", err.response?.data);
    //   route.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tourCard shadow-sm p-4">
      <h2 className="mb-3 fw-bold fs-3">{title}</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row g-3">
          <div className="col-6">
            <input
              name="name"
              className="form-control"
              placeholder="Full Name *"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="email"
              className="form-control"
              placeholder="Email *"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            {/* <PhoneInput
              country="in"
              value={formData.phone}
              onChange={(v) => setFormData((p) => ({ ...p, phone: v }))}
              inputStyle={{ width: "100%" }}
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
          </div>

          <div className="col-6">
            <input
              name="per_person_budget"
              className="form-control"
              placeholder="Budget per Person"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="no_of_travellers"
              className="form-control"
              placeholder="No. of Travellers"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="month"
              className="form-control"
              placeholder="Travel Month"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="country"
              className="form-control"
              placeholder="Country"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="city"
              className="form-control"
              placeholder="City"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="arrival_city"
              className="form-control"
              placeholder="Arrival City"
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <input
              name="departure_city"
              className="form-control"
              placeholder="Departure City"
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <textarea
              name="message"
              className="form-control"
              placeholder="Message"
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={(t) => setRecaptchaToken(t)}
            />
          </div>

          <div className="col-12">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default CityEnquiryForm;
