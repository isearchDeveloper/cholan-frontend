"use client";

import { useEffect, useState } from "react";
import { fetchWomenChauffeurBanner } from "@/app/services/carService";

interface WomenChauffeurBannerData {
  url: string;
  banner_image: string;
  banner_image_alt: string;
  is_active: number;
}

export default function CarAdBanner() {
  const [banner, setBanner] = useState<WomenChauffeurBannerData | null>(null);

  useEffect(() => {
    fetchWomenChauffeurBanner().then((res) => {
      if (res?.success && res?.data && res.data.is_active === 1) {
        setBanner(res.data);
      }
    });
  }, []);

  if (!banner) return null;
  return (
    <section className="car-ad-banner-section" aria-label={banner.banner_image_alt}>
      <div className="container">
       <div className="car-ad-banner">
        <a href={banner.url}>
         <img src={banner.banner_image} alt={banner.banner_image_alt} />
        </a>
        </div>
      </div>
    </section>
  );
}
