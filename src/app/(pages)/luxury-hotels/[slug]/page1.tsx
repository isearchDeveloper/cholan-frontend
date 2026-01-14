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
    title: meta?.meta_title || "cholan tours",
    description: meta?.meta_description || "cholan tours",
    keywords: meta?.meta_keywords || "",
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

    // other: {
    //   "meta-details": metaDetails,
    // },
  };
}

export default function HotelTourDetailsPage() {
  return <HotelTourDetails />;
}
