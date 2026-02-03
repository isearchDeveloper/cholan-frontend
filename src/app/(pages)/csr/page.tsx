import CSR from '@/app/components/csr/csr';
import { getCanonical } from '@/app/lib/getCanonical';
import { csrData } from '@/app/services/staticPagesServices';
import React from 'react'


export async function generateMetadata() {
  const data = await csrData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/csr");
  const currentUrl = canonical;

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
  return(
    <CSR/>
  );
}