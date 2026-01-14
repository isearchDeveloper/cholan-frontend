// src/app/(pages)/customized-holidays/page.tsx
export const dynamic = "force-dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import HolidayExpandableText from "@/app/components/holiday/HolidayExpandableText";
import HolidayTabWithImages from "@/app/components/holiday/HolidayTabWithImages";
import AboutSection from "@/app/components/home/AboutSection";
import CustomerRate from "@/app/components/home/CustomarRate";
import LogoSlider from "@/app/components/home/LogoSlider";
import TopService from "@/app/components/home/TopService";
import Image from "next/image";
import HolidayBanner from "@/app/components/holiday/holidaybanner";
import EnquiryForm from "@/app/components/common/EnquiryForm";
import { fetchHomeData } from "@/app/services/homeService";
import { fetchCustomizedHolidayData, fetchIndiaSlugData } from "@/app/services/customizedHolidayService";
import GetInTouchForm from "@/app/components/customize-holidays/GetInTouchForm";
import { fetchPackageReviewData } from "@/app/services/reveiwService";
import { getCanonical } from "@/app/lib/getCanonical";
import ReviewsWidget from "@/app/components/ReviewsWidget";


export async function generateMetadata({ params }: any) {
  const data = await fetchCustomizedHolidayData();

  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/customized-holidays");
  const currentUrl = canonical;
  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";
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
  };
}

const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Customized Holidays", isCurrent: true },
];

export default async function CustomizedHoliday() {
  const [tourServiceData, customizedHolidayData, packageReviewData, indiaData] = await Promise.all([
    fetchHomeData().catch(() => ({ data: { tour_services: [] } })),  // Fallback to empty on error
    fetchCustomizedHolidayData(),
    fetchPackageReviewData(),
    fetchIndiaSlugData(),
  ]);


  return (
    <div className="cusholiday-wrapper">
      <HolidayBanner data={customizedHolidayData.data.details.banner_image} />
      <div className="pt-4 pb-5">
        <div className="container">
          <Breadcrumb items={staticBreadcrumbItems} />
          <div className="row">
            <div className="col-lg-8">
              <div>
                <HolidayExpandableText
                  title={customizedHolidayData?.data?.details?.title}
                  text={customizedHolidayData?.data?.details?.description}
                  collapsedLines={2}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <GetInTouchForm />
            </div>
          </div>
        </div>
        <div className="pt-5 pt-lg-0">
          <HolidayTabWithImages ssrIndiaData={indiaData} />
        </div>
        {tourServiceData?.data?.tour_services?.length < 1 ? null : (
          <div className="cus-holi pt-5">
            <TopService tourServices={tourServiceData.data.tour_services} />
          </div>
        )}
        {/* {packageReviewData?.data && (
          <div className="custo-holiday">
            <CustomerRate reviews={packageReviewData.data} />
          </div>
        )}  */}


        


        {/* <div >
          <section className="why-choose-sec common-padd bg-primary">
            <div className="container">
              <div className="common-header-center">
                <h2 className="fw-semibold mb-5 text-white fs-3">
                  Why Choose Cholan Tours?
                </h2>
              </div>
              <div className="why-choos-wraper ">
                <div className="row ">
                  <div className="col-lg-3 col-6">
                    <div className="sngl-box">
                      <div className="icon">
                        <Image
                          width={40}
                          height={40}
                          sizes="100vw"
                          src="/images/why-choos-1.png"
                          alt="/images/no-img.webp"
                         
                        />
                      </div>
                      <h5>5000+</h5>
                      <p>Happy & Satisfied Clients</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className="sngl-box">
                      <div className="icon">
                        <Image
                          width={40}
                          height={40}
                          sizes="100vw"
                          src="/images/why-choos-2.png"
                          alt="/images/no-img.webp"
                         
                        />
                      </div>
                      <h5>20+</h5>
                      <p>Years of Experience</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className="sngl-box">
                      <div className="icon">
                        <Image
                          width={40}
                          height={40}
                          sizes="100vw"
                          src="/images/why-choos-3.png"
                          alt="/images/no-img.webp"
                         
                        />
                      </div>
                      <h5>12000+</h5>
                      <p>Tours Completed</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className="sngl-box">
                      <div className="icon">
                        <Image
                          width={40}
                          height={40}
                          sizes="100vw"
                          src="/images/why-choos-4.png"
                          alt="/images/no-img.webp"
                         
                        />
                      </div>
                      <h5>500+</h5>
                      <p>Tour Destinations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div> */}


        <div className="pb-5">
          <ReviewsWidget/>
        </div>

        {/* <div className="customize-holiday">
          <AboutSection />
        </div> */}

        <LogoSlider />
      </div>
    </div>
  );
}
