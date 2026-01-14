"use client";

import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

import HotelEnquiryModal from "@/app/modals/hotelEnquiryModal";

interface HotelTabWithCityImagesProps {
    trainListData: any[];
    citySlug?: string;
}

const HotelTabWithCityImages = ({ trainListData, citySlug }: HotelTabWithCityImagesProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [hotelName, setHotelName] = useState<string>("");
    const [hotelSlug, setHotelSlug] = useState<string>("");

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    const openEnquiryModal = (name: string, slug: string) => {
        setOpenModal(true);
        setHotelName(name);
        setHotelSlug(slug);
    };

    return (
        <>
            <div className="hotel-list pt-5">
                <div className="container">
                    {trainListData.length === 0 ? (
                        <p>No Hotels found in this city.</p>
                    ) : (
                        trainListData.map((hotel: any, i: number) => (
                            <div
                                className={`row mt-5 ${i % 2 === 0 ? "flex-column-reverse flex-lg-row gap-4 gap-lg-0" : ""}`}
                                key={hotel.slug}
                            >
                                {i % 2 === 0 ? (
                                    <>
                                        <div className="col-lg-4 mb-3 mb-lg-0 h-64">
                                            <Link href={`/luxury-hotels/${hotel.slug}`}>
                                                <Image
                                                    src={
                                                        hotel.primary_image
                                                            ? `https://cdn.cholantours.com/${hotel.primary_image}`
                                                            : "/images/no-img.webp"
                                                    }

                                                    alt={hotel.primary_image_alt || hotel.title}
                                                    width={600}
                                                    height={400}
                                                    className="rounded-4 w-full custom-hover object-cover h-64"
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-lg-8">
                                            <Link href={`/luxury-hotels/${hotel.slug}`}>
                                                <h3 className="text-black fs-4">{hotel.title}</h3>
                                            </Link>
                                            <div
                                                className="text-[#575757] text-sm font-normal leading-relaxed clamp-6"
                                                dangerouslySetInnerHTML={{ __html: hotel.short_description }}
                                            />
                                            <div className="routes">
                                                <ul>
                                                    {hotel?.facilities?.map((data: any) => (
                                                        <li key={data}>{data}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="mt-4 flex gap-3">
                                                <Link
                                                    href={`/luxury-hotels/${hotel.slug}`}
                                                    className="btn blue-btn"
                                                >
                                                    View Details
                                                    <span>
                                                        <Image src="/images/button-arrow.png" alt="" width={23} height={23} />
                                                    </span>
                                                </Link>
                                                <button
                                                    onClick={() => openEnquiryModal(hotel.title, hotel.slug)}
                                                    className="btn orange-btn"
                                                >
                                                    Enquire Now
                                                    <span>
                                                        <Image src="/images/button-arrow.png" alt="" width={23} height={23} />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-lg-8">
                                            <Link href={`/luxury-hotels/${hotel.slug}`}>
                                                <h3 className="text-black fs-4">{hotel.title}</h3>
                                            </Link>
                                            <div
                                                className="text-[#575757] text-sm font-normal leading-relaxed clamp-6"
                                                dangerouslySetInnerHTML={{ __html: hotel.short_description }}
                                            />
                                            <div className="routes">
                                                <ul>
                                                    {hotel?.facilities?.map((data: any) => (
                                                        <li key={data}>{data}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="mt-4 flex gap-3">
                                                <Link
                                                    href={`/luxury-hotels/${hotel.slug}`}
                                                    className="btn blue-btn"
                                                >
                                                    View Details
                                                    <span>
                                                        <Image src="/images/button-arrow.png" alt="" width={23} height={23} />
                                                    </span>
                                                </Link>
                                                <button
                                                    onClick={() => openEnquiryModal(hotel.title, hotel.slug)}
                                                    className="btn orange-btn"
                                                >
                                                    Enquire Now
                                                    <span>
                                                        <Image src="/images/button-arrow.png" alt="" width={23} height={23} />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mt-5 mt-lg-0 h-64">
                                            <Link href={`/luxury-hotels/${hotel.slug}`}>
                                                <Image
                                                    src={
                                                        hotel.primary_image
                                                            ? `https://cdn.cholantours.com/${hotel.primary_image}`
                                                            : "/images/no-img.webp"
                                                    }
                                                    alt={hotel.primary_image_alt || hotel.title}
                                                    width={600}
                                                    height={400}
                                                    className="rounded-4 w-full h-64 custom-hover object-cover"
                                                />
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <HotelEnquiryModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                trainName={hotelName}
                slug={hotelSlug}
            />
        </>
    );
};

export default HotelTabWithCityImages;
