export const dynamic = "force-dynamic";

import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { fetchCityIntroData } from "@/app/services/cityService";
import ThemePackageListing from "@/app/components/theme/ThemePackageListing";
import { fetchThemePackages } from "@/app/services/themeService";
import ThemeCitySection from "@/app/components/country/indiaThemeCitySection";



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

  // ✅ THEME LANDING META (MOST IMPORTANT)
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

/* =======================
   PAGE RENDER
======================= */
export default async function TourListingPage({ params, searchParams }: any) {
  const { slug } = await params;
  //  SAFE THEME PAGE CHECK (DO NOT TOUCH OTHER LOGIC)
 

    // ✅ THEME LANDING PAGE (india/honeymoon)
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

if (isThemeLanding) {
  const theme = slug.replace("-tour-packages", "");
  return <ThemeCitySection theme={theme} />;
}



  // CITY INTRO PAGE
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
  //  CITY PACKAGE LISTING PAGE

  // AFTER city intro check

  if (slug.endsWith("-tour-packages")) {
    //  First ask backend if this is theme
    const themeData = await fetchThemePackages(slug);
    // console.log(themeData);
    if (themeData) {
      const themeListingData = {
        ...themeData, //  keep everything
        location: {
          details: {
            title: `${themeData.title} Tour Packages`,
            sub_title: themeData.title,
            about: themeData.overview,
            banner_image: `https://cdn.cholantours.com/${themeData.primary_img}`,
          },
        },
      };

      const fullSlug = slug;
      const citySlug = fullSlug.split("-")[0];

      const cityRes = await fetchCityIntroData(citySlug);

      const sidebarThemes = Array.isArray(cityRes?.data?.themes)
        ? cityRes.data.themes
        : cityRes?.data?.themes
          ? [cityRes.data.themes]
          : [];

      return (
        <ThemePackageListing
          data={themeListingData}
          cityName={cityRes.data.city.title}
          citySlug={citySlug}
          sidebarThemes={sidebarThemes}
        />
      );
    }

    // If NOT theme → it is city listing
  }



  const page = Number(searchParams?.page ?? 1);
  const res = await fetchIndiaPackageData(slug);

  if (!res?.data?.location && !res?.data?.region) {
  notFound();
}

// 🔥 NORMALIZE REGION AS LOCATION
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
      categorySlug={null} //  disabled forever
      originalSlug={slug}
    />
  );
}
