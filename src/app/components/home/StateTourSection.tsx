"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./statetour.module.css";

const data = [
  {
    title: "Discover India for Your Next Adventure!",
    image:
      "/images/india.webp",
    link: "/india",
  },
  {
    title: "Nepal",
    image:
      "/images/nepal-home.webp",
    link: "/international-holidays/nepal-tour-packages",
  },
  {
    title: "Sri Lanka",
    image:
      "/images/srilankaimg.webp",
    link: "/international-holidays/sri-lanka-tour-packages",
  },
];

const StateTourSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // LEFT active first
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoverIndex !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [hoverIndex]);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {data.map((item, i) => {
          const isActive =
            hoverIndex !== null ? hoverIndex === i : activeIndex === i;

          return (
            <div
              key={i}
              className={`${styles.card} ${isActive ? styles.active : ""}`}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div 
                className={styles.bgImage} 
                style={{ backgroundImage: `url(${item.image})` }} 
              />
              <Link href={item.link} className={styles.cardLink}>
                <div className={styles.overlay}></div>

                <span className={styles.title}>{item.title}</span>

                <div className={styles.arrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StateTourSection;