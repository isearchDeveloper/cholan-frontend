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
  const [modalData, setModalData] = useState<any>(null);

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
            <h4 className="cr-small-title">Client Reviews</h4>

            <div className="cr-header-rating">
              <span className="cr-avg">{data.avg}</span>

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

                  <span className="cr-readmore" onClick={() => setModalData(r)}>
                    Read more
                  </span>

                  <small className="cr-date">{r.FeedbackInsertDate}</small>

                  {/*  DRIVER + VEHICLE RATINGS */}
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

          {modalData && (
            <div
              className="cr-modal-overlay"
              onClick={() => setModalData(null)}
            >
              <div className="cr-modal" onClick={(e) => e.stopPropagation()}>
                <button
                  className="cr-modal-close"
                  onClick={() => setModalData(null)}
                >
                  ✕
                </button>

                <h4>{modalData.GuestName}</h4>

                <div className="cr-rating">
                  {"★".repeat(modalData.OverAllServiceRatingInNumber)}
                  {"☆".repeat(5 - modalData.OverAllServiceRatingInNumber)}
                </div>

                <p style={{ marginTop: "12px" }}>{modalData.FeedbackMessage}</p>

                <div className="cr-sub-rating" style={{ marginTop: "12px" }}>
                  <span>
                    <b>Driver Rating:</b> {modalData.DrivertExperinceRating}
                  </span>
                  <span>
                    <b>Vehicle Rating:</b> {modalData.VehicleExperinceRating}
                  </span>
                </div>

                <small style={{ display: "block", marginTop: "12px" }}>
                  {modalData.FeedbackInsertDate}
                </small>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cr-readmore {
          color: #007bff;
          font-size: 13px;
          cursor: pointer;
          font-weight: 600;
          margin-top: 6px;
          display: inline-block;
        }

        .cr-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .cr-modal {
          background: #fff;
          width: 90%;
          max-width: 600px;
          padding: 24px;
          border-radius: 8px;
          max-height: 70vh;
          overflow-y: auto;
          position: relative;
        }

        .cr-modal-close {
          position: absolute;
          right: 12px;
          top: 12px;
          border: none;
          background: none;
          font-size: 18px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .cr-modal {
            width: 95%;
            padding: 18px;
            max-height: 80vh;
          }
        }
      `}</style>
    </section>
  );
}
