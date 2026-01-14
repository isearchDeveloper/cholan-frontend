// "use client";

import Breadcrumb from "@/app/components/common/Breadcrumb";

import Image from "next/image";
import AboutBanner from "@/app/components/about/aboutbanner";

import EmployeeCard from "@/app/components/about/team";
import { fetchPackageReviewData } from "@/app/services/reveiwService";

import { fetchAboutPageTeamData } from "@/app/services/aboutServices";
import { getCanonical } from "@/app/lib/getCanonical";
import Link from "next/link";

export async function generateMetadata({ params }: any) {
  const data = await fetchAboutPageTeamData();

  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/our-team");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

  return {
    title: meta?.meta_title || "cholan tours",
    description: meta?.meta_description || "cholan tours",
    keywords: meta.meta_keywords || "",
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || "cholan tours",
      url: currentUrl,
      description: meta?.meta_description || "cholan tours",
    },

    twitter: {
      title: meta?.meta_title || "cholan tours",
      url: currentUrl,
      description: meta?.meta_description || "cholan tours",
    },

    // Dynamically inject the meta_details content into head
    // other: {
    //   // This will render the raw HTML from meta_details in the head section
    //   "meta-details": metaDetails,
    // },
  };
}

const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Our Team", isCurrent: true },
];

export default async function AboutUs() {
  const data = await fetchAboutPageTeamData();

  return (
    <div className="team-wrapper">
      <AboutBanner bannerData={data?.data?.details} />
      <div className="pt-4 pb-5">
        <div className="container">
          <Breadcrumb items={staticBreadcrumbItems} />
          <div className="pt-2">
            {data?.data?.details?.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.data?.details?.description || "",
                }}
                className="row gap-4 gap-lg-0"
              />
            )}
          </div>

          {data?.data?.department?.length > 0 && (
            <EmployeeCard departments={data.data.department} />
          )}
          {/* <EmployeeCard /> */}

          <div className="pt-5 text-center">
            {data?.data?.details?.short_description && (
              <div
               
                dangerouslySetInnerHTML={{
                  __html:
                    data?.data?.details?.short_description ||
                    "<p>We are committed to excellence and sustainability in travel experiences.</p>",
                }}
              />
            )}

            <div className="btm-button mt-4">
              <Link href="/careers">
                <button className="btn blue-btn">
                  Join With Us
                  <span>
                    <Image
                      width={23}
                      height={23}
                      sizes="100vw"
                      src="/images/button-arrow.png"
                      alt=""
                    />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
