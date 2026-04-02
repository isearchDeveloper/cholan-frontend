"use client";

import { useState, useRef } from "react";
import styles from "./Contact.module.css";
import Image from "next/image";
import { submitGoEnquiry } from "@/app/services/goservice";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
    captcha: "",
  });

  /* ================= HANDLE INPUT ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ================= CAPTCHA ================= */
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (errors.captcha) {
      setErrors({ ...errors, captcha: "" });
    }
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      msg: "",
      captcha: "",
    };

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";

    if (!form.msg.trim()) newErrors.msg = "Message is required";

    if (!captchaToken)
      newErrors.captcha = "Please verify captcha";

    setErrors(newErrors);

    return Object.values(newErrors).some((err) => err !== "");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const hasError = validate();
    if (hasError) {
      resetCaptcha(); // 🔥 reset if error
      return;
    }

    setLoading(true);
    setSuccessMsg("");

    const res = await submitGoEnquiry({
      ...form,
      recaptcha_token: captchaToken, // 🔥 send to backend
    });

    if (res?.success) {
      setSuccessMsg(res.message || "Enquiry submitted successfully");

      setForm({ name: "", email: "", phone: "", msg: "" });
      setErrors({ name: "", email: "", phone: "", msg: "", captcha: "" });

      resetCaptcha(); // 🔥 reset after success

      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    } else {
      resetCaptcha(); // 🔥 reset on fail
    }

    setLoading(false);
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>

        {/* ================= LEFT FORM ================= */}
        <div className={styles.formBox}>
          <h3>
            <span>Register</span> Now
          </h3>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name*"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email*"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone*"
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}

          <textarea
            name="msg"
            value={form.msg}
            onChange={handleChange}
            placeholder="Your message*"
            rows={5}
          />
          {errors.msg && <p className={styles.error}>{errors.msg}</p>}

          {/* 🔐 CAPTCHA */}
          <div style={{ margin: "10px" }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleCaptchaChange}
            />
            {errors.captcha && (
              <p className={styles.error}>{errors.captcha}</p>
            )}
          </div>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Show my Experience"}
          </button>

          {successMsg && (
            <p className={styles.success}>{successMsg}</p>
          )}

          <p className={styles.secure}>
            <span className={styles.lock}>🔒</span>
            Your data is secure with us
          </p>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className={styles.right}>
          <span className={styles.tag}>Contacts</span>

          <h3>
            From Easy App Access To A Step-By-Step Guide Video, Everything You
            Need To <span>Get Started Is Right Here.</span>
          </h3>

          <div className={styles.media}>
            <div className={styles.qrBlock}>
              <div className={styles.qrBox}>
                <a href="https://cholantours.com" target="_blank">
                  <Image
                    src="/go-exploring/qr-go-exploring.png"
                    alt="QR"
                    width={120}
                    height={120}
                  />
                </a>
              </div>

              <div className={styles.storeGroup}>
                <a href="https://play.google.com/store/apps/details?id=com.goexploring" target="_blank">
                  <img src="/go-exploring/play-store.jpg" alt="Google Play" />
                </a>

                <a href="https://apps.apple.com/in/app/go-exploring/id6758142143" target="_blank">
                  <img src="/go-exploring/app-store.jpg" alt="App Store" />
                </a>
              </div>
            </div>

            <div className={styles.video}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/BpYLxh4VyfE"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}