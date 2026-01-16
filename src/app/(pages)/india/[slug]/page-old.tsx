//

import React from "react";
import "aos/dist/aos.css";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import CityIntroPage from "@/app/components/city/CityIntroPage";

import { XPublicToken } from "@/app/urls/apiUrls";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { notFound } from "next/navigation";

interface TourListingPageProps {
  params: { slug: string };
  searchParams?: {
    page?: string;
    category_slug?: string;
  };
}

/* =========================
   METADATA
   ========================= */
export async function generateMetadata({ params }: any) {
  const { slug } = params;

  //  Use URL slug ONLY to fetch location data
  const res = await fetchIndiaPackageData(slug);

  if (!res?.data?.location) {
    return {};
  }

  const meta = res.data.location.meta || {};
  const canonical = await getCanonical(`/india/${slug}`);

  return {
    title: meta.meta_title || "Cholan Tours",
    description: meta.meta_description || "Cholan Tours",
    keywords: meta.meta_keywords || "",
    alternates: { canonical },
  };
}

/* =========================
   PAGE
   ========================= */
export default async function TourListingPage({
  params,
  searchParams,
}: TourListingPageProps) {
  const { slug } = params;

  // 👉 If it's NOT a package slug, show static city intro page
  if (!slug.endsWith("-tour-packages")) {
    return <CityIntroPage slug={slug} />;
  }
  const page = Number(searchParams?.page) || 1;

  /**
   * 1️⃣ FIRST CALL: LOCATION API
   *    (URL slug is allowed here)
   */
  const locationRes = await fetchIndiaPackageData(slug);

  if (!locationRes?.data?.location) {
    notFound(); // ❌ invalid city only
  }

  const locationData = locationRes.data;

  /**
   * 2️⃣ SINGLE SOURCE OF TRUTH FOR BACKEND
   */
  const locationSlug = locationData.location.slug; // ✅ backend-approved slug

  /**
   * 3️⃣ LISTING API (ALWAYS use location.slug)
   */
  let listingData: any = null;

  try {
    const res = await fetch(
      `https://crm.cholantours.com/api/v1/packages/city/${locationSlug}?page=${page}&package_country=india`,
      {
        headers: { "X-Public-Token": XPublicToken },
        cache: "no-store",
      }
    );

    if (res.ok) {
      listingData = await res.json();
    }
  } catch {
    listingData = null;
  }

  /*
   * MERGE DATA SAFELY
   */
  const mergedData = {
    packages: listingData?.data?.packages || [],
    pagination: listingData?.data?.pagination || {
      total: 0,
      limit: 10,
      page,
    },

    // Sidebar data
    categories: locationData.categories || [],
    sourceLocations: locationData.sourceLocations || [],

    // Page content
    location: locationData.location,
  };

  /**
   *  PASS BACKEND SLUG TO CLIENT
   *    (client APIs must use this slug)
   */
  return (
    <IndiaPackageListing
      packageList1={mergedData}
      initialPage={page}
      slug1={locationSlug}
      initialCategorySlug={searchParams?.category_slug || ""}
    />
  );
}
