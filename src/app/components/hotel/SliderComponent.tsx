"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";

const TopThingsToDoNearby = ({todoData}: any) => {

  return (
    <section className="w-100 bg-dark py-5 bg-banner top-things">
      <div className="container">
        <h2 className="text-white text-center mb-4 fs-3">Top Things To Do Nearby</h2>

        <Swiper
          modules={[ Autoplay]}
          // navigation
          autoplay={{ delay: 5000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
        >
          {todoData.map((item: any) => (
            <SwiperSlide key={item?.banner_image_alt}>
              <div className="row bg-white rounded-3 overflow-hidden shadow-sm">
                <div className="col-12 col-lg-6 p-0 h-70">
                  <Image
                    src={item?.banner_image || "/images/no-img.webp"}
                   alt={item?.banner_image_alt}
                    width={600}
                    height={300}
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="col-12 col-lg-6 p-4 p-lg-5 d-flex flex-column justify-content-center">
                  <h3 className="h5 fw-bold mb-2">{item?.title}</h3>
                  <p className="text-muted mb-3">{item?.details}</p>
                 
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

    
      </div>
    </section>
  );
};

export default TopThingsToDoNearby;
