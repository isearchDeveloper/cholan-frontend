
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

const InterTourPackage = ({ trendingInternationalData }: any) => {
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
    <section className="srilanka-tourpackege-sec py-5 using-for-dubbl-slider pt-0">
      <div className="container">
        <div className="common-header-inline">
          <h2 className="fs-3">
            Top Trending <span className="color-orange">International</span>{" "}
            Tour Packages
          </h2>
          <Link href={`/international-holidays`}>
            View All Packages
            <span>
              <Image
                width={23}
                height={23}
                sizes="100vw"
                src="/images/blue-arrow.png"
                alt=""
              />
            </span>
          </Link>
        </div>

        {/* ============ JS ON: Swiper Slider ============ */}
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
            {trendingInternationalData?.map((data: any) => (
              <SwiperSlide key={data.id ?? data.slug}>
                <div className="slider-card">
                  <div className="sngl-card-wraper">
                    <div
                      className="image-box"
                      style={{ cursor: "pointer" }}
                      onClick={() => setUrl(data.slug)}
                    >
                      {/* badges block kept commented as in your code */}
                      <div className="slider-box">
                        <div
                          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                          style={{ position: "relative" }}
                        >
                          <Swiper loop={true} spaceBetween={30} slidesPerView={1}>
                            {/* {data.images?.map((img: any, idx: number) => ( */}
                            {[
                              {
                                image_path: data.primary_image || "/images/no-img.webp",
                                image_alt: data.primary_image_alt || "Primary Image",
                                id: "primary",
                              },
                              ...(data.images?.filter(
                                (img: any) => img.image_path !== data.primary_image
                              ) || []),
                            ].map((img: any, idx: number) => (
                              <SwiperSlide key={img.id ?? idx}>
                                <div className="slider-content">
                                  <div className="slider-content-wraper">
                                    <Image
                                      width={800}
                                      height={600}
                                      sizes="100vw"
                                      className="custom-hover"
                                      src={img.image_path || "/images/no-img.webp"}
                                      alt={img.image_alt || "/images/no-img.webp"}
                                    />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>
                    </div>

                    <div className="content-box">
                      <h3
                        title={data.title}
                        onClick={() => setUrl(data.slug)}
                        className="truncate line-clamp-hotel_one"
                        style={{ cursor: "pointer" }}
                      >
                        {data.title}
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
                            {data.location?.country?.name}
                          </div>

                          <div className="right-area d-flex align-items-center gap-1">
                            {data.rating && data.rating > 0
                              ? [...Array(5)].map((_, i) => {
                                const ratingVal = data.rating;
                                const full = i + 1 <= Math.floor(ratingVal);
                                const half = !full && i < ratingVal;

                                if (full) {
                                  return (
                                    <svg
                                      key={`full-${i}`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="orange"
                                      className="mb-1"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 
                                          6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
                                          0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
                                          3.356.83 4.73c.078.443-.36.79-.746.592L8 
                                          13.187l-4.389 2.256z" />
                                    </svg>
                                  );
                                } else if (half) {
                                  return (
                                    <svg
                                      key={`half-${i}`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      className="mb-1"
                                    >
                                      <defs>
                                        <linearGradient id={`halfGradBlue${i}`}>
                                          <stop offset="50%" stopColor="blue" />
                                          <stop offset="50%" stopColor="transparent" />
                                        </linearGradient>
                                      </defs>
                                      <path
                                        fill={`url(#halfGradBlue${i})`}
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 
                                            6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
                                            0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
                                            3.356.83 4.73c.078.443-.36.79-.746.592L8 
                                            13.187l-4.389 2.256z"
                                      />
                                    </svg>
                                  );
                                }
                                return null;
                              })
                              : null}
                          </div>
                        </li>
                      </ul>

                      <div className="tour-short-details">
                        {mounted && data.short_description && (
                          <div
                            title={data?.short_description.replace(/<[^>]*>/g, "")}
                            dangerouslySetInnerHTML={{
                              __html: (() => {
                                const html = data.short_description || "";
                                const words = html.split(" ");
                                return words.length > 15
                                  ? words.slice(0, 15).join(" ") + "..."
                                  : html;
                              })(),
                            }}
                            className="line-clamp"
                          />
                        )}
                      </div>

                      <ul className="fecility-box">
                        {data?.details?.facilities
                          ?.slice(0, 4)
                          .map((facility: string) => {
                            const matchedAmenity = amenitiesData.find(
                              (item) => item.name === facility
                            );
                            if (!matchedAmenity) return null;
                            return (
                              <li key={facility}>
                                <span>
                                  <Image
                                    width={16}
                                    height={16}
                                    sizes="100vw"
                                    src={matchedAmenity.img || "/images/no-img.webp"}
                                    alt={matchedAmenity.label}
                                    className="svg-iconcard"
                                  />
                                </span>
                                {matchedAmenity.label}
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
                          {data.details?.duration_nights}{" "}
                          {data.details?.duration_nights < 2 ? "Night" : "Nights"}{" "}
                          / {data.details?.duration_days}{" "}
                          {data.details?.duration_days < 2 ? "Day" : "Days"}
                        </li>
                      </ul>

                      <div className="btm-btn">
                        <Link href={`/packages/${data.slug}`} className="btn blue-btn">
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

export default InterTourPackage;
