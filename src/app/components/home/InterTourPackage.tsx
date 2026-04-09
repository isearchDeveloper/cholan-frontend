"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./intertourpackage.module.css";

const InterTourPackage = ({ trendingInternationalData }: any) => {
  const router = useRouter();

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
              Top Trending <span>International</span> Tour Packages
            </h2>
          </div>

          <div className={styles.right}>
            <p>
              Discover trending international destinations through thoughtfully
              crafted journeys that blend culture, comfort, and unforgettable
              experiences.
            </p>

            <a href="/international-holidays">
              View All Packages →
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className={styles.cardContainer}>
          {trendingInternationalData?.slice(0, 5).map((data: any) => (
            <div
              key={data.id ?? data.slug}
              className={styles.card}
              onClick={() => setUrl(data.slug)}
            >
              <Image
                src={data.primary_image || "/images/no-img.webp"}
                alt={data.title}
                fill
                className={styles.image}
              />

              {/* Arrow */}
              <div className={styles.arrow}>↗</div>

              {/* Overlay */}
              <div className={styles.overlay}>
                <span className={styles.tag}>Famous Places</span>

                <h3 className={styles.headig}>{data.title}</h3>

                <p>Explore the wonders of</p>

                <div className={styles.explore}>
                  Explore More →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterTourPackage;