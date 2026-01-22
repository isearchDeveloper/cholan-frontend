"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TourDetailsContent from "@/app/components/common/TourDetailsContent";
import TourDetailsBanner from "@/app/components/common/TourDetailsBanner";
import Image from "next/image";
import "aos/dist/aos.css";
import TourPlanFAQ from "@/app/components/common/TourPlanFAQ";
import FAQAccordion from "@/app/components/common/FAQAccordion";
import EnquiryForm from "@/app/components/common/EnquiryForm";
import InclusionExclusionComponent from "@/app/components/common/InclusionExclusionComponent";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import FeedbackModal from "@/app/modals/feedbackModal";
import CommonPackage from "../common/commonPackage";
import ReviewsWidget from "../ReviewsWidget";
import LogoSlider from "../home/LogoSlider";


export default function PackageDetails({ initialData }: { initialData: any }) {

  const router = useRouter();
  const [packageDetails, setPackageDetails] = useState<any>(initialData);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
console.log(packageDetails);
  const breadcrumbItems: any = [
    { label: "Home", href: "/" },
    {
      label: `${packageDetails?.package.location.country.name == "India"
        ? `${packageDetails?.package.location.country.name}`
        : "International"
        } Tour Packages`,
      href: `${packageDetails?.package.location.country.name == "India"
        ? `/${packageDetails?.package.location.country.name.toLowerCase()}`
        : "/international-holidays"
        }`,
    },
    {
      label: `${packageDetails?.package.location.country.name == "India"
        ? `${packageDetails?.package.parent_category ? packageDetails?.package.parent_category:packageDetails?.package.location.name}`
        : `${packageDetails?.package.location.country.name}`
        } Tour Packages`,
      href: `${packageDetails?.package.location.country.name == "India"
        ? `/india/${packageDetails?.package.parent_category_slug}`
        : `/international-holidays/${packageDetails?.package.location.country.slug}`
        }`,
    },
    // {
    //   label: `${packageDetails?.package.location.name} ${
    //     packageDetails?.package.details.duration_days
    //   } ${packageDetails?.package.details.duration_days < 2 ? "Day" : "Days"} ${
    //     packageDetails?.package.details.duration_nights
    //   } ${
    //     packageDetails?.package.details.duration_nights < 2 ? "Night" : "Nights"
    //   }`,
    //   isCurrent: true,
    // },
    {
      label: `${packageDetails?.package.title}`,
      isCurrent: true,
    },
  ];
  const handleClick = (type: "package" | "hotel", slug: string) => {
    router.push(`/reviews/${type}/${slug}`);
  };

  // ✅ Add this useEffect to hide loader after hydration
  // useEffect(() => {
  //   // Only show loader briefly to smooth hydration (optional)
  //   const timer = setTimeout(() => setShowLoader(false), 800);
  //   return () => clearTimeout(timer);
  // }, []);

  // ✅ Show loader until hydration completes or data not found
  // if (showLoader || !packageDetails?.package) {
  //   return (
  //     <div className="page-loader">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }


  return (<>
    <div className="details-wrapper">
      <div
        className="container mx-auto pt-4 pb-5"

      >
        <Breadcrumb items={breadcrumbItems} />

        {packageDetails?.package?.primary_image ? (
          <TourDetailsBanner
            image={encodeURI(packageDetails?.package?.primary_image)}
            images={packageDetails?.package.images}
            alt={packageDetails?.package?.primary_image_alt}
            title={packageDetails?.package?.title}
          />
        ) : null}

        <div className="row mt-4 gap-4 gap-lg-0">
          <div className="col-lg-8 d-flex flex-column gap-3">
            <TourDetailsContent
              tour={packageDetails?.package}
              data-aos="fade-up"
              data-aos-delay="400"
            />
            <div
              className={`tour-details-overview flex-column flex gap-4 mb-4 ${packageDetails?.package?.details?.facilities?.length < 1
                ? "mt-3"
                : ""
                }`}
            >
              {packageDetails?.package?.long_description ? (
                <div className="overview-section">
                  <h2 className="color-blue fs-3">Overview</h2>
                  <div className="mb-0 text-sm">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: packageDetails?.package?.long_description,
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {packageDetails?.package?.details?.itinerary_overview ? (
                <div className="itinerary-section">
                  <h2 className="color-blue fs-3">Itinerary</h2>
                  <div className="mb-0 text-sm">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          packageDetails?.package?.details?.itinerary_overview,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {packageDetails?.package?.itineraries.length < 1 ? null : (
              <TourPlanFAQ faqData={packageDetails?.package?.itineraries} />
            )}

            {packageDetails?.package?.details?.includes.length ||
              packageDetails?.package?.details?.includes.length < 1 ? (
              <InclusionExclusionComponent
                inclusion={packageDetails?.package?.details?.includes}
                exclusion={packageDetails?.package?.details?.excludes}
              />
            ) : null}

            {packageDetails?.package?.faqs.length < 1 ? null : (
              <FAQAccordion faqs={packageDetails?.package?.faqs} location={packageDetails?.package?.faq_title} />
            )}
          </div>
          <div className="col-lg-4">
            <div className="side-sticky-form">
              <EnquiryForm
                title={packageDetails?.package?.title}
                package_slug={packageDetails?.package?.slug}
              />
              {/* <div className="text-center mt-4 mt-md-0">
                <div className="g-4 mb-5">
                  <div className="h-100 p-4 rounded-3 bg-white rounded-4 border">
                    <div className="mb-4">
                      <h3 className="fw-bold mb-1">
                        Customer Reviews
                      </h3>
                      <p>About tour Package</p>
                    </div>
                    <div className="col-12 d-flex align-items-center">
                      <div className="d-flex flex-column flex-sm-row align-items-center w-100 justify-content-center">
                        <div >

                          <h2 className="fw-bold display-4 text-dark mb-3">
                            {packageDetails?.package?.rating
                              ? Number.isInteger(packageDetails.package.rating)
                                ? packageDetails.package.rating.toFixed(1)
                                : packageDetails.package.rating
                              : 0}
                          </h2>

                          
                          <div className="d-flex gap-2 mb-3">
                            {[...Array(5)].map((_, index) => {
                              const rating = packageDetails?.package?.rating || 0;
                              const fullStar = index < Math.floor(rating);
                              const halfStar = rating >= index + 0.5 && rating < index + 1;
                              return (
                                <svg
                                  key={index}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="36"
                                  height="36"
                                  viewBox="0 0 36 36"
                                  fill="none"
                                >
                                  <g>
                                  
                                    {fullStar && (
                                      <path
                                        d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                        fill="#FBBF24"
                                      />
                                    )}

                                    {halfStar && (
                                      <>
                                        <defs>
                                          <linearGradient id={`halfStar-${index}`}>
                                            <stop offset="50%" stopColor="#FBBF24" />
                                            <stop offset="50%" stopColor="#E5E5E5" />
                                          </linearGradient>
                                        </defs>
                                        <path
                                          d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                          fill={`url(#halfStar-${index})`}
                                        />
                                      </>
                                    )}

                               
                                    {!fullStar && !halfStar && (
                                      <path
                                        d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                        fill="#E5E5E5"
                                      />
                                    )}
                                  </g>
                                </svg>
                              );
                            })}
                          </div>
                          <p className="text-muted ">{packageDetails?.package?.total_review || 0} Ratings</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="d-flex flex-column align-items-center h-100 gap-2">
                        <button
                          type="button"
                          className="btn blue-btn w-100 d-flex align-items-center justify-content-center gap-2"
                          onClick={() => setOpenFeedback(true)}


                        >
                          Write A Review
                          <span> <Image width={23} height={23} src="/images/button-arrow.png" alt="" /></span>
                      
                        </button>
                         {packageDetails?.package?.total_review > 0 && (
                         <button onClick={() => handleClick("package", slug)}  className="btn orange-btn rounded-pill py-2 px-4 w-100" >
                          See All Reviews
                        </button>)}
                       
                     </div>
                    </div>
                  </div>
                </div>
              </div>  */}

            </div>
          </div>
        </div>
      </div>
      {packageDetails?.similar_packages.length < 1 ? null : (
        <CommonPackage similarPackage={packageDetails?.similar_packages} />
      )}

      {/* <div className="py-5">
        <ReviewsWidget />
      </div>
      <div className="pb-5">
        <LogoSlider />
      </div> */}


    </div>
    <FeedbackModal
      isOpen={openFeedback}
      onClose={() => setOpenFeedback(false)}
      title={packageDetails?.package?.title}
      duration={packageDetails?.package?.details?.duration_days}
      slug={packageDetails?.package?.slug}
    />
  </>
  );


}
