"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SidebarProps {
  themes: string[];
  cities: string[];
  destinations: string[];
}

const Sidebar: any = ({ data, cities, categorySlug, setCategorySlug }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  const basePath = pathname.startsWith("/international-holidays")
  ? "/international-holidays"
  : "/india";

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // const handleCategoryClick = (categorySlug: string) => {
  //   setCategorySlug(categorySlug);

  //   const citySlug = cities
  //     ?.toLowerCase()
  //     .replace(/\s+/g, "-");

  //   let finalCategorySlug = categorySlug;

  //   // 🔥 prevent duplicate "-tour-packages"
  //   if (!finalCategorySlug.endsWith("tour-packages")) {
  //     finalCategorySlug = `${finalCategorySlug}`;
  //   }

  //   const prettyUrl = `/india/${citySlug}-${finalCategorySlug}-tours-packages`;

  //   router.push(prettyUrl);
  // };

  // optuion one

  // const handleCategoryClick = (categorySlug: string) => {
  //   setCategorySlug(categorySlug);

  //   const citySlug = cities?.toLowerCase().replace(/\s+/g, "-"); // Delhi → delhi

  //   const prettyUrl = `/india/${citySlug}/by/${categorySlug}`;

  //   router.push(prettyUrl);
  // };
  const handleCategoryClick = (categorySlug: string) => {
    setCategorySlug(categorySlug);

    const citySlug = cities?.toLowerCase().replace(/\s+/g, "-");

   const prettyUrl = `${basePath}/${citySlug}/${categorySlug}`;


    router.push(prettyUrl);
  };

  return (
    <div className="sidebar-listing">
      {data?.categories?.length < 1 ? null : (
        <div className="mb-4 theme-section shadow-sm c-sec">
          <div className="d-flex align-items-center p-3 p-lg-3  text-white">
            <img
              src="/images/icon-head-1.svg"
              alt="Theme Icon"
              className="icon"
            />
            <h6 className="ms-2 mb-0 text-white font-semibold">
              {`${cities} Tour By Theme`}
            </h6>
          </div>
          <ul className="list-unstyled p-4">
            {data?.categories?.map((cat: any) => (
              // <li
              //   onClick={() => handleCategoryClick(cat.slug)}
              //   key={cat.slug}
              //   className={`mb-2 text-decoration-none text-dark hover-link ${
              //     categorySlug === cat.slug ? "active-category" : ""
              //   }`}
              //   style={{ cursor: "pointer" }}
              // >
              //   {cities} {cat.name}
              // </li>

              // option one

              <li
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`mb-2 text-decoration-none text-dark hover-link ${
                  categorySlug === cat.slug ? "active-category" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                {cities} {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data?.sourceLocations?.length < 1 ? null : (
        <div
          className="mb-4 city-section c-sec"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="d-flex align-items-center p-3 p-lg-3  text-white">
            <img
              src="/images/icon-head-2.svg"
              alt="City Icon"
              className="icon"
            />
            <h6 className="ms-2 mb-0 text-white font-semibold">
              {cities} Packages from Top Cities
            </h6>
          </div>
          <ul className="list-unstyled p-4">
            {data?.sourceLocations?.map((city: any) => (
              <li key={""} className="mb-2">
                {/* <Link
                  href={`/india/${city.slug}`}
                  className="text-decoration-none text-dark hover-link"
                > */}
                {cities} Packages from {city.name}
                {/* </Link> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
