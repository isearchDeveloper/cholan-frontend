"use client";
import CarEnquiryModal from "@/app/modals/carEnquiryModal";
import Image from "next/image";
import { useState } from "react";

const BusCardExecutive = ({ data, setOpenModal }: any) => {
  
  return (
    <>
      <div className="w-100 p-4 overflow-hidden bg-white tourCard heritage-card p-0">
        <img
          className="w-100 h-56 object-cover rounded-4 custom-hover"
          src={data?.Executive[0]?.primary_image || "/images/no-img.webp"}
          alt={data?.Executive[0]?.primary_image_alt || "/images/no-img.webp"}
        />
        <div className="mt-3 pb-0">
          <h5 className="mb-2 text-black font-semibold">Executive Fleets</h5>
          <ul className="d-flex mt-2 flex-col p-0 gap-2 car-fleet-listitems">
            {data?.Executive?.map((data: any) => (
              <li
                key={data?.slug}
                className="list-unstyled fw-regular text-black"
              >
                <Image
                  width={20}
                  height={20}
                  sizes="100vw"
                  src="/images/tick.svg"
                  alt="/images/no-img.webp"
                />{" "}
                {data?.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-100 mt-3">
          <div className="button text-center">
            <button
              onClick={() => setOpenModal(true)}
              className="btn blue-btn w-100"
            >
              Enquire Now
              <span>
                <Image
                  width={23}
                  height={23}
                  sizes="100vw"
                  src="/images/button-arrow.png"
                  alt="/images/no-img.webp"
                />
              </span>
            </button>
          </div>
        </div>
      </div>


    </>
  );
};

export default BusCardExecutive;
