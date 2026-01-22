import React from "react";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { notFound } from "next/navigation";
import CityIntroPage from "@/app/components/city/CityIntroPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { fetchCityIntroData } from "@/app/services/cityService";
import ThemePackageListing from "@/app/components/theme/ThemePackageListing";
import { fetchThemesData } from "@/app/services/themeService";

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
    const lastDash = base.lastIndexOf("-");
    return {
      city: base.slice(0, lastDash),
      themeSlug: base.slice(lastDash + 1),
    };
  }

  const isThemePage =
    slug.endsWith("-tour-packages") &&
    slug.replace("-tour-packages", "").includes("-");

  //  THEME PACKAGE LISTING (DUMMY, ISOLATED)
  //  THEME PACKAGE LISTING (STATIC FOR NOW)
  if (isThemePage) {
    const { city, themeSlug } = extractCityAndTheme(slug);

    const cityRes = await fetchThemesData(city);
    const rawThemes = cityRes?.data?.themes;

    const themesArray = Array.isArray(rawThemes)
      ? rawThemes
      : rawThemes
        ? [rawThemes]
        : [];

    const currentTheme = themesArray.find((t: any) => t.slug === themeSlug);

    if (!currentTheme) {
      notFound();
    }
//   const themeSidebarData = {
//   location: {
//     name: city,
//   },
//   categories: themesArray.map((t: any) => ({
//     title: t.title,
//     slug: t.slug,
//   })),
// };

    // 🔒 BUILD ONE CLEAN OBJECT
const themePageData = {
  city,
  theme: {
    title: currentTheme.title,
    slug: currentTheme.slug,
    overview: currentTheme.overview,
    banner_image: currentTheme.primary_img
      ? `https://cdn.cholantours.com/${currentTheme.primary_img}`
      : "/images/banner.webp",
  },
  listing: {
    location: {
      details: {
        title: `${city} ${currentTheme.title} Tour Packages`,
        about: currentTheme.overview,
        banner_image: currentTheme.primary_img
          ? `https://cdn.cholantours.com/${currentTheme.primary_img}`
          : "/images/banner.webp",
      },
      faqs: [],
    },
    packages: [],
  },
  // sidebar: themeSidebarData, 
};

    return <ThemePackageListing data={themePageData} />;
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
      categorySlug={null} // 🔒 disabled forever
      originalSlug={slug}
    />
  );
}
