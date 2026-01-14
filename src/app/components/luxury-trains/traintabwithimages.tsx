"use client";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

import TrainEnquiryModal from "@/app/modals/trainEnquiryModal";

const TrainTabWithImages = ({ trainListData }: { trainListData: any }) => {
  const [openModal, setopenModal] = useState<boolean>(false);
  const [trainName, setTrainName] = useState<any>();
  const [trainSlug, setTrainSlug] = useState<any>();

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
    setTrainSlug(slug);
  };

  return (
    <>
      <div className="train-list">
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

          <div className="train-listing-wraper">
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
                        <p>No trains found</p>
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
                                <div className="col-lg-4 mb-3 mb-lg-0">
                                  <a href={`/luxury-trains/${train.slug}`} className="block">
                                    <Image
                                      src={
                                        encodeURI(train.primary_image) ||
                                        "/images/no-img.webp"
                                      }
                                      alt={train?.primary_image_alt || "image"}
                                      width={600}
                                      height={400}
                                      className="rounded-4 w-full custom-hover h-64 object-cover"
                                    /></a>
                                </div>
                                <div className="col-lg-8">
                                  <a
                                    href={`/luxury-trains/${train.slug}`}
                                    className="text-black hover:underline"
                                  >
                                    <h3 className="text-black fs-4">
                                      {train.title}
                                    </h3></a>

                                  <div
                                    className="text-[#575757] text-sm font-normal leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                      __html: train.short_description,
                                    }}
                                  />
                                  <div className="mt-4 flex gap-3">
                                    <Link
                                      href={`/luxury-trains/${train.slug}`}
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
                                        openEnquiryModal(
                                          train.title,
                                          train.slug
                                        )
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
                                  <div className="routes">

                                    {train?.facilities?.map((data: any) => (
                                      <ul>
                                        <li key={data}>{data}</li>
                                      </ul>

                                    ))}

                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="col-lg-8">
                                  <a
                                    href={`/luxury-trains/${train.slug}`}
                                    className="text-black hover:underline"
                                  ><h3 className="text-black fs-4">
                                      {train.title}
                                    </h3></a>
                                  <div
                                    className="text-[#575757] text-sm font-normal leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                      __html: train.short_description,
                                    }}
                                  />
                                  <div className="mt-4 flex gap-3">
                                    <Link
                                      href={`/luxury-trains/${train.slug}`}
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
                                        openEnquiryModal(
                                          train.title,
                                          train.slug
                                        )
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
                                  <div className="routes">

                                    {train?.facilities?.map((data: any) => (
                                      <ul>
                                        <li key={data}>{data}</li>
                                      </ul>

                                    ))}

                                  </div>
                                </div>
                                <div className="col-lg-4 mt-5 mt-lg-0">
                                  <a href={`/luxury-trains/${train.slug}`} className="block">
                                    <Image
                                      src={
                                        encodeURI(train.primary_image) ||
                                        "/images/no-img.webp"
                                      }
                                      alt={train?.primary_image_alt || "image"}
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
      <TrainEnquiryModal
        openModal={openModal}
        setopenModal={setopenModal}
        trainName={trainName}
        slug={trainSlug}
      />
    </>
  );
};

export default TrainTabWithImages;
