import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CarBanner: any = ({ bannerData }: any) => {
  return (
    <div className="banner-container carbanner">
      
          <div
            className="banner"
            style={{ backgroundImage: `url(${encodeURI(bannerData?.banner_image)})` }}
          >
          <div className="banner-overlay"></div>
          <div className="banner-content w-100 py-5">
            <div className="container">
              <div className="row">
              </div>
            </div>
          </div>
        </div>
  
     
    </div>
  );
};

export default CarBanner;
