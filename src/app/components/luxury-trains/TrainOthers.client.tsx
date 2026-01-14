"use client";

import { useEffect, useRef, useState } from "react";
import HeritageCard from "@/app/components/train/HeritageCard";
import TrainCard from "@/app/components/luxury-trains/TrainCard";
import TrainExpandableText from "@/app/components/luxury-trains/ExpandableText";
import FAQAccordionTrain from "../train/FaqForTrain";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import OtherLuxuryTrains from "./OtherLuxuryTrains";
import TrainJourneySection from "./TrainJourneySection";

export default function TrainOthersClient({ trainOverviewData }: any) {
   
    return (
        <>
            <div className="train-journey-wrap py-5">
                <div className="container">
                    <div className="flex flex-col gap-4">
                        {/* tours============ */}
                        {trainOverviewData?.data?.train?.tours.length < 1 ? null : (
                            <TrainJourneySection
                                tours={trainOverviewData?.data?.train?.tours}
                                trainTitle={trainOverviewData?.data?.train?.title}
                            />
                            // <div>
                            //     <h2 className="mb-4 color-blue text-center font-semibold fs-3">
                            //         {`${trainOverviewData?.data?.train?.title} Journeydsfssgdgd`}
                            //     </h2>
                            //     <Swiper
                            //         spaceBetween={20}
                            //         slidesPerView={1}
                            //         autoplay={{
                            //             delay: 3000,
                            //             disableOnInteraction: false,
                            //             pauseOnMouseEnter: true,
                            //         }}
                            //         breakpoints={{
                            //             768: {
                            //                 slidesPerView: 2,
                            //                 spaceBetween: 20,
                            //             },
                            //             1024: {
                            //                 slidesPerView: 4,
                            //                 spaceBetween: 20,
                            //             },
                            //         }}
                            //         pagination={{
                            //             clickable: true,
                            //         }}
                            //         modules={[Autoplay, Pagination]}
                            //         className="mySwiper"
                            //     >
                            //         {trainOverviewData?.data?.train?.tours?.map((data: any) => (
                            //             <SwiperSlide key={data.slug}>
                            //                 <HeritageCard data={data} />
                            //             </SwiperSlide>
                            //         ))}
                            //     </Swiper>
                            // </div>
                        )}
                        {/* destinations============ */}
                        {trainOverviewData?.data?.train?.destinations ? (
                            <div className="train-overview-para mt-3">
                                <h2 className="mb-4 fs-3">
                                    {`${trainOverviewData?.data?.train?.title} Destinations`}
                                </h2>
                                <div className="text-sm">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: trainOverviewData?.data?.train?.destinations,
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}
                        {trainOverviewData?.data?.train?.facilities ? (
                            <div className="train-ex-para train-facilities">
                                <h2 className="mb-2 fs-3">
                                    {`${trainOverviewData?.data?.train?.title} Facilities`}
                                </h2>
                                <TrainExpandableText
                                    text={trainOverviewData?.data?.train?.facilities}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {trainOverviewData?.data?.train?.faqs.length < 1 ? null : (
                <div className="faqs pb-5 center-faqs">
                    <div className="container">
                        <FAQAccordionTrain
                            faqs={trainOverviewData?.data?.train?.faqs}
                            name={trainOverviewData?.data?.train?.faq_title}
                        />
                    </div>
                </div>
            )}
            {trainOverviewData?.data?.similar_trains?.length < 1 ? null : (
                <OtherLuxuryTrains similarTrains={trainOverviewData.data.similar_trains} />
            )}
        </>
    );
}
