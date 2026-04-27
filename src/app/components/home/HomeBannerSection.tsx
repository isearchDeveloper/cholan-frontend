"use client";
 
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
 
import styles from "./homebanner.module.css";
 
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
 
const HomeBanner = ({ bannerData }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [openModal, setOpenModal] = useState(false);
 
  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: `.${styles.prevBtn}`,
          nextEl: `.${styles.nextBtn}`,
        }}
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
                  src={item?.banner_image || "/images/no-img.webp"}
                  alt={item?.banner_image_alt || "Cholan Tours"}
                  fill
                  priority
                  className={styles.heroImage}
                  onError={(e: any) => {
                    e.target.src = "/images/no-img.webp";
                  }}
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
                  {item.url && (
                    <Link
                      href={item.url}
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
 
        {/* CUSTOM NAVIGATION ALIGNED WITH BOTTOM */}
        <div className={styles.navContainer}>
          {/* <button className={styles.prevBtn} onClick={() => swiperRef.current?.slidePrev()}>
            &larr; Prev
          </button>
          <button className={styles.nextBtn} onClick={() => swiperRef.current?.slideNext()}>
            Next &rarr;
          </button> */}
        </div>
      </Swiper>
    </section>
  );
};
 
export default HomeBanner;
 