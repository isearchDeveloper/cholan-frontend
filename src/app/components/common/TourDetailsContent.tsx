"use client";
import { span } from "framer-motion/client";
import React from "react";
import Image from 'next/image';


interface TourDetailsContentProps {
  tour: {
    title: string;

    duration: string;
  };
}

const TourDetailsContent: React.FC<any> = ({ tour }) => {
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
      <h1 className="tour-title d-flex flex-wrap gap-1 align-items-center fs-2">
        {tour?.title}{" "}
        <span className="color-blue fw-normal">    
          {" "}
          - {(() => {
            const nights = tour?.details?.duration_nights ?? 0;
            const days = tour?.details?.duration_days ?? 0;

            return `${nights > 0
              ? `${nights} ${nights === 1 ? "Night" : "Nights"} / `
              : ""
              }${days} ${days === 1 ? "Day" : "Days"}`;
          })()}
        </span>
      </h1>

      {tour?.details?.route_details ? (
        <div className="train tour-details d-flex align-items-start gap-2 mt-3">
          <img src="../location.svg" alt="icon" />
          <span className="days-count text-sm">{tour?.details?.route_details}</span>
        </div>
      ) : null}

      {tour?.details?.facilities?.length > 0 && (
        <div className={`tour amenities pt-4 pb-0`}>
          <ul className="m-0 p-0 d-flex align-items-center gap-3 flex-wrap">
            {tour?.details?.facilities.map((facility: string) => {
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
                  <span className="pt-1 text-sm"> {matchedAmenity.label} </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TourDetailsContent;
