"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import { useRouter } from "next/navigation";

type PackageItem = {
  id?: string | number;
  slug: string;
  display_slug?: string;
  title: string;
  primary_image?: string;
  primary_image_alt?: string | null;
  images?: Array<{
    id?: string | number;
    image_path: string;
    image_alt?: string | null;
  }>;
  rating?: number | null;
  short_description?: string;
  details?: {
    facilities?: string[];
    duration_nights?: number;
    duration_days?: number;
  };
  location?: {
    name?: string;
    country?: {
      name?: string;
    };
  };
};

const amenitiesData = [
  { name: "flight", img: "/images/flight.png", label: "Flights" },
  { name: "transport", img: "/images/bus.png", label: "Transfers" },
  { name: "breakfast", img: "/images/food.png", label: "Breakfast" },
  { name: "hotel", img: "/hotel.svg", label: "Hotel" },
  { name: "train", img: "/train.png", label: "Train" },
  { name: "sightseeing", img: "/landscape.svg", label: "Sightseeing" },
  { name: "meal", img: "/meal.svg", label: "Meal" },
  { name: "restaurant", img: "/restaurant.svg", label: "Restaurant" },
  { name: "bar", img: "/pub.svg", label: "Bar" },
  { name: "wifi", img: "/wifi.svg", label: "Wi-Fi" },
];

function sanitizeAndTrimHtml(html?: string, words = 15) {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const parts = text.split(" ");
  return parts.length > words ? parts.slice(0, words).join(" ") + "..." : text;
}

