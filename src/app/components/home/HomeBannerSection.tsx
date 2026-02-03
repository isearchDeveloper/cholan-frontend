"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import TrainEnquiryModal from "@/app/modals/trainEnquiryModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const STATIC_DESCRIPTION =
  "Explore India’s timeless beauty with Cholan Tours – your trusted travel partner for tailor-made journeys, cultural experiences, and seamless travel services across every corner of the country.";

const HomeBanner = ({ bannerData }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  

  return (

    <>
     <section className="hero">
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
        className="hero-swiper"
      >
        {bannerData?.slider_banners?.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="hero-slide">
              {/* Background Image */}
              <div className="hero-image-wrapper">
                <Image
                  src={item.banner_image || "/images/no-img.webp"}
                  alt={item.banner_image_alt || "Cholan Tours"}
                  fill
                  priority
                  className="hero-image"
                />
              </div>

              {/* Overlay */}
              <div className="hero-overlay" />

              {/* CENTER CONTENT */}
              <div className="hero-content">
                <div className="hero-title">{item.title || "CHOLAN TOURS"}</div>
                <div className="hero-actions">
                  {/* Explore Button (same as old) */}
                  {item.package?.slug && (
                    <Link
                      href={`/packages/${item.package.slug}`}
                      className="btn blue-btn"
                    >
                      Explore Now
                      <span>
                        <Image
                          width={23}
                          height={23}
                          sizes="100vw"
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
    </>
   

 
  );
};

export default HomeBanner;
