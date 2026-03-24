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

// const truncateByWords = (text: string, wordLimit: number) => {
//   if (!text) return "";

//   const words = text.split(" ");
//   if (words.length <= wordLimit) return text;

//   return words.slice(0, wordLimit).join(" ");
// };

const truncateByChars = (text: string, charLimit: number) => {
  if (!text) return "";

  if (text.length <= charLimit) return text;

  return text.slice(0, charLimit).trim();
};

export default function PlacesToVisit({ cityName, data }: PlacesToVisitProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleOpen = (item: any) => {
    setSelected(item);
    setOpen(true);
  };

  const FALLBACK = "/images/cholantours-tourist-attractions.webp";
  function SafeImage({ src, alt }: { src: string; alt: string }) {
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

  return (
    <div
      className="places-to-visit-section py-5"
      style={{ background: "#e9f4ff" }}
    >
      <div className="container">
        <h2 className="text-center mb-4 fs-2 fw-bold">
          Places to visit in {cityName}
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
                  <SafeImage src={item.image} alt={item.title} />

                  <div className="places-card-overlay">
                    <h5
                      className="place-title"
                      onClick={() => handleOpen(item)}
                    >
                      {item.title}
                    </h5>
                    {/* /* <p className="places-card-subtitle">{item.subtitle}</p> */}                   <p className="places-card-subtitle">
                      {truncateByChars(item.subtitle, 60)}
                      {item.subtitle.length  > 18 && (
                        <span
                          className="read-more-text"
                          onClick={() => handleOpen(item)}
                        >
                          ... Read more
                        </span>
                      )}
                    </p>

                    {/* <button
                    className="btn orange-btn inline-flex items-center gap-1 px-3 py-1 text-sm"
                      onClick={() => handleOpen(item)}
                    >
                      Read Details
                      <span>
                        <Image
                          width={23}
                          height={23}
                          sizes="100vw"
                          src="/images/button-arrow.png"
                          alt="arrow"
                        />
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
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
