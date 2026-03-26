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
import { fetchWorldPackageListingData } from "@/app/services/internationaltourService";
import { buildListingTitle } from "@/app/utils/titleHelpers";

const InternationalPackageListing = ({
  packageList1,
  initialPage,
  slug1,
  ssrFixedData,
  categorySlug: serverCategorySlug,
  originalSlug,
}: any) => {
  const [packageList, setPackageList] = useState<any>(packageList1 || null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoader, setShowLoader] = useState(true);

  const [fixedData, setfixedData] = useState<any>(ssrFixedData || null);

  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
  }, []);
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
    if (!fixedData && ssrFixedData) {
      setfixedData(ssrFixedData);
    }
  }, [ssrFixedData]);

  // useEffect(() => {
  //   if (!slug1) return;

  //   const fetchPackages = async () => {
  //     setShowLoader(true);

  //     try {
  //       const detectedScope = fixedData?.country?.slug ? "country" : "location";

  //       const response = await fetchWorldPackageListingData({
  //         slug1,
  //         currentPage,
  //         categorySlug,
  //         scopeFromData: detectedScope,
  //       });

  //       if (response?.data) {
  //         setPackageList(response.data);
  //         if (!categorySlug) {
  //           setfixedData(response.data);
  //         }

  //         const totalItems = response.data.pagination?.total || 0;
  //         const itemsPerPage = response.data.pagination?.limit || 10;
  //         setTotalPages(Math.ceil(totalItems / itemsPerPage));
  //       } else {
  //         setPackageList(null);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch world packages:", err);
  //       setPackageList(null);
  //     } finally {
  //       setShowLoader(false);
  //     }
  //   };

  //   fetchPackages();
  // }, [slug1, currentPage, categorySlug]);

  // const handlePageChange = async (page: number) => {
  //   if (page < 1 || page > totalPages) return;
  //   if (!slug1) return;

  //   setShowLoader(true);

  //   try {
  //     const detectedScope = fixedData?.country?.slug ? "country" : "location";

  //     const response = await fetchWorldPackageListingData({
  //       slug1,
  //       currentPage: page,
  //       categorySlug,
  //       scopeFromData: detectedScope,
  //     });

  //     if (response?.data) {
  //       setPackageList(response.data);

  //       const totalItems = response.data.pagination?.total || 0;
  //       const itemsPerPage = response.data.pagination?.limit || 10;
  //       setTotalPages(Math.ceil(totalItems / itemsPerPage));

  //       setCurrentPage(page);

  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     } else {
  //       setPackageList(null);
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch world packages:", err);
  //     setPackageList(null);
  //   } finally {
  //     setShowLoader(false);
  //   }
  // };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (!slug1) return;

    setShowLoader(true);

    try {
      const response = await fetchWorldPackageListingData({
        slug1,
        currentPage: page,
        categorySlug: null, // 🔒 locked
        scopeFromData: "location",
      });

      if (response?.data) {
        setPackageList(response.data);
        setCurrentPage(page);
        setTotalPages(
          Math.ceil(
            (response.data.pagination?.total || 0) /
              (response.data.pagination?.limit || 10),
          ),
        );

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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

  const locationName =
    fixedData?.country?.name ||
    fixedData?.location?.name ||
    ssrFixedData?.country?.name ||
    ssrFixedData?.location?.name ||
    "";

  const listingTitle = buildListingTitle(locationName);
  const faqs = packageList?.country?.faqs || packageList?.location?.faqs || [];

  const isCategoryPage =
    originalSlug &&
    slug1 &&
    originalSlug !== slug1 &&
    originalSlug.endsWith("-tour-packages");

  const breadcrumbItems: any = [
    { label: "Home", href: "/" },
    { label: "International Tour Packages", href: "/international-holidays" },
  ];

  if (isCategoryPage && serverCategorySlug && locationName) {
    breadcrumbItems.push({
      label: locationName,
      href: `/international-holidays/${slug1}`,
    });
    breadcrumbItems.push({
      label: `${locationName} ${serverCategorySlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase())} Tour Packages`,
      isCurrent: true,
    });
  } else {
    breadcrumbItems.push({
      label: locationName,
      isCurrent: true,
    });
  }

  // ✅ SAFE LOCATION NAME
  // const resolvedLocationName =
  //   fixedData?.location?.name ||
  //   fixedData?.country?.name ||
  //   ssrFixedData?.location?.name ||
  //   ssrFixedData?.country?.name ||
  //   "";

  // // ✅ FORMAT CATEGORY (family-tour-package → Family Tour Package)
  // const formattedCategory = categorySlug
  //   ? categorySlug
  //       .replace(/-/g, " ")
  //       .replace(/\b\w/g, (C: string) => C.toUpperCase())
  //   : "";

  // // ✅ FINAL TITLE (NO DUPLICATE, NO UNDEFINED)
  // const pageTitle = resolvedLocationName
  //   ? formattedCategory
  //     ? `${resolvedLocationName} ${formattedCategory} Tour Package`
  //     : `${resolvedLocationName} Tour Packages`
  //   : "";

  // const pageTitle = buildListingTitle(
  //   packageList?.location?.name,
  //   categorySlug
  // );

  return (
    <div className="tour-listing p-0">
      {packageList?.country?.details?.title ||
      packageList?.location?.details?.title ||
      packageList?.country?.details?.sub_title ||
      packageList?.location?.details?.sub_title ||
      packageList?.country?.details?.banner_image ||
      packageList?.location?.details?.banner_image ? (
        <Banner
          title={
            packageList?.country?.details?.title
              ? packageList?.country?.details?.title
              : packageList?.location?.details?.title
          }
          // subtitle={
          //   packageList?.country?.details?.sub_title
          //     ? packageList?.country?.details?.sub_title
          //     : packageList?.location?.details?.sub_title
          // }
          imageUrl={
            packageList?.country?.details?.banner_image
              ? packageList?.country?.details?.banner_image
              : packageList?.location?.details?.banner_image
          }
        />
      ) : null}

      <div className="listing-inner-wrapper">
        <div className="container mx-auto pt-4 pb-5">
          <Breadcrumb items={breadcrumbItems} />
          <div className="row">
            <div className="col-12 col-lg-3">
              {/* ✅ JS Disabled Sidebar */}
              {!jsEnabled ? (
                <Sidebar
                  data={ssrFixedData}
                  cities={
                    ssrFixedData?.country?.name
                      ? ssrFixedData?.country?.name
                      : ssrFixedData?.location?.name
                  }
                  categorySlug={null}
                  setCategorySlug={() => {}}
                />
              ) : (
                /* ✅ JS Enabled Sidebar */
                <Sidebar
                  data={fixedData}
                  cities={
                    fixedData?.country?.name ||
                    fixedData?.location?.name ||
                    ssrFixedData?.country?.name ||
                    ssrFixedData?.location?.name ||
                    ""
                  }
                  setCategorySlug={(slug: any) => {
                    setCurrentPage(1);
                  }}
                />
              )}
            </div>

            <div className="col-12 col-lg-9">
              {listingTitle && (
                <ExpandableText
                  title={listingTitle}
                  subtitle={
                    packageList?.country?.details?.sub_title
                      ? packageList?.country?.details?.sub_title
                      : packageList?.location?.details?.sub_title
                  }
                  text={
                    packageList?.country?.details?.about
                      ? packageList?.country?.details?.about
                      : packageList?.location?.details?.about
                  }
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

              {packageList?.packages?.length < 1 ? null : (
                <div className="grid grid-cols-1 gap-6">
                  {packageList?.packages?.map((tour: any) => (
                    <TourCard
                      key={tour.slug}
                      slug={tour.slug}
                      title={tour.title}
                      rating={5}
                      duration={`${tour.details.duration_nights} Nights ${tour.details.duration_days} Days`}
                      tourTime={`${tour.details.start_date} - ${tour.details.end_date}`}
                      highlights={tour.details.tour_highlights}
                      imageUrl={tour.primary_image}
                    />
                  ))}
                </div>
              )}
              {/* Pagination Section */}
              {packageList?.packages?.length < 1 ? (
                <h6 className="mt-5 text-danger text-center">
                  No Packages Found
                </h6>
              ) : (
                <div className="pagination-container mt-4">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      {/* Previous Button */}
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
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

                      {/* Page Numbers */}
                      {generatePageNumbers().map((page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? "active" : ""
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

                      {/* Next Button */}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
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

              {/* )} */}

              {/* )} */}

              {faqs.length > 0 && (
                <div className="mt-5">
                  {" "}
                  <FAQAccordionListing
                    faqs={faqs}
                    location={
                      packageList?.country?.faq_title ||
                      packageList?.location?.faq_title ||
                      packageList?.country?.name ||
                      packageList?.location?.name
                    }
                  />{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalPackageListing;
