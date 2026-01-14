"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import HotelCard from "@/app/components/hotel/HotelCard";
import "swiper/css";
import "swiper/css/pagination";



export default function MoreLuxuryHotels({ luxuryHotels }: any) {
    const [jsEnabled, setJsEnabled] = useState(false);

    useEffect(() => {
        setJsEnabled(true);
    }, []);

    if (!luxuryHotels || luxuryHotels.length === 0) return null;

    // ✅ Fallback Helpers
    const getImageUrl = (hotel: any) =>
        hotel?.primary_image || "/images/no-img.webp";

    const getImageAlt = (hotel: any) =>
        hotel?.primary_image_alt || hotel?.title || "Luxury Hotel";

    const cleanText = (text: string, limit = 100) => {
        if (!text) return "";
        const stripped = text.replace(/<[^>]*>/g, "").trim();
        return stripped.length > limit ? stripped.slice(0, limit) + "..." : stripped;
    };

    const getHotelHref = (hotel: any) => `/luxury-hotels/${hotel.slug}`;

    return (
        <div className="py-5 lux-hotels">
            <div className="container">
                <h2 className="mb-4 text-center fs-3">More Luxury Hotels</h2>

                {/* ✅ JS Enabled (Swiper) */}
                {jsEnabled ? (
                    <div className="js-enabled">
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
                            {luxuryHotels.map((hotel: any) => (
                                <SwiperSlide key={hotel.slug}>
                                    <HotelCard data={hotel} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    // 🚫 JS Disabled (Static Grid)
                    <div className="js-disabled">
                        <div className="row justify-content-center g-4 mt-4">
                            {luxuryHotels.map((hotel: any, index: any) => (
                                <div key={index} className="col-md-4 col-sm-6">
                                    <div className="max-w-100 p-4 overflow-hidden bg-white rounded-4 heritage-card p-0 tourCard shadow-none">
                                        {/* 🖼️ Image */}
                                        <a href={getHotelHref(hotel)}>
                                            <img
                                                className="w-100 h-56 object-cover rounded-4 custom-hover"
                                                src={getImageUrl(hotel)}
                                                alt={getImageAlt(hotel)}
                                                onError={(e) =>
                                                    ((e.target as HTMLImageElement).src = "/images/no-img.webp")
                                                }
                                            />
                                        </a>

                                        {/* 📄 Details */}
                                        <div className="mt-3 pb-0 text-center px-2">
                                            <a href={getHotelHref(hotel)}><h5 className="mb-2 text-black font-semibold">
                                                {hotel?.title}
                                            </h5></a>
                                            <div className="text-[#575757] text-sm mb-2">
                                                <p className="line-clamp-hotel text-muted">
                                                    {cleanText(hotel?.short_description, 100)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* 🔘 Button */}
                                        <div className="mx-auto w-100 mt-3 px-2 pb-3">
                                            <div className="button text-center">
                                                <a
                                                    href={getHotelHref(hotel)}
                                                    className="btn blue-btn w-100 d-inline-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor: "#05164D",
                                                        color: "#fff",
                                                        borderRadius: "8px",
                                                        textDecoration: "none",
                                                        padding: "10px 0",
                                                        fontWeight: "500",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                >
                                                    View Details
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
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
