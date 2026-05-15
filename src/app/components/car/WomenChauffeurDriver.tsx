"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Breadcrumb from "@/app/components/common/Breadcrumb";
import LogoSlider from "@/app/components/home/LogoSlider";
import CarBanner from "@/app/components/car/CarBanner";
import CarExpandableText from "@/app/components/car/CarExpandableText";
import CarCitySection from "@/app/components/car/CarCitySection";
import CholanCarRental from "@/app/components/car/CholanCarRental";
import CarTabWithImages from "@/app/components/car/CarTabWithImages";
import CarRentalRoutes from "@/app/components/car/CarRentalRoutes";
import CarCardEconomy from "@/app/components/car/CarCardEconomy";
import CarCardLuxury from "@/app/components/car/CarCardLuxury";
import CarCardExecutive from "@/app/components/car/CarCardExecutive";
import FAQAccordionCar from "@/app/components/car/CarFaq";
import CarEnquiryForm from "@/app/components/common/CarenquiryForm";
import WomenChauffeurSection from "@/app/components/car/WomenChauffeurSection";
import CarEnquiryModal from "@/app/modals/carEnquiryModal";
import ReviewsWrapper from "@/app/components/ReviewsWrapper";

interface WCSCard {
  id: number;
  title: string;
  image: string;
  image_alt: string;
}

interface ChauffeurSection {
  section_title: string;
  section_description: string;
  cards: WCSCard[];
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface WomenChauffeurDriverProps {
  data: any;
  chauffeurSection?: ChauffeurSection | null;
  breadcrumbItems?: BreadcrumbItem[];
}

const defaultBreadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "Women Chauffeur Driver", isCurrent: true },
];

export default function WomenChauffeurDriver({
  data,
  chauffeurSection,
  breadcrumbItems,
}: WomenChauffeurDriverProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
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
            <Breadcrumb items={breadcrumbItems || defaultBreadcrumbItems} />
            <div className="row">
              <div className="col-lg-8">
                <CarExpandableText
                  title={data?.data?.details?.title}
                  text={data?.data?.details?.description}
                  collapsedLines={2}
                />
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0 car-sticky">
                <CarEnquiryForm />
              </div>
            </div>
          </div>

          {chauffeurSection && (
            <div className="mt-5 women-chauffeur-section">
              <WomenChauffeurSection chauffeurSection={chauffeurSection} />
            </div>
          )}

          <div className="mt-5">
            <CarCitySection cities={data?.data?.carcity} />
          </div>

          <div
            className={`pt-5 why-cc-car ${
              data?.data?.categories?.length < 1 ? "mt-5" : ""
            }`}
          >
            <CholanCarRental />
          </div>

          {/* {data?.data?.categories?.length < 1 ? null : (
            <div className="pb-5">
              <CarTabWithImages />
            </div>
          )} */}

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

          {fleets?.length < 1 ? null : (
            <div className="py-5 car-fleet px-2 px-lg-0">
              <div className="container">
                <h2 className="mb-4 text-center fs-3">Browse our Fleet</h2>

                {isMobile ? (
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="mySwiper"
                  >
                    {fleets.map((fleet, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="d-flex justify-content-center">
                          {fleet.component}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="row">
                    {fleets.map((fleet, idx) => (
                      <div key={idx} className="col-lg-4 col-xl-4">
                        {fleet.component}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="py-5">
            <ReviewsWrapper isCarPage={true} />
          </div>

          <LogoSlider />
        </div>
      </div>

      {openModal && <CarEnquiryModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
