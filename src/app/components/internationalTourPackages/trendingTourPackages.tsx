"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import { useRouter } from "next/navigation";
 
const trendingTourPackages = ({ trendingInternationalData }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const router = useRouter();
 
  // mark JS enabled (pairs with body.no-js)
  useEffect(() => {
    document?.body?.classList?.remove("no-js");
  }, []);
 
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
 
  const setUrl = (slug: any) => {
    router.push(`/packages/${slug}`);
  };
 
  function truncateTitle(text: string, wordLimit = 10) {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }
 
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
 
  return (
    <section className="srilanka-tourpackege-sec interntional-tending-packages py-5 pt-5 using-for-dubbl-slider pt-0">
      <div className="container">
        <div className="common-header-inline justify-content-center">
          <h2 className="fs-3 text-center">
            Popular International Holiday Packages
          </h2>
        </div>
 
        {/* ============ JS ON: Swiper Slider ============ */}
        <div
          className="js-only">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            navigation={{enabled: true}}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }}
            loop={true}
            loopAdditionalSlides={trendingInternationalData.length}
            watchSlidesProgress={true}
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="india-international-packages-slider"
          >
            {trendingInternationalData?.map((data: any) => (
              <SwiperSlide key={data.id ?? data.slug}>
                <div className="slider-card">
                  <div className="sngl-card-wraper">
                    <a href={`/packages/${data.slug}`}>
                      <div className="ts-holiday-card">
                        <img src={data.primary_image || "/images/no-img.webp"} />
                        <div className="ts-holiday-content">
                          <h3 className="ts-holiday-title">{truncateTitle(data.title, 10)}</h3>
                          <div className="ts-holiday-duration">
                            <span>
                              <Image
                                width={16}
                                height={16}
                                sizes="100vw"
                                src="/images/moon.png"
                                alt=""
                              />
                            </span>
                            {data.details?.duration_nights ?? 0}{" "}
                            {(data.details?.duration_nights ?? 0) < 2 ? "Night" : "Nights"}{" "}
                            / {data.details?.duration_days ?? 0}{" "}
                            {(data.details?.duration_days ?? 0) < 2 ? "Day" : "Days"}</div>
                          <a href={`/packages/${data.slug}`} className="ts-holiday-btn">Explore More</a>
                        </div>
                      </div>
                    </a>
 
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
 
        {/* ============ JS OFF: Static first 3 cards (same design) ============ */}
        <noscript>
          <div className="row mt-4">
            {trendingInternationalData.slice(0, 3).map((data: any) => {
              // ✅ Short description trimmed (safe for SSR)
              const plain = (data?.short_description || "")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();
 
              const short =
                plain.split(" ").length > 15
                  ? plain.split(" ").slice(0, 15).join(" ") + "..."
                  : plain;
 
              return (
                <div className="col-md-4 mb-3" key={data.slug}>
                  <div className="slider-card">
                    <div className="sngl-card-wraper">
 
                      {/* Image */}
                      <a href={`/packages/${data.slug}`}>
                        <div className="image-box">
                          <img
                            src={data.primary_image}
                            alt={data.primary_image_alt || "image"}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </div></a>
 
                      {/* Content */}
                      <div className="content-box">
                        <a href={`/packages/${data.slug}`}>
                          <h3 className="line-clamp-hotel_one">{data.title}</h3></a>
 
                        {/* Location */}
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
                              {data.location?.country?.name}
                            </div>
                          </li>
                        </ul>
 
                        {/* ✅ Short Description */}
                        <div className="tour-short-details">
                          <p className="line-clamp">{short}</p>
                        </div>
 
                        {/* ✅ Facilities — COMPACT STATIC MAP */}
                        <ul className="fecility-box">
                          {data.details?.facilities?.slice(0, 4).map((f: string) => {
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
 
                          {/* Nights / Days */}
                          <li>
                            <span>
                              <img
                                src="/images/moon.png"
                                width="16"
                                height="16"
                                alt=""
                              />
                            </span>
                            {data.details.duration_nights}{" "}
                            {data.details.duration_nights < 2 ? "Night" : "Nights"} /{" "}
                            {data.details.duration_days}{" "}
                            {data.details.duration_days < 2 ? "Day" : "Days"}
                          </li>
                        </ul>
 
                        {/* Button */}
                        <a href={`/packages/${data.slug}`} className="btn blue-btn">
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
 
      </div>
    </section>
  );
};
 
export default trendingTourPackages;