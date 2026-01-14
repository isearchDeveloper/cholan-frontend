import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HolidayBanner: any = ({ data }: any) => {
  const banners = [
    {
      title: "Tailor-made holidays for you!",
      subtitle: "Your Trip, Your Pace - Flexible Travel Dates",
      imageUrl: "images/banner-6.jpg",
    },
    {
      title: "Discover Paradise Beaches!",
      subtitle: "Relax and Unwind in Stunning Locations",
      imageUrl: "images/banner-5.jpg",
    },
  ];

  return (
    <div className="banner-container holibanner">
    
        {/* <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className="banner-swiper"
                > */}
        {/* {banners.map((item, index) => ( */}
        {/* <SwiperSlide key={index}> */}
        {/* <div
          className="banner py-5"
          style={{ backgroundImage: `url(${data})` }}
        > */}
          <div
            className="banner py-5"
            style={{ backgroundImage: `url(${encodeURI(data)})` }}
          >
          <div className="banner-overlay"></div>
          <div className="banner-content w-100 py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <h2 className="banner-title text-left">{banners[0].title}</h2>
                  <h6 className="banner-subtitle text-left">
                    {banners[0].subtitle}
                  </h6>
                </div>
                {/* <div className="col-lg-3">
                                                <EnquiryForm />
                                            </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* </SwiperSlide> */}
        {/* ))} */}
        {/* <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div> */}
        {/* </Swiper> */}
      
    </div>
  );
};

export default HolidayBanner;
