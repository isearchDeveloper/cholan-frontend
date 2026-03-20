import Image from "next/image";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ThemeOverview from "@/app/components/theme/ThemeOverview";
import ReviewsWidget from "@/app/components/ReviewsWidget";
import FAQAccordionForCity from "@/app/components/city/FAQAccordionForCity";
import { fetchThemePackages } from "@/app/services/themeService";
import PopularThemePackages from "@/app/components/theme/PopularThemePackages";
import CityListOfTheme from "@/app/components/theme/CityListOfTheme";

export default function ThemeCitySection({ themeData }: { themeData: any }) {

  // const themeData = await fetchThemePackages(theme);
    console.log( "theme data :" , themeData.title);
  if (!themeData) return null;

  const packages = Array.isArray(themeData.packages)
    ? themeData.packages
    : [];

  const locations = Array.isArray(themeData.locations)
    ? themeData.locations
    : [];

  const hasBanner = !!themeData.primary_img;
  const hasOverview = !!themeData.overview;
  const hasPackages = packages.length > 0;
  const hasLocations = locations.length > 0;
  const hasFaqs = Array.isArray(themeData.faqs) && themeData.faqs.length > 0;

  const normalizedPackages = packages.map((pkg: any) => ({
    slug: pkg.slug,
    title: pkg.title,
    primary_image: pkg.primary_image,
    details: {
      duration_nights: pkg.details?.duration_nights || 0,
      duration_days: pkg.details?.duration_days || 0,
    },
  }));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "India", href: "/india" },
    { label: themeData.title, isCurrent: true },
  ];

  return (
    <div className="theme-landing-page">
      {/*  Banner */}
      {hasBanner && (
        <div className="theme-banner">
          <Image
            src={`https://cdn.cholantours.com/${themeData.primary_img}`}
            alt={themeData.title}
            fill
            priority
          />
          <div className="theme-banner-overlay">
            <h1>{themeData.title}</h1>
          </div>
        </div>
      )}

      {/*  Overview */}
      {hasOverview && (
        <div className="container py-5">
          <Breadcrumb items={breadcrumbItems} />
          <ThemeOverview theme={themeData.overview} title = {themeData?.meta?. h1_heading}  city = {themeData.title}/>
        </div>
      )}

      {/*  Packages */}
      {hasPackages && (
        <PopularThemePackages
          packages={normalizedPackages}
          themeTitle={themeData.title}
        />
      )}

      {/*  Cities */}
      {hasLocations && (
        <CityListOfTheme
          locations={locations}
          themeSlug={themeData.slug.replace("-tour-packages", "")}
        />
      )}

      {/*  FAQs */}
      {hasFaqs && (
        <div className="py-5">
          <div className="container">
            <FAQAccordionForCity
              title={themeData.faq_title}
              faqs={themeData.faqs}
            />
          </div>
        </div>
      )}

      {/*  Reviews always */}
      <div className="py-5">
        <ReviewsWidget />
      </div>
    </div>
  );
}

