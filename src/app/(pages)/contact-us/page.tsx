import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";

import "react-phone-input-2/lib/style.css";

import { getCanonical } from "@/app/lib/getCanonical";
import { fetchcontactmetaData } from "@/app/services/contactservice";
import ContactSection from "@/app/components/contactUs/contactUsPage";
import {  XPublicToken } from "@/app/urls/apiUrls";

export async function generateMetadata() {
  const data = await fetchcontactmetaData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/contact-us");
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
async function getPageDetails() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=contact`, {
    headers: {
      "Content-Type": "application/json",
      "X-Public-Token": XPublicToken,
    },
    next: { revalidate: 60 }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data?.details || null;
}
export default async function () {
   const pageData = await getPageDetails();
  return <ContactSection  pageData={pageData} />;
}
