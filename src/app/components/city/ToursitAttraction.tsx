

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CommonModal from "@/app/components/common/CommonModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface ToursitAttractionProps {
  cityName: string;
  citySlug: string;
  data: {
    slug: string;
    title: string;
    subtitle: string;
    image: string;
  }[];
}

function AttractionImage({ src, alt }: { src: string; alt: string }) {
  const FALLBACK = "/images/cholantours-tourist-attractions.webp";
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={500}
      height={300}
      className="places-card-image"
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}
const truncateByChars = (text: string, charLimit: number) => {
  if (!text) return "";

  if (text.length <= charLimit) return text;

  return text.slice(0, charLimit).trim();
};
const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

export default function ToursitAttraction({
  cityName,
  citySlug,
  data,
}: ToursitAttractionProps) {

  return (
    <div
      className="places-to-visit-section py-5"
      style={{ background: "#e9f4ff" }}
    >
      <div className="container">
        <h2 className="text-center mb-4 fs-2 fw-bold">
          Tourist Attractions in {cityName}
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
          {data.map((item) => (
            <SwiperSlide key={item.slug}>
              <Link
                href={`/india/${citySlug}/${item.slug}`}
                className="places-card-outer d-block text-decoration-none"
              >
                <div className="places-card-inner">

                  <AttractionImage src={item.image} alt={item.title} />

                  <div className="places-card-overlay">
                    <h5 className="place-title">{item.title}</h5>

                    {(() => {
                      const cleanSubtitle = stripHtml(item.subtitle || "");

                      return (
                        <p className="places-card-subtitle">
                          {truncateByChars(cleanSubtitle, 60)}

                          {(cleanSubtitle.split(" ").length ?? 0) > 18 && (
                            <span className="read-more-text"> ... Read more</span>
                          )}
                        </p>
                      );
                    })()}
                  </div>

                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
