
import React from "react";
import { Metadata } from "next";
import {  XPublicToken } from "@/app/urls/apiUrls";
import PrivacyPolicy from "@/app/components/privacyPolicy/privacyPolicy";
import { getCanonical } from "@/app/lib/getCanonical";
import { PrivacyPolicyData } from "@/app/services/privacyPolicySevices";

export async function generateMetadata({ params }: any) {
  const data = await PrivacyPolicyData();

  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/privacy-policy");

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";
  const currentUrl = canonical;

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
    <PrivacyPolicy/>
  );
  
}
