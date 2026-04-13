"use client";

import React, { useRef } from "react";
import styles from "./countrytourpackage.module.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// @ts-ignore
import "swiper/css";

const CountryTourPackage = ({ countryPackageHomeData }: any) => {
  const originalData = countryPackageHomeData || [];
  // Duplicate data for infinite loop if count is small
  const data = originalData.length > 0 && originalData.length < 8 
    ? [...originalData, ...originalData] 
    : originalData;
    
  const swiperRef = useRef<SwiperType | null>(null);

  if (!data || data.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.bgElements}>
        <img src="/images/bgflower.png" className={styles.bgflower} />
      </div>

      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Top Trending <span>{originalData[0]?.location?.country?.name}</span> Tour Packages
        </h2>

        <div className={styles.rightText}>
          <p>
           Discover Sri Lanka through curated tour packages with landscapes and unforgettable experiences. 
          </p>

          <Link
            href={`/international-holidays/${originalData[0]?.location?.country?.slug}`}
            className={styles.link}
          >
            View All Packages →
          </Link>
        </div>
      </div>

      {/* 4 CARDS ZIG-ZAG SLIDER */}
      <div 
        className={styles.sliderWrapper}
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
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
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className={styles.swiperContainer}
        >
          {data.map((item: any, i: number) => (
            <SwiperSlide key={`${item?.id || i}-${i}`} className={styles.swiperSlide}>
              <div
                className={`${styles.card} ${i % 2 === 0 ? styles.up : styles.down}`}
              >
                <Link href={`/packages/${item?.slug || ""}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item?.primary_image || "/images/no-img.webp"}
                      alt={item?.title || "Tour Package"}
                      fill
                      className={styles.image}
                      onError={(e: any) => {
                        e.target.src = "/images/no-img.webp";
                      }}
                    />
                  </div>

                  <div className={styles.overlay}></div>

                  <div className={styles.content}>
                    <h3>{item?.title || "Exclusive Tour"}</h3>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CountryTourPackage;