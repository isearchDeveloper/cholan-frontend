"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const TrainCard: any = ({ data }: any) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-sm rounded-4 overflow-hidden bg-white p-4">
      <Link href={`/luxury-trains/${data.slug}`}>
        <img
          className="w-100 h-56 object-cover rounded-4 custom-hover"
          src={data?.primary_image}
          alt="/images/no-img.webp"
        />
      </Link>
      <div className="py-4 pb-0">
        <Link href={`/luxury-trains/${data.slug}`}>
          <h5 className="mb-2 text-black font-semibold text-capitalize line-clamp-hotel_one fs-5">
            {data?.title}
          </h5>
        </Link>

        {mounted && data.short_description && (
          <div
            className="train-card-short-descc"
            title={data.short_description.replace(/<[^>]*>/g, "")}
          >
            <p className="line-clamp-train text-muted">
              {(() => {
                const text = data.short_description.replace(/<[^>]*>/g, ""); // Strip HTML tags
                const words = text.split(" ");
                return words.length > 20
                  ? words.slice(0, 20).join(" ") + "..."
                  : text;
              })()}
            </p>
          </div>
        )}
      </div>
      <div className="pt-3">
        <Link
          href={`/luxury-trains/${data.slug}`}
          className="btn blue-btn !bg-[#05164D] w-100"
        >
          Explore More
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
  );
};

export default TrainCard;
