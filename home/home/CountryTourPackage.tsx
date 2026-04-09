"use client";

import styles from "./countrytourpackage.module.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const CountryTourPackage = ({ countryPackageHomeData }: any) => {
  const data = countryPackageHomeData || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <h2>
            Top Trending{" "}
            <span>{data[0]?.location?.country?.name}</span> Tour Packages
          </h2>

          <div className={styles.rightText}>
            <p>
              For years, we’ve curated unforgettable journeys across{" "}
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

        {/* SLIDER */}
        <Swiper
  modules={[Pagination]}
  slidesPerView={1.2}   // 🔥 FIX
  spaceBetween={20}
  loop={false}
  centeredSlides={false}
  initialSlide={0} // 🔥 FORCE LEFT START
  speed={500}
  allowTouchMove={true}
  pagination={{ clickable: true }}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className={styles.swiper}
>
          {data.map((item: any, i: number) => (
            <SwiperSlide key={item.id || i}>
              <div
                className={`${styles.card} ${
                  i % 2 === 0 ? styles.down : styles.up
                }`}
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

                  <div className={styles.arrow}>↗</div>

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