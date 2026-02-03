import BusDetails from "@/app/components/bus/BusDetailsPage";
import CarDetails from "@/app/components/car/CarDetailsPage";
import CarRental from "@/app/components/car/CarPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchBusDetailsPageData } from "@/app/services/busService";

import "aos/dist/aos.css";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: any) {
  const data = await fetchBusDetailsPageData(params.slug);
  // ✅ Handle invalid slug early
  if (!data || !data.data || !data.data.route) {
    notFound();
  }

  const meta = data?.data?.route?.meta || {};
  const canonical = await getCanonical(
    params?.slug ? `/bus-rental/${params.slug}` : ""
  );

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
  };
}

export default async function CarDetail({ params }: any) {
  const data = await fetchBusDetailsPageData(params.slug);
   // ✅ Handle invalid slug early
  if (!data || !data.data || !data.data.route) {
    notFound();
  }
  return <BusDetails data={data} slug={params.slug} />;
}
