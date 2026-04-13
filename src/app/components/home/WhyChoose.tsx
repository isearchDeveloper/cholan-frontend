"use client";

import React, { useState } from "react";
import styles from "./whychoose.module.css";
import { MessageCircle } from "lucide-react";

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
              <div className={styles.icon}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 8H17M7 12H13M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h3>Do You Have More Questions?</h3>

              <p>
                End-to-end payments and financial management in a single solution.
                Meet the right platform to help realize.
              </p>

              <a href="/contact-us" className={styles.btn}>
                Contact Us <span style={{marginLeft: '8px'}}>→</span>
              </a>
            </div>
          </div>

      </div>
    </section>
  );
};

export default WhyChoose;