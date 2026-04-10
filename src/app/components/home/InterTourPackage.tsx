"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./intertourpackage.module.css";

const stripHtml = (html: string) =>
  html?.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim() || "";

const InterTourPackage = ({ trendingInternationalData }: any) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const setUrl = (slug: string) => {
    router.push(`/packages/${slug}`);
  };
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2>
              Top Trending <span>International</span><br />
              Tour Packages
            </h2>
          </div>

          <div className={styles.right}>
            <p>Discover trending international destinations through thoughtfully crafted journeys that blend culture, comfort, and unforgettable experiences.</p>
            <a href="/international-holidays">View All Packages →</a>
          </div>
        </div>

        {/* Cards */}
        <div
          className={styles.cardContainer}
          onMouseLeave={() => setActiveIndex(0)}
        >
          {trendingInternationalData?.slice(0, 5).map((data: any, i: number) => (
            <div
              key={data.id ?? data.slug}
              className={`${styles.card} ${activeIndex === i ? styles.activeCard : ""}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setUrl(data.slug)}
            >
              <Image
                src={data.primary_image || "/images/no-img.webp"}
                alt={data.title}
                fill
                className={styles.image}
              />

              {/* Arrow */}
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

              {/* Overlay — always visible on active card */}
              <div className={`${styles.overlay} ${activeIndex === i ? styles.overlayActive : ""}`}>
                <span className={styles.tag}>Famous Places</span>
                <h3 className={styles.headig}>{data.title}</h3>
                <p className={styles.shortDesc}>{stripHtml(data.short_description)}</p>
                <div className={styles.explore}>Explore More →</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InterTourPackage;