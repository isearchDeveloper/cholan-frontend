"use client";

import Image from "next/image";
import styles from "./discoverindia.module.css";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const stripHtml = (html: string) =>
  html?.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim() || "";

interface DiscoverIndiaProps {
  discoverIndiaPackageData: any[];
}

const DiscoverIndia = ({ discoverIndiaPackageData }: DiscoverIndiaProps) => {
  const router = useRouter();

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
              For over two decades, we've crafted journeys that go beyond
              travel—where every destination tells a story through our travelers.
            </p>
            <span onClick={() => router.push("/packages")} className={styles.link}>
              View All Packages →
            </span>
          </div>
        </div>

        {/* CARDS SLIDER */}
        <Swiper
          modules={[Pagination]}
          slidesPerView={1.2}
          spaceBetween={18}
          pagination={{ clickable: true, el: `.${styles.pagination}` }}
          breakpoints={{
            640:  { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4   },
          }}
          className={styles.swiper}
        >
          {discoverIndiaPackageData?.map((item) => (
            <SwiperSlide key={item.slug}>
              <div
                className={styles.card}
                onClick={() => router.push(`/packages/${item.slug}`)}
              >
                <Image
                  src={item?.primary_image || "/images/fallback.jpg"}
                  alt={item.title}
                  fill
                  className={styles.image}
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
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.line} />
                  <p className={styles.cardDesc}>
                    {stripHtml(item.short_description).slice(0, 120)}
                    {stripHtml(item.short_description).length > 120 ? "..." : ""}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* PAGINATION DOTS */}
        <div className={styles.pagination} />

      </div>
    </section>
  );
};

export default DiscoverIndia;