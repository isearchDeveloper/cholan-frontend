"use client";

import { useState, useEffect } from "react";
import CarCardEconomy from "@/app/components/car/CarCardEconomy";
import CarCardLuxury from "@/app/components/car/CarCardLuxury";
import CarCardExecutive from "@/app/components/car/CarCardExecutive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface DmcFleetClientProps {
  fleets: any;
  cityName: string;
}

export default function DmcFleetClient({
  fleets,
  cityName,
}: DmcFleetClientProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection - EXACT SAME AS CAR RENTAL
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ EXACT SAME FLEET ARRAY LOGIC AS CAR RENTAL
  const fleetArray = [
    ...(fleets?.Economy
      ? [
          {
            type: "Economy",
            component: <CarCardEconomy data={{ fleets }} />,
          },
        ]
      : []),
    ...(fleets?.Luxury
      ? [
          {
            type: "Luxury",
            component: <CarCardLuxury data={{ fleets }} />,
          },
        ]
      : []),
    ...(fleets?.Executive
      ? [
          {
            type: "Executive",
            component: <CarCardExecutive data={{ fleets }} />,
          },
        ]
      : []),
  ];

  // If no fleets, don't render
  if (fleetArray.length === 0) {
    return null;
  }

  // ✅ EXACT SAME JSX AS CAR RENTAL
  return (
    <div className="py-5 car-fleet px-2 px-lg-0 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center fs-3">Our Fleet in {cityName}</h2>

        {fleetArray.length > 0 ? (
          isMobile ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="mySwiper"
            >
              {fleetArray.map((fleet, idx) => (
                <SwiperSlide key={idx}>
                  <div className="d-flex justify-content-center">
                    {fleet.component}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="row">
              {fleetArray.map((fleet, idx) => (
                <div key={idx} className="col-lg-4 col-xl-4">
                  {fleet.component}
                </div>
              ))}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}