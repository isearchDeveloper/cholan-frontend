"use client";
import React, { useState, useEffect } from "react";
import TourCard from "@/app/components/common/TourCard";
import Banner from "@/app/components/common/banner";
import Sidebar from "@/app/components/common/sidebar";
import ExpandableText from "@/app/components/common/ExpandableText";
import FAQAccordion from "@/app/components/common/FAQAccordion";

import AOS from "aos";
import "aos/dist/aos.css";
import { notFound, useParams } from "next/navigation";
import { XPublicToken } from "@/app/urls/apiUrls";
import axios from "axios";
import FAQAccordionListing from "@/app/components/common/FAQAccordionForListing";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import { fetchIndiaPackageListingData } from "@/app/services/indiaPackageListService";
import { buildListingTitle } from "@/app/utils/titleHelpers";


const IndiaPackageListing = ({
  packageList1,
  initialPage,
  slug1,
  categorySlug: serverCategorySlug,
  originalSlug,
}: any) => {
  const [packageList, setPackageList] = useState<any>(packageList1 || null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [categorySlug, setCategorySlug] = useState<any>(
    serverCategorySlug || "",
  );

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (packageList1?.pagination) {
      const totalItems = packageList1.pagination.total || 0;
      const itemsPerPage = packageList1.pagination.limit || 10;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }
  }, [packageList1]);

  useEffect(() => {
    if (categorySlug) {
      handlePageChange(1);
    }
  }, [categorySlug]);
  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (!slug1) return;

    setShowLoader(true);

    try {
      const response = await fetchIndiaPackageListingData({
        slug1,
        currentPage: page,
        categorySlug,
      });

      if (response?.data) {
        setPackageList(response.data);

        const totalItems = response.data.pagination?.total || 0;
        const itemsPerPage = response.data.pagination?.limit || 10;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));

        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setPackageList(null);
      }
    } catch (err) {
      console.error("Failed to fetch packages", err);
      setPackageList(null);
    } finally {
      setShowLoader(false);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };
  const isCategoryPage =
    originalSlug &&
    slug1 &&
    originalSlug !== slug1 &&
    originalSlug.endsWith("-tour-packages");

  // const breadcrumbItems: any = [
  //   { label: "Home", href: "/" },
  //   { label: `${packageList?.location?.country?.name}`, href: "/india" },
  // ];

  // if (isCategoryPage && serverCategorySlug) {
  //   breadcrumbItems.push({
  //     label: `${packageList?.location?.name}`,
  //     href: `/india/${slug1}`,
  //   });

  //   breadcrumbItems.push({
  //     label: `${packageList?.location?.name} ${serverCategorySlug
  //       .replace(/-/g, " ")
  //       .replace(/\b\w/g, (l: string) => l.toUpperCase())} Tour Packages`,
  //     isCurrent: true,
  //   });
  // } else {
  //   breadcrumbItems.push({
  //     label: `${packageList?.location?.name} Tour Packages`,
  //     isCurrent: true,
  //   });
  // }

  // temp
  // ✅ Fallback titles for virtual region pages (North India, South India etc.)
  const virtualRegionTitleMap: any = {
    "north-india-tour-packages": "North India Tour Packages",
    "south-india-tour-packages": "South India Tour Packages",
    "west-central-india-tour-packages": "West & Central India Tour Packages",
    "north-east-india-tour-packages":
      "East & North East India Tour Packages",
  };

  const fallbackTitle = virtualRegionTitleMap[slug1] || "";

  const isRegionPage = Boolean(virtualRegionTitleMap[slug1]);
  const activeSource = isRegionPage
    ? packageList?.region
    : packageList?.location;

  const details = activeSource?.details ?? {};
  const faqs = activeSource?.faqs ?? [];
  const name =
    activeSource?.name ||
    virtualRegionTitleMap[slug1]?.replace(" Tour Packages", "") ||
    "";

  const faqTitle =
    activeSource?.faq_title ||
    activeSource?.country?.faq_title ||
    activeSource?.faq_title ||
    "";



  // Try to get real location name, else derive from fallback
  const locationName =
    packageList?.location?.name || fallbackTitle.replace(" Tour Packages", "");

  const breadcrumbItems: any = [
    { label: "Home", href: "/" },
    { label: "India", href: "/india" },
  ];

  if (isCategoryPage && serverCategorySlug && packageList?.location?.name) {
    breadcrumbItems.push({
      label: `${packageList.location.name}`,
      href: `/india/${slug1}`,
    });

    breadcrumbItems.push({
      label: `${packageList.location.name} ${serverCategorySlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase())} Tour Packages`,
      isCurrent: true,
    });
  } else {
    breadcrumbItems.push({
      label: locationName ? `${locationName} Tour Packages` : fallbackTitle,
      isCurrent: true,
    });
  }

  const listingTitle = buildListingTitle(
    activeSource?.name,
    categorySlug,
  );


  // const resolvedLocationName =
  //   packageList?.location?.name || "";

  // const formattedCategory = categorySlug
  //   ? categorySlug
  //       .replace(/-/g, " ")
  //       .replace(/\b\w/g, (c: string) => c.toUpperCase())
  //   : "";

  // const pageTitle = resolvedLocationName
  //   ? formattedCategory
  //     ? `${resolvedLocationName} ${formattedCategory} Tour Package`
  //     : `${resolvedLocationName} Tour Packages`
  //   : "";
  // const pageTitle = buildListingTitle(
  //   packageList?.location?.name,
  //   categorySlug
  // );

  // ✅ Fallback for region pages (no location in API)
  const sidebarLocationName =
    packageList?.location?.name ||
    virtualRegionTitleMap[slug1]?.replace(" Tour Packages", "") ||
    "";

  const sidebarData = packageList?.location
    ? packageList
    : {
      ...packageList,
      location: {
        name: sidebarLocationName,
        themes: [], // prevent crash
      },
    };
  return (
    <div className="tour-listing p-0">
      {/* {packageList?.location?.details?.title ||
        packageList?.location?.details?.sub_title ||
        packageList?.location?.details?.banner_image ? (
        <Banner
          title={packageList?.location?.details?.title}
          subtitle={packageList?.location?.details?.sub_title}
          imageUrl={packageList?.location?.details?.banner_image}
        />
      ) : null} */}
      {details?.title || details?.sub_title || details?.banner_image ? (
        <Banner
          title={details?.title || name}
          // subtitle={details?.sub_title || ""}
          imageUrl={details?.banner_image || ""}
        />
      ) : null}



      <div className="listing-inner-wrapper">
        <div className="container mx-auto pt-4 pb-5">
          <div className="row">
            <div className="col-lg-12">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="col-12 col-lg-3">
              {/* <Sidebar
                data={packageList}
                cities={packageList?.location?.name}
                citySlug={slug1}
              
              /> */}

              <Sidebar
                data={sidebarData}
                cities={sidebarLocationName}
                citySlug={slug1}
              />
            </div>

            <div className="col-12 col-lg-9">
              {(activeSource?.details?.about ||
                activeSource?.details?.sub_title) && (
                  <ExpandableText
                    title={listingTitle}
                    subtitle={activeSource?.details?.sub_title || ""}
                    text={activeSource?.details?.about || ""}
                    collapsedLines={2}
                  />
                )}

              {packageList?.packages?.length < 1 ? null : (
                <div className="showing-count my-3 text-sm">
                  <div className="flex gap-2 fs-6 align-items-lg-center">
                    {`Showing 1-${packageList?.packages?.length} packages from`}{" "}
                    {listingTitle && (
                      <h2 className="fs-6 m-0">{listingTitle}</h2>
                    )}
                  </div>
                </div>
              )}

              {packageList?.packages?.length < 1 ? (
                <h6 className="mt-5 text-danger">No Packages Found</h6>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {packageList?.packages?.map((tour: any) => (
                    <TourCard
                      key={tour.slug}
                      slug={tour.slug}
                      title={tour.title}
                      rating={5}
                      duration={`${tour.details.duration_nights} ${tour.details.duration_nights < 2 ? "Night" : "Nights"}  ${tour.details.duration_days} ${tour.details.duration_days < 2 ? "Day" : "Days"}`}
                      tourTime={`${tour.details.start_date} - ${tour.details.end_date}`}
                      highlights={tour.details.tour_highlights}
                      imageUrl={tour.primary_image}
                    />
                  ))}
                </div>
              )}

              {packageList?.packages?.length < 1 ? null : (
                <div className="pagination-container mt-4">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""
                          }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          &laquo;
                        </button>
                      </li>

                      {generatePageNumbers().map((page) => (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? "active" : ""
                            }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""
                          }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}

              {faqs.length > 0 && (
                <div className="mt-5">
                  <FAQAccordionListing
                    faqs={faqs}
                    location={faqTitle}
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaPackageListing;
