// "use client";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import Tourpackages from "@/app/components/internationalTourPackages/tourpackages";
import TravelPackages from "@/app/components/common/travelpackages";
import IntBanner from "@/app/components/internationalTourPackages/intBanner";
import IntExpandableText from "@/app/components/internationalTourPackages/intExpandableText";
import TabWithImages from "@/app/components/internationalTourPackages/tabwithimages";
import {
  fetchInternationalPageData,
  fetchNoJsCountries,
  fetchNoJsTourPackages,
  specialInternationalPackageData,
} from "@/app/services/internationaltourService";
import { unstable_cache } from "next/cache";
import IntFaq from "@/app/components/internationalTourPackages/intFaq";
import { getCanonical } from "@/app/lib/getCanonical";
import { data } from "framer-motion/client";
import ReviewsWidget from "@/app/components/ReviewsWidget";
import TrendingTourPackages from "@/app/components/internationalTourPackages/trendingTourPackages";
import AboutSection from "@/app/components/home/AboutSection";
import LogoSlider from "@/app/components/home/LogoSlider";
import { trendingInternationalHomePackageData } from "@/app/services/homeService";

import CityStateListStatic from "@/app/components/country/CityStateListStatic";

export async function generateMetadata() {
  const data = await fetchInternationalPageData();

  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/international-holiday");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

  return {
    title: meta?.meta_title || "Cholan Tours",
    description: meta?.meta_description || "Cholan Tours",
    keywords: meta.meta_keywords || "",
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
  };
}

export default async function Page() {
  const [
    internationalData,
    noJsCountries,
    noJsTourPackages,
    trendingInternationalData,
  ] = await Promise.all([
    fetchInternationalPageData(),
    fetchNoJsCountries(),
    fetchNoJsTourPackages(),
    specialInternationalPackageData(),
  ]);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "International Tour Packages", isCurrent: true },
  ];

  return (
    <div className="details-wrapper ">
      <IntBanner data={internationalData?.data?.details} />
      <div className="details-wrapper-inner international">
        <div className="pt-4 pb-5">
          <div className="container">
            <Breadcrumb items={breadcrumbItems} />
            <IntExpandableText
              data={internationalData.data.details}
              collapsedLines={2}
            />
          </div>

          {trendingInternationalData?.data?.length < 1 ? null : (
            <div data-aos="fade-up" data-aos-delay="400">
              <TrendingTourPackages
                trendingInternationalData={trendingInternationalData?.data}
              />
            </div>
          )}

          <TabWithImages
            internationalData={internationalData.data}
            noJsCountries={noJsCountries}
          />
          {/* ✅ International City / Country Intro Section */}
          <CityStateListStatic country="international-holidays" />

          <TravelPackages
            internationalData={internationalData.data.deal_packages}
          />
          <Tourpackages
            internationalData={internationalData.data}
            noJsTourPackages={noJsTourPackages}
          />

          {internationalData?.data?.details?.faqs.length < 1 ? null : (
            <div className="faqs pt-5">
              <div className="container">
                <IntFaq
                  faqs={internationalData?.data?.details?.faqs}
                  faqtitle={internationalData?.data?.details?.faq_title}
                />
              </div>
            </div>
          )}

          <div className="py-5">
            <ReviewsWidget />
          </div>

          {/* <div className="customize-holiday">
            <AboutSection />
          </div> */}

          <LogoSlider />
        </div>
      </div>
    </div>
  );
}
