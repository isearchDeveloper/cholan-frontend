"use client";
import React, { useState } from "react";
import { HeartPulse, Building2, FileCheck2, Languages, ArrowRight } from "lucide-react";
import styles from "./healthTourism.module.css";

const FEATURES = [
  { icon: <HeartPulse size={22} />, label: "24×7 Support" },
  { icon: <Building2 size={22} />, label: "Hospitals" },
  { icon: <FileCheck2 size={22} />, label: "Visa Assistance" },
  { icon: <Languages size={22} />, label: "Multilingual Care" },
];

interface Props {
  imageUrl?: string;
}

const HealthTourismBanner: React.FC<Props> = ({
  imageUrl = "/images/health-tourism-banner.png",
}) => {
  const [bg, setBg] = useState(imageUrl);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section className={styles.hero}>
      {/* Background image */}
      <img
        src={bg}
        onError={() => setBg("/images/cholantours2.webp")}
        alt=""
        className={styles.heroBg}
      />
      <div className={styles.heroOverlay} />

      <div className={`container ${styles.heroContainer}`}>

        {/* ── LEFT CONTENT ── */}
        <div className={styles.heroLeft}>

          <span className={styles.badge}>Travel Safe . Travel Confident</span>

          <h1 className={styles.heading}>
            Heal in India.<br />Travel with Confidence.
          </h1>

          <p className={styles.subtext}>
            World-class medical care, luxury assistance, multilingual support,
            and complete travel management — all under one trusted partner.
          </p>

          {/* Feature cards */}
          <div className={styles.featuresRow}>
            {FEATURES.map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span className={styles.featureLabel}>{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="#health-services" className={styles.ctaBtn}>
            Talk to Travel Expert
            <ArrowRight size={18} strokeWidth={2.5} />
          </a>
        </div>

        {/* ── RIGHT FORM CARD ── */}
        <div className={styles.formCard}>
          {submitted ? (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p className={styles.successTitle}>Thank you!</p>
              <p>Our travel expert will reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className={styles.formHeading}>Get in touch with us!</p>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name*"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="@ Your email*"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number*"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  placeholder="Type your message*"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={styles.submitBtn}
              >
                {submitting ? "Sending..." : "Enquire Now"}
              </button>

              <p className={styles.formDisclaimer}>
                By contacting us, you agree to our{" "}
                <a href="/terms-and-conditions">Terms of Services</a> and{" "}
                <a href="/privacy-policy">Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default HealthTourismBanner;
