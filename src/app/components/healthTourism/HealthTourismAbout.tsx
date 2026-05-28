"use client";
import React from "react";
import styles from "./healthTourism.module.css";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later:
   const data = await fetchHealthTourismAbout();
   ───────────────────────────────────────────────── */

interface AboutSection {
  id: number;
  imagePosition: "left" | "right";
  image: string;
  imageAlt: string;
  paragraphs: string[];
}

const INTRO = {
  heading: "Health Tourism with Cholan Tours",
  quote:
    '"Cholan Tours is India\'s leading Destination Management Company (DMC). With over two decades of expertise in Indian tourism and hospitality."',
};

const SECTIONS: AboutSection[] = [
  {
    id: 1,
    imagePosition: "left",
    image: "/images/health-tourism-about-1.jpg",
    imageAlt: "Doctor caring for patient",
    paragraphs: [
      "We understand that choosing to pursue healthcare abroad is a deeply personal decision. Our mission is to make every stage of your journey safe, seamless, and completely comforting, from your very first enquiry to full recovery and your return home.",
      "India today stands among the top five global medical travel destinations, welcoming visitors from over 50 countries each year. With Cholan Tours, you gain something rare: the combined expertise of a premier healthcare facilitator and a world-class destination management company, working entirely in your interest.",
    ],
  },
  {
    id: 2,
    imagePosition: "right",
    image: "/images/health-tourism-about-2.jpg",
    imageAlt: "Medical specialist consultation",
    paragraphs: [
      "We believe that no one should face months of waiting for life-changing care or compromise on quality because of rising costs. Through our Health Tourism initiative, we connect international visitors with globally accredited hospitals, distinguished specialists, and recovery-focused hospitality across India.",
      "Every detail of your experience is shaped around a single purpose: healing with complete peace of mind.",
    ],
  },
];

/* ── Single alternating row ── */
const ContentBlock: React.FC<{ section: AboutSection }> = ({ section }) => (
  <div
    className={`${styles.aboutRow} ${
      section.imagePosition === "right" ? styles.aboutRowReverse : ""
    }`}
  >
    <div className={styles.aboutImgWrap}>
      <img
        src={section.image}
        alt={section.imageAlt}
        className={styles.aboutImg}
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/cholantours2.webp";
        }}
      />
    </div>

    <div className={styles.aboutText}>
      {section.paragraphs.map((para, i) => (
        <p key={i} className={styles.aboutPara}>
          {para}
        </p>
      ))}
    </div>
  </div>
);

/* ── Main section ── */
const HealthTourismAbout: React.FC = () => (
  <section className={styles.aboutSection} id="health-services">
    <div className="container">

      <div className={styles.aboutIntro}>
        <h2 className={styles.aboutHeading}>{INTRO.heading}</h2>
        <p className={styles.aboutQuote}>{INTRO.quote}</p>
      </div>

      <div className={styles.aboutDivider} />

      <div className={styles.aboutBlocks}>
        {SECTIONS.map((section) => (
          <ContentBlock key={section.id} section={section} />
        ))}
      </div>

    </div>
  </section>
);

export default HealthTourismAbout;
