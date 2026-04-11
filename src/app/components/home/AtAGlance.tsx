"use client";

import Image from "next/image";
import styles from "./ataglance.module.css";

const GreenTick = () => (
  <svg
    className={styles.tick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outlined Verified Badge */}
    <path
      d="M12 1L14.8 3.3L18.6 3.1L20.1 6.5L23.5 8L22.4 11.5L24 15L20.6 16.5L19.1 19.9L15.3 19.7L12.5 22L9.7 19.7L5.9 19.9L4.4 16.5L1 15L2.6 11.5L1.5 8L4.9 6.5L6.4 3.1L10.2 3.3L13 1"
      stroke="#088335ff"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M8.5 11.5L11 14L16.5 8.5"
      stroke="#088335ff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cards = [
  {
    icon: "/images/sus1.png",
    title: "Sustainability & Innovation",
    points: ["100% Running on Solar Energy", "100% Paperless Office"],
  },
  {
    icon: "/images/sus2.png",
    title: "Award & Recognition",
    points: [
      "5 Time National Tourism Award Winner",
      "Bagged 50+ National & International Awards",
    ],
  },
  {
    icon: "/images/sus3.png",
    title: "Operational Strength",
    points: [
      "150+ Fleets",
      "13 Offices Across the Country",
      "300+ Dedicated Staff",
    ],
  },
  {
    icon: "/images/sus4.png",
    title: "Credibility & Global Presence",
    points: [
      "Approved by Ministry of Tourism, Government of India",
      "Member of 25+ Global Tourism Networks",
    ],
  },
];

export default function AtAGlance() {
  return (
    <section className={styles.section}>
      {/* Decorative Balloon Background */}
      <div className={styles.balloonBg}>
        <Image
          src="/images/airballon.png"
          width={300}
          height={300}
          alt="decoration"
          className={styles.balloonImg}
        />
      </div>

      <div className={styles.header}>
        <h2 className={styles.heading}>Cholan Tours at a Glance</h2>
        <p className={styles.subheading}>
          A quick look at our journey, expertise, and commitment to delivering
          exceptional travel experiences across destinations.
        </p>
      </div>

      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.iconWrap}>
              <Image src={card.icon} width={90} height={90} alt={card.title} />
            </div>
            {/* The user's image shows the same title for all, but for production I'll keep the descriptive logic with the requested styling */}
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <ul className={styles.list}>
              {card.points.map((point, j) => (
                <li key={j} className={styles.listItem}>
                  <GreenTick />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
