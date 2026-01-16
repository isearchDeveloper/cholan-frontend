import React from "react";
import { XPublicToken } from "@/app/urls/apiUrls";
import "aos/dist/aos.css";

import InternationalPackageListing from "@/app/components/internationalTourPackages/internationalPackageListing";
import { fetchInternationalPackageData } from "@/app/services/internationaltourService";
import DynamicMetaTags from "@/app/components/DynamicMetaTags";
import { getCanonical } from "@/app/lib/getCanonical";
import { notFound } from "next/navigation";

const API_BASE = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages`;

async function resolveInternationalLocationAndCategory(slug: string, page: number) {
  // 1️⃣ Try slug as LOCATION directly
  const directRes = await fetch(
    `${API_BASE}/${slug}?page=${page}&package_country=international`,
    { headers: { "X-Public-Token": XPublicToken }, cache: "no-store" }
  );

  if (directRes.ok) {
    return {
      location: slug,
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
    const possibleLocation = `${parts.slice(0, i).join("-")}-tour-packages`;
    const possibleCategory = parts.slice(i).join("-");

    const res = await fetch(
      `${API_BASE}/${possibleLocation}?page=${page}&package_country=international&category_slug=${possibleCategory}`,
      { headers: { "X-Public-Token": XPublicToken }, cache: "no-store" }
    );

    if (res.ok) {
      return {
        location: possibleLocation,
        category: possibleCategory,
        data: await res.json(),
      };
    }
  }

  notFound();
}


export async function generateMetadata({ params }: any) {
  try {
    const data = await fetchInternationalPackageData(params.slug);
    const meta = data?.data?.country ? data?.data?.country?.meta : data?.data?.location?.meta || {};
    const canonical = await getCanonical(
      params?.slug ? `/international-holidays/${params.slug}` : ""
    );
    const currentUrl = canonical;
    return {
      title: meta?.meta_title || "Cholan Tours",
      description: meta?.meta_description || "Cholan Tours",
      keywords: meta.meta_keywords || "",
      alternates: { canonical },

      openGraph: {
        title: meta?.meta_title || "Cholan Tours",
        url: currentUrl,
        description: meta?.meta_description || "Cholan Tours",
      },

      twitter: {
        title: meta?.meta_title || "Cholan Tours",
        url: currentUrl,
        description: meta?.meta_description || "Cholan Tours",
      },
    };
  } catch (error) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}
export default async function IntenationalListing({ params, searchParams }: any) {
  const page = Number(searchParams?.page) || 1;
  const { slug } = params;

  const resolved = await resolveInternationalLocationAndCategory(slug, page);

  return (
    <InternationalPackageListing
      packageList1={resolved.data.data}
      initialPage={page}
      slug1={resolved.location}
      categorySlug={resolved.category}
      ssrFixedData={resolved.data.data}
    />
  );
}
