"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PackageItem {
  slug: string;
  title: string;
  primary_image: string;
  details: {
    duration_nights: number;
    duration_days: number;
  };
}

export default function PopularThemePackages({
  packages,
  themeTitle,
}: {
  packages: PackageItem[];
  themeTitle: string;
}) {
  if (!packages?.length) return null;

  return (
    <section className="popular-packages container py-5">
      <h2 className="text-center mb-4 fs-3 fw-bold">
        Popular {themeTitle} Tour Packages
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {packages.map((pkg, index) => (
          <SwiperSlide key={index}>
            <div className="slider-card1">
              <Link href={`/packages/${pkg.slug}`}>
                <div className="ts-holiday-card">
                  <img
                    src={
                      pkg.primary_image
                        ? `https://cdn.cholantours.com/${pkg.primary_image}`
                        : "/images/no-img.webp"
                    }
                    alt={pkg.title}
                    className="package-img"
                  />

                  <div className="ts-holiday-content">
                    <h3 className="ts-holiday-title">{pkg.title}</h3>

                    <div className="ts-holiday-duration">
                      {[
                        pkg.details?.duration_nights
                          ? `${pkg.details.duration_nights} ${pkg.details.duration_nights < 2 ? "Night" : "Nights"
                          }`
                          : null,
                        pkg.details?.duration_days
                          ? `${pkg.details.duration_days} ${pkg.details.duration_days < 2 ? "Day" : "Days"
                          }`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" / ")}
                    </div>

                    <button className="ts-holiday-btn">
                      Explore More
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
