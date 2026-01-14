import Partner from '@/app/components/partner/partner';
import { getCanonical } from '@/app/lib/getCanonical';
import { partnerData } from '@/app/services/staticPagesServices';
import React from 'react';

export async function generateMetadata() {
  const data = await partnerData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/partner");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

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

    // Dynamically inject the meta_details content into head
    // other: {
    //   // This will render the raw HTML from meta_details in the head section
    //   "meta-details": metaDetails,
    // },
  };
}

export default async function Page() {
  return(
    <Partner/>
  );
}
