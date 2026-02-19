import AboutSection from "./components/home/AboutSection";
import CustomerRate from "./components/home/CustomarRate";
import DiscoverIndia from "./components/home/DiscoverIndia";
import HomeBanner from "./components/home/HomeBannerSection";
// import HoneymoonPackage from "./components/home/HoneymoonPackage";
import AtAGlance from "./components/home/AtAGlance";
import HomeTourPackage from "./components/home/IndiaTourPackage";
import InterTourPackage from "./components/home/InterTourPackage";
import LogoSlider from "./components/home/LogoSlider";
import LuxaryTour from "./components/home/LuxuryTour";
import TopService from "./components/home/TopService";
import WhyChoose from "./components/home/WhyChoose";
import AboutDetailSection from "./components/home/AboutDetailSection";
import StateTourSection from "./components/home/StateTourSection";
import LocalExpertiseSection from "./components/home/LocalExpertiseSection";
import WhyCholanSection from "./components/home/WhyCholanSection";
import {
  discoverIndiaPackageHomeData,
  fetchHomeCountryPackageData,
  fetchHomeData,
  fetchHomeExclusiveData,
  trendingInternationalHomePackageData,
} from "./services/homeService";
import CountryTourPackage from "./components/home/CountryTourPackage";
import { fetchPackageReviewData } from "./services/reveiwService";
import { getCanonical } from "./lib/getCanonical";
import ReviewsWidget from "./components/ReviewsWidget";

export async function generateMetadata({ params }: any) {
  const bannerData = await fetchHomeData();
  const meta = bannerData?.data?.meta || {};
  const canonical = await getCanonical(params?.slug ? `/${params.slug}` : "");

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

  // Get current page URL
  const currentUrl = canonical;

  const title = meta?.meta_title || "cholan tours";
  const description = meta.meta_description || "cholan tours";

  return {
    title: title,
    description: description,
    keywords: meta.meta_keywords || "",
    alternates: { canonical },

  openGraph: {
  title: title,
  description: description,
  url: currentUrl,
  type: "website",
  siteName: "CholanTours",
  images: [
    {
      url: "https://www.cholantours.com/public/uploads/logo.png",
      width: 600,
      height: 600,
    },
  ],
},

twitter: {
  title: title,
  description: description,
  card: "summary_large_image",
},


    // other: {
    //   'meta-details': metaDetails
    // },
  };
}

export default async function Home() {
  const [
    bannerData,
    exclusiveIndiaPackage,
    countryPackageHomeData,
    trendingInternationalData,
    discoverIndiaPackageData,
    packageReviewData,
  ] = await Promise.all([
    fetchHomeData(),
    fetchHomeExclusiveData(),
    fetchHomeCountryPackageData(),
    trendingInternationalHomePackageData(),
    discoverIndiaPackageHomeData(),
    fetchPackageReviewData(),
  ]);


  return (
    <>
      <main>
        {bannerData?.data?.single_banner == null &&
          bannerData?.data?.slider_banners?.length < 1 ? null : (
          <div data-aos="fade-up" data-aos-delay="100">
            <HomeBanner bannerData={bannerData?.data} />
          </div>
        )}

        <div data-aos="fade-up" data-aos-delay="600">
          <AboutDetailSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="600">
          <StateTourSection />
        </div>

        <div data-aos="fade-up" data-aos-delay="600">
          <WhyCholanSection />
        </div>


        {exclusiveIndiaPackage?.data?.length < 1 ? null : (
          <div data-aos="fade-up" data-aos-delay="200">
            <HomeTourPackage
              exclusiveIndiaPackage={exclusiveIndiaPackage?.data}
            />
          </div>
        )}
        {countryPackageHomeData?.data?.length < 1 ? null : (
          <div data-aos="fade-up" data-aos-delay="300">
            <CountryTourPackage
              countryPackageHomeData={countryPackageHomeData.data}
            />
          </div>
        )}

        <div data-aos="fade-up" data-aos-delay="600">
          <LocalExpertiseSection />
        </div>

        {trendingInternationalData?.data?.length < 1 ? null : (
          <div data-aos="fade-up" data-aos-delay="400">
            <InterTourPackage
              trendingInternationalData={trendingInternationalData?.data}
            />
          </div>
        )}
        {/* {bannerData?.data?.special_package == null ? null : (
          <div data-aos="fade-up" data-aos-delay="500">
            <HoneymoonPackage data={bannerData.data.special_package} />
          </div>
        )} */}

         <div data-aos="fade-up" data-aos-delay="600">
          <AtAGlance />
        </div>
        <div data-aos="fade-up" data-aos-delay="600">
          <LuxaryTour />
        </div>
        {discoverIndiaPackageData?.data?.length < 1 ? null : (
          <div data-aos="fade-up" data-aos-delay="700">
            <DiscoverIndia
              discoverIndiaPackageData={discoverIndiaPackageData.data}
            />
          </div>
        )}
        {bannerData?.data?.tour_services?.length < 1 ? null : (
          <div data-aos="fade-up" data-aos-delay="800">
            <TopService tourServices={bannerData.data.tour_services} />
          </div>
        )}

        

        {/* {packageReviewData?.data && (
          <div
            className={`${bannerData?.data?.tour_services?.length < 1 ? "mt-5" : ""
              }`}

          >
            <CustomerRate reviews={packageReviewData.data} />
          </div>
        )} */}
        <div>
          {bannerData?.data?.why_cholan_tour && bannerData?.data?.why_cholan_tour.length > 0 && (
            <WhyChoose data={bannerData.data.why_cholan_tour} />
          )}
        </div>

       <div className="pt-5">
         <ReviewsWidget />
       </div>
        <div className="home-about">
          <AboutSection />
        </div>
        <div className="py-5">
          <LogoSlider />
        </div>
      </main>


    </>
  );
}