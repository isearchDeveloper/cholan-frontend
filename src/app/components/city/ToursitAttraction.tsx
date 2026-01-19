"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CommonModal from "@/app/components/common/CommonModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { useState } from "react";

interface ToursitAttractionProps {
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

export default function ToursitAttraction({
  cityName,
  data,
}: ToursitAttractionProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleOpen = (item: any) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div
      className="places-to-visit-section py-5"
      style={{ background: "#e9f4ff" }}
    >
      <div className="container">
        <h2 className="text-center mb-4 fs-2 fw-bold">
          Tourist Attractions In {cityName}
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
                    <h5
                      className="place-title"
                      onClick={() => handleOpen(item)}
                    >
                      {item.title}
                    </h5>
                    {/* /* <p className="places-card-subtitle">{item.subtitle}</p> */}
                    <p className="places-card-subtitle">
                      {truncateByChars(item.subtitle || "", 60)}

                      {(item.subtitle?.split(" ").length ?? 0) > 18 && (
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
