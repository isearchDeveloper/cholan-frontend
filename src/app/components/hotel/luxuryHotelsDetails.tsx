
import Breadcrumb from "@/app/components/common/Breadcrumb";
import "aos/dist/aos.css";
import Image from "next/image";
import HotelCard from "@/app/components/hotel/HotelCard";
import FAQAccordion from "@/app/components/common/FAQAccordion";
import CustomarHotelRate from "@/app/components/hotel/CustomarHotelRate";
import HotelTourDetailsBanner from "@/app/components/hotel/HotelTourDetailsBanner";
import HotelDetailsContent from "@/app/components/hotel/HotelDetailsContent";
import SliderComponent from "@/app/components/hotel/SliderComponent";
import HotelEnquiryForm from "@/app/components/hotel/enquiryFormHotel";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";
import FeedbackModal from "@/app/modals/feedbackModal";
import FAQAccordionForHotel from "./faqForHotel";
import FAQAccordionForHotelDetails from "./hotelDetailsFaq";
import HotelEnquiryModal from "@/app/modals/hotelEnquiryModal";
import HotelRoomsSection from "./HotelRoomsSection";
import MoreLuxuryHotels from "./MoreLuxaryHotels";
import ReviewsWidget from "../ReviewsWidget";
import LogoSlider from "../home/LogoSlider";

interface Review {
    customer_name: string;
    rating: number;
    comment: string;
}

export default function HotelTourDetails({ hotelDetailsData, slug }: any) {



    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Luxury Hotels", href: "/luxury-hotels" },
        { label: `${hotelDetailsData?.hotel?.title}`, isCurrent: true },
    ];





    return (
        <>
            <div className="hotel details-wrapper">
                <div className="container mx-auto pt-4 pb-5">
                    {hotelDetailsData?.hotel ? (
                        <HotelTourDetailsBanner
                            image={hotelDetailsData?.hotel?.primary_image}
                            imageAlt={hotelDetailsData?.hotel?.primary_image_alt}
                            images={hotelDetailsData?.hotel?.images}
                            title={hotelDetailsData?.hotel?.title}
                        />
                    ) : null}

                    <div className="row mt-4">
                        <div className="col-lg-8 ">
                            <Breadcrumb items={breadcrumbItems} />
                            <div className="d-flex flex-column gap-4">
                                <HotelDetailsContent tour={hotelDetailsData?.hotel} />
                                <div className="overview-section">
                                    <h2 className="color-blue fs-3">Overview</h2>
                                    <div className="mb-0 text-sm">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: hotelDetailsData?.hotel.overview,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="refund-section">
                                        <h2 className=" mb-2 fs-3">Refund/Cancellation Policy</h2>
                                        <div className="mb-0 text-sm">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        hotelDetailsData?.hotel.refund_cancellation_policy,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mt-4 mt-lg-0">
                            <div className="side-sticky-form-hotel">
                                <HotelEnquiryForm
                                    title={hotelDetailsData?.hotel?.title}
                                    hotel_slug={slug}
                                />
                            </div>
                        </div>
                    </div>
                    {hotelDetailsData?.hotel?.rooms?.length > 0 && (
                        <HotelRoomsSection
                            rooms={hotelDetailsData?.hotel?.rooms}
                            slug={slug}
                        />
                    )}
                </div>

                {hotelDetailsData?.hotel?.todos?.length < 1 ? null : (
                    <SliderComponent todoData={hotelDetailsData?.hotel?.todos} />
                )}

                {/* <div className="row pt-5">
                    <CustomarHotelRate reviews={reviews} />
                </div> */}


                {/* <div className="py-5">
                    <ReviewsWidget />
                </div> */}



                {hotelDetailsData?.hotel?.faqs.length < 1 ? null : (
                    <div className="row py-5">
                        <div className="faqs center-faqs">
                            <div className="container">
                                <FAQAccordionForHotelDetails
                                    faqs={hotelDetailsData?.hotel?.faqs}
                                    name={hotelDetailsData?.hotel?.faq_title}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {hotelDetailsData?.similar_hotels?.length < 1 ? null : (
                    <MoreLuxuryHotels luxuryHotels={hotelDetailsData.similar_hotels
                    } />
                )}
                {/* 
                {hotelDetailsData?.similar_hotels?.length < 1 ? null : (
                    <div className="py-5 lux-hotels">
                        <div className="container">
                            <h2 className="mb-4 text-center fs-3">More Luxury Hotels</h2>

                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Autoplay, Pagination]}
                                className="mySwiper"
                            >
                                {hotelDetailsData?.similar_hotels?.map((data: any) => (
                                    <SwiperSlide key={data.slug}>
                                        <HotelCard data={data} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )} */}






            </div>
            {/* <FeedbackModal
        isOpen={openFeedback}
        onClose={() => setOpenFeedback(false)}
        title={hotelDetailsData?.hotel?.title}
        duration={hotelDetailsData?.hotel?.details?.duration_days}
        slug={hotelDetailsData?.hotel?.slug}
      /> */}

            {/* <HotelEnquiryModal
        openModal={openModal}
        setOpenModal={setopenModal}
        slug={hotelDetailsData?.hotel?.slug}
        selectedRoom={selectedRoom}
        rooms={hotelDetailsData?.hotel?.rooms || []}
      /> */}
        </>
    );
}
