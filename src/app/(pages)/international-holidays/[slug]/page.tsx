import React from "react";
import { XPublicToken } from "@/app/urls/apiUrls";
import "aos/dist/aos.css";

import InternationalPackageListing from "@/app/components/internationalTourPackages/internationalPackageListing";
import { fetchInternationalPackageData } from "@/app/services/internationaltourService";
import DynamicMetaTags from "@/app/components/DynamicMetaTags";
import { getCanonical } from "@/app/lib/getCanonical";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { fetchCityIntroData } from "@/app/services/cityService";

const API_BASE = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages`;

async function resolveInternationalLocationAndCategory(slug: string, page: number) {
  const directRes = await fetch(
    `${API_BASE}/${slug}?page=${page}&package_country=international`,
    { headers: { "X-Public-Token": XPublicToken }, next: { revalidate: 60 }, }
  );

  if (directRes.ok) {
    return {
      location: slug,
      category: null,
      data: await directRes.json(),
    };
  }

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
      { headers: { "X-Public-Token": XPublicToken }, next: { revalidate: 60 }, }
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
  const { slug } = await params;
  if (!slug.endsWith("-tour-packages")) {
    const cityName = slug
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const canonical = await getCanonical(`/international-holidays/${slug}`);

    return {
      title: `${cityName} Tourism | Cholan Tours`,
      description: `Explore ${cityName} international tour packages.`,
      alternates: { canonical },
    };
  }

  const data = await fetchInternationalPackageData(slug);
  const meta =
    data?.data?.country?.meta ||
    data?.data?.location?.meta ||
    {};

  const canonical = await getCanonical(`/international-holidays/${slug}`);

  return {
    title: meta?.meta_title || "Cholan Tours",
    description: meta?.meta_description || "Cholan Tours",
    keywords: meta?.meta_keywords || "",
    alternates: { canonical },
  };
}

export default async function IntenationalListing({ params, searchParams }: any) {
  const { slug } = await params;
  if (!slug.endsWith("-tour-packages")) {
    const cityIntroRes = await fetchCityIntroData(slug);
    if (parseInt(cityIntroRes?.data?.city?.type) !== 2) {
      notFound();
    }

    return (
      <CityIntroPage
        slug={slug}
        country="international-holidays"
        cityData={cityIntroRes?.data || null}
      />
    );
  }
  const page = Number(searchParams?.page) || 1;

  const resolved = await resolveInternationalLocationAndCategory(slug, page);

  return (
    <InternationalPackageListing
      packageList1={resolved.data.data}
      initialPage={page}
      slug1={resolved.location}
      categorySlug={resolved.category}
      ssrFixedData={resolved.data.data}
      originalSlug={slug}
    />
  );
}

