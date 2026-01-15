import "aos/dist/aos.css";
import HotelTourDetails from "@/app/components/hotel/luxuryHotelsDetails";
import { fetchHotelDetailsData } from "@/app/services/luxuryHotelService";
import { getCanonical } from "@/app/lib/getCanonical";

export async function generateMetadata({ params }: any) {
  const data = await fetchHotelDetailsData(params.slug);

  const meta = data?.data?.hotel?.meta || "";

  const metaDetails = meta?.meta_details || "";
  const canonical = await getCanonical(params?.slug ? `/${params.slug}` : "");
  const currentUrl = canonical;

  return {
    title: meta?.meta_title || "Cholan Tours",
    description: meta?.meta_description || "Cholan Tours",
    keywords: meta?.meta_keywords || "",
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

    // other: {
    //   "meta-details": metaDetails,
    // },
  };
}

export default function HotelTourDetailsPage() {
  return <HotelTourDetails />;
}
