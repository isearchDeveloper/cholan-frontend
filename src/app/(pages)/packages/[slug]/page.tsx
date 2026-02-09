import "aos/dist/aos.css";
import PackageDetails from "@/app/components/packageDetails/PackageDetails";
import { fetchPackageDetailsData } from "@/app/services/packageDetailsService";
// import DynamicMetaTags from "@/app/components/DynamicMetaTags";
import { getCanonical } from "@/app/lib/getCanonical";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const data = await fetchPackageDetailsData(slug);

    const meta = data?.data?.package?.meta || {};
    const canonical = await getCanonical(`/packages/${slug}`);

    const packageName = data.data.package.title;
   const days = data?.data?.package?.details?.duration_days ?? "";
const nights = data?.data?.package?.details?.duration_nights ?? "";


    const dynamicTitle = `${packageName} ${days} Days ${nights} Nights | Cholan Tours`;
    const dynamicDescription = `Book ${packageName} for ${days} Days ${nights} Nights. Includes accommodation, sightseeing tours, transfers and a well-planned travel itinerary.`;
  // console.log("meta running:" +dynamicTitle )
  //  console.log("meta running:" +dynamicDescription )
    const finalTitle = meta?.meta_title || dynamicTitle;
    const finalDescription = meta?.meta_description || dynamicDescription;

    return {
      title: finalTitle,
      description: finalDescription,
      alternates: { canonical },
    };
  } catch (e) {
    return {
      title: "Cholan Tours",
      description: "Explore premium travel experiences with Cholan Tours.",
    };
  }
}

export default async function TourDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let data;
  let metaDetails = "";

  try {
    data = await fetchPackageDetailsData(slug);
    metaDetails = data?.data?.package?.meta?.meta_details || "";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // ❗ Correct 404 logic: if package missing → show 404 page
  if (!data?.data?.package) {
    notFound();
  }
  return (
    <>
      {/* <DynamicMetaTags metaDetails={metaDetails} /> */}
      <PackageDetails initialData={data?.data} />
    </>
  );
}
