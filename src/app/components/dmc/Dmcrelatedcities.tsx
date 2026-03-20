"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import styles from "./DmcRelatedCities.module.css";

interface DmcRelatedCitiesProps {
  cities: any[];
}

export default function DmcRelatedCities({ cities }: DmcRelatedCitiesProps) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fs-3 fw-bold">
            Explore Our Other DMC Destinations
          </h2>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
        >
          {cities.map((city: any, idx: number) => (
            <SwiperSlide key={idx}>
              <Link
                href={`/indian-dmc/${city.slug}`}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={city.banner_image}
                    alt={city.banner_image_alt || city.title}
                    fill
                    className={styles.image}
                  />
                </div>

                <div className={styles.overlay}>
                  <h5>{city.title.replace(" dmc", "")}</h5>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}