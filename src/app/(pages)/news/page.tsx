import NewsLetter from '@/app/components/news-letter/news-letter';
import { getCanonical } from '@/app/lib/getCanonical';
import { newsData } from '@/app/services/staticPagesServices';
import React from 'react';


export async function generateMetadata() {
  const data = await newsData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/news");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

  return {
    title: meta?.meta_title || "Cholan Tours News and Press Releases - Cholan Tours",
    description: meta?.meta_description || "Stay updated with latest Cholan Tours news, travel stories, destination updates, tour announcements, and insights. Read travel tips by experts for your next journey.",
    keywords: meta.meta_keywords || "cholan tours news, cholan tours press release, travel tips, cholantours company news, destination updates.",
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
    <NewsLetter/>
  );
}