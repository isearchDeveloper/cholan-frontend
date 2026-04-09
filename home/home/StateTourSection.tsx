"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./statetour.module.css";

const data = [
  {
    title: "Discover India for Your Next Adventure!",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600",
    link: "/india",
  },
  {
    title: "Nepal",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600",
    link: "/international-holidays/nepal-tour-packages",
  },
  {
    title: "Sri Lanka",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600",
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
              style={{ backgroundImage: `url(${item.image})` }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Link href={item.link} className={styles.cardLink}>
                <div className={styles.overlay}></div>

                <span className={styles.title}>{item.title}</span>

                <div className={styles.arrow}>↗</div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StateTourSection;