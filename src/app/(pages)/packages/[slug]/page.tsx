import "aos/dist/aos.css";
import PackageDetails from "@/app/components/packageDetails/PackageDetails";
import { fetchPackageDetailsData } from "@/app/services/packageDetailsService";
import DynamicMetaTags from "@/app/components/DynamicMetaTags";
import { getCanonical } from "@/app/lib/getCanonical";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: any) {
  try {
    const data = await fetchPackageDetailsData(params.slug);
    const meta = data?.data?.package?.meta || {};
    const canonical = await getCanonical(
      params?.slug ? `/packages/${params.slug}` : ""
    );


    const currentUrl = canonical;

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
  } catch (error) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

export default async function TourDetailsPage({ params }: any) {
  let data;
  let metaDetails = "";

  try {
    data = await fetchPackageDetailsData(params.slug);
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
      <DynamicMetaTags metaDetails={metaDetails} />
      <PackageDetails initialData={data?.data}/>
    </>
  );
}
