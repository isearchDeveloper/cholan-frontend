// "use client";
import Banner from "@/app/components/common/banner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ExpandableText from "@/app/components/common/ExpandableText";
import FAQAccordion from "@/app/components/common/FAQAccordion";
import FAQAccordionListing from "@/app/components/common/FAQAccordionForListing";
import LogoSlider from "@/app/components/home/LogoSlider";
import FAQAccordionForHotel from "@/app/components/hotel/faqForHotel";
import HotelTabWithImages from "@/app/components/hotel/hotelTabWithImages";
import TopHotelsCard from "@/app/components/hotel/TopHotelsCard";
import FAQAccordionForTrain from "@/app/components/luxury-trains/FAQAccordionForTrain";
import TrainBanner from "@/app/components/luxury-trains/trainBanner";
import TrainCard from "@/app/components/luxury-trains/TrainCard";
import TrainExpandableText from "@/app/components/luxury-trains/trainExpandableText";
import TrainTabWithImages from "@/app/components/luxury-trains/traintabwithimages";
import ReviewsWidget from "@/app/components/ReviewsWidget";
import { getCanonical } from "@/app/lib/getCanonical";
import {
  fetchHotelListData,
  fetchHotelPageData,
} from "@/app/services/luxuryHotelService";
import { fetchTrainData, trainList } from "@/app/services/luxuryTrainService";
import { unstable_cache } from "next/cache";
import HotelCitySection from "@/app/components/hotel/HotelCitySection";

export async function generateMetadata({ params }: any) {
  const data = await fetchHotelPageData();

  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/luxury-hotels");

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

export default async function LuxuryHotels() {
  const [hotelData, hotelListData] = await Promise.all([
    fetchHotelPageData(),
    fetchHotelListData(),
  ]);

  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Luxury Hotels", isCurrent: true },
  ];

  return (
    <div className="train-wrapper hotel">
      <TrainBanner data={hotelData.data.details.banner_image} />
      <div className="pt-4">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
          <TrainExpandableText
            title={hotelData.data.details.title}
            text={hotelData.data.details.description}
            collapsedLines={2}
          />
        </div>

        <HotelTabWithImages trainListData={hotelListData.data.hotels} />

        <div className="mt-5">
          <HotelCitySection cities={hotelListData.data.hotelCities} />
        </div>

        {hotelData?.data?.details?.faqs.length < 1 ? null : (
          <div className="faqs py-5">
            <div className="container">
              <FAQAccordionForHotel faqs={hotelData?.data?.details?.faqs} title={hotelData?.data?.details?.faq_title}
              />
            </div>
          </div>
        )}

        {hotelListData.data?.top_hotels?.length < 1 ? null : (
          <div className="py-5 lux-hotels">
            <div className="container">
              <h2 className="mb-4 text-black text-center font-semibold fs-3">
                Top Luxury Hotels
              </h2>

              <div className="row">
                {hotelListData.data?.top_hotels?.map((data: any) => (
                  <div key={data.slug} className="col-lg-4">
                    <TopHotelsCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pt-5">
          <ReviewsWidget />
        </div>

         <div className="py-5">
          <LogoSlider />
        </div>
      </div>
    </div>
  );
}
