import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AboutBanner: any = ({ bannerData }: any) => {
  return (
    <div className="banner-container aboutbanner">
     
        <div
          className="banner"
          style={{ backgroundImage: `url(${encodeURI(bannerData?.banner_image)})` }}
          aria-label={bannerData?.banner_image_alt || bannerData?.title || "Banner"}
        >
          <img
            src={bannerData?.banner_image}
            alt={bannerData?.banner_image_alt || bannerData?.title || "Banner"}
            className="d-none"
          />
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

export default AboutBanner;
