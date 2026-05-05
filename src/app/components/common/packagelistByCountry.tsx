
import Breadcrumb from "@/app/components/common/Breadcrumb";
import TravelPackages from "@/app/components/common/travelpackages";
import IntBanner from "@/app/components/internationalTourPackages/intBanner";
import IntFaq from "@/app/components/internationalTourPackages/intFaq";
import {
  fetchCountryPageData,
  fetchSpecialData,
} from "@/app/services/countryService";
import { fetchHomeTabsData } from "@/app/services/homeService";
import CountryExpandableText from "../country/countryExpandableText";
// import ImageComponentCountry from "../country/tabWithImagesForCountry";
import HomeTourPackage from "../home/IndiaTourPackage";
import ExploreStatesAndCities from "../country/ExploreStatesAndCities";
import { fetchCityList } from "@/app/services/cityService";
import ThemedHolidayPackages from "../country/ThemedHolidayPackages";
import PopularIndiaTours from "@/app/components/common/PopularIndiaTours";
import IndiaThemesSection from "@/app/components/country/IndiaThemesSection";
import { fetchThemeList, fetchThemePackages } from "@/app/services/themeService";
import { notFound } from "next/navigation";
import ReviewsWidget from "../ReviewsWidget";
import LogoSlider from "../home/LogoSlider";

export const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

async function fetchStaticCategorySSR(countrySlug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/categories/country?slug=honeymoon&country=${countrySlug}&limit=50`;

    const res = await fetch(url, {
      headers: { "X-Public-Token": XPublicToken },
      next: { revalidate: 60 },
    });

    if (!res.ok) return { packages: [] };

    const json = await res.json().catch(() => null);
    return json?.data || { packages: [] };
  } catch {
    return { packages: [] };
  }
}

export default async function PackagelistByCountry({
  slug,
  country,
}: {
  slug: string;
  country: string;
}) {
  //  SAFE parallel fetching (very important on AWS)
  const [countryData, exclusiveIndiaPackage, res, result, homeTabsDataRaw] =
    await Promise.all([
      fetchCountryPageData(slug).catch(() => null),
      fetchSpecialData().catch(() => ({ data: [] })),
      fetchCityList(1, 1, 40).catch(() => null),
      fetchThemeList().catch(() => []),
      fetchHomeTabsData().catch(() => null),
    ]);

  const homeTabsData = homeTabsDataRaw?.homepage_tabs || [];

  //  STRONG guard (fixes ISR window crashes)
  if (!countryData?.data?.details || slug === "srilanka") {
    return notFound();
  }

  const countrySlug = countryData?.data?.details?.slug;

  //  safe honeymoon data
  let ssrHoneymoonData = { packages: [] };
  if (slug === "india" && countrySlug) {
    ssrHoneymoonData = await fetchStaticCategorySSR(countrySlug);
  }

  // PRE-FETCH THEMED PACKAGES (Production Safe filtering)
  // We fetch packages for the top themes on the server.
  // This allows us to only show tabs that definitely have content.
  let filteredThemesWithPackages: any[] = [];
  let preFetchedPackageData: Record<string, any[]> = {};

  if (slug === "india" && Array.isArray(result) && result.length > 0) {
    // Limit to top 20 themes to avoid excessive server load, but cover "all" typical cases
    const themesToScan = result.slice(0, 20);
    
    const themeDataResults = await Promise.all(
      themesToScan.map(async (theme: any) => {
        try {
          const pkgs = await fetchThemePackages(theme.slug);
          // If fetchThemePackages returns the full object or just the packages array:
          const packagesArray = Array.isArray(pkgs) ? pkgs : (pkgs?.packages || []);
          return { theme, packages: packagesArray };
        } catch (e) {
          return { theme, packages: [] };
        }
      })
    );

    filteredThemesWithPackages = themeDataResults
      .filter(item => item.packages.length > 0)
      .map(item => item.theme);

    themeDataResults.forEach(item => {
      if (item.packages.length > 0) {
        preFetchedPackageData[item.theme.slug] = item.packages;
      }
    });
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `${countryData?.data?.details?.title || ""}`, isCurrent: true },
  ];

  const cities = res?.data?.cities || [];
  const totalCities = res?.data?.pagination?.total || 0;

  return (
    <div className="details-wrapper">
      <IntBanner data={countryData?.data?.details} />

      <div className="details-wrapper-inner india">
        <div className="pt-4 pb-5">
          <div className="container">
            <Breadcrumb items={breadcrumbItems} />

            <CountryExpandableText
              data={countryData?.data?.details}
              collapsedLines={5}
            />
          </div>

          {/*  safe exclusive packages */}
          {(exclusiveIndiaPackage?.data?.length ?? 0) > 0 && (
            <PopularIndiaTours
              exclusiveIndiaPackage={exclusiveIndiaPackage.data}
            />
          )}

          {/*  safe image section - ImageComponentCountry commented out, replaced with HomeTourPackage */}
          {/* <ImageComponentCountry
            slug={slug}
            initialData={countryData?.data}
          /> */}
          {homeTabsData.length > 0 && (
            <HomeTourPackage homeTabsData={homeTabsData} />
          )}

          {/*  safe city list */}
          {slug === "india" && (
            <ExploreStatesAndCities
              country={slug as "india"}
              cities={cities}
              total={totalCities}
            />
          )}

          <TravelPackages
            internationalData={countryData?.data?.deal_packages || []}
          />

          {/* THEMED HOLIDAY SECTION — Pre-filtered on Server */}
          {filteredThemesWithPackages.length > 0 && (
            <ThemedHolidayPackages
              themeList={filteredThemesWithPackages}
              initialPackages={preFetchedPackageData}
            />
          )}

          {/*  FAQ SAFE (important fix) */}
          {(countryData?.data?.details?.faqs?.length ?? 0) > 0 && (
            <div className="faqs pt-5">
              <div className="container">
                <IntFaq
                  faqs={countryData?.data?.details?.faqs}
                  faqtitle={countryData?.data?.details?.faq_title}
                />
              </div>
            </div>
          )}

          <div className="py-5">
            <ReviewsWidget />
          </div>

          <LogoSlider />
        </div>
      </div>
    </div>
  );
}
