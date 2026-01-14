
import React from "react";
import { Metadata } from "next";
import {  XPublicToken } from "@/app/urls/apiUrls";
import Breadcrumb from "../common/Breadcrumb";

export const metadata: Metadata = {
  title: 'CSR|Giving Back To Society|Connect with Everyone|Cholan Tours',
  description: 'Cholan Tours is happy to give back to society with wide range of CSR activities,connecting with everyone around.Cholan Tours, your ideal travel partner.......',
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=csr`, {
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
    console.error("Failed to fetch CSR details:", error);
    return null;
  }
}



const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "CSR", isCurrent: true },
];



export default async function CSR() {
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
        className="banner pt-5 text-white"
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
          alt={pageData.banner_image_alt || "CSR Banner"}
          className="d-none"
        />


      </section>
     
        <section className="pt-4">
          <div className="container ">
            <Breadcrumb items={staticBreadcrumbItems} />
            <div className="card border-0">
              <div className="p-4">
                <h1 className="fs-2 mb-3 ">
                  {pageData.title || "CSR"}
                </h1>
                

              {pageData?.short_description && (
                <div
                  className="text-muted"
                  dangerouslySetInnerHTML={{
                    __html: pageData.short_description || "",
                  }}
                />
              )}
              </div>
            </div>
          </div>
        </section>

      {pageData?.description && (
        <section className="pb-5">
          <div className="container">
            <div className="card border-0">
              <div className="p-4 pt-0">
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
        </section>
      )}
    </div>
  );
}