const IndiaTourPackage = ({
  exclusiveIndiaPackage = [] as PackageItem[],
}: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const innerSwiperRefs = useRef<Record<string, SwiperType | null>>({});
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // JS enabled → remove no-js class for global fallbacks
    document?.body?.classList?.remove("no-js");
    setMounted(true);
  }, []);

  const goToPackage = (slug: string) => router.push(`/packages/${slug}`);

  // helper: choose an image for noscript/fallback
  const firstImage = (p: PackageItem) =>
    p.images?.[0]?.image_path || p.primary_image || "/images/no-img.webp";

  const firstAlt = (p: PackageItem) =>
    p.images?.[0]?.image_alt || p.primary_image_alt || "image";

  const countryNameLower =
    exclusiveIndiaPackage?.[0]?.location?.country?.name?.toLowerCase() || "";

  if (!exclusiveIndiaPackage || exclusiveIndiaPackage.length === 0) {
    return null;
  }

  const slides = exclusiveIndiaPackage || [];
  const slidesPerView = 3;
  const slidesPerGroup = 3; // default behaviour
  const canLoop = slides.length >= slidesPerView + slidesPerGroup;

  return (
    <section className="tourpackege-sec py-5 using-for-dubbl-slider">
      <div className="container">
        <div className="common-header-center">
          <h2 className="fs-3">Exclusive India Tour Packages</h2>
        </div>

        {/* ===== JS ON: Full slider UI ===== */}
        <div
          className="js-only"
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={canLoop}
            spaceBetween={30}
            slidesPerView={slidesPerView}
            slidesPerGroup={slidesPerGroup}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: slidesPerView },
            }}
          >
            {exclusiveIndiaPackage.map((exclusive: PackageItem) => {
              const key = String(exclusive.slug);

              return (
                <SwiperSlide key={exclusive.id ?? key}>
                  <div className="slider-card">
                    <div className="sngl-card-wraper">
                      {/* Clickable image area */}
                      <div
                        className="image-box"
                        style={{ cursor: "pointer" }}
                        onClick={() => goToPackage(exclusive.slug)}
                      >
                        <div className="slider-box">
                          <div className="slider-content">
                            <div className="slider-content-wraper">
                              <Image
                                src={
                                  exclusive.primary_image ||
                                  "/images/no-img.webp"
                                }
                                alt={
                                  exclusive.primary_image_alt || "Primary Image"
                                }
                                width={800}
                                height={600}
                                sizes="100vw"
                                className="custom-hover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="content-box">
                        <h3
                          title={exclusive.title}
                          onClick={() => goToPackage(exclusive.slug)}
                          className="truncate line-clamp-hotel_one"
                          style={{ cursor: "pointer" }}
                        >
                          {exclusive.title}
                        </h3>

                        {/* location + rating */}
                        <ul className="location-box mb-2">
                          <li>
                            <div className="left-area">
                              <span>
                                <Image
                                  width={12}
                                  height={12}
                                  sizes="100vw"
                                  src="/images/location.png"
                                  alt=""
                                />
                              </span>
                              {exclusive.location?.country?.name || ""}
                            </div>

                            <div className="right-area d-flex align-items-center gap-1">
                              {exclusive.rating && exclusive.rating > 0
                                ? [...Array(5)].map((_, i) => {
                                    const ratingVal =
                                      exclusive.rating as number;
                                    const full = i + 1 <= Math.floor(ratingVal);
                                    const half = !full && i < ratingVal;

                                    if (full) {
                                      return (
                                        <svg
                                          key={i}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="orange"
                                          className="mb-1"
                                          viewBox="0 0 16 16"
                                        >
                                          <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 
                                            6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
                                            0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
                                            3.356.83 4.73c.078.443-.36.79-.746.592L8 
                                            13.187l-4.389 2.256z"
                                          />
                                        </svg>
                                      );
                                    } else if (half) {
                                      return (
                                        <svg
                                          key={i}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          className="mb-1"
                                        >
                                          <defs>
                                            <linearGradient
                                              id={`halfGrad${key}-${i}`}
                                            >
                                              <stop
                                                offset="50%"
                                                stopColor="orange"
                                              />
                                              <stop
                                                offset="50%"
                                                stopColor="transparent"
                                              />
                                            </linearGradient>
                                          </defs>
                                          <path
                                            fill={`url(#halfGrad${key}-${i})`}
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 
                                              6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
                                              0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
                                              3.356.83 4.73c.078.443-.36.79-.746.592L8 
                                              13.187l-4.389 2.256z"
                                          />
                                        </svg>
                                      );
                                    }
                                    return (
                                      <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="lightgray"
                                        className="mb-1"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 
                                          6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
                                          0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
                                          3.356.83 4.73c.078.443-.36.79-.746.592L8 
                                          13.187l-4.389 2.256z"
                                        />
                                      </svg>
                                    );
                                  })
                                : null}
                            </div>
                          </li>
                        </ul>

                        {/* short description (mounted only to avoid hydration mismatch) */}
                        <div className="tour-short-details">
                          {mounted && exclusive.short_description ? (
                            <div
                              title={sanitizeAndTrimHtml(
                                exclusive.short_description,
                                60,
                              )}
                              className="line-clamp"
                              dangerouslySetInnerHTML={{
                                __html: sanitizeAndTrimHtml(
                                  exclusive.short_description,
                                  15,
                                ),
                              }}
                            />
                          ) : null}
                        </div>

                        {/* facilities + duration */}
                        <ul className="fecility-box">
                          {exclusive.details?.facilities
                            ?.slice(0, 4)
                            .map((facility) => {
                              const amenity = amenitiesData.find(
                                (a) => a.name === facility,
                              );
                              if (!amenity) return null;
                              return (
                                <li key={facility}>
                                  <span>
                                    <Image
                                      width={16}
                                      height={16}
                                      sizes="100vw"
                                      src={amenity.img}
                                      alt={amenity.label}
                                      className="svg-iconcard"
                                    />
                                  </span>
                                  {amenity.label}
                                </li>
                              );
                            })}

                          <li>
                            <span>
                              <Image
                                width={16}
                                height={16}
                                sizes="100vw"
                                src="/images/moon.png"
                                alt=""
                              />
                            </span>
                            {exclusive.details?.duration_nights ?? 0}{" "}
                            {(exclusive.details?.duration_nights ?? 0) < 2
                              ? "Night"
                              : "Nights"}{" "}
                            / {exclusive.details?.duration_days ?? 0}{" "}
                            {(exclusive.details?.duration_days ?? 0) < 2
                              ? "Day"
                              : "Days"}
                          </li>
                        </ul>

                        <div className="btm-btn">
                          <Link
                            href={`/packages/${exclusive.slug}`}
                            className="btn blue-btn"
                          >
                            Explore More
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
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* ===== JS OFF: show first 3 static cards (no slider) ===== */}
        <noscript>
          <div className="row mt-4">
            {exclusiveIndiaPackage.slice(0, 3).map((exclusive: PackageItem) => (
              <div className="col-md-4 mb-3" key={exclusive.slug}>
                <div className="slider-card">
                  <div className="sngl-card-wraper">
                    <a href={`/packages/${exclusive.slug}`}>
                      <div className="image-box">
                        <img
                          src={firstImage(exclusive)}
                          alt={firstAlt(exclusive)}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </a>

                    <div className="content-box">
                      <a href={`/packages/${exclusive.slug}`}>
                        <h3
                          title={exclusive.title}
                          className="truncate line-clamp-hotel_one"
                        >
                          {exclusive.title}
                        </h3>
                      </a>

                      <ul className="location-box mb-2">
                        <li>
                          <div className="left-area">
                            <span>
                              <img
                                width={12}
                                height={12}
                                src="/images/location.png"
                                alt=""
                                style={{ verticalAlign: "middle" }}
                              />
                            </span>
                            {exclusive.location?.country?.name || ""}
                          </div>
                        </li>
                      </ul>

                      <div className="tour-short-details">
                        <div className="line-clamp">
                          {sanitizeAndTrimHtml(exclusive.short_description, 15)}
                        </div>
                      </div>

                      <ul className="fecility-box">
                        {(exclusive.details?.facilities || [])
                          .slice(0, 4)
                          .map((facility) => {
                            const amenity = amenitiesData.find(
                              (a) => a.name === facility,
                            );
                            if (!amenity) return null;
                            return (
                              <li key={facility}>
                                <span>
                                  <img
                                    width={16}
                                    height={16}
                                    src={amenity.img}
                                    alt={amenity.label}
                                  />
                                </span>
                                {amenity.label}
                              </li>
                            );
                          })}
                        <li>
                          <span>
                            <img
                              width={16}
                              height={16}
                              src="/images/moon.png"
                              alt=""
                            />
                          </span>
                          {exclusive.details?.duration_nights ?? 0}{" "}
                          {(exclusive.details?.duration_nights ?? 0) < 2
                            ? "Night"
                            : "Nights"}{" "}
                          / {exclusive.details?.duration_days ?? 0}{" "}
                          {(exclusive.details?.duration_days ?? 0) < 2
                            ? "Day"
                            : "Days"}
                        </li>
                      </ul>

                      <div className="btm-btn">
                        <a
                          href={`/packages/${exclusive.slug}`}
                          className="btn blue-btn"
                        >
                          Explore More
                          <span>
                            <img
                              width={23}
                              height={23}
                              src="/images/button-arrow.png"
                              alt=""
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </noscript>

        {/* Bottom CTA */}
        <div className="btm-button text-center mt-4">
          <Link
            href={countryNameLower ? `/${countryNameLower}` : "#"}
            className="btn blue-btn"
          >
            View All Packages
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
    </section>
  );
};

export default IndiaTourPackage;
