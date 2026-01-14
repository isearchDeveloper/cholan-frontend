// "use client";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import LogoSlider from "@/app/components/home/LogoSlider";

import FAQAccordionForTrain from "@/app/components/luxury-trains/FAQAccordionForTrain";
import TrainBanner from "@/app/components/luxury-trains/trainBanner";
import TrainExpandableText from "@/app/components/luxury-trains/trainExpandableText";
import TrainTabWithImages from "@/app/components/luxury-trains/traintabwithimages";
import ReviewsWidget from "@/app/components/ReviewsWidget";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchTrainData, trainList } from "@/app/services/luxuryTrainService";
import { unstable_cache } from "next/cache";

export async function generateMetadata({ params }: any) {
  const data = await fetchTrainData();

  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/luxury-trains");

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";
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

    // Dynamically inject the meta_details content into head
    // other: {
    //   // This will render the raw HTML from meta_details in the head section
    //   "meta-details": metaDetails,
    // },
  };
}

export default async function LuxuryTrain() {
  const [trainData, trainListData] = await Promise.all([
    fetchTrainData(),
    trainList(),
  ]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Luxury Trains", isCurrent: true },
  ];

  return (
    <div className="train-wrapper">
      <TrainBanner data={trainData.data.details.banner_image} />

      <div className="pt-4 pb-5">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
          <TrainExpandableText
            title={trainData.data.details.title}
            text={trainData.data.details.description}
            collapsedLines={2}
          />
        </div>

        <div className="pt-5">
          <TrainTabWithImages trainListData={trainListData.data} />
        </div>

        {trainData?.data?.details?.faqs.length < 1 ? null : (
          <div className="faqs pt-5">
            <div className="container">
              <FAQAccordionForTrain faqs={trainData?.data?.details?.faqs} title={trainData?.data?.details?.faq_title} />
            </div>
          </div>
        )}

        <div className="pt-5">
          <ReviewsWidget />
        </div>

        <div className="pt-5">
          <LogoSlider />
        </div>
      </div>
    </div>
  );
}
