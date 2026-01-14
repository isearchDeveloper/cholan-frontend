

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { XPublicToken } from "@/app/urls/apiUrls";

interface Location {
  name: string;
  slug: string;
  details?: {
    banner_image?: string;
    banner_image_alt?: string;
  };
}

interface Country {
  name: string;
  slug: string;
  details?: {
    banner_image?: string;
    banner_image_alt?: string;
  };
}

interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  limit?: number;
  page?: number;
}
interface HolidayTabProps {
  ssrIndiaData: any[];
}
const API_URLS: Record<string, string> = {
  india: `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/page/settings/india`,
  srilanka: `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/page/settings/srilanka`,
  world: `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/countries/international`,
};

const ImageComponent = ({ src, alt, href }: any) => (
  <Link href={href || "#"} className="group block">
    <div
      className="h-55 position-relative overflow-hidden rounded-4 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 custom-hover"

    >
      <Image
        src={src || "/images/placeholder.jpg"}
        alt={alt || "Destination image"}
        width={400}
        height={250}
        className="w-100 h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-95"
      />
      <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-400 group-hover:h-2/3" />
    </div>
  </Link>
);

const HolidayTabWithImages: React.FC<HolidayTabProps> = ({ ssrIndiaData }) => {

  const [activeTab, setActiveTab] = useState("india");

  const [data, setData] = useState<(Location | Country)[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
  }, []);
  // Fetch data based on active tab and page
  const fetchData = async (
    tab: string,
    page: number = 1,
    loadMore: boolean = false
  ) => {
    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const url = `${API_URLS[tab]}?page=${page}&limit=6`;
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Public-Token": XPublicToken,
        },
      });

      let newData: (Location | Country)[] = [];

      if (tab === "world") {
        newData = res.data?.data?.countries || [];
      } else {
        newData = res.data?.data?.locations || [];
      }
      // Update pagination info
      setPagination(res.data?.data?.pagination || null);

      if (loadMore && page > 1) {
        // Append new data for load more
        setData((prevData) => [...prevData, ...newData]);
      } else {
        // Replace data for new tab or first load
        setData(newData);
      }

      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching data:", err);
      if (!loadMore) {
        setData([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setData([]);
    fetchData(tab, 1, false);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (pagination && currentPage < Math.ceil(pagination.total / 6)) {
      const nextPage = currentPage + 1;
      fetchData(activeTab, nextPage, true);
    }
  };

  // Check if there are more pages to load - only show if total > 6
  const hasMorePages = () => {
    if (!pagination) return false;

    // Only show load more button if total items are more than 6
    return (
      pagination.total > 6 && currentPage < Math.ceil(pagination.total / 6)
    );
  };

  // Get displayed count text
  const getDisplayedCount = () => {
    if (!pagination) return `${data.length} destinations`;

    const totalDisplayed = Math.min(data.length, pagination.total);
    return `Showing ${totalDisplayed} of ${pagination.total} destinations`;
  };

  // Initial India load
  useEffect(() => {
    fetchData("india", 1, false);
  }, []);

  // AOS init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="container">
      {/* ✅ JS Disabled → Show Static HTML Tabs + India SSR Data */}
      {!jsEnabled ? (
        <div className="row">
          {/* --- Static Tabs --- */}
          <ul className="nav nav-pills justify-content-center mb-4 gap-2">
            <li className="nav-item">
              <span className="nav-link active bg-primary text-white">India</span>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled opacity-50">Sri Lanka</span>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled opacity-50">World</span>
            </li>
          </ul>

          {/* --- Static India Images (SSR) --- */}
          <div className="row g-4">
            {ssrIndiaData?.map((item: any, index: number) => (
              <div className="col-md-4 col-lg-4" key={`${item.slug}-${index}`}>
                <ImageComponent
                  src={item.details?.banner_image || "/images/no-img.webp"}
                  alt={item.details?.banner_image_alt || item.name}
                  href={`/india/${item.slug}`}
                />
                <Link href={`/india/${item.slug}`} className="text-black">
                  <h6 className="mt-4 text-center hover:text-primary">
                    {item.name}
                  </h6>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ✅ JS Enabled → Your Original Code (unchanged) */
        <>
          {data?.length < 1 && !loading ? null : (
            <div className="row">
              <Tabs
                selectedIndex={["india", "srilanka", "world"].indexOf(activeTab)}
                onSelect={(index) => {
                  const tabKey = ["india", "srilanka", "world"][index];
                  handleTabChange(tabKey);
                }}
              >
                <TabList className="nav nav-pills justify-content-center mb-4 gap-2">
                  <Tab
                    className="nav-link"
                    selectedClassName="active bg-primary text-white"
                  >
                    India
                  </Tab>
                  <Tab
                    className="nav-link"
                    selectedClassName="active bg-primary text-white"
                  >
                    Sri Lanka
                  </Tab>
                  <Tab
                    className="nav-link"
                    selectedClassName="active bg-primary text-white"
                  >
                    World
                  </Tab>
                </TabList>

                {["india", "srilanka", "world"].map((tab) => (
                  <TabPanel key={tab}>
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading destinations...</p>
                      </div>
                    ) : (
                      <>
                        <div className="row g-4">
                          {data.map((item: any, index: number) => (
                            <div
                              className="col-md-4 col-lg-4"
                              key={`${item.slug}-${index}`}
                            >
                              <ImageComponent
                                src={
                                  item?.details?.banner_image ||
                                  "/images/no-img.webp"
                                }
                                alt={item?.details?.banner_image_alt || item.name}
                                href={`/${tab === "world" || tab === "srilanka"
                                    ? "international-holidays"
                                    : "india"
                                  }/${item.slug}`}
                              />

                              <Link
                                className="text-black"
                                href={`/${tab === "world" || tab === "srilanka"
                                    ? "international-holidays"
                                    : "india"
                                  }/${item.slug}`}
                              >
                                <h6 className="mt-4 text-center transition-colors duration-300 hover:text-primary">
                                  {item.name}
                                </h6>
                              </Link>
                            </div>
                          ))}
                        </div>

                        {hasMorePages() && (
                          <div className="text-center mt-4">
                            <button
                              onClick={handleLoadMore}
                              disabled={loadingMore}
                              className="btn orange-btn inline-flex items-center gap-2"
                            >
                              {loadingMore ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                  />
                                  Loading...
                                </>
                              ) : (
                                "Load More"
                              )}
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
                          </div>
                        )}

                        {data.length === 0 && !loading && (
                          <div className="text-center py-5">
                            <p className="text-muted">No destinations found.</p>
                          </div>
                        )}
                      </>
                    )}
                  </TabPanel>
                ))}
              </Tabs>
            </div>
          )}
        </>
      )}
    </div>
  );

};

export default HolidayTabWithImages;
