// export const revalidate = 0;

// import React from "react";
// import InternationalPackageListing from "@/app/components/internationalTourPackages/internationalPackageListing";
// import { fetchInternationalPackageData } from "@/app/services/internationaltourService";
// import { getCanonical } from "@/app/lib/getCanonical";
// import { notFound } from "next/navigation";
// import CityIntroPage from "@/app/components/city/CityIntroPage";
// import { fetchCityIntroData } from "@/app/services/cityService";

// /* =======================
//    SEO METADATA
// ======================= */
// export async function generateMetadata({ params }: any) {
//   const { slug } = params;

//   // ✅ CITY INTRO PAGE
//   if (!slug.endsWith("-tour-packages")) {
//     const cityRes = await fetchCityIntroData(slug);
//     if (!cityRes?.data?.city) return {};

//     const city = cityRes.data.city;
//     const canonical = await getCanonical(`/international-holidays/${slug}`);

//     return {
//       title: city.meta_title || `${city.title} Tourism | Cholan Tours`,
//       description:
//         city.meta_description ||
//         `Explore ${city.title} international tour packages.`,
//       alternates: { canonical },
//     };
//   }

//   // ✅ INTERNATIONAL PACKAGE LISTING PAGE
//   const res = await fetchInternationalPackageData(slug);
//   if (!res?.data) return {};

//   const meta =
//     res.data.country?.meta ||
//     res.data.location?.meta ||
//     {};

//   const canonical = await getCanonical(`/international-holidays/${slug}`);

//   return {
//     title: meta.meta_title || "Cholan Tours",
//     description: meta.meta_description || "Cholan Tours",
//     keywords: meta.meta_keywords || "",
//     alternates: { canonical },
//   };
// }

// /* =======================
//    PAGE RENDER
// ======================= */
// // export default async function InternationalListing({
// //   params,
// //   searchParams,
// // }: {
// //   params: { slug: string };
// //   searchParams: { page?: string };
// // }) {
// //   const { slug } = params;
// //   const page = Number(searchParams?.page ?? 1);

// //   // ✅ CITY INTRO PAGE
// //   if (!slug.endsWith("-tour-packages")) {
// //     const cityIntroRes = await fetchCityIntroData(slug);

// //     if (parseInt(cityIntroRes?.data?.city?.type) !== 2) {
// //       notFound();
// //     }

// //     return (
// //       <CityIntroPage
// //         slug={slug}
// //         country="international-holidays"
// //         cityData={cityIntroRes?.data || null}
// //       />
// //     );
// //   }

// //   // ✅ INTERNATIONAL PACKAGE LISTING PAGE
// //   const res = await fetchInternationalPackageData(slug);

// //   if (!res?.data) {
// //     notFound();
// //   }

// //   return (
// //     <InternationalPackageListing
// //       packageList1={res.data}
// //       initialPage={page}
// //       slug1={slug}
// //       categorySlug={null}   // 🔒 permanently disabled
// //       ssrFixedData={res.data}
// //       originalSlug={slug}
// //     />
// //   );
// // }

// export default async function InternationalListing({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ slug: string }>;
//   searchParams: Promise<{ page?: string }>;
// }) {
//   const { slug } = await params;           // ✅ awaited
//   const sp = await searchParams;           // ✅ awaited
//   const page = Number(sp?.page ?? 1);

//   // ✅ CITY INTRO PAGE
//   if (!slug.endsWith("-tour-packages")) {
//     const cityIntroRes = await fetchCityIntroData(slug);

//     if (parseInt(cityIntroRes?.data?.city?.type) !== 2) {
//       notFound();
//     }

//     return (
//       <CityIntroPage
//         slug={slug}
//         country="international-holidays"
//         cityData={cityIntroRes?.data || null}
//       />
//     );
//   }

//   // ✅ PACKAGE LISTING PAGE
//   const res = await fetchInternationalPackageData(slug);

//   if (!res?.data) {
//     notFound();
//   }

//   return (
//     <InternationalPackageListing
//       packageList1={res.data}
//       initialPage={page}
//       slug1={slug}
//       categorySlug={null}   // 🔒 sidebar disabled
//       ssrFixedData={res.data}
//       originalSlug={slug}
//     />
//   );
// }

export const revalidate = 0;

import React from "react";
import InternationalPackageListing from "@/app/components/internationalTourPackages/internationalPackageListing";
import { fetchInternationalPackageData } from "@/app/services/internationaltourService";
import { getCanonical } from "@/app/lib/getCanonical";
import { notFound } from "next/navigation";

/* =======================
   SEO METADATA
======================= */
export async function generateMetadata({ params }: any) {
  const { slug } = params;

  // npmn Only listing pages allowed
  if (!slug.endsWith("-tour-packages")) {
    return {};
  }

  const res = await fetchInternationalPackageData(slug);
  if (!res?.data) return {};

  const meta =
    res.data.country?.meta ??
    res.data.location?.meta ??
    {};

  const canonical = await getCanonical(
    `/international-holidays/${slug}`
  );

  return {
    title: meta.meta_title ?? "Cholan Tours",
    description: meta.meta_description ?? "Cholan Tours",
    keywords: meta.meta_keywords ?? "",
    alternates: { canonical },
  };
}

/* =======================
   PAGE RENDER
======================= */
export default async function InternationalListing({ params, searchParams }: any) {
  const { slug } = params;
  const page = Number(searchParams?.page ?? 1);

  //  HARD RULE — ONLY package listing allowed
  if (!slug.endsWith("-tour-packages")) {
    notFound();
  }

  const res = await fetchInternationalPackageData(slug);

  if (!res?.data) {
    notFound();
  }

  return (
    <InternationalPackageListing
      packageList1={res.data}
      initialPage={page}
      slug1={slug}
      categorySlug={null}
      ssrFixedData={res.data}
      originalSlug={slug}
    />
  );
}
