"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchIndiaPackageListingData } from "@/app/services/indiaPackageListService";
import { fetchInternationalPackageListingByCity  } from "@/app/services/internationaltourService";


interface PackageItem {
  slug: string;
  title: string;
  primary_image: string;
  details: {
    duration_nights: number;
    duration_days: number;
  };
}

export default function PopularPackages({
  citySlug,
  country,
}: {
  citySlug: string;
  country: "india" | "international";
}) {

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Create backend correct slug
 const backendSlug =
  country === "india"
    ? `${citySlug}-tour-packages`
    : citySlug;


  // Convert for title display
  const cityName = citySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

//   useEffect(() => {
//   async function loadPackages() {
//     setLoading(true);

//     let response;

//     if (country === "india") {
//       response = await fetchIndiaPackageListingData({
//         slug1: backendSlug,
//         currentPage: 1,
//       });
//     } else {
//        response = await fetchWorldPackageListingData({
//         slug1: citySlug,
//         currentPage: 1,
//         scopeFromData: "location", // 👈 VERY IMPORTANT
//       });
//     }
//     console.log(response);
//     if (response?.data?.packages) {
//       setPackages(response.data.packages);
//     } else {
//       setPackages([]);
//     }

//     setLoading(false);
//   }

//   loadPackages();
// }, [citySlug, country]);


  // console.log(packages);
 
 useEffect(() => {
  async function loadPackages() {
    setLoading(true);

    let packagesData: any = null;

    if (country === "india") {
      const response = await fetchIndiaPackageListingData({
        slug1: `${citySlug}-tour-packages`,
        currentPage: 1,
      });

      packagesData = response?.data?.packages || [];
    } else {
      const response = await fetchInternationalPackageListingByCity({
        citySlug,
        page: 1,
      });

      packagesData = response?.data?.packages || [];
    }

    setPackages(packagesData);
    setLoading(false);
  }

  loadPackages();
}, [citySlug, country]);

  return (
    <section className="popular-packages container py-5">
      <h2 className="text-center mb-4 fs-3 fw-bold">
        Popular {cityName} Tour Packages
      </h2>

      {loading && <p className="text-center">Loading packages...</p>}

      {!loading && packages.length === 0 && (
        <p className="text-center text-danger">No packages found.</p>
      )}

      {!loading && packages.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="popular-packages-slider"
        >
          {packages.map((pkg, index) => (
            <SwiperSlide key={index}>
              <div className="slider-card1">
                <div className="sngl-card-wraper">
                  <Link href={`/packages/${pkg.slug}`}>
                    <div className="ts-holiday-card">
                      <img
                        src={
                          pkg.primary_image
                            ? pkg.primary_image
                            : "/images/no-img.webp"
                        }
                        alt={pkg.title}
                        className="package-img"
                        onError={(e) =>
                          (e.currentTarget.src = "/images/no-img.webp")
                        }
                      />

                      <div className="ts-holiday-content">
                        <h3 className="ts-holiday-title">{pkg.title}</h3>

                        <div className="ts-holiday-duration">
                          <span>
                            <img
                              src="/images/moon.png"
                              width="16"
                              height="16"
                              alt=""
                            />
                          </span>
                          {pkg.details?.duration_nights} Nights /{" "}
                          {pkg.details?.duration_days} Days
                        </div>

                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="ts-holiday-btn"
                        >
                          Explore More
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
