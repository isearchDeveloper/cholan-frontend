"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import * as bootstrap from "bootstrap";
import "aos/dist/aos.css";

const HeritageCard = ({ data }: any) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setJsEnabled(true);

  }, []);

  // ✅ Helper for safe image fallback
  const getImage = () =>
    data?.primary_image ||
    data?.image_path ||
    data?.images?.[0]?.image_path ||
    "/images/no-img.webp";

  const getAlt = () =>
    data?.primary_image_alt ||
    data?.images?.[0]?.image_alt ||
    data?.title ||
    "Luxury Train";

  // ✅ Shared layout styles
  const cardImageStyle: React.CSSProperties = {
    height: "220px",
    objectFit: "cover",
    width: "100%",
    transition: "transform 0.3s ease",
  };

  const btnStyle: React.CSSProperties = {
    backgroundColor: "#05164D",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px 0",
    transition: "all 0.3s ease",
  };

  // ✅ If JS enabled → full Next.js version
  if (jsEnabled) {
    return (
      <div className="max-w-100 overflow-hidden bg-white tourCard heritage-card p-0">
        <img
          className="w-100 h-56 object-cover"
          src={getImage()}
          alt={getAlt()}
          style={cardImageStyle}
        />
        <div className="p-3 pb-0">
          <h5 className="mb-3 text-black font-semibold line-clamp-hotel_one fs-5">{data?.title}</h5>

          <p className="text-[#575757] text-sm mb-2 d-flex align-items-start gap-2">
            <img src="/images/icon/location.svg" className="-ms-2" alt="icon" />
            <span
              className="text-truncate d-inline-block"
              style={{ maxWidth: "200px" }}
            >
              {data?.details?.route_details}
            </span>
            <span
              ref={tooltipRef}
              data-bs-toggle="tooltip"
              title={data?.details?.route_details}
              className="ms-1"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mt-1"
                style={{
                  width: "1rem",
                  height: "1rem",
                  color: "#6c757d",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </span>
          </p>

          <p className="text-[#575757] text-sm mb-2 d-flex align-items-start gap-2">
            <img src="/images/icon/clock.svg" className="ms-1" alt="icon" />
            <span>
              {data?.details?.duration_nights}{" "}
              {data?.details?.duration_nights < 2 ? "Night" : "Nights"} /{" "}
              {data?.details?.duration_days}{" "}
              {data?.details?.duration_days < 2 ? "Day" : "Days"}
            </span>
          </p>
        </div>

        <div className="mx-auto w-100 p-4 pt-2">
          <div className="button text-center">
            <Link href={`/luxury-trains/${data.slug}`} className="btn blue-btn w-100">
              View Details
              <span>
                <Image
                  width={23}
                  height={23}
                  sizes="100vw"
                  src="/images/button-arrow.png"
                  alt=""
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 🚫 JS Disabled → Pure HTML fallback
  return (
    <div className="max-w-100 overflow-hidden bg-white tourCard heritage-card p-0">
      <a href={`/luxury-trains/${data.slug}`}>
        <img
          className="w-100 h-56 object-cover"
          src={getImage()}
          alt={getAlt()}
          style={cardImageStyle}
        />
      </a>

      <div className="p-3 pb-0">
        <h5 className="mb-3 text-black font-semibold">{data?.title}</h5>

        <p className="text-[#575757] text-sm mb-2 d-flex align-items-start gap-2">
          <img
            src="/images/icon/location.svg"
            className="-ms-2"
            alt="icon"
            width={16}
            height={16}
          />
          <span
            className="text-truncate d-inline-block"
            style={{ maxWidth: "200px" }}
          >
            {data?.details?.route_details}
          </span>
        </p>

        <p className="text-[#575757] text-sm mb-2 d-flex align-items-start gap-2">
          <img
            src="/images/icon/clock.svg"
            className="ms-1"
            alt="icon"
            width={16}
            height={16}
          />
          <span>
            {data?.details?.duration_nights}{" "}
            {data?.details?.duration_nights < 2 ? "Night" : "Nights"} /{" "}
            {data?.details?.duration_days}{" "}
            {data?.details?.duration_days < 2 ? "Day" : "Days"}
          </span>
        </p>
      </div>

      <div className="mx-auto w-100 p-4 pt-2">
        <div className="button text-center">
          <a
            href={`/luxury-trains/${data.slug}`}
            className="btn blue-btn w-100"
            style={btnStyle}
          >
            View Details
            <span>
              <img
                src="/images/button-arrow.png"
                width={20}
                height={20}
                alt="arrow"
                style={{ filter: "invert(1)" }}
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeritageCard;
