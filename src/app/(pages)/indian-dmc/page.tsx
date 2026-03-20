export const dynamic = "force-dynamic";
import Image from "next/image";
import DmcBanner from "@/app/components/dmc/dmc-banner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ExpandableText from "@/app/components/common/ExpandableText";

import Link from "next/link";
import { fetchDmcPageDetails } from "@/app/services/dmcServices";
import { getCanonical } from "@/app/lib/getCanonical";

// Define interfaces for TypeScript
interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Strength {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export async function generateMetadata() {
  const data = await fetchDmcPageDetails("dmc");

  const meta = data?.meta || {};
  const canonical = await getCanonical("/indian-dmc");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

  return {
    title: meta?.meta_title || "Cholan Tours",
    description: meta?.meta_description || "Cholan Tours",
    keywords: meta.meta_keywords || "",
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || "Cholan Tours",
      url: currentUrl,
      description: meta?.meta_description || "Cholan Tours",
    },

    twitter: {
      title: meta?.meta_title || "Cholan Tours",
      url: currentUrl,
      description: meta?.meta_description || "Cholan Tours",
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
  { label: "Our Partners", isCurrent: true },
];

export default async function Home() {
  const pageData = await fetchDmcPageDetails("dmc");


  const staticBreadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Indian DMC", isCurrent: true },
  ];

  function renderBreadcrumbHTML(items: any) {
    if (!Array.isArray(items)) return "";
    return `
      <nav class="breadcrumb text-sm mb-4">
        ${items
          .map(
            (item, idx) =>
              `<a href="${item.href}" class="text-blue-600 hover:underline">${
                item.label
              }</a>${idx < items.length - 1 ? " / " : ""}`
          )
          .join("")}
      </nav>
    `;
  }

  return (
    <div>
      {/* Hero Section */}
      {pageData?.banner_image && (
        // <DmcBanner
        //   data={[
        //     {
        //       title: pageData?.title || "",
        //       subtitle: pageData?.short_description || "",
        //       imageUrl: pageData?.banner_image,
        //       imageUrlAlt:
        //         pageData?.banner_image_alt || pageData?.title || "Banner Image",
        //     },
        //   ]}
        // />

        <DmcBanner
          // title={pageData?.title}
          // subtitle={pageData?.short_description}
          imageUrl={pageData?.banner_image}
        />
      )}

      <section className="pt-4">
        <div className="container">
          <Breadcrumb items={staticBreadcrumbItems} />
        </div>
      </section>

      <div
        className="cms-page-content"
        dangerouslySetInnerHTML={{
          __html:
            pageData?.description
              ?.replaceAll(
                "{staticBreadcrumbItems}",
                JSON.stringify(staticBreadcrumbItems)
              )
              ?.replaceAll(
                '<breadcrumb items="{staticBreadcrumbItems}"></breadcrumb>',
                `<div class="breadcrumb-container">${renderBreadcrumbHTML(
                  staticBreadcrumbItems
                )}</div>`
              ) || "",
        }}
      ></div>
    </div>
  );
}
