import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { fetchCityIntroData } from "@/app/services/cityService";

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

  // ✅ CITY INTRO PAGE
  if (!slug.endsWith("-tour-packages")) {
    const cityIntroRes = await fetchCityIntroData(slug);

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
      categorySlug={null}   // 🔒 disabled forever
      originalSlug={slug}
    />
  );
}

