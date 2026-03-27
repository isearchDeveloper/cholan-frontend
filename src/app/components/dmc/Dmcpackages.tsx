"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import { DmcPackage } from "@/app/services/dmcServices";

type PackageWithDuration = DmcPackage & {
    duratioin_days?: number;
    duration_nights?: number;
};

interface Props {
    packages: PackageWithDuration[];
    cityName: string;
}

function truncateTitle(text: string, wordLimit = 10) {
    const words = text.split(" ");
    return words.length <= wordLimit
        ? text
        : words.slice(0, wordLimit).join(" ") + "...";
}

// function sanitizeAndTrimHtml(html?: string, words = 12) {
//   if (!html) return "";
//   const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
//   const parts = text.split(" ");
//   return parts.length > words
//     ? parts.slice(0, words).join(" ") + "..."
//     : text;
// }

function formatDuration(nights = 0, days = 0) {
    return `${nights} ${nights === 1 ? "Night" : "Nights"} / ${days} ${days === 1 ? "Day" : "Days"
        }`;
}

const DmcPackages = ({ packages, cityName }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!packages?.length) return null;

    // console.log("packages data1", packages);


    return (
        <section className="py-1 pb-3 india-popular-packages">
            <div className="container">

                <div className="common-header-center">
                    <h2 className="fs-3">Tour Packages in {cityName}</h2>
                </div>

                {/* 🔥 BEFORE JS LOAD → FULL STATIC CARDS */}
                {!mounted ? (
                    <div className="row mt-4">
                        {packages.slice(0, 3).map((pkg) => (
                            <div className="col-md-4 mb-3" key={pkg.slug}>
                                <div className="slider-card">
                                    <div className="sngl-card-wraper">
                                        <a href={`/packages/${pkg.slug}`}>
                                            <div className="ts-holiday-card">

                                                <img
                                                    src={pkg.primary_image || "/images/no-img.webp"}
                                                    alt={pkg.primary_image_alt || pkg.title}
                                                />

                                                <div className="ts-holiday-content">
                                                    <h3 className="ts-holiday-title">
                                                        {truncateTitle(pkg.title, 10)}
                                                    </h3>

                                                    <div className="ts-holiday-duration">
                                                        <span>
                                                            <img src="/images/moon.png" width="16" height="16" alt="" />
                                                        </span>
                                                        {formatDuration(
                                                            pkg.duration_nights ?? 0,
                                                            pkg.duratioin_days ?? 0
                                                        )}
                                                    </div>

                                                    <a
                                                        href={`/packages/${pkg.slug}`}
                                                        className="ts-holiday-btn"
                                                    >
                                                        Explore More
                                                    </a>
                                                </div>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* 🔥 AFTER JS LOAD → SWIPER (SAME UI) */
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={packages.length > 3}
                        spaceBetween={30}
                        slidesPerView={4}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {packages.map((pkg) => (
                            <SwiperSlide key={pkg.slug}>
                                <div className="slider-card">
                                    <div className="sngl-card-wraper">
                                        <a href={`/packages/${pkg.slug}`}>
                                            <div className="ts-holiday-card">

                                                <img
                                                    src={pkg.primary_image || "/images/no-img.webp"}
                                                    alt={pkg.primary_image_alt || pkg.title}
                                                />

                                                <div className="ts-holiday-content">
                                                    <h3 className="ts-holiday-title">
                                                        {truncateTitle(pkg.title, 10)}
                                                    </h3>

                                                    <div className="ts-holiday-duration">
                                                        <span>
                                                            <img src="/images/moon.png" width="16" height="16" alt="" />
                                                        </span>
                                                        {formatDuration(
                                                            pkg.duration_nights ?? 0,
                                                            pkg.duratioin_days ?? 0
                                                        )}
                                                    </div>

                                                    <a
                                                        href={`/packages/${pkg.slug}`}
                                                        className="ts-holiday-btn"
                                                    >
                                                        Explore More
                                                    </a>
                                                </div>

                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default DmcPackages;