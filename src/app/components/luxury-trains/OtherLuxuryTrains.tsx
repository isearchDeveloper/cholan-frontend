"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import TrainCard from "./TrainCard";
import "swiper/css";
import "swiper/css/pagination";

interface TrainItem {
  slug: string;
  title: string;
  primary_image?: string;
  primary_image_alt?: string;
  image?: string;
  image_path?: string;
  images?: { image_path?: string; image_alt?: string }[];
  short_description?: string;
}

export default function OtherLuxuryTrains({
  similarTrains = [],
}: {
  similarTrains: TrainItem[];
}) {
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
  }, []);

  // ✅ helper: safely choose image URL
  const getImageUrl = (train: TrainItem) => {
    return (
      train.primary_image ||
      train.image ||
      train.image_path ||
      train.images?.[0]?.image_path ||
      "/images/no-img.webp"
    );
  };

  // ✅ helper: image alt text
  const getImageAlt = (train: TrainItem) => {
    return (
      train.primary_image_alt ||
      train.images?.[0]?.image_alt ||
      train.title ||
      "Luxury Train"
    );
  };

  // ✅ helper: short text preview
  const getShortDesc = (html?: string, limit = 20) => {
    if (!html) return "";
    const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  if (!similarTrains || similarTrains.length === 0) return null;

  return (
    <div className="py-5 lux-trains">
      <div className="container">
        <h2 className="mb-4 text-black text-center font-semibold fs-3">
          Other Luxury Trains
        </h2>

        {/* ✅ JS Enabled (Swiper Carousel) */}
        {jsEnabled ? (
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
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {similarTrains.map((data) => (
              <SwiperSlide key={data.slug}>
                <TrainCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* 🚫 JS Disabled (Static Fallback) */
          <div className="row justify-content-center g-4 mt-4">
            {similarTrains.slice(0, 3).map((data) => {
              const imageUrl = getImageUrl(data);
              const imageAlt = getImageAlt(data);
              const shortDesc = getShortDesc(data.short_description);

              return (
                <div key={data.slug} className="col-md-4 col-sm-6">
                  <div
                    className="card h-100 border-0 shadow-sm overflow-hidden rounded-4 bg-white p-3"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Image */}
                    <a
                      href={`/luxury-trains/${data.slug}`}
                      className="d-block rounded-4 overflow-hidden"
                    >
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-100 rounded-4"
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "/images/no-img.webp")
                        }
                      />
                    </a>

                    {/* Title & Short Desc */}
                    <div className="card-body text-center px-2">
                      <a
                      href={`/luxury-trains/${data.slug}`}> <h5 className="mb-2 text-black fw-semibold text-capitalize">
                        {data.title}
                      </h5></a>
                      {shortDesc && (
                        <p
                          className="text-muted small"
                          style={{
                            minHeight: "50px",
                            lineHeight: "1.4",
                            fontSize: "0.9rem",
                          }}
                        >
                          {shortDesc}
                        </p>
                      )}
                    </div>

                    {/* Explore Button */}
                    <div className="text-center pb-3">
                      <a
                        href={`/luxury-trains/${data.slug}`}
                        className="btn blue-btn d-inline-flex align-items-center justify-content-center w-100"
                        style={{
                          backgroundColor: "#05164D",
                          color: "#fff",
                          borderRadius: "8px",
                          textDecoration: "none",
                          padding: "10px 0",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          ((e.currentTarget.style.backgroundColor = "#1E2A6B"))
                        }
                        onMouseOut={(e) =>
                          ((e.currentTarget.style.backgroundColor = "#05164D"))
                        }
                      >
                        Explore More
                        <span className="ms-2">
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
