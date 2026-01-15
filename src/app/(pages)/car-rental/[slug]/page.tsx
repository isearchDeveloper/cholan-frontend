
import CarDetails from "@/app/components/car/CarDetailsPage";
import { getCanonical } from "@/app/lib/getCanonical";
import {
  fetchCarDetailsPageData,
  fetchCarPageData,
  fetchCityWiseCarData,
} from "@/app/services/carService";
import "aos/dist/aos.css";
import { notFound } from "next/navigation";

/* =========================
   METADATA (FIXED)
========================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = slug.includes("-to-")
    ? await fetchCarDetailsPageData(slug)
    : await fetchCityWiseCarData(slug);

  const meta = data?.data?.route?.meta || data?.data?.city?.meta;

  const canonical = await getCanonical(`/car-rental/${slug}`);

  return {
    title: meta?.meta_title || "Cholan Tours",
    description: meta?.meta_description || "Cholan Tours",
    keywords: meta?.meta_keywords || "",
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || "Cholan Tours",
      description: meta?.meta_description || "Cholan Tours",
      url: canonical,
    },

    twitter: {
      title: meta?.meta_title || "Cholan Tours",
      description: meta?.meta_description || "Cholan Tours",
      url: canonical,
    },
  };
}


/* =========================
   PAGE (FIXED)
========================= */
export default async function CarDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ THIS WAS MISSING

  const carPage = await fetchCarPageData();
  const cityData = carPage?.data?.carcity || [];

  const data = slug.includes("-to-")
    ? await fetchCarDetailsPageData(slug)
    : await fetchCityWiseCarData(slug);

  if (!data) {
    notFound();
  }
  
  return (
    <CarDetails
      data={data}
      slug={slug}
      carCities={cityData}
    />
  );
}