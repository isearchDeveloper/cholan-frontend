"use client";

import React from "react";
import styles from "./countrytourpackage.module.css";
import Image from "next/image";
import Link from "next/link";

const CountryTourPackage = ({ countryPackageHomeData }: any) => {
  const data = (countryPackageHomeData || []).slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.bgElements}>
        <img src="/images/bgflower.png" className={styles.bgflower} />
        {/* <img src="/images/destination.png" className={styles.destination} /> */}
      </div>

      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Top Trending <span>{data[0]?.location?.country?.name}</span> Tour Packages
        </h2>

        <div className={styles.rightText}>
          <p>
            For years, we've curated unforgettable journeys across{" "}
            {data[0]?.location?.country?.name}.
          </p>

          <Link
            href={`/international-holidays/${data[0]?.location?.country?.slug}`}
            className={styles.link}
          >
            View All Packages →
          </Link>
        </div>
      </div>

      {/* 4 CARDS ZIG-ZAG GRID */}
      <div className={styles.grid}>
        {data.map((item: any, i: number) => (
          <div
            key={item.id || i}
            className={`${styles.card} ${i % 2 === 0 ? styles.up : styles.down}`}
          >
            <Link href={`/packages/${item.slug}`}>

              <div className={styles.imageWrapper}>
                <Image
                  src={item.primary_image || "/images/no-img.webp"}
                  alt={item.title}
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.overlay}></div>

              <div className={styles.content}>
                <h3>{item.title}</h3>
              </div>

              <div className={styles.icon}>
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
        ))}
      </div>

    </section>
  );
};

export default CountryTourPackage;