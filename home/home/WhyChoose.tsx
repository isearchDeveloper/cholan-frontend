"use client";

import React, { useState } from "react";
import styles from "./whychoose.module.css";

interface WhyChooseItem {
  title: string;
  details: string[];
}

interface WhyChooseProps {
  data: WhyChooseItem[];
}

const WhyChoose: React.FC<WhyChooseProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!data || data.length === 0) return null;

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <h2>Why Choose Cholan Tours?</h2>

          <p>
            Combining experience, reliability, and personalized service, we ensure
            every journey is smooth, memorable, and truly exceptional.
          </p>
        </div>

        <div className={styles.content}>

          {/* LEFT ACCORDION */}
          <div className={styles.left}>
            {data.map((item, index) => (
              <div key={index} className={styles.accordionItem}>

                <div
                  className={styles.accordionHeader}
                  onClick={() => toggle(index)}
                >
                  <h4>{item.title}</h4>
                  <span className={styles.plus}>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>

                <div
                  className={`${styles.accordionContent} ${
                    activeIndex === index ? styles.open : ""
                  }`}
                >
                  <ul>
                    {item.details.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT CARD */}
          <div className={styles.right}>
            <div className={styles.card}>
              <div className={styles.icon}>💬</div>

              <h3>Do You Have More Questions?</h3>

              <p>
                End-to-end payments and financial management in a single solution.
                Meet the right platform to help realize.
              </p>

              <a href="/contact-us" className={styles.btn}>
                Contact Us →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChoose;