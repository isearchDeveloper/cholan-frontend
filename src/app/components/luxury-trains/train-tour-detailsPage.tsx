// "use client";

import Breadcrumb from "../common/Breadcrumb";
import EnquiryForm from "../common/EnquiryForm";
import TourPlanFAQ from "../common/TourPlanFAQ";
import FAQAccordionForTrain from "./FAQAccordionForTrain";
import TrainBanner from "./trainBanner";
import TrainDetailsContent from "./TrainDetailsContent";
import TrainExpandableText from "./trainExpandableText";

import Image from "next/image";
import TrainInclusionExclusionComponent from "./TrainInclusionExclusionComponent";
import InclusionExclusionComponent from "../common/InclusionExclusionComponent";
import CabinGallery from "./cabinGallery";
import FAQAccordionForTrainDetails from "./trainDetailsFaq";
import TrainCard from "./TrainCard";
import TrainEnquiryForm from "./trainEnquiryForm";

export default async function LuxuryTrainDetails({ trainTourData }: any) {

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Luxury Trains", href: "/luxury-trains" },
    {
      label: `${trainTourData.tour.title} ${trainTourData.tour.train.title}`,
      isCurrent: true,
    },
  ];

  const jsEnabled = typeof window !== "undefined";
  return (
    <div className="train-detail-wrapper details-wrapper">
      <TrainBanner data={trainTourData.tour.primary_image} />

      <div className="container">
        <div className="row py-5">
          <div className="col-lg-8">
            <Breadcrumb items={breadcrumbItems} />
            {jsEnabled ? (
              <div
                className="d-flex flex-column gap-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >

                <TrainDetailsContent data={trainTourData} />

                <TrainExpandableText
                  className="mt-3"
                  text={trainTourData.tour.description}
                  collapsedLines={2}
                />


                {trainTourData.tour.details.itinerary_overview ?
                  <div>
                    <div className="itinerary-section">
                      <h3 className="color-blue  mb-2">Itinerary</h3>
                      <div className="mb-0 text-sm">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: trainTourData.tour.details.itinerary_overview,
                          }}
                        />
                      </div>
                    </div>
                  </div> : null}


                {trainTourData?.tour?.itineraries.length < 1 ? null :
                  <TourPlanFAQ faqData={trainTourData?.tour?.itineraries} />}

                {trainTourData?.tour.details?.includes.length ||
                  trainTourData?.tour.details?.includes.length < 1 ? (
                  <InclusionExclusionComponent
                    inclusion={trainTourData?.tour.details?.includes}
                    exclusion={trainTourData?.tour.details?.excludes}
                  />
                ) : null}

                {/* <TrainTourPlanFAQ/> */}

                {trainTourData?.tour.details?.map_image ?
                  <div>
                    <div className="rmap-section">
                      <h2 className=" mb-3 fs-3">Route Map</h2>
                      <Image
                        width={600}
                        height={400}
                        src={trainTourData?.tour.details?.map_image}

                        alt="/images/no-img.webp"
                      />
                    </div>
                  </div> : null}


                {trainTourData?.tour.refund_cancellation_policy ?
                  <div>
                    <div className="refund-section">
                      <h2 className="fs-3  mb-3">
                        Refund/Cancellation Policy
                      </h2>
                      <div className="mb-0 text-sm">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: trainTourData?.tour.refund_cancellation_policy,
                          }}
                        />
                      </div>
                    </div>
                  </div> : null}


              </div>
            ) : (
              <div
                className="d-flex flex-column gap-4"

              >

                <TrainDetailsContent data={trainTourData} />

                <TrainExpandableText
                  className="mt-3"
                  text={trainTourData.tour.description}
                  collapsedLines={2}
                />


                {trainTourData.tour.details.itinerary_overview ?
                  <div>
                    <div className="itinerary-section">
                      <h3 className="color-blue  mb-2">Itinerary</h3>
                      <div className="mb-0 text-sm">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: trainTourData.tour.details.itinerary_overview,
                          }}
                        />
                      </div>
                    </div>
                  </div> : null}


                {trainTourData?.tour?.itineraries.length < 1 ? null :
                  <TourPlanFAQ faqData={trainTourData?.tour?.itineraries} />}

                {trainTourData?.tour.details?.includes.length ||
                  trainTourData?.tour.details?.includes.length < 1 ? (
                  <InclusionExclusionComponent
                    inclusion={trainTourData?.tour.details?.includes}
                    exclusion={trainTourData?.tour.details?.excludes}
                  />
                ) : null}

                {/* <TrainTourPlanFAQ/> */}

                {trainTourData?.tour.details?.map_image ?
                  <div>
                    <div className="rmap-section">
                      <h2 className=" mb-3 fs-3">Route Map</h2>
                      <Image
                        width={600}
                        height={400}
                        src={trainTourData?.tour.details?.map_image}
                        className="img-fluid w-100"
                        alt="/images/no-img.webp"
                      />
                    </div>
                  </div> : null}


                {trainTourData?.tour.refund_cancellation_policy ?
                  <div>
                    <div className="refund-section">
                      <h2 className="fs-3  mb-3">
                        Refund/Cancellation Policy
                      </h2>
                      <div className="mb-0 text-sm">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: trainTourData?.tour.refund_cancellation_policy,
                          }}
                        />
                      </div>
                    </div>
                  </div> : null}


              </div>
            )}
          </div>
          <div className="col-lg-4">
            <div className="side-sticky-form mt-4 mt-lg-0">
              <TrainEnquiryForm title={trainTourData?.tour} />
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-lg-12">
            {jsEnabled ? (
              <div
                className="d-flex flex-column gap-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >

                {trainTourData?.tour.details?.facilities.length < 1 ? null :
                  <div className="facilities-section" >
                    <h2 className="fs-3 mb-4 text-center ">Facilities & Amenities</h2>
                    <ul className="list-unstyled d-flex flex-wrap gy-5 row">
                      {trainTourData?.tour.details?.facilities.map((data: any, index: number) => (
                        <li
                          key={index}
                          className="d-flex flex-column align-items-center col-6 gap-2 col-md-4 col-lg-2 text-center"

                        >
                          <div className="img-Box">
                            <Image
                              width={20}
                              height={20}
                              src="/images/icon/common.webp"
                              alt={data}
                            />
                          </div>
                          <span className="text-sm ">{data}</span>
                        </li>
                      ))}
                    </ul>
                  </div>}

                {trainTourData.tour.train.cabins.length < 1 ? null :
                  <CabinGallery cabinData={trainTourData.tour.train.cabins} />}


                {trainTourData.tour.faqs.length < 1 ? null :
                  <div className="train-details-page-faqs">
                    <FAQAccordionForTrainDetails faqs={trainTourData?.tour} faqTitle={trainTourData?.tour?.faq_title} />
                  </div>}

              </div>
            ) : (
              <div
                className="d-flex flex-column gap-4"

              >

                {trainTourData?.tour.details?.facilities.length < 1 ? null :
                  <div className="facilities-section" >
                    <h2 className="fs-3 mb-4 text-center ">Facilities & Amenities</h2>
                    <ul className="list-unstyled d-flex flex-wrap gy-5 row">
                      {trainTourData?.tour.details?.facilities.map((data: any, index: number) => (
                        <li
                          key={index}
                          className="d-flex flex-column align-items-center col-6 gap-2 col-md-4 col-lg-2 text-center"

                        >

                          <div className="img-Box">
                            <Image
                              width={20}
                              height={20}
                              src="/images/icon/common.webp"
                              alt={data}
                            />
                          </div>

                          <span className="text-sm ">{data}</span>
                        </li>
                      ))}
                    </ul>
                  </div>}

                {trainTourData.tour.train.cabins.length < 1 ? null :
                  <CabinGallery cabinData={trainTourData.tour.train.cabins} />}


                {trainTourData.tour.faqs.length < 1 ? null :
                  <div className="train-details-page-faqs">
                    <FAQAccordionForTrainDetails faqs={trainTourData?.tour} faqTitle={trainTourData?.tour?.faq_title} />
                  </div>}

              </div>
            )}
          </div>
        </div>
      </div>

      {trainTourData.similar_trains.length < 1 ? null :
        <div className="py-5 lux-trains">
          <div className="container">
            <h2 className="mb-4 text-black text-center font-semibold fs-3">
              Other Luxury Trains
            </h2>

            <div className="row gap-4 gap-lg-0">

              {trainTourData.similar_trains.map((data: any) => (
                <div key={data.slug} className="col-lg-4">
                  <TrainCard data={data} />
                </div>
              ))}
            </div>
          </div>
        </div>}
    </div>
  );
}
