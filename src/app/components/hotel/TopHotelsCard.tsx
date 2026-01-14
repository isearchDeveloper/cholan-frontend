"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const TopHotelsCard: any = ({ data }: any) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

 
  return (
    <div
      className="max-w-sm rounded-4 overflow-hidden shadow-lg bg-white p-4"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <img
        className="w-100 h-56 object-cover rounded-4 custom-hover"
        src={data?.primary_image || "/images/no-img.webp"}
        
         alt={data?.primary_image_alt }
      />
      <div className="py-4 pb-0">
        <Link className="text-black"
          href={`/luxury-hotels/${data.slug}`}> <h5 className="mb-2 font-semibold text-capitalize">{data?.title}</h5></Link>
       
        {/* <p className="text-[#575757] text-sm mb-2 d-flex align-items-start gap-2">
          <img src="/images/icon/location.svg" alt="icon" />
          <span>
            Mumbai - Udaipur - Jodhpur - Bikaner - Jaipur - Ranthambore - Agra -
            Delhi
          </span>
        </p> */}

        <p className="line-clamp-hotel text-muted"
          dangerouslySetInnerHTML={{
            __html: (() => {
              const html = data.short_description;
              const words = html.split(" ");
              return words.length > 20
                ? words.slice(0, 20).join(" ") + "..."
                : html;
            })(),
          }}
        />
      </div>
      <div className="pt-4">
        <Link
          href={`/luxury-hotels/${data.slug}`}
          className="btn blue-btn !bg-[#05164D] w-100"
        >
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
  );
};

export default TopHotelsCard;
