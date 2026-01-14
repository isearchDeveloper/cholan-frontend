"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import AboutSection from "@/app/components/home/AboutSection";
import LogoSlider from "@/app/components/home/LogoSlider";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CarEnquiryModal from "@/app/modals/carEnquiryModal";
import CarCardLuxury from "@/app/components/car/CarCardLuxury";
import CarCardExecutive from "@/app/components/car/CarCardExecutive";
import FAQAccordionCar from "@/app/components/car/CarFaq";
import CarEnquiryForm from "@/app/components/common/CarenquiryForm";
import BusTabWithImagesDetails from "./BusTabWithImagesForDetails";
import BusCardEconomy from "./BusCardEconomy";
import BusCardLuxury from "./BusCardLuxury";
import BusCardExecutive from "./BusCardExecutive";
import BusBanner from "./BusBanner";
import BusExpandableText from "./BusExpandableText";
import BusEnquiryForm from "../common/BusenquiryForm";
import FAQAccordionBus from "./BusFaq";
import BusRentalRoutes from "./BusRentalRoutes";
import BusEnquiryModal from "@/app/modals/busEnquiryModal";
import BusDetailsTabWithImages from "./BusDetailsTabWithImages";

export default function BusDetails({ data, slug }: any) {
 
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const staticBreadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Bus Rental", href: "/bus-rental" },
    { label: `${data?.data?.route?.details?.title}`, isCurrent: true },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    ...(data?.data?.fleets?.Economy
      ? [
        {
          type: "Economy",
          component: (
            <BusCardEconomy
              data={data?.data?.fleets}
              setOpenModal={setOpenModal}
            />
          ),
        },
      ]
      : []),
    ...(data?.data?.fleets?.Luxury
      ? [
        {
          type: "Luxury",
          component: (
            <BusCardLuxury
              data={data?.data?.fleets}
              setOpenModal={setOpenModal}
            />
          ),
        },
      ]
      : []),
    ...(data?.data?.fleets?.Executive
      ? [
        {
          type: "Executive",
          component: (
            <BusCardExecutive
              data={data?.data?.fleets}
              setOpenModal={setOpenModal}
            />
          ),
        },
      ]
      : []),
  ];
  return (
    <>
      <div className="car-details-wrapper">
        <BusBanner bannerData={data?.data?.route?.details} />
        <div className="pt-5">
          <div className="container">
            <Breadcrumb items={staticBreadcrumbItems} />
            <div className="row">
              <div className="col-lg-8">
                <div>
                  <BusExpandableText
                    title={data?.data?.route?.details?.title}
                    text={data?.data?.route?.details?.description}
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
          <div >
            <BusDetailsTabWithImages slug={slug} />
          </div>}
          {/* 
                <div className="pt-5" >
                    <CholanCarRental />
                </div> */}

          {/* <div className="pt-5" >
                    <CarCustomerRate />
                </div> */}

          {data?.data?.route?.faqs?.length < 1 ? null : (
            <div className={`py-5 center-faqs ${data?.data?.categories?.length < 1 ? "mt-5" : ""}`}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <FAQAccordionBus faqs={data?.data?.route?.faqs} title={data?.data?.route?.faq_title} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {Array.isArray(data?.data?.routes) && data.data.routes.length > 0 && (
            <div className={`pt-5 ${data?.data?.categories?.length < 1 && data?.data?.route?.faqs?.length < 1  ? "mt-5" : ""}`}>
              <BusRentalRoutes routes={data.data.routes} />
            </div>
          )}
          <div className="py-5">
            <LogoSlider />
          </div>

          {fleets.length < 1 ? null : (
            <div className="py-5 car-fleet px-2 px-lg-0">
              <div className="container">
                <h2 className="mb-4 text-center fs-3">Browse our Fleet</h2>

                {fleets.length > 0 ? (
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
            </div>
          )}
        </div>
      </div>

      {openModal && <BusEnquiryModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
