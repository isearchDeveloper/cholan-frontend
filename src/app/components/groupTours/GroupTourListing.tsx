"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "@/app/components/common/banner";
import ExpandableText from "@/app/components/common/ExpandableText";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import GroupTourCard from "./GroupTourCard";
import sidebarStyles from "@/app/components/common/sidebar.module.css";
import styles from "./grouptour.module.css";
import { fetchGroupTourPackages } from "@/app/services/groupTourService";

const ABOUT_TEXT = `
  Group tours with Cholan Tours offer a unique blend of comfort, camaraderie and curated experiences.
  Whether you're travelling with family, friends or colleagues, our group packages are designed to maximise
  fun while minimising hassle. With experienced guides, pre-planned itineraries and competitive pricing,
  every group journey becomes an unforgettable story. From the golden deserts of Rajasthan to the misty
  hills of the North East, we cover the length and breadth of India and beyond.
`;

const ITEMS_PER_PAGE = 10;

/* ─────────────────────────────
   Sidebar (no theme filter, only banner)
 ───────────────────────────────*/
const GroupTourSidebar = () => (
  <div className="sidebar-listing">
    <div className={sidebarStyles.bannerContainer} data-aos="fade-up">
      <Image
        src="/images/sidebarbanner.png"
        alt="Group Tours"
        width={400}
        height={600}
        className={sidebarStyles.bannerImage}
      />
      <div className={sidebarStyles.bannerOverlay}>
        <div className={sidebarStyles.exploreBtn} style={{ cursor: "default" }}>
          Explore Group Tours
          <span>
            <Image width={16} height={16} src="/images/button-arrow.png" alt="" />
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────
   Main Listing Component
 ───────────────────────────────*/
const GroupTourListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPackages = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetchGroupTourPackages(page);
      if (response.status === "success" && response.data) {
        setPackages(response.data.packages || []);
        setTotalItems(response.data.pagination?.total || 0);
        setTotalPages(Math.ceil((response.data.pagination?.total || 0) / (response.data.pagination?.limit || 10)));
      }
    } catch (error) {
      console.error("Error fetching group tours:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <div className="tour-listing p-0">
      <Banner
        title="Group Tour Packages"
        subtitle="Travel together, create memories forever"
        imageUrl="/images/cholantours2.webp"
      />

      <style jsx global>{`
        html, body {
          overflow-x: visible !important;
          overflow-y: visible !important;
        }
      `}</style>

      <div className={`listing-inner-wrapper ${styles.listingWrapper}`}>
        <div className="container mx-auto pt-4 pb-5">
          <div className={`row ${styles.stickyRow}`}>
            <div className="col-lg-12">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Group Tour Packages", isCurrent: true },
                ]}
              />
            </div>

            <div className="col-12 col-lg-3">
              <div className={styles.stickySidebar}>
                <GroupTourSidebar />
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <ExpandableText
                title="Group Tour Packages"
                subtitle="Travel together, create memories forever"
                text={ABOUT_TEXT}
                collapsedLines={2}
              />

              {!loading && (
                <div className="showing-count my-3 text-sm">
                  <div className="flex gap-2 fs-6 align-items-lg-center">
                    {`Showing ${start + 1}–${Math.min(start + packages.length, totalItems)} of ${totalItems} packages from `}
                    <h2 className="fs-6 m-0 ms-1">Group Tour Packages</h2>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {packages.map((tour: any) => (
                    <GroupTourCard
                      key={tour.slug}
                      slug={tour.slug}
                      title={tour.title}
                      description={tour.short_description ? tour.short_description.replace(/<[^>]*>/g, "") : ""}
                      rating={tour.rating || 0}
                      cities={tour.cities_count || 0}
                      dates={tour.dates_count || 0} 
                      nights={tour.duration_nights || 0}
                      days={tour.duration_days || 0}
                      price={tour.starting_price?.toString() || "0"}
                      imageUrl={tour.primary_image || "/images/default.jpg"}
                      badges={tour.badges}
                      includes={tour.facilities}
                    />
                  ))}
                  {packages.length === 0 && (
                    <div className="text-center py-5">
                      <p className="fs-5 text-muted">No group tour packages found.</p>
                    </div>
                  )}
                </div>
              )}

              {totalPages > 1 && !loading && (
                <div className="pagination-container mt-4">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                          &laquo;
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                          <button className="page-link" onClick={() => handlePageChange(page)}>
                            {page}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTourListing;

