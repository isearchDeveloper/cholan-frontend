"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Review {
    customer_name: string;
    rating: number;
    comment: string;
    days: string;
}

interface Props {
    reviews: Review[];
}

const AboutCustomerRate: React.FC<Props> = ({ reviews }) => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const goodReviews = reviews.filter((r) => r.rating >= 3);
   
    if (goodReviews.length === 0) return null;

  // Function to render stars based on rating
   const renderStars = (ratingValue: number) => {
    return [...Array(Math.floor(ratingValue))].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="text-warning mb-2"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    ));
  };

  const renderReviewCard = (review: Review, idx: number) => (
    <div className="sngl-box">
        <div className="content-box">
            <p className="line-clamp">{`"${review.comment}"`}</p>
        </div>
        <div className="author"><h5 className="mt-2">{review.customer_name}</h5>
            <div className="block-img">
                {renderStars(review.rating)}
            </div>
            
        </div>
    </div>
  );

    return (
        <section className="customer-rate common-padd pt-0">
            <div className="container">
                <div className="common-header-center">
                    <h2 className="fs-3">
                        <span className="color-blue">What Travelers Say About Us?</span>
                    </h2>
                </div>
                <div className="customer-rate-wraper">
                    {goodReviews.length > 0 ? (
                        isMobile ? (
                            <Swiper
                             autoHeight={true}
                                spaceBetween={16}
                                slidesPerView={1}
                                modules={[Pagination, Autoplay]}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                className="mySwiper"
                            >
                                {goodReviews.slice(0, 3).map((review, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="d-flex justify-content-center">
                                            {renderReviewCard(review, idx)}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="row gap-4 gap-md-0 g-4">
                                {goodReviews.slice(0, 3).map((review, idx) => (
                                    <div className="col-md-6 col-lg-4" key={idx}>
                                        {renderReviewCard(review, idx)}
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        <p>No greater than 3 star reviews available yet.</p>
                    )}
                    <div className="btm-button">
                        <button onClick={() => router.push("/reviews/packages")} className="btn blue-btn">
                            See All Reviews
                            <span>
                                <Image
                                    width={23}
                                    height={23}
                                    sizes="100vw"
                                    src="/images/button-arrow.png"
                                    alt=""
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCustomerRate;