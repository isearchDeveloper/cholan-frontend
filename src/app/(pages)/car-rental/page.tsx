
import CarRental from "@/app/components/car/CarPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchCarPageData } from "@/app/services/carService";
import "aos/dist/aos.css";


export async function generateMetadata() {
  const data = await fetchCarPageData();
  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/car-rental");
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
  };
}


export default async function LuxuryTrain() {
  
    const data = await fetchCarPageData();


    return (
      <CarRental data={data}/>
    );
}
