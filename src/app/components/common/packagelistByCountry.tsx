import Breadcrumb from "@/app/components/common/Breadcrumb";
import Tourpackages from "@/app/components/internationalTourPackages/tourpackages";
import TravelPackages from "@/app/components/common/travelpackages";
import IntBanner from "@/app/components/internationalTourPackages/intBanner";
import IntExpandableText from "@/app/components/internationalTourPackages/intExpandableText";
import TabWithImages from "@/app/components/internationalTourPackages/tabwithimages";
import { fetchInternationalPageData } from "@/app/services/internationaltourService";
import { unstable_cache } from "next/cache";
import IntFaq from "@/app/components/internationalTourPackages/intFaq";
import {
  fetchCountryPageData,
  fetchSpecialData,
} from "@/app/services/countryService";
import CountryExpandableText from "../country/countryExpandableText";
import ImageComponentCountry from "../country/tabWithImagesForCountry";
import CityStateListStatic from "../country/CityStateListStatic";
import { fetchCityIntroData, fetchCityList } from "@/app/services/cityService";
import TourpackagesCountry from "../country/tourPackagesByInterest";
import TourPackagesByCountry from "@/app/components/common/TourPackagesByCountry";
// import { fetchHomeExclusiveData } from "@/app/services/homeService";
import { notFound } from "next/navigation";
import ReviewsWidget from "../ReviewsWidget";
import AboutSection from "../home/AboutSection";
import LogoSlider from "../home/LogoSlider";
export const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

async function fetchStaticCategorySSR(countrySlug: string) {
  const url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/categories/country?slug=honeymoon&country=${countrySlug}&limit=50`;
  try {
    const res = await fetch(url, {
      headers: { "X-Public-Token": XPublicToken },
      cache: "no-store", // You can use "force-cache" or "no-store"
    });

    const json = await res.json();
    return json.data || { packages: [] };
  } catch (e) {
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
  // ✅ 1. First fetch country data
  const [countryData] = await Promise.all([fetchCountryPageData(slug)]);
  const exclusiveIndiaPackage = await fetchSpecialData();

  // ✅ 2. Validate country data
  if (!countryData || slug === "srilanka") {
    return notFound();
  }

  // ✅ 3. Extract the dynamic country slug for second API call
  const countrySlug = countryData?.data?.details?.slug;

  // ✅ 4. Double-check safety
  let ssrHoneymoonData = { packages: [] };

  if (slug === "india" && countrySlug) {
    ssrHoneymoonData = await fetchStaticCategorySSR(countrySlug);
  }
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: `${countryData?.data?.details?.title}`, isCurrent: true },
  ];
// console.log("PackagelistByCountry rendered for:", slug);
// console.log("slug:", slug);
// console.log("country prop:", country);

const res = await fetchCityList(1);
  const cities = res?.data?.cities || [];
console.log(cities)
  return (
    <div className="details-wrapper ">
      <IntBanner data={countryData?.data?.details} />
      <div className="details-wrapper-inner india">
        <div className="pt-4 pb-5">
          <div className="container">
            <Breadcrumb items={breadcrumbItems} />
            <CountryExpandableText
              data={countryData?.data.details}
              collapsedLines={5}
            />
          </div>

          {exclusiveIndiaPackage?.data?.length < 1 ? null : (
            <div data-aos="fade-up" data-aos-delay="200">
              <TourPackagesByCountry
                exclusiveIndiaPackage={exclusiveIndiaPackage?.data}
              />
            </div>
          )}

          <ImageComponentCountry slug={slug} initialData={countryData.data} />
          
          {(slug === "india") && (
            <CityStateListStatic
              country={slug as "india"} cities={cities}
            />
          )}
          <TravelPackages internationalData={countryData?.data.deal_packages} />
          <TourpackagesCountry
            countryData={countryData?.data}
            ssrPackages={{ honeymoon: ssrHoneymoonData }}
          />
          {countryData?.data?.details?.faqs.length < 1 ? null : (
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

          {/* <div className="customize-holiday">
            <AboutSection />
          </div> */}

          <LogoSlider />
        </div>
      </div>
    </div>
  );
}
