import React from "react";
import { XPublicToken } from "@/app/urls/apiUrls";
import "aos/dist/aos.css";

import InternationalPackageListing from "@/app/components/internationalTourPackages/internationalPackageListing";
import { fetchInternationalPackageData } from "@/app/services/internationaltourService";
import DynamicMetaTags from "@/app/components/DynamicMetaTags";
import { getCanonical } from "@/app/lib/getCanonical";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: any) {
  try {
    const data = await fetchInternationalPackageData(params.slug);
    const meta = data?.data?.country ? data?.data?.country?.meta : data?.data?.location?.meta || {};
    const canonical = await getCanonical(
      params?.slug ? `/international-holidays/${params.slug}` : ""
    );
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
  } catch (error) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}
export default async function IntenationalListing({
  params,
  searchParams,
}: any) {
  const page = Number(searchParams?.page) || 1;
  const categorySlug = searchParams?.category_slug || "";

  const apiUrl = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/${params.slug}?page=${page}&package_country=international`;

  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Public-Token": XPublicToken },
      cache: "no-store", // ensures SSR freshness
    });

    if (!response.ok) {
      throw new Error("Failed to fetch packages");
    }

    const data = await response.json();
    return <InternationalPackageListing packageList1={data.data} initialPage={page} slug1={params.slug} ssrFixedData={data.data} />;
  } catch (err) {
    console.error("Error fetching SSR packages:", err);
     return notFound();
    // return <div className="text-center py-10 text-danger">Failed to load packages.</div>;
  }
}