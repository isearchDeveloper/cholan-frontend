"use client";
import React, { useState, useEffect } from "react";
import TourCard from "@/app/components/common/TourCard";
import Banner from "@/app/components/common/banner";
import Sidebar from "@/app/components/common/sidebar";
import ExpandableText from "@/app/components/common/ExpandableText";
import FAQAccordion from "@/app/components/common/FAQAccordion";

import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "next/navigation";
import {  XPublicToken } from "@/app/urls/apiUrls";
import axios from "axios";
import FAQAccordionListing from "@/app/components/common/FAQAccordionForListing";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import notFound from "@/app/not-found";

const SriLankaPackageListing: any = () => {
  const [packageList, setPackageList] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [categorySlug, setCategorySlug] = useState<any>("");

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const fetchPackages = async () => {
      let url = "";
      if (categorySlug) {
        url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/city/${slug}?page=${currentPage}&category_slug=${categorySlug}&package_country=srilanka`;
      } else {
        url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/city/${slug}?page=${currentPage}&package_country=srilanka`;
      }

      try {
        setShowLoader(true);
        const response = await axios.get<any>(url, {
          headers: {
            "X-Public-Token": XPublicToken,
          },
        });

        setPackageList(response.data.data);

        // Calculate total pages based on API response
        const totalItems = response.data.data.pagination.total;
        const itemsPerPage = response.data.data.pagination.limit;
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(calculatedTotalPages);

        // wait at least 2s before hiding loader
        // setTimeout(() => {
        //   setShowLoader(false);
        // }, 800);
      } catch (err: any) {
        // handle error if needed
        // setShowLoader(false);
      } finally {
        setShowLoader(false); // ✅ hide loader as soon as fetch finishes
      }
    };

    fetchPackages();
  }, [slug, currentPage, categorySlug]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showLoader) {
    return (
      <div className="page-loader">
        <div className="loader"></div>
      </div>
    );
  }

   if (!packageList) {
      return notFound();
    }

  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the beginning
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const breadcrumbItems: any = [
    { label: "Home", href: "/" },
    { label: `Srilanka`, href: "/srilanka" },
    { label: `${packageList?.location?.name} Tour Packages`, isCurrent: true },
  ];

  return (
    <div className="tour-listing p-0">
      {packageList?.location?.details?.title ||
      packageList?.location?.details?.sub_title ||
      packageList?.location?.details?.banner_image ? (
        <Banner
          title={packageList?.location?.details?.title}
          subtitle={packageList?.location?.details?.sub_title}
          imageUrl={packageList?.location?.details?.banner_image}
        />
      ) : null}

      <div className="listing-inner-wrapper">
        <div className="container mx-auto pt-4 pb-5">
          <div className="row">
            <div className="col-lg-12">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="col-12 col-lg-3">
              <Sidebar
                data={packageList}
                cities={packageList?.location?.name}
                categorySlug={categorySlug}
                setCategorySlug={setCategorySlug}
              />
            </div>

            <div className="col-12 col-lg-9">
              {packageList?.location?.name ||
              packageList?.location?.details?.sub_title ||
              packageList?.location?.details.about ? (
                <ExpandableText
                  title={packageList?.location?.name}
                  subtitle={packageList?.location?.details?.sub_title}
                  text={packageList?.location?.details?.about}
                  collapsedLines={2}
                />
              ) : null}


            {packageList?.packages?.length < 1 ? null :
              <div className="showing-count my-2 text-sm">
                <div className="flex gap-2 fs-6 align-items-lg-center">
                  {`Showing 1-${packageList?.packages?.length} packages from`} <h2 className="fs-6 m-0">{`${packageList?.location?.name} Tour
                  Packages`}</h2>
                </div>
              </div>}

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

              {/* {totalPages > 1 && ( */}
              <div className="pagination-container mt-4">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
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
              {/* )} */}

              {packageList.location.faqs.length < 1 ? null : (
                <div className="mt-5">
                  <FAQAccordionListing faqs={packageList.location.faqs} location={packageList?.location?.name} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaPackageListing;
