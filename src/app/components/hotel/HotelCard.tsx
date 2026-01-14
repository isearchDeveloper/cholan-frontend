"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TrainEnquiryModal from "@/app/modals/trainEnquiryModal";
import { useRouter } from "next/navigation";
import HotelEnquiryModal from "@/app/modals/hotelEnquiryModal";

const HotelCard: any = ({ data, setopenModal, setSelectedRoom }: any) => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);



  const router = useRouter();
  const manageRedirection = (link: any) => {
    if (link) {
      router.push(`/luxury-hotels/${data.slug}`);
    } else {
      setopenModal(true);
      setSelectedRoom(data?.title || '');
    }
  };

  return (
    <>
      <div
        className="max-w-100 p-4 overflow-hidden bg-white rounded-4 heritage-card p-0 tourCard shadow-none"

      >
        <img
          className="w-100 h-56 object-cover rounded-4 custom-hover"
          src={data?.images ? data?.images[0]?.image_path : data?.primary_image || "/images/no-img.webp"}
          alt={data?.primary_image_alt}
        />
        <div className="mt-3 pb-0">
          <h5 className="mb-2 text-black font-semibold line-clamp-hotel_one">{data?.title}</h5>

          <div className="text-[#575757] text-sm mb-2 ">
            <div title={data?.short_description?.replace(/<[^>]*>/g, "")}>
              <p className="line-clamp-hotel text-muted">
                {(() => {
                  const html = data?.details ? data?.details : data?.short_description;
                  const text = html?.replace(/<[^>]*>/g, ""); // Strip HTML tags
                  const words = text?.split(" ") || [];
                  return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
                })()}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-100 mt-3">
          <div className="button text-center">
            <button
              onClick={() => manageRedirection(data.slug)}

              className="btn blue-btn w-100"
            >
              {data.slug ? "View Details" : "Enquire Now"}
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

    </>
  );
};

export default HotelCard;
