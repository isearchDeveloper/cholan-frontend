export const dynamic = "force-dynamic";

import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { fetchCityIntroData } from "@/app/services/cityService";
import ThemePackageListing from "@/app/components/theme/ThemePackageListing";
import { fetchCityThemePackages, fetchThemeDetails, fetchThemePackages } from "@/app/services/themeService";
import ThemeCitySection from "@/app/components/country/indiaThemeCitySection";
import { fetchThemeList } from "@/app/services/themeService";
import { XPublicToken } from "@/app/urls/apiUrls";




/* =======================
   SEO METADATA
======================= */


export async function generateMetadata({ params }: any) {
  const { slug } = await params; // no await
  const canonical = await getCanonical(`/india/${slug}`);


   const themeSlugs = [
    "honeymoon",
    "family",
    "adventure",
    "hill-station",
    "wildlife",
    "pilgrimage",
  ];

  const isThemeLanding =
    slug.endsWith("-tour-packages") &&
    themeSlugs.includes(slug.replace("-tour-packages", ""));

  // THEME LANDING META (MOST IMPORTANT)
  if (isThemeLanding) {
    const theme = slug.replace("-tour-packages", "");

    const titleMap: any = {
      honeymoon: "Honeymoon Tour Packages in India",
      family: "Family Tour Packages in India",
      adventure: "Adventure Tour Packages in India",
      "hill-station": "Hill Station Tour Packages in India",
      wildlife: "Wildlife Tour Packages in India",
      pilgrimage: "Pilgrimage Tour Packages in India",
    };

    const descMap: any = {
      honeymoon:
        "Explore the most romantic honeymoon destinations in India with curated honeymoon tour packages, resorts, and experiences.",
      family:
        "Discover the best family-friendly destinations in India with comfortable, safe and fun family tour packages.",
      adventure:
        "Book thrilling adventure tour packages across India including trekking, rafting, wildlife safaris and more.",
      "hill-station":
        "Escape to the best hill stations in India with refreshing hill station tour packages and scenic stays.",
      wildlife:
        "Experience India's rich wildlife with jungle safaris and wildlife tour packages across national parks.",
      pilgrimage:
        "Plan your spiritual journey with the best pilgrimage tour packages across sacred destinations in India.",
    };

    return {
      title: `${titleMap[theme]} | Cholan Tours`,
      description: descMap[theme],
      alternates: { canonical },
    };
  }

  //  CITY INTRO
  if (!slug.endsWith("-tour-packages")) {
    const cityRes = await fetchCityIntroData(slug);
    if (!cityRes?.data?.city) return {};

    const city = cityRes.data.city;

    return {
      title: city.meta_title || `About ${city.title} | Cholan Tours`,
      description:
        city.meta_description ||
        `Explore the best tour packages, places to visit, and things to do in ${city.title}.`,
      alternates: { canonical },
    };
  }

  const themeData = await fetchThemePackages(slug);

  if (themeData) {
    const meta = themeData.meta || {};

    return {
      title:
        meta.meta_title || `${themeData.title} Tour Packages | Cholan Tours`,
      description: meta.meta_description || themeData.overview,
      keywords: meta.meta_keywords || "",
      alternates: { canonical },
    };
  }

  //  ELSE city listing
  const res = await fetchIndiaPackageData(slug);
  if (!res?.data?.location) return {};

  const meta = res.data.location.meta || {};

  return {
    title: meta.meta_title || "Cholan Tours",
    description: meta.meta_description || "Cholan Tours",
    keywords: meta.meta_keywords || "",
    alternates: { canonical },
  };
}


// page rendering 

function extractCityAndTheme(slug: string, themeSlugs: string[]) {
  const cleanSlug = slug.replace("-tour-packages", "");

  for (const theme of themeSlugs) {
    const themeClean = theme
      .replace("-tour-packages", "")
      .trim();

    if (cleanSlug.endsWith(themeClean)) {
      const cityPart = cleanSlug.slice(
        0,
        cleanSlug.length - themeClean.length - 1
      );

      return {
        citySlug: cityPart,
        themeSlug: themeClean,
      };
    }
  }

  return null;
}




export default async function TourListingPage({ params, searchParams }: any) {
  const { slug } = params;
  const page = Number(searchParams?.page ?? 1);


  const themeList = await fetchThemeList();
const themeSlugs = themeList.map((t: any) =>
  t.slug.replace("-tour-packages", "").trim()
);

const extracted = extractCityAndTheme(slug, themeSlugs);

// console.log("SLUG:", slug);
// console.log("THEME SLUGS:", themeSlugs);
// console.log("EXTRACTED:", extracted);


if (extracted) {
  const { citySlug, themeSlug } = extracted;

const { city, packages } = await fetchCityThemePackages(citySlug, themeSlug);

const cityIntro = await fetchCityIntroData(citySlug);
const sidebarThemes = cityIntro?.data?.themes || [];

  if (city) {
    const mappedData = {
      location: {
        details: {
          title: city.pivot.title,
          sub_title: city.pivot.title,
          banner_image: `https://cdn.cholantours.com/${city.pivot.banner_image}`,
          about: city.pivot.overview,
        },
      },
      packages,
      faqs: [],
      faq_title: city.pivot.faq_title,
    };

    return (
      <ThemePackageListing
        data={mappedData}
        cityName={city.name}
        citySlug={citySlug}
      sidebarThemes={sidebarThemes} 
      />
    );
  }
}



  //  STEP 1 — CITY INTRO (no -tour-packages)

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

  //  STEP 2 — ASK BACKEND: IS THIS A THEME?

  const themeData = await fetchThemePackages(slug);

  if (themeData) {
    return <ThemeCitySection theme={slug} />;
  }

  //  STEP 3 — OTHERWISE NORMAL CITY PACKAGE LISTING

  const res = await fetchIndiaPackageData(slug);

  if (!res?.data?.location && !res?.data?.region) {
    notFound();
  }

  if (res?.data?.region && !res?.data?.location) {
    res.data.location = {
      details: {
        title: res.data.region.title,
        sub_title: res.data.region.sub_title,
        banner_image: res.data.region.banner_image,
        about: res.data.region.about,
        meta: res.data.region.meta,
      },
    };
  }

  return (
    <IndiaPackageListing
      packageList1={res.data}
      initialPage={page}
      slug1={slug}
      categorySlug={null}
      originalSlug={slug}
    />
  );
}