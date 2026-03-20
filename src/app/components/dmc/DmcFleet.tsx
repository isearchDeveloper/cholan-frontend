"use client";

import { useState, useEffect } from "react";
import CarCardEconomy from "@/app/components/car/CarCardEconomy";
import CarCardLuxury from "@/app/components/car/CarCardLuxury";
import CarCardExecutive from "@/app/components/car/CarCardExecutive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CarEnquiryModal from "@/app/modals/carEnquiryModal";

interface DmcFleetClientProps {
  fleets: any;
  cityName: string;
}

export default function DmcFleetClient({
  fleets,
  cityName,
}: DmcFleetClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ FIXED: SAME STRUCTURE AS CAR RENTAL
  const fleetArray = [
    ...(fleets?.Economy
      ? [
          {
            type: "Economy",
            component: <CarCardEconomy data={fleets}  setOpenModal={setOpenModal} />,
          },
        ]
      : []),
    ...(fleets?.Luxury
      ? [
          {
            type: "Luxury",
            component: <CarCardLuxury data={fleets}  setOpenModal={setOpenModal} />,
          },
        ]
      : []),
    ...(fleets?.Executive
      ? [
          {
            type: "Executive",
            component: <CarCardExecutive data={fleets}  setOpenModal={setOpenModal} />,
          },
        ]
      : []),
  ];

  // If no fleets
  if (fleetArray.length === 0) return null;

  return (
    <div className="py-5 car-fleet px-2 px-lg-0 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center fs-3">
          Our Fleet in {cityName}
        </h2>

        {isMobile ? (
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
        )}

        {openModal && (
  <CarEnquiryModal onClose={() => setOpenModal(false)} />
)}
      </div>
    </div>
  );
}