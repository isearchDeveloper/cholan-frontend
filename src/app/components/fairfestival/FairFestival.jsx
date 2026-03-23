"use client";
import FairFestivalBanner from "@/app/components/fairfestival/FairFestivalBanner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import FairFestivalExpandableText from "@/app/components/fairfestival/FairFestivalExpandableText";
import CityEnquiryForm from "../common/CityEnquiryForm";
import FairFestivalCitySection from "./FairFestivalCitySection";
import FAQAccordionFairFestival from "./FAQAccordionFairFestival";
import LogoSlider from "../home/LogoSlider";

const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Fairs Festivals", isCurrent: true },
];

export default function FairFestival({ data }) {
  const page = data?.page;
  const festivals = data?.festival;
  const faqs = data?.faqs;
console.log( "festival lenght"  , festivals);
  return (
    <div className="fair-festival-wrapper">

      {/* Banner */}
      <FairFestivalBanner banner={page} />

      <div className="pt-4 pb-5">
        <div className="container">

          <Breadcrumb items={staticBreadcrumbItems} />

          <div className="row mt-3">
            <div className="col-lg-8">

              <FairFestivalExpandableText
                title={page?.title}
                subtitle={page?.sub_title}
                text={page?.overview}
              />

            </div>

            <div className="col-lg-4 mt-4 mt-lg-0 car-sticky">
              <CityEnquiryForm />
            </div>
          </div>

          {festivals?.length > 0 && (
            <div className="py-5">
              <FairFestivalCitySection festivals={festivals} />
            </div>
          )}


          {faqs?.length > 0 && (
            <div className="py-5 center-faqs">
              <div className="container">
                <FAQAccordionFairFestival
                  faqs={faqs}
                  title={page?.faq_title}
                />
              </div>
            </div>
          )}

          <LogoSlider />

        </div>
      </div>
    </div>
  );
}
