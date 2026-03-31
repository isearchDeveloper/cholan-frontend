"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import Image from "next/image";
import { submitGoEnquiry } from "@/app/services/goservice";

export default function Contact() {
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
  });

  /* ================= HANDLE INPUT ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error when typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      msg: "",
    };

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";

    if (!form.msg.trim()) newErrors.msg = "Message is required";

    setErrors(newErrors);

    return Object.values(newErrors).some((err) => err !== "");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const hasError = validate();
    if (hasError) return;

    setLoading(true);
    setSuccessMsg("");

    const res = await submitGoEnquiry(form);

    if (res?.success) {
      setSuccessMsg(res.message || "Enquiry submitted successfully");

      setForm({ name: "", email: "", phone: "", msg: "" });
      setErrors({ name: "", email: "", phone: "", msg: "" });

      // auto remove success
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    }

    setLoading(false);
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        
        {/* ================= LEFT FORM ================= */}
        <div className={styles.formBox}>
          <h3>
            <span>Send</span> Your Words
          </h3>

          {/* NAME */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name*"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email*"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          {/* PHONE */}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone*"
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}

          {/* MESSAGE */}
          <textarea
            name="msg"
            value={form.msg}
            onChange={handleChange}
            placeholder="Your message*"
            rows={5}
          />
          {errors.msg && <p className={styles.error}>{errors.msg}</p>}

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>

          {/* ✅ SUCCESS MESSAGE */}
          {successMsg && (
            <p className={styles.success}>{successMsg}</p>
          )}

          {/* 🔒 SECURITY */}
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
            <div className={styles.qr}>
              <a href="https://cholantours.com" target="_blank">
                <Image
                  src="/go-exploring/qr-go-exploring.png"
                  alt="QR"
                  width={120}
                  height={120}
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.goexploring"
                target="_blank"
              >
                <Image
                  className={styles.store}
                  src="/go-exploring/play-store.png"
                  alt="Google Play"
                  width={150}
                  height={45}
                />
              </a>

              <a
                href="https://apps.apple.com/in/app/go-exploring/id6758142143"
                target="_blank"
              >
                <Image
                  className={styles.store}
                  src="/go-exploring/app-store.png"
                  alt="App Store"
                  width={150}
                  height={45}
                />
              </a>
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