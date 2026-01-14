"use client";
 
import { useEffect, useRef, useState } from "react";
import { fetchCarReviewData } from "@/app/services/reveiwService";
 
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
 
import "swiper/css";
import "swiper/css/pagination";
 
export default function CarReviews() {
  const [data, setData] = useState<any>(null);
  const swiperRef = useRef<SwiperType | null>(null);
 
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
 
  useEffect(() => {
    fetchCarReviewData()
      .then((res) => setData(res))
      .catch(console.error);
  }, []);
 
  if (!data || !data.data || data.data.length === 0) return null;
  return (
    <section className="customer-rate cr-section">
      <div className="container">
        <div className="common-header-center cr-header-inline">
          <div className="client-review-custom">
            <h4 className="cr-small-title">
             Client Reviews
            </h4>
 
            <div className="cr-header-rating">
              <span className="cr-avg">{(data.avg)}</span>
 
              <span className="cr-stars">
                {"★".repeat(Math.round(data.avg))}
                {"☆".repeat(5 - Math.round(data.avg))}
              </span>
 
              <span className="cr-total">({data.total} reviews)</span>
            </div>
          </div>
          <h2 className="fs-3 cr-main-title">
            <span>What Travelers Say About Us?</span>
          </h2>
        </div>
 
        <div className="cr-slider-wrapper">
          {/* LEFT ARROW */}
          {!isBeginning && (
            <button
              className="cr-arrow cr-arrow-left"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
            >
              ‹
            </button>
          )}
 
          {/* RIGHT ARROW */}
          {!isEnd && (
            <button
              className="cr-arrow cr-arrow-right"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
            >
              ›
            </button>
          )}
 
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 4 },
            }}
          >
            {data.data.map((r: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="cr-card">
                  <div className="cr-card-header">
                    <strong className="cr-name">{r.GuestName}</strong>
                  </div>
 
                  <div className="cr-rating">
                    {"★".repeat(r.OverAllServiceRatingInNumber)}
                    {"☆".repeat(5 - r.OverAllServiceRatingInNumber)}
                  </div>
 
                  <p className="cr-text">{r.FeedbackMessage}</p>
 
                  <small className="cr-date">{r.FeedbackInsertDate}</small>
 
                  {/* ✅ DRIVER + VEHICLE RATINGS */}
                  <div className="cr-sub-rating">
                    <span>
                      <b>Driver Rating:</b> {r.DrivertExperinceRating}
                    </span>
                    <span>
                      <b>Vehicle Rating:</b> {r.VehicleExperinceRating}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}