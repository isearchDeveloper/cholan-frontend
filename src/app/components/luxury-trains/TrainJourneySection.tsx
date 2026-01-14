"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import HeritageCard from "../train/HeritageCard";

import "swiper/css";
import "swiper/css/pagination";

interface TourItem {
  slug: string;
  title: string;
  primary_image?: string;
  details?: {
    route_details?: string;
    duration_nights?: number;
    duration_days?: number;
  };
}

interface Props {
  tours: TourItem[];
  trainTitle: string;
}

export default function TrainJourneySection({ tours, trainTitle }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!tours || tours.length === 0) return null;

  // ✅ Helper for static image
  const getImageUrl = (item: TourItem) =>
    item?.primary_image || "/images/no-img.webp";

  return (
    <div className="train-journey-section">
      <h2 className="mb-4 color-blue text-center font-semibold fs-3">
        {`${trainTitle} Journey`}
      </h2>

      {/* ✅ JS Enabled (after hydration) */}
      {mounted ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {tours.map((data) => (
            <SwiperSlide key={data.slug}>
              <HeritageCard data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // 🚫 JS Disabled or SSR – show first 4 cards statically
        <div className="row justify-content-center g-4 mt-4">
          {tours.slice(0, 4).map((data) => (
            <div key={data.slug} className="col-md-3 col-sm-6">
              <div className="max-w-100 overflow-hidden bg-white tourCard heritage-card p-0">
                <a
                  href={`/luxury-trains/${data.slug}`}
                  className="d-block overflow-hidden rounded-3"
                >
                  <img
                    src={getImageUrl(data)}
                    alt={data.title || "Luxury Train"}
                    className="w-100 h-56 object-cover"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = "/images/no-img.webp")
                    }
                  />
                </a>

                <div className="p-3 pb-0">
                   <a
                  href={`/luxury-trains/${data.slug}`}><h5 className="mb-3 text-black font-semibold">
                    {data.title}
                  </h5></a>

                  {data.details?.route_details && (
                    <p className="text-[#575757] text-sm mb-2 d-flex align-items-start gap-2">
                      <img
                        src="/images/icon/location.svg"
                        className="-ms-2"
                        alt="icon"
                        width={16}
                        height={16}
                      />
                      <span
                        className="text-truncate d-inline-block"
                        style={{ maxWidth: "200px" }}
                      >
                        {data.details.route_details}
                      </span>
                    </p>
                  )}

                  <p className="text-[#575757] text-sm mb-2 d-flex align-items-start gap-2">
                    <img
                      src="/images/icon/clock.svg"
                      className="ms-1"
                      alt="icon"
                      width={16}
                      height={16}
                    />
                    <span>
                      {data?.details?.duration_nights}{" "}
                      {data?.details?.duration_nights === 1
                        ? "Night"
                        : "Nights"}{" "}
                      / {data?.details?.duration_days}{" "}
                      {data?.details?.duration_days === 1 ? "Day" : "Days"}
                    </span>
                  </p>
                </div>

                <div className="mx-auto w-100 p-4 pt-2">
                  <div className="button text-center">
                    <a
                      href={`/luxury-trains/${data.slug}`}
                      className="btn blue-btn w-100"
                      style={{
                        backgroundColor: "#05164D",
                        color: "#fff",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "10px 0",
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                      }}
                    >
                      View Details
                      <span>
                        <img
                          src="/images/button-arrow.png"
                          width={20}
                          height={20}
                          alt="arrow"
                          style={{ filter: "invert(1)" }}
                        />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
