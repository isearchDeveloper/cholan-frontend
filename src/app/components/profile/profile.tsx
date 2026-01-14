
import React from "react";
import { Metadata } from "next";
import {  XPublicToken } from "@/app/urls/apiUrls";

export const metadata: Metadata = {
  title: 'Profile | About Us | Cholan Tours Pvt Ltd',
  description: 'Know more about Cholan Tours, your ideal partner to explore India in the most wonderful way. Travel with us for the most personalized services since 1999.',
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=profile`, {
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
    console.error("Failed to fetch Profile details:", error);
    return null;
  }
}

export default async function Profile() {
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
        className="py-5 text-white"
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
          alt={pageData.banner_image_alt || "Profile Banner"}
          className="d-none"
        />

        <div className="container py-5 text-center">
          <h1 className="display-4 fw-bold mb-3 text-white">
            {pageData.title || "Profile"}
          </h1>
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
      {pageData?.short_description && (
        <section className="py-5">
          <div className="container">
            <div className="border-0">
              <div className="p-4">
                <div
                  className="text-muted"
                  dangerouslySetInnerHTML={{
                    __html:
                      pageData.short_description ||
                      "",
                  }}
                />
              </div>
            </div>
          </div>
        </section>)}

      {pageData?.description && (
        <section className="py-5">
          <div className="container">
            <div className="border-0">
              <div className="p-4">
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
