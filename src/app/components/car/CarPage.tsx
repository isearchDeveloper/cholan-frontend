

"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import AboutSection from "@/app/components/home/AboutSection";
import LogoSlider from "@/app/components/home/LogoSlider";
import Image from "next/image";
import CarBanner from "@/app/components/car/CarBanner";
import CarExpandableText from "@/app/components/car/CarExpandableText";
import CarTabWithImages from "@/app/components/car/CarTabWithImages";
import CarCustomerRate from "@/app/components/car/CarCustomerRate";
import CholanCarRental from "@/app/components/car/CholanCarRental";
import FAQAccordion from "@/app/components/common/FAQAccordion";
import HotelCard from "@/app/components/hotel/HotelCard";
import CarCard from "@/app/components/car/CarCardEconomy";
import CarRentalRoutes from "@/app/components/car/CarRentalRoutes";
import CarCitySection from "@/app/components/car/CarCitySection";
import CarCardEconomy from "@/app/components/car/CarCardEconomy";
import CarCardLuxury from "./CarCardLuxury";
import CarCardExecutive from "./CarCardExecutive";
import CarEnquiryForm from "../common/CarenquiryForm";
import FAQAccordionCar from "./CarFaq";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CarEnquiryModal from "@/app/modals/carEnquiryModal";
import ReviewsWidget from "../ReviewsWidget";
import ReviewsWrapper from "@/app/components/ReviewsWrapper";

const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Car Rental", isCurrent: true },
];

export default function CarRental({ data }: any) {
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

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
              <CarCardEconomy
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
              <CarCardLuxury
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
              <CarCardExecutive
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
      <div className="car-rent-wrapper">
        <CarBanner bannerData={data?.data?.details} />
        <div className="pt-4 pb-5">
          <div className="container">
            <Breadcrumb items={staticBreadcrumbItems} />
            <div className="row">
              <div className="col-lg-8">
                <div>
                  <CarExpandableText
                    title={data?.data?.details?.title}
                    text={data?.data?.details?.description}
                    collapsedLines={2}
                  />
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0 car-sticky">
                <CarEnquiryForm />
              </div>
            </div>
          </div>
          {/* <div className="pb-5" data-aos="fade-up" data-aos-delay="700"> */}

          {/* {data?.data?.categories?.length < 1 ? null :
                    <div className="pb-5">
                        <CarTabWithImages />
                    </div>} */}
          <div className="mt-5">
            <CarCitySection cities={data?.data.carcity} />
          </div>

          <div
            className={`pt-5 why-cc-car ${
              data?.data?.categories?.length < 1 ? "mt-5" : ""
            }`}
          >
            <CholanCarRental />
          </div>

          {/* <div className="pt-5" >
                    <CarCustomerRate />
                </div> */}
          {/* <div className="mt-5">
                    <CarCitySection cities={data?.data.carcity} />
                </div> */}

          {data?.data?.categories?.length < 1 ? null : (
            <div className="pb-5">
              <CarTabWithImages />
            </div>
          )}

          {data?.data?.details?.faqs?.length < 1 ? null : (
            <div className="py-5 center-faqs">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <FAQAccordionCar
                      faqs={data?.data?.details?.faqs}
                      title={data?.data?.details?.faq_title}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <CarRentalRoutes
              routes={data?.data?.routes}
              cityName={
                data?.data?.route?.from_location || data?.data?.city?.location
              }
            />
          </div>
          {/* <div className="pb-5" >
                        <LogoSlider />
                    </div> */}

          {fleets?.length < 1 ? null : (
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
            </div>
          )}

          <div className="py-5">
            {/* <ReviewsWidget /> */}
            <ReviewsWrapper isCarPage={true} />
          </div>

          {/* <div className="customize-holiday">
                        <AboutSection />
                    </div> */}

          <LogoSlider />
        </div>
      </div>

      {openModal && <CarEnquiryModal onClose={() => setOpenModal(false)} />}
    </>
  );
}