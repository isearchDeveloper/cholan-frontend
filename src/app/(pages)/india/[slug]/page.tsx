// import React from "react";
// import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
// import CityIntroPage from "@/app/components/city/CityIntroPage";
// import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
// import { getCanonical } from "@/app/lib/getCanonical";
// import { notFound } from "next/navigation";

// interface TourListingPageProps {
//   params: { slug: string };
//   searchParams?: {
//     page?: string;
//     category_slug?: string;
//   };
// }

// /* =========================
//    METADATA
// ========================= */
// export async function generateMetadata({ params }: any) {
//   const { slug } = params;

//   const res = await fetchIndiaPackageData(slug);
//   if (!res?.data?.location) return {};

//   const meta = res.data.location.meta || {};
//   const canonical = await getCanonical(`/india/${slug}`);

//   return {
//     title: meta.meta_title || "Cholan Tours",
//     description: meta.meta_description || "Cholan Tours",
//     keywords: meta.meta_keywords || "",
//     alternates: { canonical },
//   };
// }

// /* =========================
//    PAGE
// ========================= */
// export default async function TourListingPage({
//   params,
//   searchParams,
// }: TourListingPageProps) {
//   const { slug } = params;

//   // ✅ CITY INTRO PAGE
//   if (!slug.endsWith("-tour-packages")) {
//     return <CityIntroPage slug={slug} country="india" />;
//   }

//   const page = Number(searchParams?.page) || 1;

//   // ✅ PACKAGE LISTING PAGE
//   const locationRes = await fetchIndiaPackageData(slug);

//   if (!locationRes?.data?.location) {
//     notFound();
//   }

//   const locationData = locationRes.data;
//   const locationSlug = locationData.location.slug;

//   return (
//     <IndiaPackageListing
//       packageList1={locationData}
//       initialPage={page}
//       slug1={locationSlug}
//       initialCategorySlug={searchParams?.category_slug || ""}
//     />
//   );
// }


import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { XPublicToken } from "@/app/urls/apiUrls";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { fetchCityIntroData } from "@/app/services/cityService";
 
// const API_BASE = "https://crm.cholantours.com/api/v1/packages/city";
const API_BASE = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/city`;
 
/* ===============================
   SMART SLUG RESOLVER
================================ */
async function resolveCityAndCategory(slug: string, page: number) {
  // 1️⃣ Try slug as CITY directly
  const directRes = await fetch(
    `${API_BASE}/${slug}?page=${page}&package_country=india`,
    { headers: { "X-Public-Token": XPublicToken } }
  );
 
  if (directRes.ok) {
    return {
      city: slug,
      category: null,
      data: await directRes.json(),
    };
  }
 
  // 2️⃣ Try splitting RIGHT → LEFT
  if (!slug.endsWith("-tour-packages")) {
    notFound();
  }
 
  const base = slug.replace("-tour-packages", "");
  const parts = base.split("-");
 
  for (let i = parts.length - 1; i > 0; i--) {
    const possibleCity = `${parts.slice(0, i).join("-")}-tour-packages`;
    const possibleCategory = parts.slice(i).join("-");
 
    const res = await fetch(
      `${API_BASE}/${possibleCity}?page=${page}&package_country=india&category_slug=${possibleCategory}`,
      { headers: { "X-Public-Token": XPublicToken } }
    );
 
    if (res.ok) {
      return {
        city: possibleCity,
        category: possibleCategory,
        data: await res.json(),
      };
    }
  }
 
  notFound();
}
 

/* =========================
   METADATA
   ========================= */
export async function generateMetadata({ params }: any) {
  const { slug } = params;

  /* =====================
     CITY INTRO META
  ====================== */
  if (!slug.endsWith("-tour-packages")) {
    const cityRes = await fetchCityIntroData(slug);

    if (!cityRes?.data?.city) return {};

    const city = cityRes.data.city;

    const title =
      city.meta_title ||
      ` About ${city.title}  | Cholan Tours`;

    const description =
      city.meta_description ||
      `Explore the best tour packages, places to visit, and things to do in ${city.title}.`;

    const canonical = await getCanonical(`/india/${slug}`);

    return {
      title,
      description,
      alternates: { canonical },
    };
  }

  /* =====================
     PACKAGE LISTING META
  ====================== */
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

/* ===============================
   PAGE
================================ */
export default async function TourListingPage({ params, searchParams }: any) {
  const { slug } = await params;
  const cityName = slug;
  

  const cityIntroRes = await fetchCityIntroData(cityName);
  
//  console.log(cityIntroRes)
 if (!slug.endsWith("-tour-packages")) {
  const cityIntroRes = await fetchCityIntroData(slug);

  // 🔐 INDIA TYPE = 1
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
  const page = Number(searchParams?.page) || 1;
 
  const resolved = await resolveCityAndCategory(slug, page);
 
  return (
    <IndiaPackageListing
      packageList1={resolved.data.data}
      initialPage={page}
      slug1={resolved.city}
      categorySlug={resolved.category}
    />
  );
}
 
 