import React from "react";
import { Metadata } from "next";
import {  XPublicToken } from "@/app/urls/apiUrls";

import { getCanonical } from "@/app/lib/getCanonical";
import { TermsCodnitonData } from "@/app/services/terms&ConditionServices";
import Profile from "@/app/components/profile/profile";
import { profileData } from "@/app/services/staticPagesServices";

export async function generateMetadata() {
  const data = await profileData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/profile");
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

    // Dynamically inject the meta_details content into head
    // other: {
    //   // This will render the raw HTML from meta_details in the head section
    //   "meta-details": metaDetails,
    // },
  };
}



export default async function Page() {
  return(
    <Profile/>
  );
}
