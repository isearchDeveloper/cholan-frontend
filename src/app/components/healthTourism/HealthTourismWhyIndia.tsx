"use client";
import React from "react";
import styles from "./healthTourism.module.css";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later:
   const data = await fetchWhyIndiaFeatures();
   ───────────────────────────────────────────────── */

interface WhyIndiaFeature {
  id: number;
  title: string;
  image: string;
  description: string;
}

const INTRO = {
  heading: "Why India is a Leading Destination for Health Tourism",
  description:
    "Most doctors and surgeons at leading Indian hospitals are trained at, or have worked at, prestigious institutions in the US, the UK, Europe, and beyond, many of whom hold dual board certifications.",
};

const FEATURES: WhyIndiaFeature[] = [
  { id: 1, title: "English-Speaking Teams",      image: "/images/health-why-1.jpg", description: "Most doctors and nurses are fluent in English, eliminating communication barriers and ensuring every visitor fully understands their care plan and recovery steps." },
  { id: 2, title: "Advanced Medical Technology", image: "/images/health-why-2.jpg", description: "Top-of-the-line diagnostic and surgical equipment from GE, Siemens, Philips, and da Vinci robotic systems is widely available at India's leading hospitals, on par with the best centres in the US and Europe. This is why it is one of the leading countries in the Health Tourism sector." },
  { id: 3, title: "Outstanding Affordability",   image: "/images/health-why-3.jpg", description: "Healthcare costs in India are 60 to 90 percent lower than in the USA, UK, or Singapore, without any compromise on clinical outcomes or the quality of care." },
  { id: 4, title: "Short Waiting Times",         image: "/images/health-why-4.jpg", description: "Unlike many Western healthcare systems, India's leading private hospitals offer appointments within days, not months, critical for time-sensitive conditions and urgent procedures." },
];

/* ── Single feature card ── */
const FeatureCard: React.FC<{ feature: WhyIndiaFeature }> = ({ feature }) => (
  <div className={styles.whyCard}>
    <img
      src={feature.image}
      alt={feature.title}
      className={styles.whyCardImg}
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/images/cholantours2.webp";
      }}
    />
    <div className={styles.whyCardOverlay}>
      <span className={styles.whyCardTitle}>{feature.title}</span>
      <div className={styles.whyCardDivider}></div>
      <p className={styles.whyCardDesc}>{feature.description}</p>
    </div>
  </div>
);

/* ── Main section ── */
const HealthTourismWhyIndia: React.FC = () => (
  <section className={styles.whySection}>
    <div className="container">

      {/* Top two-column intro */}
      <div className={styles.whyIntro}>
        <h4 className={styles.whyHeading}>{INTRO.heading}</h4>
        <p className={styles.whyDesc}>{INTRO.description}</p>
      </div>

      {/* Cards grid */}
      <div className={styles.whyGrid}>
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>

    </div>
  </section>
);

export default HealthTourismWhyIndia;
