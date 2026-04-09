"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { fetchDmcPageDetails } from "@/app/services/dmcServices";

interface LogoData {
  src: string;
  alt: string;
}

const LogoSlider = () => {
  const [logos, setLogos] = useState<LogoData[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const getPartnerLogos = async () => {
      try {
        const pageData = await fetchDmcPageDetails("accreditation");

        if (pageData?.description) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = pageData.description;

          const imgElements = Array.from(tempDiv.querySelectorAll("img"));

          const logosFromApi: LogoData[] = imgElements.map((img) => ({
            src: img.getAttribute("src") || "",
            alt: img.getAttribute("alt") || "Partner Logo",
          }));

          setLogos(logosFromApi);
        }
      } catch (err) {
        console.error("Error fetching partner logos:", err);
      }
    };

    getPartnerLogos();
  }, []);

  if (logos.length === 0) return null; // hide slider if no logos

  return (
    <section className="logo-slider-sec pt-0">
      <div className="container">
        <div
          
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
            spaceBetween={30}
            slidesPerView={5}
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 15 },
              768: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 7, spaceBetween: 30 },
            }}
          >
            {logos.map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="logoslide">
                  <div className="logo-box">
                    <Image
                      width={150}
                      height={100}
                      sizes="(max-width: 768px) 80px, 120px"
                      src={logo.src}
                      alt={logo.alt}
                      style={{ objectFit: "contain" }}
                    />
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

export default LogoSlider;
