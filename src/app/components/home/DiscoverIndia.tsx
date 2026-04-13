"use client";
import React, { useRef } from "react";
import Image from "next/image";
import styles from "./discoverindia.module.css";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

const stripHtml = (html: string) =>
  html?.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim() || "";

interface DiscoverIndiaProps {
  discoverIndiaPackageData: any[];
}

const DiscoverIndia = ({ discoverIndiaPackageData }: DiscoverIndiaProps) => {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  const originalData = discoverIndiaPackageData || [];
  // Duplicate data for infinite loop if count is small
  const data = originalData.length > 0 && originalData.length < 8 
    ? [...originalData, ...originalData] 
    : originalData;

  if (!data || data.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Experience the Timeless Beauty <br /> of India
          </h2>

          <div className={styles.rightText}>
            <p>
              Discover India’s timeless beauty through expertly crafted journeys, where decades of experience transform destinations into meaningful stories.
            </p>
            <span onClick={() => router.push("/packages")} className={styles.link}>
              View All Packages →
            </span>
          </div>
        </div>

        {/* CARDS SLIDER */}
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
            slidesPerView={4}
            spaceBetween={30}
            watchSlidesProgress={true}
            loopAdditionalSlides={2}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 15 },
              480: { slidesPerView: 1.8, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className={styles.swiper}
          >
            {data.map((item, i) => (
              <SwiperSlide key={`${item?.slug || i}-${i}`} className={styles.swiperSlide}>
                <div
                  className={styles.card}
                  onClick={() => router.push(`/packages/${item?.slug || ""}`)}
                >
                  <Image
                    src={item?.primary_image || "/images/no-img.webp"}
                    alt={item?.title || "Tour"}
                    fill
                    className={styles.image}
                    onError={(e: any) => {
                      e.target.src = "/images/no-img.webp";
                    }}
                  />

                  {/* ARROW BADGE */}
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

                  {/* BOTTOM OVERLAY — always visible */}
                  <div className={styles.overlay}>
                    <h3 className={styles.cardTitle}>{item?.title || "Exclusive Tour"}</h3>
                    <div className={styles.line} />
                    <p className={styles.cardDesc}>
                      {stripHtml(item?.short_description || "").slice(0, 120)}
                      {stripHtml(item?.short_description || "").length > 120 ? "..." : ""}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default DiscoverIndia;