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
  { label: "Fair Festival", isCurrent: true },
];

export default function FairFestival() {
  return (
    <>
      <div className="fair-festival-wrapper">
        {/* Banner */}
        <FairFestivalBanner />

        {/* Main Content Wrapper */}
        <div className="pt-4 pb-5">
          <div className="container">
            {/* Breadcrumb */}
            <Breadcrumb items={staticBreadcrumbItems} />

            <div className="row mt-3">
              <div className="col-lg-8">
                <FairFestivalExpandableText
                  title="India Fair & Festival Tours"
                  subtitle="Celebrate culture & traditions"
                  text="lorem100
                            India is known for its colourful fairs and festivals...
                            (dummy long text here)
                          "
                />
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0 car-sticky">
                <CityEnquiryForm />
              </div>
            </div>
            <div className="py-5 ">

               <FairFestivalCitySection />
            </div>
           

            <div className="py-5 center-faqs">
              <div className="container">
                <FAQAccordionFairFestival />
              </div>
            </div>

             <LogoSlider />
          </div>
        </div>
      </div>
    </>
  );
}
