"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import { useRouter } from "next/navigation";

const CommonPackage = ({ similarPackage }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const router = useRouter();

  // JS ON → remove no-js class
  useEffect(() => {
    document?.body?.classList?.remove("no-js");
  }, []);

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

  const setUrl = (slug: any) => {
    router.push(`/packages/${slug}`);
  };

  return (
    <section className="tourpackege-sec py-5 using-for-dubbl-slider">
      <div className="container">
        <div className="common-header-center">
          <h2 className="fs-3">Similar Tour Packages</h2>
        </div>

        {/* ✅ JS ON: REAL SWIPER */}
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
            loop={true}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {similarPackage?.map((common: any) => (
              <SwiperSlide key={common.id}>
                <div className="slider-card">
                  <div className="sngl-card-wraper">

                    {/* IMAGE */}
                    <div
                      className="image-box"
                      style={{ cursor: "pointer" }}
                      onClick={() => setUrl(common.slug)}
                    >
                      <div className="slider-box">
                        <div style={{ position: "relative" }}>
                          <Swiper loop={true} spaceBetween={30} slidesPerView={1}>
                            {common.images.map((img: any) => (
                              <SwiperSlide key={img.id}>
                                <div className="slider-content">
                                  <div className="slider-content-wraper">
                                    <Image
                                      width={800}
                                      height={600}
                                      sizes="100vw"
                                      src={img.image_path || "/images/no-img.webp"}
                                      alt={img.image_alt || "img"}
                                    />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="content-box">
                      <h3
                        title={common.title}
                        onClick={() => setUrl(common.slug)}
                        className="truncate line-clamp-hotel_one"
                        style={{ cursor: "pointer" }}
                      >
                        {common.title}
                      </h3>

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
                            {common.location.country.name}
                          </div>

                          <div className="right-area">
                            {common.rating > 0 &&
                              [...Array(Math.ceil(common.rating))].map((_, i) => {
                                const ratingVal = common.rating;
                                const full = i + 1 <= Math.floor(ratingVal);
                                const half = !full && i < ratingVal;

                                if (full) {
                                  return (
                                    <svg key={i} width="16" height="16" fill="orange">
                                      <path d="M3.6 15.4c-.3.2-.8-.1-.7-.6l.8-4.7L.1 
                                        6.7c-.3-.3-.1-.9.3-.9l4.9-.7L7.5.7c.2-.4.7-.4.9 
                                        0l2.1 4.3 4.9.7c.4.1.6.6.3.9l-3.5 3.4.8 4.7c.1.4-.3.8-.7.6L8 
                                        13.1l-4.4 2.3z"/>
                                    </svg>
                                  );
                                }
                                if (half) {
                                  return (
                                    <svg key={i} width="16" height="16">
                                      <defs>
                                        <linearGradient id={`half${i}`}>
                                          <stop offset="50%" stopColor="orange" />
                                          <stop offset="50%" stopColor="transparent" />
                                        </linearGradient>
                                      </defs>
                                      <path
                                        fill={`url(#half${i})`}
                                        d="M3.6 15.4c-.3.2-.8-.1-.7-.6l.8-4.7L.1 
                                          6.7c-.3-.3-.1-.9.3-.9l4.9-.7L7.5.7c.2-.4.7-.4.9 
                                          0l2.1 4.3 4.9.7c.4.1.6.6.3.9l-3.5 3.4.8 4.7c.1.4-.3.8-.7.6L8 
                                          13.1l-4.4 2.3z"
                                      />
                                    </svg>
                                  );
                                }
                              })}
                          </div>
                        </li>
                      </ul>

                      <div className="tour-short-details">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: (() => {
                              const html = common.short_description || "";
                              const words = html.split(" ");
                              return words.length > 15
                                ? words.slice(0, 15).join(" ") + "..."
                                : html;
                            })(),
                          }}
                          className="line-clamp"
                        />
                      </div>

                      <ul className="fecility-box">
                        {common.details.facilities.slice(0, 4).map((f: string) => {
                          const x = amenitiesData.find((a) => a.name === f);
                          if (!x) return null;

                          return (
                            <li key={f}>
                              <span>
                                <Image
                                  width={16}
                                  height={16}
                                  sizes="100vw"
                                  src={x.img}
                                  alt={x.label}
                                />
                              </span>
                              {x.label}
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

                          {[
                            common.details?.duration_nights
                              ? `${common.details.duration_nights} ${common.details.duration_nights < 2 ? "Night" : "Nights"
                              }`
                              : null,
                            common.details?.duration_days
                              ? `${common.details.duration_days} ${common.details.duration_days < 2 ? "Day" : "Days"
                              }`
                              : null,
                          ]
                            .filter(Boolean)
                            .join(" / ")}
                        </li>
                      </ul>

                      <div className="btm-btn">
                        <Link href={`/packages/${common.slug}`} className="btn blue-btn">
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
            ))}
          </Swiper>
        </div>

        {/* ✅ JS OFF: NOSCRIPT STATIC CARDS */}
        <noscript>
          <div className="row mt-4">
            {similarPackage.slice(0, 3).map((common: any) => {
              const plain = (common.short_description || "")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();

              const short =
                plain.split(" ").length > 15
                  ? plain.split(" ").slice(0, 15).join(" ") + "..."
                  : plain;

              return (
                <div className="col-md-4 mb-4" key={common.slug}>
                  <div className="slider-card">
                    <div className="sngl-card-wraper">
                      {/* IMAGE */}
                      <a href={`/packages/${common.slug}`}>
                        <div className="image-box">
                          <img
                            src={common.primary_image}
                            alt={common.primary_image_alt || "image"}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </a>

                      {/* CONTENT */}
                      <div className="content-box">
                        <a href={`/packages/${common.slug}`}>
                          <h3 className="line-clamp-hotel_one">{common.title}</h3>
                        </a>

                        <ul className="location-box mb-2">
                          <li>
                            <div className="left-area">
                              <span>
                                <img
                                  src="/images/location.png"
                                  width="12"
                                  height="12"
                                  alt=""
                                />
                              </span>
                              {common.location.country.name}
                            </div>
                          </li>
                        </ul>

                        <div className="tour-short-details">
                          <p className="line-clamp">{short}</p>
                        </div>

                        <ul className="fecility-box">
                          {common.details.facilities.slice(0, 4).map((f: string) => {
                            const icon = {
                              flight: "/images/flight.png",
                              transport: "/images/bus.png",
                              breakfast: "/images/food.png",
                              hotel: "/hotel.svg",
                              train: "/train.png",
                              sightseeing: "/landscape.svg",
                              meal: "/meal.svg",
                              restaurant: "/restaurant.svg",
                              bar: "/pub.svg",
                              wifi: "/wifi.svg",
                            }[f];

                            const label = {
                              flight: "Flights",
                              transport: "Transfers",
                              breakfast: "Breakfast",
                              hotel: "Hotel",
                              train: "Train",
                              sightseeing: "Sightseeing",
                              meal: "Meal",
                              restaurant: "Restaurant",
                              bar: "Bar",
                              wifi: "Wi-Fi",
                            }[f];

                            return (
                              <li key={f}>
                                <span>
                                  <img src={icon} width="16" height="16" alt={label} />
                                </span>
                                {label}
                              </li>
                            );
                          })}

                          <li>
                            <span>
                              <img src="/images/moon.png" width="16" height="16" alt="" />
                            </span>

                            {[
                              common.details?.duration_nights
                                ? `${common.details.duration_nights} ${common.details.duration_nights < 2 ? "Night" : "Nights"
                                }`
                                : null,
                              common.details?.duration_days
                                ? `${common.details.duration_days} ${common.details.duration_days < 2 ? "Day" : "Days"
                                }`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" / ")}
                          </li>
                        </ul>

                        <a href={`/packages/${common.slug}`} className="btn blue-btn">
                          Explore More
                          <span>
                            <img
                              src="/images/button-arrow.png"
                              width="23"
                              height="23"
                              alt=""
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </noscript>

        {/* Bottom Button (same) */}
        {similarPackage.length < 2 ? null : (
          <div className="btm-button text-center mt-4">
            <Link
              href={
                similarPackage[0].location.country.name.toLowerCase() === "india" ||
                  similarPackage[0].location.country.name.toLowerCase() === "srilanka"
                  ? `/${similarPackage[0].location.country.name.toLowerCase()}`
                  : "/international-holidays"
              }
              className="btn blue-btn"
            >
              View All Packages
              <span>
                <Image width={23} height={23} src="/images/button-arrow.png" alt="" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommonPackage;
