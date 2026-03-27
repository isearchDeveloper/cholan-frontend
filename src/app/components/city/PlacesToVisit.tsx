
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CommonModal from "@/app/components/common/CommonModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { useState } from "react";

interface PlacesToVisitProps {
  cityName: string;
  data: {
    title: string;
    subtitle: string;
    image: string;
  }[];
}

const FALLBACK = "/images/cholantours-tourist-attractions.webp";

// clean subtitle
const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

//  truncate
const truncateByChars = (text: string, charLimit: number) => {
  if (!text) return "";
  if (text.length <= charLimit) return text;
  return text.slice(0, charLimit).trim();
};

//  FINAL IMAGE COMPONENT (PRO LEVEL)
function SafeImage({ src, alt }: { src: string; alt: string }) {
  const initialSrc =
    src && src.startsWith("http") ? src : FALLBACK;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <div className="relative w-full h-[220px]">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="places-card-image object-cover"
        sizes="(max-width: 768px) 100vw, 25vw"
        placeholder="blur"
        blurDataURL={FALLBACK}
        onError={() => setImgSrc(FALLBACK)}
      />
    </div>
  );
}

export default function PlacesToVisit({ cityName, data }: PlacesToVisitProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleOpen = (item: any) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className="places-to-visit-section py-5" style={{ background: "#e9f4ff" }}>
      <div className="container">
        <h2 className="text-center mb-4 fs-2 fw-bold">
          Places to visit in {cityName}
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
          className="lux-swiper city-slider"
        >
          {data.map((item, index) => {
            const cleanText = stripHtml(item.subtitle || "");

            return (
              <SwiperSlide key={index}>
                <div className="places-card-outer">
                  <div className="places-card-inner">

                    {/* ✅ IMAGE */}
                    <SafeImage src={item.image} alt={item.title} />

                    <div className="places-card-overlay">
                      <h5
                        className="place-title"
                        onClick={() => handleOpen(item)}
                      >
                        {item.title}
                      </h5>

                      {/* ✅ CLEAN SUBTITLE */}
                      <p className="places-card-subtitle">
                        {truncateByChars(cleanText, 60)}

                        {cleanText.length > 60 && (
                          <span
                            className="read-more-text"
                            onClick={() => handleOpen(item)}
                          >
                            ... Read more
                          </span>
                        )}
                      </p>

                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <CommonModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={selected?.title}
        description={selected?.subtitle}
      />
    </div>
  );
}