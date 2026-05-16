
"use client";

import TourCard from "@/app/components/common/TourCard";
import Banner from "@/app/components/common/banner";
import ExpandableText from "@/app/components/common/ExpandableText";
import FAQAccordionListing from "@/app/components/common/FAQAccordionForListing";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ThemeSidebar from "./ThemeSidebar";

interface ThemePackageListingProps {
  data: any;
  cityName: string;
  citySlug: string;
  themeSlug: string;
  sidebarThemes: any[];
}

export default function ThemePackageListing({
  data,
  cityName,
  citySlug,
  themeSlug,
  sidebarThemes,
}: ThemePackageListingProps) {
  if (!data) return null;

  
console.log(data);
  const details = data?.location?.details || {};
  const packages = Array.isArray(data?.packages) ? data.packages : [];

  const formatSlug = (text: any): string => {
    if (!text) return "";
    return text
      .toString()
      .replace(/[-_]+/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase())
      .trim();
  };

  const apiTitle = details?.title ? formatSlug(details.title) : "";
  const slugTitle = [cityName, formatSlug(themeSlug), "Tour Packages"]
    .filter(Boolean)
    .join(" ");
  const pageTitle = apiTitle || slugTitle;

  const faqs = Array.isArray(data?.faqs) ? data.faqs : [];

  const faqTitle = data?.faq_title?.trim()
    ? data.faq_title
    : `FAQs About ${pageTitle} in ${cityName}`;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "India", href: "/india" },
    { label: pageTitle, isCurrent: true },
  ];

  return (
    <div className="tour-listing p-0">
      {/* Banner */}
      <Banner
        title={details?.sub_title}
        // subtitle={details?.sub_title}
        imageUrl={details?.banner_image}
      />

      <div className="listing-inner-wrapper">
        <div className="container mx-auto pt-4 pb-5">
          <div className="row">
            {/* Breadcrumb */}
            <div className="col-lg-12">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/*  MAIN LISTING */}
            <div className="col-12 col-lg-9 order-1 order-lg-2">
              <ExpandableText
                title={`${pageTitle}`}
                text={details?.about}
                collapsedLines={2}
              />

              {packages.length === 0 ? (
                <h6 className="mt-5 text-danger">No Packages Found</h6>
              ) : (
                <div className="grid grid-cols-1 gap-6 mt-4">
                  {packages.map((tour: any) => (
                    <TourCard
                      key={tour.slug}
                      slug={tour.slug}
                      title={tour.title}
                      rating={5}
                      duration={[
                        tour.details?.duration_nights ? `${tour.details.duration_nights} ${tour.details.duration_nights < 2 ? "Night" : "Nights"}` : null,
                        tour.details?.duration_days ? `${tour.details.duration_days} ${tour.details.duration_days < 2 ? "Day" : "Days"}` : null
                      ].filter(Boolean).join(" / ")}
                      highlights={tour.details?.tour_highlights}
                      imageUrl={
                        tour.primary_image
                          ? `https://cdn.cholantours.com/${tour.primary_image}`
                          : "/images/tour/default.webp"
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* SIDEBAR (same as India page) */}
            <div className="col-12 col-lg-3 order-2 order-lg-1 mt-4 mt-lg-0 mb-4 mb-lg-0">
              <ThemeSidebar
                citySlug={citySlug}
                cityName={cityName}
                themes={sidebarThemes}
              />
            </div>

            {/* FAQ */}
            {faqs.length > 0 && (
              <div className="col-12 order-3 order-lg-3">
                <div className="mt-5">
                  <FAQAccordionListing faqs={faqs} location={faqTitle} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
