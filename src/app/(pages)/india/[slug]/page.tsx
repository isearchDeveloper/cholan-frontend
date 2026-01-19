import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { XPublicToken } from "@/app/urls/apiUrls";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { fetchCityIntroData } from "@/app/services/cityService";

const API_BASE = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/city`;

async function resolveCityAndCategory(slug: string, page: number) {
  const directRes = await fetch(
    `${API_BASE}/${slug}?page=${page}&package_country=india`,
    { headers: { "X-Public-Token": XPublicToken } }
  );

  if (directRes.ok) {
    const json = await directRes.json();

    if (json?.data?.location) {
      return {
        city: slug,
        category: null,
        data: json,
      };
    }
  }

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
      const json = await res.json();

      if (json?.data?.location) {
        return {
          city: possibleCity,
          category: possibleCategory,
          data: json,
        };
      }
    }
  }

  notFound();
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;

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

export default async function TourListingPage({ params, searchParams }: any) {
  const { slug } = await params;
  const cityName = slug;

  const cityIntroRes = await fetchCityIntroData(cityName);
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
  const page = Number(searchParams?.page) || 1;

  const resolved = await resolveCityAndCategory(slug, page);

  return (
    <IndiaPackageListing
      packageList1={resolved.data.data}
      initialPage={page}
      slug1={resolved.city}
      categorySlug={resolved.category}
      originalSlug={slug}
    />
  );
}

