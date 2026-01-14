"use client";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

import HotelEnquiryModal from "@/app/modals/hotelEnquiryModal";

const HotelTabWithImages = ({ trainListData }: { trainListData: any }) => {
  const [openModal, setopenModal] = useState<boolean>(false);
  const [trainName, setTrainName] = useState<any>();
  const [hotelSlug, setHotelSlug] = useState<any>();
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const trains = trainListData || [];
  const tabLabels = ["All", ...trains?.map((train: any) => train?.title)];

  const openEnquiryModal = (name: any, slug: any) => {

    setopenModal(true);
    setTrainName(name);
    setHotelSlug(slug);
  };
  
  return (
    <>
      <div className="hotel-list pt-5">
        <Tabs>
          <div className="container">
            <TabList className="nav nav-pills justify-content-center mb-0 gap-2">
              {tabLabels?.map((label, index) => (
                <Tab
                  key={index}
                  className="nav-link"
                  selectedClassName="active bg-primary text-white"
                >
                  {label}
                </Tab>
              ))}
            </TabList>
          </div>

          <div className="train-listing-wraper hotel-lists">
            <div className="container">
              <div className="row">
                {tabLabels?.map((label, index) => {
                  const filteredTrains =
                    label === "All"
                      ? trains
                      : trains.filter((train: any) => train?.title === label);

                  return (
                    <TabPanel key={index}>
                      {filteredTrains?.length === 0 ? (
                        <p>No Hotels found</p>
                      ) : (
                        filteredTrains?.map((train: any, i: number) => (
                          <div
                            className={`row mt-5 ${i % 2 === 0
                              ? "flex-column-reverse flex-lg-row gap-4 gap-lg-0"
                              : ""
                              }`}
                            key={i}
                          >
                            {i % 2 === 0 ? (
                              <>
                                <div className="col-lg-4 mb-3 mb-lg-0 h-64">
                                  <a
                                    href={`/luxury-hotels/${train.slug}`}><Image
                                      src={train.primary_image || "/images/no-img.webp"}
                                      alt={train.primary_image_alt}
                                      width={600}
                                      height={400}
                                      className="rounded-4 w-full custom-hover object-cover h-64"
                                    /></a>
                                </div>
                                <div className="col-lg-8">
                                  <a
                                    href={`/luxury-hotels/${train.slug}`}><h3 className="text-black fs-4">{train.title}</h3></a>
                                  <div
                                    className="text-[#575757] text-sm font-normal leading-relaxed clamp-6"
                                    dangerouslySetInnerHTML={{
                                      __html: train.short_description,
                                    }}
                                  />

                                  <div className="routes">
                                    <ul>
                                      {train?.facilities?.map((data: any) => (

                                        <li key={data}>{data}</li>

                                      ))}
                                    </ul>
                                  </div>


                                  <div className="mt-4 flex gap-3">
                                    <Link
                                      href={`/luxury-hotels/${train.slug}`}
                                      className="btn blue-btn"
                                    >
                                      View Details
                                      <span>
                                        <Image
                                          src="/images/button-arrow.png"
                                          alt=""
                                          width={23}
                                          height={23}
                                        />
                                      </span>
                                    </Link>
                                    <button
                                      onClick={() =>
                                        openEnquiryModal(train.title, train.slug)
                                      }
                                      className="btn orange-btn"
                                    >
                                      Enquire Now
                                      <span>
                                        <Image
                                          src="/images/button-arrow.png"
                                          alt=""
                                          width={23}
                                          height={23}
                                        />
                                      </span>
                                    </button>
                                  </div>
                                  
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="col-lg-8">
                                  <a
                                    href={`/luxury-hotels/${train.slug}`}><h3 className="text-black fs-4">{train.title}</h3></a>
                                  <div
                                    className="text-[#575757] text-sm font-normal leading-relaxed clamp-6"
                                    dangerouslySetInnerHTML={{
                                      __html: train.short_description,
                                    }}
                                  />
                                   <div className="routes">
                                    <ul>
                                      {train?.facilities?.map((data: any) => (

                                        <li key={data}>{data}</li>


                                      ))}
                                    </ul>
                                  </div>
                                  <div className="mt-4 flex gap-3">
                                    <Link
                                      href={`/luxury-hotels/${train.slug}`}
                                      className="btn blue-btn"
                                    >
                                      View Details
                                      <span>
                                        <Image
                                          src="/images/button-arrow.png"
                                          alt=""
                                          width={23}
                                          height={23}
                                        />
                                      </span>
                                    </Link>
                                    <button
                                      onClick={() =>
                                        openEnquiryModal(train.title, train.slug)
                                      }
                                      className="btn orange-btn"
                                    >
                                      Enquire Now
                                      <span>
                                        <Image
                                          src="/images/button-arrow.png"
                                          alt=""
                                          width={23}
                                          height={23}
                                        />
                                      </span>
                                    </button>
                                  </div>
                                 
                                </div>
                                <div className="col-lg-4 mt-5 mt-lg-0 h-64">
                                  <a
                                    href={`/luxury-hotels/${train.slug}`}><Image
                                      src={train.primary_image || "/images/no-img.webp"}
                                      alt={train.primary_image_alt}
                                      width={600}
                                      height={400}
                                      className="rounded-4 w-full h-64 custom-hover object-cover"
                                    /></a>
                                </div>
                              </>
                            )}
                          </div>
                        ))
                      )}
                    </TabPanel>
                  );
                })}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
      <HotelEnquiryModal
        openModal={openModal}
        setOpenModal={setopenModal}
        trainName={trainName}
        slug={hotelSlug}
      />
    </>
  );
};

export default HotelTabWithImages;