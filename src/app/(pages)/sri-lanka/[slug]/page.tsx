
import React from "react";
import "aos/dist/aos.css";
import SriLankaPackageListing from "@/app/components/sriLankaPackageListing/sriLankaPackageListing";
import { fetchSriLankaPackageData } from "@/app/services/sriLankaPackageListService";
import DynamicMetaTags from "@/app/components/DynamicMetaTags";
import { getCanonical } from "@/app/lib/getCanonical";

// Generate static metadata
export async function generateMetadata({ params }: any) {
  try {
    const data = await fetchSriLankaPackageData(params.slug);
    const meta = data?.data?.location?.meta || {};
    const canonical = await getCanonical(params?.slug ? `/${params.slug}` : "");
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

const SriLankaPage = async ({ params }: any) => {
  let data;
  let metaDetails = "";

  try {
    data = await fetchSriLankaPackageData(params.slug);
    metaDetails = data?.data?.location?.meta?.meta_details || "";
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      {/* Render dynamic meta tags and scripts */}
      <DynamicMetaTags metaDetails={metaDetails} />

      <SriLankaPackageListing data={data} />
    </>
  );
};

export default SriLankaPage;
