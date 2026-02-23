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

// ✅ Dummy Data
const dummyPackages: PackageItem[] = [
  {
    slug: "goa-beach-tour",
    title: "Goa Beach Tour Package",
    primary_image: "images/goa.webp",
    details: {
      duration_nights: 4,
      duration_days: 5,
    },
  },
  {
    slug: "kerala-backwater-tour",
    title: "Kerala Backwater Tour",
    primary_image: "images/kerala.webp",
    details: {
      duration_nights: 5,
      duration_days: 6,
    },
  },
  {
    slug: "rajasthan-heritage-tour",
    title: "Rajasthan Heritage Tour",
    primary_image: "images/rajasthan.webp",
    details: {
      duration_nights: 6,
      duration_days: 7,
    },
  },
];

export default function PopularThemePackagesDummy({
  themeTitle = "Featured",
}: {
  themeTitle?: string;
}) {
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
        {dummyPackages.map((pkg, index) => (
          <SwiperSlide key={index}>
            <div className="slider-card1">
              <Link href={`/packages/${pkg.slug}`}>
                <div className="ts-holiday-card">
                  <img
                    src={
                      pkg.primary_image
                        ? `/${pkg.primary_image}`
                        : "/images/no-img.webp"
                    }
                    alt={pkg.title}
                    className="package-img"
                  />

                  <div className="ts-holiday-content">
                    <h3 className="ts-holiday-title">{pkg.title}</h3>

                    <div className="ts-holiday-duration">
                      {pkg.details.duration_nights} Nights /{" "}
                      {pkg.details.duration_days} Days
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