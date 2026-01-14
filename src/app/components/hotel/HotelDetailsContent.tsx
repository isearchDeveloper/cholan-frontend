"use client";
import { span } from "framer-motion/client";
import React from "react";
import Image from 'next/image';


interface HotelDetailsContentProps {
  tour: {
    title: string;

    duration: string;
  };
}

const HotelDetailsContent: React.FC<any> = ({ tour }) => {
  
  const amenitiesData = [
    { name: "flight", img: "/flight.svg", label: "Flights" },
    { name: "transport", img: "/bus.svg", label: "Transfers" },
    { name: "breakfast", img: "/breakfast.svg", label: "Breakfast" },
    { name: "hotel", img: "/hotel.svg", label: "Hotel" },
    { name: "train", img: "/train.svg", label: "Train" },
    { name: "sightseeing", img: "/landscape.svg", label: "Sightseeing" },
    { name: "meal", img: "/meal.svg", label: "Meal" },
    { name: "restaurant", img: "/restaurant.svg", label: "Restaurant" },
    { name: "bar", img: "/pub.svg", label: "Bar" },
    { name: "wifi", img: "/wifi.svg", label: "Wi-Fi" },
  ];
  return (
    <div className="tour-content">
      <h1 className="tour-title fs-2">
        {tour.title}{" "}
        {/* <span className="color-blue fw-normal">
          {" "}
          - {tour.details.duration_nights} Nights/ {tour.details.duration_days}{" "}
          Days
        </span> */}
      </h1>

      {tour.location ? (
        <div className="tour-details d-flex align-items-start gap-2 mt-2">
          <img src="../location.svg" alt="icon" />
          <span className="days-count text-sm">{tour.location}</span>
        </div>
     ) : null} 

      {tour?.facilities?.length > 0 && (
        <div className={`amenities pt-4 pb-0`}>
          <ul className="m-0 p-0 d-flex align-items-center gap-3 flex-wrap">
            {tour?.facilities.map((facility: string) => {
              const matchedAmenity = amenitiesData.find(
                (item) => item.name === facility
              );
              if (!matchedAmenity) return null;

              return (
                <li
                  className="m-0 p-0 d-flex align-items-center gap-2"
                  key={facility}
                >
                  <span>
                    <Image
                      height={20}
                      width={20}
                     
                      src={matchedAmenity.img || "/images/no-img.webp"}
                      alt={matchedAmenity.label}
                    />
                  </span>
                  <span className="pt-1"> {matchedAmenity.label} </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelDetailsContent;
