"use client";
import React from "react";
import styles from "./healthTourism.module.css";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later:
   const data = await fetchWhyCholanFeatures();
   ───────────────────────────────────────────────── */

interface WhyCholanFeature {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const FEATURES: WhyCholanFeature[] = [
  {
    id: 1,
    title: "Curated Doctor–Hospital–Destination Match",
    description:
      "We handpick the right specialist, facility, and post-recovery destination, tailored to your medical needs, your budget, and your personal preferences.",
    image: "/images/health-whycholan-1.jpg",
    slug: "doctor-hospital-match",
  },
  {
    id: 2,
    title: "Dedicated Personal Healing Coordinator",
    description:
      "From the moment you land to the day you are discharged, a single dedicated coordinator remains your point of contact.",
    image: "/images/health-whycholan-2.jpg",
    slug: "personal-coordinator",
  },
  {
    id: 3,
    title: "24×7 Patient Care Support",
    description:
      "Our coordination team is available around the clock. Regardless of your time zone or the hour, you are never left without support.",
    image: "/images/health-whycholan-3.jpg",
    slug: "patient-care-support",
  },
  {
    id: 4,
    title: "End-to-End Travel & Logistics Management",
    description:
      "Visa assistance, airport transfers, accommodation, meals, and support for accompanying family are all handled by Cholan's team.",
    image: "/images/health-whycholan-4.jpg",
    slug: "travel-logistics",
  },
  {
    id: 5,
    title: "Remote Second Opinion Before You Travel",
    description:
      "Before you book a flight or pack a bag, our senior specialists review the health reports you submit digitally and provide a detailed second opinion.",
    image: "/images/health-whycholan-5.jpg",
    slug: "second-opinion",
  },
  {
    id: 6,
    title: "Recovery & Wellness Packages",
    description:
      "Post-recovery guests may recuperate at Ayurveda centres or resorts across India, a signature Cholan experience that transforms recovery into renewal.",
    image: "/images/health-whycholan-6.jpg",
    slug: "recovery-wellness",
  },
];

const INTRO = {
  heading: "Why Choose Cholan Tours for Your Healing Journey?",
  description:
    "As India's premier Destination Management Company, Cholan Tours brings together medical expertise and destination mastery. It is, in a way, no hospital or standard medical facilitator can replicate. From your first inquiry to your final day of recovery, every detail is managed with precision, care, and complete commitment to your well-being. Here is why Cholan Tours should be your partner in Health Tourism.",
};

/* ── Single feature card ── */
const FeatureCard: React.FC<{ feature: WhyCholanFeature }> = ({ feature }) => (
  <div className={styles.wcCard}>
    <div className={styles.wcCardImgWrap}>
      <img
        src={feature.image}
        alt={feature.title}
        className={styles.wcCardImg}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/cholantours2.webp";
        }}
      />
    </div>
    <div className={styles.wcCardBody}>
      <h3 className={styles.wcCardTitle}>{feature.title}</h3>
      <p className={styles.wcCardText}>{feature.description}</p>
    </div>
  </div>
);

/* ── Main section ── */
const HealthTourismWhyCholan: React.FC = () => (
  <section className={styles.wcSection}>
    <div className="container">

      {/* Two-column intro */}
      <div className={styles.wcIntro}>
        <h3 className={styles.wcHeading}>{INTRO.heading}</h3>
        <p className={styles.wcDesc}>{INTRO.description}</p>
      </div>

      {/* 2×3 feature cards grid */}
      <div className={styles.wcGrid}>
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>

    </div>
  </section>
);

export default HealthTourismWhyCholan;
