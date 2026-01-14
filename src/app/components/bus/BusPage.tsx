"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import LogoSlider from "@/app/components/home/LogoSlider";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import BusBanner from "./BusBanner";
import BusExpandableText from "./BusExpandableText";
import BusEnquiryForm from "../common/BusenquiryForm";
import BusTabWithImages from "./BusTabWithImages";
import BusRentalRoutes from "./BusRentalRoutes";
import FAQAccordionBus from "./BusFaq";
import BusCardExecutive from "./BusCardExecutive";
import BusCardLuxury from "./BusCardLuxury";
import BusCardEconomy from "./BusCardEconomy";
import CholanBusRental from "./CholanBusRental";
import BusEnquiryModal from "@/app/modals/busEnquiryModal";
import ReviewsWidget from "../ReviewsWidget";
import AboutSection from "../home/AboutSection";



const staticBreadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Bus Rental", isCurrent: true },
];



export default function BusRental({ data }: any) {
    const [isMobile, setIsMobile] = useState(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    const fleets = [
        ...(data?.data?.fleets?.Economy ? [{ type: 'Economy', component: <BusCardEconomy data={data?.data?.fleets} setOpenModal={setOpenModal} /> }] : []),
        ...(data?.data?.fleets?.Luxury ? [{ type: 'Luxury', component: <BusCardLuxury data={data?.data?.fleets} setOpenModal={setOpenModal} /> }] : []),
        ...(data?.data?.fleets?.Executive ? [{ type: 'Executive', component: <BusCardExecutive data={data?.data?.fleets} setOpenModal={setOpenModal} /> }] : []),
    ];


   
    return (
        <>
            <div className="car-rent-wrapper">
                <BusBanner bannerData={data?.data?.details} />
                <div className="pt-4 pb-5" >
                    <div className="container">
                        <Breadcrumb items={staticBreadcrumbItems} />
                        <div className="row">
                            <div className="col-lg-8">
                                <div >
                                    <BusExpandableText
                                        title={data?.data?.details?.title}
                                        text={data?.data?.details?.description}
                                        collapsedLines={2}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 mt-4 mt-lg-0">
                                <BusEnquiryForm />
                            </div>

                        </div>
                    </div>

                    {data?.data?.categories?.length < 1 ? null :
                    <div className="pb-5">
                        <BusTabWithImages />
                    </div> }

                    <div className={`pt-5 why-cc-car ${data?.data?.categories?.length < 1 ? "mt-5" : "" }`} >
                        <CholanBusRental />
                    </div>

                    {/* <div className="pt-5" >
                    <CarCustomerRate />
                </div> */}

                    {data?.data?.details?.faqs?.length < 1 ? null :
                        <div className="py-5 center-faqs" >
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10">
                                        <FAQAccordionBus faqs={data?.data?.details?.faqs} title={data?.data?.details?.faq_title} />
                                    </div>
                                </div>

                            </div>
                        </div>}


                    {Array.isArray(data?.data?.routes) && data.data.routes.length > 0 && (
                        <div>
                            <BusRentalRoutes routes={data.data.routes} />
                        </div>
                    )}
                    {/* <div className="py-5" >
                        <LogoSlider />
                    </div> */}




                    {fleets?.length < 1 ? null :
                        <div className="py-5 car-fleet px-2 px-lg-0">
                            <div className="container">
                                <h2 className="mb-4 text-center fs-3">Browse our Fleet</h2>

                                {fleets?.length > 0 ? (
                                    isMobile ? (
                                        <Swiper
                                            spaceBetween={20}
                                            slidesPerView={1}
                                            modules={[Pagination, Autoplay]}
                                            pagination={{ clickable: true }}
                                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                                            className="mySwiper"
                                        >
                                            {fleets?.map((fleet, idx) => (
                                                <SwiperSlide key={idx}>
                                                    <div className="d-flex justify-content-center">
                                                        {fleet.component}
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <div className="row">
                                            {fleets?.map((fleet, idx) => (
                                                <div key={idx} className="col-lg-4 col-xl-4">
                                                    {fleet.component}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ) : null}
                            </div>
                        </div>}

                    <div className="py-5">
                        <ReviewsWidget />
                    </div>

                    {/* <div className="customize-holiday">
                        <AboutSection />
                    </div> */}

                    <LogoSlider />


                </div>
            </div>

            {openModal && <BusEnquiryModal onClose={() => setOpenModal(false)} />}
        </>
    );
}