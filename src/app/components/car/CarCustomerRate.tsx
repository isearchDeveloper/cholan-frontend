"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const CarCustomerRate = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reviews = [
    { name: "Alastair", comment: "Christine was very helpful and considerate of our needs." },
    { name: "Anthony", comment: "Jen was helpful, practical, responsive and enthusiastic about our plans" },
    { name: "Peter", comment: "Very friendly, professional and helpful. Made good suggestions." }
  ];

  const renderReviewCard = (review: { name: string; comment: string }, idx: number) => (
    <div className="sngl-box">
      <div className="content-box">
        <p>{`"${review.comment}"`}</p>
      </div>
      <div className="author">
        <h5>{review.name}</h5>
        <div className="block-img">
          <Image
            width={82}
            height={12}
            sizes="100vw"
            src="/images/start-orang.png"
            alt="/images/no-img.webp"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section className="customer-rate common-padd pt-0">
      <div className="container">
        <div className="common-header-center mb-0">
          <h2 className="pb-4 fs-3"><span className="color-blue">Customers who Book Cars with Cholan Tours</span></h2>
        </div>
        <div className="customer-rate-wraper px-2 px-lg-0">
          {isMobile ? (
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="mySwiper"
            >
              {reviews.map((review, idx) => (
                <SwiperSlide key={idx}>
                  <div className="d-flex justify-content-center">
                    {renderReviewCard(review, idx)}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="row gap-4 gap-lg-0">
              {reviews.map((review, idx) => (
                <div className="col-lg-4" key={idx}>
                  {renderReviewCard(review, idx)}
                </div>
              ))}
            </div>
          )}
          <div className="btm-button">
            <Link href="#" className="btn blue-btn">
              See All Reviews
              <span>
                <Image
                  width={23}
                  height={23}
                  sizes="100vw"
                  src="/images/button-arrow.png"
                  alt="/images/no-img.webp"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarCustomerRate;