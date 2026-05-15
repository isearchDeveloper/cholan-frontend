"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// @ts-ignore
import "swiper/css";
import styles from "./PopularIndiaTours.module.css";

type PackageItem = {
  id?: string | number;
  slug: string;
  title: string;
  primary_image?: string;
  details?: {
    duration_nights?: number;
    duration_days?: number;
  };
};

const MoonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export default function PopularIndiaTours({
  exclusiveIndiaPackage = [],
}: {
  exclusiveIndiaPackage: PackageItem[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!exclusiveIndiaPackage.length) return null;

  const slides = exclusiveIndiaPackage;

  return (
    <section className={styles.section}>
      <div className="container-fluid px-0">

        {/* Header */}
        <div className={`px-3 px-md-0 ${styles.header}`}
          style={{ paddingLeft: "60px", paddingRight: "60px" }}
        >
          <h2 className={styles.heading}>
            Popular India Tour<br />Packages
          </h2>
          <div className={styles.rightText}>
            <p>
              For years, we've curated unforgettable journeys across India - where
              every destination is best experienced through our travelers.
            </p>
            {/* <Link href="/india" className={styles.link}>
              View All Packages →
            </Link> */}
          </div>
        </div>

        {/* Slider */}
        <div
          className={styles.sliderWrapper}
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <Swiper
            modules={[Autoplay]}
            onSwiper={(s) => (swiperRef.current = s)}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={1000}
            spaceBetween={30}
            slidesPerView={4}
            watchSlidesProgress={true}
            loopAdditionalSlides={2}
            allowTouchMove={true}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 15 },
              480: { slidesPerView: 1.8, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              1024: { slidesPerView: 3.3, spaceBetween: 30 },
            }}
            className={styles.swiperContainer}
          >
            {slides.map((pkg, i) => {
              const nights = pkg.details?.duration_nights ?? 0;
              const days = pkg.details?.duration_days ?? 0;
              return (
                <SwiperSlide key={`${pkg.slug}-${i}`} className={styles.swiperSlide}>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className={`${styles.card} ${i % 2 === 0 ? styles.up : styles.down}`}
                  >
                    {/* Full image */}
                    <div className={styles.imageWrapper}>
                      <Image
                        src={pkg.primary_image || "/images/no-img.webp"}
                        alt={pkg.title}
                        fill
                        className={styles.image}
                        onError={(e: any) => { e.currentTarget.src = "/images/no-img.webp"; }}
                      />
                    </div>

                    {/* Overlay */}
                    <div className={styles.overlay} />

                    {/* Title + meta */}
                    <div className={styles.content}>
                      <h3>{pkg.title}</h3>
                      <div className={styles.meta}>
                        <span className={styles.metaItem}>
                          <MoonIcon />
                          {nights} {nights === 1 ? "Night" : "Nights"}
                        </span>
                        <span className={styles.sep}>|</span>
                        <span className={styles.metaItem}>
                          <SunIcon />
                          {days} {days === 1 ? "Day" : "Days"}
                        </span>
                      </div>
                    </div>

                    {/* Arrow icon */}
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
