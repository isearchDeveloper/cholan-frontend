"use client";

import styles from "./whycholan.module.css";
import { MessageSquareShare, Briefcase, Handshake, Backpack } from "lucide-react";

const data = [
  {
    icon: <MessageSquareShare size={38} strokeWidth={1.5} color="#3b4252" />,
    title: "Experiences & Destinations",
    text: "Whether it’s luxury escapes, spiritual journeys, or thrilling expeditions, our expertly crafted itineraries ensure every destination becomes an unforgettable experience.",
    number: "01",
  },
  {
    icon: <Briefcase size={38} strokeWidth={1.5} color="#3b4252" />,
    title: "Services & Expertise",
    text: "As a leading Destination Management Company, Cholan Tours delivers seamless travel solutions, from customised itineraries to world-class MICE and group travel services.",
    number: "02",
  },
  {
    icon: <Handshake size={38} strokeWidth={1.5} color="#3b4252" />,
    title: "Sustainability & Responsible Tourism",
    text: "Committed to responsible tourism, Cholan Tours integrates eco-friendly practices, cultural preservation and community empowerment into every journey we create.",
    number: "03",
  },
  {
    icon: <Backpack size={38} strokeWidth={1.5} color="#3b4252" />,
    title: "Why Cholan Tours?",
    text: "With over two decades of expertise, Cholan Tours stands as a trusted leader in destination management, offering seamless, tailor-made travel experiences backed by award-winning service and a dedicated multilingual team.",
    number: "04",
  },
];

const WhyCholanSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

      {/* TOP CONTENT */}
        <div className={styles.top}>
          <h2 className={styles.heading}>
            Why Cholan Tours is Your Best Choice
          </h2>

          <div className={styles.rightText}>
            <p>
              With years of expertise, we create thoughtfully curated journeys
              backed by seamless service and a strong commitment to responsible travel.
            </p>

            <a href="/about-us" className={styles.link}>
              About Cholan Tour <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* CARDS */}
        <div className={styles.grid}>
          {data.map((item, i) => (
            <div key={i} className={styles.card}>
              
              <span className={styles.number}>{item.number}</span>

              <div className={styles.iconWrapper}>
                {item.icon}
              </div>

              <h4 className={styles.title}>{item.title}</h4>

              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
        </div>
    </section>
  );
};

export default WhyCholanSection;