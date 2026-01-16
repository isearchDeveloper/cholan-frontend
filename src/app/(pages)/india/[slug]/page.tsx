import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { XPublicToken } from "@/app/urls/apiUrls";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";

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

/* ===============================
   PAGE
================================ */
export default async function TourListingPage({ params, searchParams }: any) {
  const { slug } = params;

  if (!slug.endsWith("-tour-packages")) {
      return <CityIntroPage slug={slug} />;
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
