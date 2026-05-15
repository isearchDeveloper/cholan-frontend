
import WomenChauffeurDriver from "@/app/components/car/WomenChauffeurDriver";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchCarPageData, fetchWomenChauffeurPageData } from "@/app/services/carService";
import "aos/dist/aos.css";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "Women Chauffeur Driver", isCurrent: true },
];

export async function generateMetadata() {
  const womenData = await fetchWomenChauffeurPageData();
  const meta = womenData?.data?.details?.meta || {};
  const canonical = await getCanonical("/car-rental/women-chauffeur-driver");

  return {
    title: meta?.meta_title || "Women Chauffeur Driver | Cholan Tours",
    description: meta?.meta_description || "Book a professional women chauffeur driver with Cholan Tours for safe, comfortable, and reliable travel across India.",
    keywords: meta?.meta_keywords || "women chauffeur driver, female driver, women cab service, safe travel, Cholan Tours",
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || "Women Chauffeur Driver | Cholan Tours",
      url: canonical,
      description: meta?.meta_description || "Book a professional women chauffeur driver with Cholan Tours for safe, comfortable, and reliable travel across India.",
    },

    twitter: {
      title: meta?.meta_title || "Women Chauffeur Driver | Cholan Tours",
      url: canonical,
      description: meta?.meta_description || "Book a professional women chauffeur driver with Cholan Tours for safe, comfortable, and reliable travel across India.",
    },
  };
}

export default async function WomenChauffeurDriverPage() {
  const [carData, womenData] = await Promise.all([
    fetchCarPageData(),
    fetchWomenChauffeurPageData(),
  ]);

  const mergedData = {
    ...carData,
    data: {
      ...carData?.data,
      details: womenData?.data?.details ?? carData?.data?.details,
    },
  };

  return (
    <WomenChauffeurDriver
      data={mergedData}
      chauffeurSection={womenData?.data?.chauffeur_section ?? null}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
