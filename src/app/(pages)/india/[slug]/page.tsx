import React from "react";
import "aos/dist/aos.css";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { XPublicToken } from "@/app/urls/apiUrls";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";
import { notFound } from "next/navigation";

interface TourListingPageProps {
  params: { slug: string };
  searchParams?: { page?: string; category_slug?: string };
}

// ✅ FIXED generateMetadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params; // 🔥 MUST await

  const data = await fetchIndiaPackageData(slug);
  const meta = data?.data?.location?.meta || {};

  const canonical = await getCanonical(slug ? `/india/${slug}` : "");
  const currentUrl = canonical;

  return {
    title: meta?.meta_title || "cholan tours",
    description: meta?.meta_description || "cholan tours",
    keywords: meta.meta_keywords || "",
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || "cholan tours",
      url: currentUrl,
      description: meta?.meta_description || "cholan tours",
    },

    twitter: {
      title: meta?.meta_title || "cholan tours",
      url: currentUrl,
      description: meta?.meta_description || "cholan tours",
    },
  };
}

// ✅ FIXED Page
export default async function TourListingPage({
  params,
  searchParams,
}: any) {
  const { slug } = await params; // 🔥 MUST await
  const sp = await searchParams; // 🔥 MUST await

  const page = Number(sp?.page) || 1;
  const categorySlug = sp?.category_slug || "";

  const apiUrl = `https://crm.cholantours.com/api/v1/packages/city/${slug}?page=${page}&package_country=india`;

  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Public-Token": XPublicToken },
      cache: "no-store",
    });

    if (!response.ok) {
      notFound();
    }

    const data = await response.json();

    return (
      <IndiaPackageListing
        packageList1={data.data}
        initialPage={page}
        slug1={slug}
      />
    );
  } catch (err) {
    console.error("Error fetching SSR packages:", err);
    notFound();
  }
}
