import React from "react";
import { Metadata } from "next";
import {  XPublicToken } from "@/app/urls/apiUrls";
import LogoSlider from "../home/LogoSlider";
import Breadcrumb from "../common/Breadcrumb";
import AwardsTimeline from "../about/AwardsTimeline";

export const metadata: Metadata = {
  title: "Our Credentials|Accreditations,Awards & Recognitions",
  description:
    "Cholan Tours, award winning Destination Management Company in South India. Expert in handling domestic and international tours offering personalized services......",
};
interface CMSMeta {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  h1_heading?: string;
  meta_details?: string;
}

interface CMSDetails {
  title?: string;
  slug?: string;
  banner_image?: string;
  banner_image_alt?: string;
  short_description?: string | null;
  description?: string;
  meta?: CMSMeta;
}

interface CMSResponse {
  status?: string;
  message?: string;
  data?: {
    details?: CMSDetails;
  };
}

async function getPageDetails(): Promise<CMSDetails | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=accreditation`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Public-Token": XPublicToken,
        },
      }
    );

    if (!res.ok) return null;

    const data: CMSResponse = await res.json();
    return data?.data?.details || null;
  } catch (error) {
    console.error("Failed to fetch Accreditation details:", error);
    return null;
  }
}

const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Our Credentials", isCurrent: true },
];

export default async function Accreditation() {
  const pageData = await getPageDetails();
  if (!pageData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <p className="text-secondary fs-5">
          Content not available at the moment.
        </p>
      </div>
    );
  }

  return (
    <>
      <section
        className="banner py-5 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2)), url('${pageData.banner_image || "/images/banner.jpg"
            }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-label={
          pageData.banner_image_alt || pageData.title || "Banner image"
        }
      >
        {" "}
        <img
          src={pageData.banner_image || "/images/banner.jpg"}
          alt={pageData.banner_image_alt || "Accreditation Banner"}
          className="d-none"
        />
      </section>

      <section className="pt-4">
        <div className="container ">
          <Breadcrumb items={staticBreadcrumbItems} />
         

          <div className="border-0 card">
              <div className="pb-0">
                <h1 className="fs-2 mb-3 ">
                  {pageData.title || "Accreditation"}
                </h1>
                 {pageData?.short_description && (
                <div
                  className="text-muted"
                  dangerouslySetInnerHTML={{
                    __html: pageData.short_description || "",
                  }}
                />
                  )}
                {/* <div className="mt-5">
              
                   <StaticTimeline />
                </div> */}
              </div>
            </div>
        </div>
      </section>

        <div className="py-5">
          <LogoSlider />
        </div>


      {/* {pageData?.description && (
        <section className="pb-5">
          <div className="container">
            <div className="border-0">
              <div className="p-0">
                <div

                  dangerouslySetInnerHTML={{
                    __html:
                      pageData.description ||
                      "<p>We are committed to excellence and sustainability in travel experiences.</p>",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )} */}
    </>
  );
}
