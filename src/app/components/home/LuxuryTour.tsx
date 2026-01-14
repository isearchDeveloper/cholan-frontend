"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types"; // Typing for swiper
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

const LuxuryTour = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="luxury-tour ">
      {/* <div className="top-slider">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={false}
          speed={3000}
          slidesPerView={5}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-1.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-2.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-3.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-1.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-2.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-3.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="bottom-slider">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={false}
          speed={3000}
          slidesPerView={5}
          spaceBetween={30}
          dir="rtl"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-1.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-2.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-3.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-1.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-2.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sngl-box">
              <Image
                width={360}
                height={255}
                sizes="100vw"
                src="/images/sliding-gal-3.jpg"
                alt=""
               
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div> */}

      <div className="content-box">
        <div className="container">
          <div className="sngl-box-content">
            <h2 className="fs-2 text-white">Luxury Tours</h2>
            <p className="text-white">From Majestic Rails to Exquisite Hotels - India's Heritage in Luxury</p>
            <Link href="/luxury-trains" className="btn orange-btn">
              Explore now
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryTour;
