"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import TrainEnquiryModal from "@/app/modals/trainEnquiryModal";
import styles from "./homebanner.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeBanner = ({ bannerData }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        className={styles.heroSwiper}
      >
        {bannerData?.slider_banners?.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className={styles.heroSlide}>
              
              {/* Background Image */}
              <div className={styles.heroImageWrapper}>
                <Image
                  src={item.banner_image || "/images/no-img.webp"}
                  alt={item.banner_image_alt || "Cholan Tours"}
                  fill
                  priority
                  className={styles.heroImage}
                />
              </div>

              {/* Overlay */}
              <div className={styles.heroOverlay} />

              {/* Content */}
              <div className={styles.heroContent}>
                <div className={styles.heroTitle}>
                  {item.title || "Wildlife Tours of India"}
                </div>

                <div className={styles.heroDescription}>
                  Discover India’s rich wildlife, from majestic jungles to rare
                  species, through expertly curated safari and nature experiences.
                </div>

                <div className={styles.heroActions}>
                  {item.package?.slug && (
                    <Link
                      href={`/packages/${item.package.slug}`}
                      className={styles.ctaBtn}
                    >
                      Explore Now
                      <span>
                        <Image
                          width={20}
                          height={20}
                          src="/images/button-arrow.png"
                          alt=""
                        />
                      </span>
                    </Link>
                  )}
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeBanner;