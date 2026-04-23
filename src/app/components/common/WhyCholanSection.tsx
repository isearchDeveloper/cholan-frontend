import React from "react";
import { MessageSquareShare, Briefcase, Handshake, Backpack } from "lucide-react";
import styles from "./whyCholan.module.css";

const items = [
  {
    icon: <MessageSquareShare size={22} strokeWidth={1.5} />,
    title: "Experiences & Destinations",
    text: "From luxury escapes to spiritual journeys, every itinerary travel experiences.",
  },
  {
    icon: <Briefcase size={22} strokeWidth={1.5} />,
    title: "Services & Expertise",
    text: "Cholan Tours delivers seamless solutions, services, and group travel management.",
  },
  {
    icon: <Handshake size={22} strokeWidth={1.5} />,
    title: "Sustainability & Responsible Tourism",
    text: "We promote eco-friendly tourism, engagement in every journey.",
  },
  {
    icon: <Backpack size={22} strokeWidth={1.5} />,
    title: "Why Cholan Tours?",
    text: "Over two decades of expertise, service and multilingual support.",
  },
];

export default function WhyCholanSection() {
  return (
    <section className={styles.section}>
      {/* Full-width background image */}
      <div className={styles.bgImage}>
        <img
          src="/images/tourismwhychose.webp"
          alt="Why Cholan Tours"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* White gradient: right solid → left transparent */}
      <div className={styles.overlay} />

      {/* Content row */}
      <div className={styles.inner}>
        <div className={styles.gap} />
        <div className={styles.textPanel}>
          <h2 className={styles.heading}>Why Cholan Tours is Your Best Choice</h2>
          <p className={styles.subtext}>
            With years of expertise, we create thoughtfully curated journeys backed by
            seamless service and a strong commitment to responsible travel.
          </p>
          <div className={styles.list}>
            {items.map((item, i) => (
              <div key={i} className={styles.listItem}>
                <div className={styles.listIcon}>{item.icon}</div>
                <div>
                  <h4 className={styles.listTitle}>{item.title}</h4>
                  <p className={styles.listDesc}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
