import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { fetchCityIntroData } from "@/app/services/cityService";
import ThemePackageListing from "@/app/components/theme/ThemePackageListing";

import { fetchThemePackages } from "@/app/services/themeService";

/* =======================
   SEO METADATA
======================= */
export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  // ✅ CITY INTRO PAGE
  if (!slug.endsWith("-tour-packages")) {
    const cityRes = await fetchCityIntroData(slug);
    if (!cityRes?.data?.city) return {};

    const city = cityRes.data.city;
    const canonical = await getCanonical(`/india/${slug}`);

    return {
      title: city.meta_title || `About ${city.title} | Cholan Tours`,
      description:
        city.meta_description ||
        `Explore the best tour packages, places to visit, and things to do in ${city.title}.`,
      alternates: { canonical },
    };
  }

  // ✅ CITY PACKAGE LISTING PAGE
  const res = await fetchIndiaPackageData(slug);
  if (!res?.data?.location) return {};

  const meta = res.data.location.meta || {};
  const canonical = await getCanonical(`/india/${slug}`);

  return {
    title: meta.meta_title || "Cholan Tours",
    description: meta.meta_description || "Cholan Tours",
    keywords: meta.meta_keywords || "",
    alternates: { canonical },
  };
}

/* =======================
   PAGE RENDER
======================= */
export default async function TourListingPage({ params, searchParams }: any) {
  const { slug } = await params;
  // 🔵 SAFE THEME PAGE CHECK (DO NOT TOUCH OTHER LOGIC)

  // ✅ CITY INTRO PAGE
  if (!slug.endsWith("-tour-packages")) {
    const cityIntroRes = await fetchCityIntroData(slug);

    console.log(cityIntroRes)

    if (parseInt(cityIntroRes?.data?.city?.type) !== 1) {
      notFound();
    }

    return (
      <CityIntroPage
        slug={slug}
        country="india"
        cityData={cityIntroRes?.data || null}
      />
    );
  }

  // helpers (keep in same file for now)
function extractCityAndTheme(slug: string) {
 
  const base = slug.replace("-tour-packages", "");
  const parts = base.split("-");
//  console.log('parts'+parts);
  const city = parts[0]; // always first word
  const themeSlug = parts.slice(1).join("-"); // everything after city
  // console.log('ddddd'+themeSlug);

  return { city, themeSlug };
}

const isThemePage =
  slug.endsWith("-tour-packages") &&
  slug.replace("-tour-packages", "").includes("-");
//  console.log(slug);
if (isThemePage) {
  const { city, themeSlug } = extractCityAndTheme(slug);

  // 1️⃣ Get city for location_id
  const cityRes = await fetchCityIntroData(city);
  if (!cityRes?.data?.city) notFound();

  const locationId = cityRes.data.city.location_id;

  // 2️⃣ Directly call THEME API (no matching, no themesArray)
  const themeData = await fetchThemePackages(themeSlug);
    // console.log(themeData);
  if (!themeData) notFound();

  // // 3️⃣ Shape data for component
  // const themeListingData = {
  //   location: {
  //     details: {
  //       title: `${city} ${themeData.title} Tour Packages`,
  //       sub_title: themeData.title,
  //       about: themeData.overview,
  //       banner_image: `https://cdn.cholantours.com/${themeData.primary_img}`,
  //     },
  //     faqs: [],
  //   },
  //   packages: themeData.packages,
  // };

  // get all themes of city for sidebar
const cityThemes = cityRes?.data?.themes || [];
const themes = cityRes?.data?.themes || [];;

const themeSidebarData = Array.isArray(themes) ? themes : [themes];

const themeListingData = {
  location: {
    name: cityRes.data.city.title,   // for sidebar title
    details: {
      title: `${city} ${themeData.title} Tour Packages`,
      sub_title: themeData.title,
      about: themeData.overview,
      banner_image: `https://cdn.cholantours.com/${themeData.primary_img}`,
    },
    faqs: [],
  },

  // ⭐ THIS FEEDS SIDEBAR
  categories: cityThemes.map((t: any) => ({
    name: t.title,
    slug: t.slug,
  })),

  // ⭐ THIS FEEDS CARDS
  packages: themeData.packages,
};


 return (
  <ThemePackageListing
    data={themeListingData}
    sidebarThemes={themeSidebarData}
    citySlug={city}
    cityName={cityRes.data.city.title}
  />
);

}


  // ✅ CITY PACKAGE LISTING PAGE
  const page = Number(searchParams?.page ?? 1);
  const res = await fetchIndiaPackageData(slug);

  if (!res?.data?.location) {
    notFound();
  }

  return (
    <IndiaPackageListing
      packageList1={res.data}
      initialPage={page}
      slug1={slug}
      categorySlug={null} //  disabled forever
      originalSlug={slug}
    />
  );
}
