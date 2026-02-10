export const revalidate = 0;
 
import React from "react";
import InternationalPackageListing from "@/app/components/internationalTourPackages/internationalPackageListing";
import { fetchInternationalPackageData } from "@/app/services/internationaltourService";
import { getCanonical } from "@/app/lib/getCanonical";
import { notFound } from "next/navigation";
 
/* =======================
   SEO METADATA
======================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
 
 
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
export default async function InternationalListing({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
 
  const currentPage = Number(page ?? 1);
 
  //  HARD RULE — ONLY package listing allowed
  if (!slug.endsWith("-tour-packages")) {
    notFound();
  }
 
  const res = await fetchInternationalPackageData(slug);
 
  if (!res?.data) {
    notFound();
  }
 
  const countryName =
    res?.data?.location?.country?.name ||
    res?.data?.country?.name ||
    "";
 
  if (countryName.toLowerCase().includes("india")) {
  notFound();
}
 
 
  return (
    <InternationalPackageListing
      packageList1={res.data}
      initialPage={currentPage}
      slug1={slug}
      categorySlug={null}
      ssrFixedData={res.data}
      originalSlug={slug}
    />
  );
}