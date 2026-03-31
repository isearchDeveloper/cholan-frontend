"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import Image from "next/image";
import { submitGoEnquiry } from"@/app/services/goservice"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email";
    if (!form.phone.trim()) return "Phone is required";
    if (!form.msg.trim()) return "Message is required";
    return "";
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const res = await submitGoEnquiry(form);

    if (res?.success) {
      setSuccessMsg(res.message || "Enquiry submitted successfully");
      setForm({ name: "", email: "", phone: "", msg: "" });
    } else {
      setErrorMsg(res.message || "Something went wrong");
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

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name*"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email*"
          />

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your phone*"
          />

          <textarea
            name="msg"
            value={form.msg}
            onChange={handleChange}
            placeholder="Your message*"
            rows={5}
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>

          {/* ✅ SUCCESS */}
          {successMsg && (
            <p className={styles.success}>{successMsg}</p>
          )}

          {/* ❌ ERROR */}
          {errorMsg && (
            <p className={styles.error}>{errorMsg}</p>
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