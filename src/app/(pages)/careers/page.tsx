export const dynamic = "force-dynamic";
import React from "react";
import { Metadata } from "next";
import Careers from "@/app/components/carreers/carreears";
import { getCanonical } from "@/app/lib/getCanonical";
import { CarrierarData } from "@/app/services/carreersServices";

export async function generateMetadata() {
  const data = await CarrierarData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/careers");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

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
}

export default async function Page() {
  return <Careers />;
}
