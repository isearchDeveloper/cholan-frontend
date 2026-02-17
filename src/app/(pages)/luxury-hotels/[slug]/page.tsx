import "aos/dist/aos.css";
import { fetchHotelDetailsData } from "@/app/services/luxuryHotelService";
import { getCanonical } from "@/app/lib/getCanonical";
import HotelTourDetails from "@/app/components/hotel/luxuryHotelsDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: any) {
  //const { slug } = params;
  //const [trainOverviewData] = await Promise.all([fetchHotelDetailsData(slug)]);
  const data = await fetchHotelDetailsData(params.slug);

  const meta = data?.data?.hotel?.meta || "";

  const metaDetails = meta?.meta_details || "";
 const canonical = await getCanonical(
  params?.slug
    ? `/luxury-hotels/${params.slug}`
    : "/luxury-hotels"
);

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

// //export default function HotelTourDetailsPage({ params }: any) {
// export default async function HotelTourDetailsPage({ params }: any) {

//   const { slug } = params;
//     const [trainOverviewData] = await Promise.all([fetchHotelDetailsData(slug)]);

//   return <HotelTourDetails hotelDetailsData={trainOverviewData.data} slug={slug} />;
// }
export default async function HotelTourDetailsPage(props: any) {
 
  const params = await props.params;
  const slug = params.slug;

  let hotelData;

  try {
    hotelData = await fetchHotelDetailsData(slug);
  } catch (error) {
    // API failed → treat as not found
    notFound();
  }

  // API success but no data
  if (!hotelData?.data?.hotel) {
    notFound();
  }

  return (
    <HotelTourDetails
      hotelDetailsData={hotelData.data}
      slug={slug}
    />
  );
}