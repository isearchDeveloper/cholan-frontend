"use client";
import React from "react";
import { HeartPulse, FlaskConical, Handshake, Accessibility } from "lucide-react";
import styles from "./healthTourism.module.css";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later:
   const data = await fetchExperienceCareFeatures();
   ───────────────────────────────────────────────── */

interface ExperienceFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: ExperienceFeature[] = [
  {
    id: 1,
    icon: <HeartPulse size={52} strokeWidth={1.1} />,
    title: "Clinical Excellence",
    description:
      "Our partner hospitals hold internationally respected certifications, including JCI — Joint Commission International and NABH — National Accreditation Board for Hospitals & Healthcare Providers. These accreditations ensure rigorous standards in patient safety, infection control, clinical quality, and operational excellence, not as checkboxes, but as lived practice. These factors play a key role in making Cholan Tours one of the most reliable companies in Health Tourism.",
  },
  {
    id: 2,
    icon: <FlaskConical size={52} strokeWidth={1.1} />,
    title: "Advanced Medical Technology",
    description:
      "Patients have access to cutting-edge treatments and surgical innovations, including Robotic-assisted surgery, proton therapy for advanced cancer care, minimally invasive procedures, and precision diagnostics and imaging. Our medical network includes highly experienced surgeons, oncologists, cardiologists, orthopaedic specialists, and multidisciplinary teams trusted by patients from across the world.",
  },
  {
    id: 3,
    icon: <Handshake size={52} strokeWidth={1.1} />,
    title: "Transparency & Trust",
    description:
      "Uncertainty is one of the greatest concerns for international patients — uncertainty around waiting periods, treatment timelines. Through dedicated hospital partnerships and coordination teams, we facilitate significantly faster consultations, diagnostics, and treatment scheduling, cutting through the months-long waiting periods that patients face in many countries.",
  },
  {
    id: 4,
    icon: <Accessibility size={52} strokeWidth={1.1} />,
    title: "Comprehensive Patient Assistance",
    description:
      "Accommodation is very important for holistic healing. We arrange carefully selected stays designed for comfort, accessibility, hygiene, and recuperation. It is suitable for both short-term recovery and extended medical visits. We also handle airport meet-and-greet assistance, dedicated chauffeur-driven transfers, multilingual support where required, and emergency coordination assistance.",
  },
];

const INTRO = {
  heading: "Experience Care with Cholan Health Tours",
  subheading:
    "Indulge in complete wellness, medical assistance, rejuvenation therapies, comfortable stays, and personalised care designed for a stress-free healing journey with Cholan Tours.",
};

/* ── Single feature item ── */
const FeatureItem: React.FC<{ feature: ExperienceFeature }> = ({ feature }) => (
  <div className={styles.expItem}>
    <div className={styles.expIcon}>{feature.icon}</div>
    <h3 className={styles.expItemTitle}>{feature.title}</h3>
    <p className={styles.expItemText}>{feature.description}</p>
  </div>
);

/* ── Main section ── */
const HealthTourismExperienceCare: React.FC = () => (
  <section className={styles.expSection}>
    <div className="container">

      {/* Centered heading + subheading */}
      <div className={styles.expHeader}>
        <h2 className={styles.expHeading}>{INTRO.heading}</h2>
        <p className={styles.expSubheading}>{INTRO.subheading}</p>
      </div>

      {/* 2×2 features grid */}
      <div className={styles.expGrid}>
        {FEATURES.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </div>

    </div>
  </section>
);

export default HealthTourismExperienceCare;
