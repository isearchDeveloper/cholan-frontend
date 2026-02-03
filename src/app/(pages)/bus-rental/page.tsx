

import BusRental from "@/app/components/bus/BusPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchBusPageData } from "@/app/services/busService";
import "aos/dist/aos.css";


export async function generateMetadata() {
  const data = await fetchBusPageData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/bus-rental");
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


export default async function BusRentalpage() {
  
    const data = await fetchBusPageData();

    return (
      <BusRental data={data}/>
    );
}