
import React from "react";
import { Metadata } from "next";
import {  XPublicToken } from "@/app/urls/apiUrls";
import Breadcrumb from "../common/Breadcrumb";
export const metadata: Metadata = {
  title: 'Careers | Wanderlust Travel',
  description: 'Wanderlust Travel’s Privacy Policy explains how we collect, use, and protect your personal information when you book trips or use our services.',
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=careers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
    });

    if (!res.ok) return null;

    const data: CMSResponse = await res.json();
    return data?.data?.details || null;

  } catch (error) {
    console.error("Failed to fetch Careers details:", error);
    return null;
  }
}


const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Careers", isCurrent: true },
];

export default async function Careers() {
  const pageData = await getPageDetails();

  if (!pageData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <p className="text-secondary fs-5">Content not available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">

      <section
        className="banner py-5 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2)), url('${pageData.banner_image || "/images/banner.jpg"
            }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-label={pageData.banner_image_alt || pageData.title || "Banner image"}
      > <img
          src={pageData.banner_image || "/images/banner.jpg"}
          alt={pageData.banner_image_alt || "Careers Banner"}
          className="d-none"
        />

        <div className="container py-5 text-center">

          {/* <div
            className="lead text-white mb-0"
            dangerouslySetInnerHTML={{
              __html:
                pageData.short_description ||
                "",
            }}
          /> */}
        </div>
      </section>


     <section className="pb-5 pt-4">
        <div className="container ">
           <Breadcrumb items={staticBreadcrumbItems} />
          <div className="card border-0">
            <div>
             
            <div className="card-body p-4">
              <h1 className="fs-2 mb-3">
                {pageData.title || "Careers"}
              </h1>
              <div
                className="text-muted"
                dangerouslySetInnerHTML={{
                  __html:
                    pageData.description ||
                    "<p>We are committed to excellence and sustainability in travel experiences.</p>",
                }}
              />
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
