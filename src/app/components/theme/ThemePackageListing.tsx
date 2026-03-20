
"use client";

import TourCard from "@/app/components/common/TourCard";
import Banner from "@/app/components/common/banner";
import ExpandableText from "@/app/components/common/ExpandableText";
import FAQAccordionListing from "@/app/components/common/FAQAccordionForListing";
import Sidebar from "@/app/components/common/sidebar";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ThemeSidebar from "./ThemeSidebar";

interface ThemePackageListingProps {
  data: any;
  cityName: string;
  citySlug: string;
  sidebarThemes: any[];
}

export default function ThemePackageListing({
  data,
  cityName,
  citySlug,
  sidebarThemes,
}: ThemePackageListingProps) {
  if (!data) return null;

  

  const details = data?.location?.details || {};
  const packages = Array.isArray(data?.packages) ? data.packages : [];

  const formatTitle = (text: any) => {
    if (!text) return "";

    return text
      .toString()
      .replace(/[-_]+/g, " ") // slug → words
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase()) // Capitalize words
      .trim();
  };

  const city = formatTitle(cityName);
  const theme = formatTitle(details?.title);

  const pageTitle =
    [city, theme].filter(Boolean).join(" ") || "Theme Tour Packages";

  const faqs = Array.isArray(data?.faqs) ? data.faqs : [];

  const faqTitle = data?.faq_title?.trim()
    ? data.faq_title
    : `FAQs About ${data?.title} in ${cityName}`;


  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "India", href: "/india" },
    {
      label: cityName,
      href: `/india/${citySlug}`,
    },
    {
      label: data?.location?.details?.title,
      isCurrent: true,
    },
  ];

  return (
    <div className="tour-listing p-0">
      {/* Banner */}
      <Banner
        title={pageTitle}
        subtitle={details?.sub_title}
        imageUrl={details?.banner_image}
      />

      <div className="listing-inner-wrapper">
        <div className="container mx-auto pt-4 pb-5">
          <div className="row">
            {/* Breadcrumb */}
            <div className="col-lg-12">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/* SIDEBAR (same as India page) */}
            <div className="col-12 col-lg-3">
              <ThemeSidebar
                citySlug={citySlug}
                cityName={cityName}
                themes={sidebarThemes}
              />
            </div>

            {/*  MAIN LISTING */}
            <div className="col-12 col-lg-9">
              <ExpandableText
                title={`${pageTitle} Tour Packages`}
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
                      duration={`${tour.details?.duration_nights} ${
                        tour.details?.duration_nights < 2 ? "Night" : "Nights"
                      } ${tour.details?.duration_days} ${
                        tour.details?.duration_days < 2 ? "Day" : "Days"
                      }`}
                      tourTime={`${tour.details?.start_date} - ${
                        tour.details?.end_date
                      }`}
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

              {/* FAQ */}
              {faqs.length > 0 && (
                <div className="mt-5">
                  <FAQAccordionListing faqs={faqs} location={faqTitle} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
