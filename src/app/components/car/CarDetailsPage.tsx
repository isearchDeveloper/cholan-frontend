
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
import CarCustomerRate from "@/app/components/car/CarCustomerRate";
import CholanCarRental from "@/app/components/car/CholanCarRental";
import FAQAccordion from "@/app/components/common/FAQAccordion";
import HotelCard from "@/app/components/hotel/HotelCard";
import CarCard from "@/app/components/car/CarCardEconomy";
import CarRentalRoutes from "@/app/components/car/CarRentalRoutes";
import CarCardEconomy from "@/app/components/car/CarCardEconomy";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CarEnquiryModal from "@/app/modals/carEnquiryModal";
import CarCardLuxury from "@/app/components/car/CarCardLuxury";
import CarCardExecutive from "@/app/components/car/CarCardExecutive";
import FAQAccordionCar from "@/app/components/car/CarFaq";
import CarEnquiryForm from "@/app/components/common/CarenquiryForm";
import CarTabWithImagesDetails from "./CarTabWithImagesForDetails";
import CarDetailsTabWithImages from "./CarDetailsTabWithImages";
// import CarCitySection from "@/app/components/car/CarCitySection";
import CarCitySection from "@/app/components/car/CarCitySection";
import ReviewsWrapper from "@/app/components/ReviewsWrapper";

export default function CarDetails({ data, slug, carCities }: any) {
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // const staticBreadcrumbItems = [
  //   { label: "Home", href: "/" },
  //   { label: "Car Rental", href: "/car-rental" },
  //   {
  //     label: `${
  //       data?.data?.route?.details?.title || data?.data?.city?.location
  //     }`,
  //     isCurrent: true,
  //   },
  // ];

const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Car Rental", href: "/car-rental" },

  // city breadcrumb
  {
    label:
      data?.data?.city?.location || data?.data?.route?.from_location || "",
    href: `/car-rental/${
      data?.data?.city?.slug ||
      (data?.data?.route?.from_location
        ?.toLowerCase()
        .replace(/\s+/g, "-"))
    }`,
  },

  // route breadcrumb only if route present
  ...(data?.data?.route?.details?.title
    ? [
        {
          label: data?.data?.route?.details?.title,
          isCurrent: true,
        },
      ]
    : []),
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
      <div className="car-details-wrapper">
        <CarBanner
          bannerData={data?.data?.city?.details || data?.data?.route?.details}
        />
        <div className="pt-5">
          <div className="container">
            <Breadcrumb items={staticBreadcrumbItems} />
            <div className="row">
              <div className="col-lg-8">
                <div>
                  <CarExpandableText
                    title={
                      data?.data?.route?.details?.title ||
                      data?.data?.city?.details?.title
                    }
                    text={
                      data?.data?.route?.details?.description ||
                      data?.data?.city?.details?.description
                    }
                    collapsedLines={2}
                  />
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <CarEnquiryForm />
              </div>
            </div>
          </div>

          {Array.isArray(carCities) && carCities.length > 0 && (
            <div className="mt-5">
              <CarCitySection cities={carCities} />
            </div>
          )}

          {data?.data?.categories?.length < 1 ? null : (
            <div className="mt-15">
              <CarDetailsTabWithImages slug={slug} />
            </div>
          )}
          {/* 
                <div className="pt-5" >
                    <CholanCarRental />
                </div> */}

          {/* <div className="pt-5" >
                    <CarCustomerRate />
                </div> */}

          {data?.data?.route?.faqs?.length < 1 ||
          data?.data?.city?.faqs?.length < 1 ? null : (
            <div
              className={`py-5 center-faqs ${
                data?.data?.categories?.length < 1 ? "mt-5" : ""
              }`}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <FAQAccordionCar
                      faqs={data?.data?.route?.faqs || data?.data?.city?.faqs}
                      title={
                        data?.data?.route?.faq_title ||
                        data?.data?.city?.faq_title
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`pt-0 ${
              data?.data?.categories?.length < 1 ? "mt-5" : ""
            }`}
          >
            <CarRentalRoutes
              routes={data?.data?.routes}
              cityName={
                data?.data?.route?.from_location || data?.data?.city?.location
              }
            />
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
      <div className="py-3">
        {/* <ReviewsWidget /> */}
        <ReviewsWrapper isCarPage={true} />
      </div>
      <div className="pb-5">
            <LogoSlider />
          </div>



      {openModal && <CarEnquiryModal onClose={() => setOpenModal(false)} />}
    </>
  );
}