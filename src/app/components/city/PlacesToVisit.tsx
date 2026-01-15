"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

interface PlacesToVisitProps {
  cityName: string;
  data: {
    title: string;
    subtitle: string;
    image: string;
  }[];
}

export default function PlacesToVisit({ cityName, data }: PlacesToVisitProps) {
  return (
    <div
      className="places-to-visit-section py-5"
      style={{ background: "#e9f4ff" }}
    >
      <div className="container">
        <h2 className="text-center mb-4 fs-2 fw-bold">
          Places To Visit In {cityName}
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
          className="lux-swiper city-slider"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="places-card-outer">
                <div className="places-card-inner">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="places-card-image"
                  />

                  <div className="places-card-overlay">
                    <h5 className="places-card-title">{item.title}</h5>
                    <p className="places-card-subtitle">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
