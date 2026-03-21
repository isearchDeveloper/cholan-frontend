"use client";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { XPublicToken } from "../../urls/apiUrls";

const ImageComponent = ({ src, alt, href }: any) => (
  <Link href={href || "#"} className="group block">
    <div className="h-55 position-relative overflow-hidden rounded-4 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 custom-hover">
      <Image
        src={src || "/images/no-img.webp"}
        alt={alt || "/images/no-img.webp"}
        width={400}
        height={250}
        className="w-100 h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-95"
      />
      <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-400 group-hover:h-2/3" />
    </div>
  </Link>
);

const TabWithImages: React.FC<any> = ({
  internationalData,
  noJsCountries,
}: any) => {
  const [countryData, setCountryData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [continentSlug, setContinentSlug] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  
  // Use ref to track the current page and prevent race conditions
  const currentPageRef = useRef(1);
  const isFetchingRef = useRef(false);

  // AOS init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    fetchCountries(continentSlug, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continentSlug, page]);

  const fetchCountries = async (slug: string | null, pageNum: number) => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) return;
    
    try {
      isFetchingRef.current = true;
      setIsLoading(true);
      currentPageRef.current = pageNum;

      const url = slug
        ? `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/countries/international?continent=${slug}&page=${pageNum}`
        : `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/countries/international?page=${pageNum}`;

      const response = await axios.get(url, {
        headers: {
          "X-Public-Token": XPublicToken,
        },
      });

      const newData = response.data.data;
      const newCountries = newData.countries || [];

      setCountryData((prev: any[]) =>
        pageNum === 1 ? newCountries : [...prev, ...newCountries]
      );
      setPagination(newData.pagination || {});
    } catch (err) {
      console.error("Failed to fetch:", err);
      // Don't clear data on error, keep existing data
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
        isFetchingRef.current = false;
      }, 200);
    }
  };

  const handleTabSelect = (index: number) => {
    setSelectedIndex(index);
    setPage(1);
    currentPageRef.current = 1;
    setIsInitialLoad(true);

    const slug = index === 0 ? null : sortedContinents[index - 1]?.slug;
    setContinentSlug(slug);
  };

  const handleLoadMore = () => {
    if (!isLoading && !isFetchingRef.current) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  const sortedContinents = [...(internationalData.continents || [])].sort(
    (a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );

  return (
    <div className="container pt-4 pb-5">
      <h2 className="mb-4 text-center fs-3">
          International Holidays by Destination
        </h2>

      <div className="row">
        <div className="js-enabled">
          <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
            <TabList className="nav nav-pills justify-content-center mb-4 gap-2">
              <Tab
                className="nav-link"
                selectedClassName="active bg-primary text-white"
              >
                All
              </Tab>
              {sortedContinents.map((continent: any) => (
                <Tab
                  key={continent.slug}
                  className="nav-link"
                  selectedClassName="active bg-primary text-white"
                >
                  {continent.name}
                </Tab>
              ))}
            </TabList>

            {/* Panels */}
            {[null, ...sortedContinents.map((c: any) => c.slug)].map(
              (slug, index) => (
                <TabPanel key={slug || "all"}>
                  {selectedIndex === index && (
                    <>
                      {/* Show loading only on initial load, not during "Load More" */}
                      {isInitialLoad && isLoading ? (
                        <div className="text-center w-100 py-4 text-gray-500">
                          Loading...
                        </div>
                      ) : (
                        <>
                          <div className="row g-4">
                            {countryData?.length > 0 ? (
                              [...countryData]
                                .sort((a, b) =>
                                  a.name.localeCompare(b.name, "en", {
                                    sensitivity: "base",
                                  })
                                )
                                .map((data: any) => (
                                  <div className="col-lg-4" key={data.slug}>
                                    <ImageComponent
                                      src={
                                        data?.details?.banner_image ||
                                        "/images/global_themes_banner.webp"
                                      }
                                      alt={data?.details?.banner_image_alt}
                                      href={`/international-holidays/${
                                        data.slug == "sri-lanka-tour-packages"
                                          ? "sri-lanka-tour-packages"
                                          : data.slug
                                      }`}
                                    />
                                    <Link
                                      className="text-black"
                                      href={`/international-holidays/${
                                        data.slug == "sri-lanka-tour-packages"
                                          ? "sri-lanka-tour-packages"
                                          : data.slug
                                      }`}
                                    >
                                      <h6 className="mt-4 text-center transition-colors duration-300">
                                        {data.name}
                                      </h6>
                                    </Link>
                                  </div>
                                ))
                            ) : (
                              <div className="text-center w-100 py-4 text-gray-500">
                                No destinations found.
                              </div>
                            )}
                          </div>

                          {/* Load More with loading indicator */}
                          {!isInitialLoad && pagination?.total > 0 && countryData.length < pagination.total && (
                            <div className="text-center mt-4">
                              <button
                                onClick={handleLoadMore}
                                disabled={isLoading || isFetchingRef.current}
                                className="btn orange-btn inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isLoading ? (
                                  "Loading..."
                                ) : (
                                  <>
                                    Load More
                                    <span>
                                      <Image
                                        width={23}
                                        height={23}
                                        sizes="100vw"
                                        src="/images/button-arrow.png"
                                        alt=""
                                      />
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </TabPanel>
              )
            )}
          </Tabs>
        </div>
        {/* ✅ NO-JS fallback */}
        <noscript>
          <div className="no-js-tablist nav nav-pills justify-content-center gap-2 mb-4">
            <div className="no-js-tab nav-link active">All</div>
            {internationalData.continents.map((continent: any) => (
              <div key={continent.slug} className="no-js-tab nav-link">
                {continent.name}
              </div>
            ))}
          </div>

          <div className="row g-4 mt-4">
            {noJsCountries?.length > 0 ? (
              [...noJsCountries]
                .sort((a, b) =>
                  a.name.localeCompare(b.name, "en", { sensitivity: "base" })
                )
                .map((data: any) => (
                  <div className="col-lg-4" key={data.slug}>
                    <ImageComponent
                      src={data?.details?.banner_image || "/images/no-img.webp"}
                      alt={data?.details?.banner_image_alt}
                      href={`/international-holidays/${data.slug}`}
                    />

                    <Link href={`/international-holidays/${data.slug}`}>
                      <h6 className="mt-3 text-center">{data.name}</h6>
                    </Link>
                  </div>
                ))
            ) : (
              <div className="text-center w-100 py-4 text-gray-500">
                No destinations found.
              </div>
            )}
          </div>
        </noscript>
      </div>
    </div>
  );
};

export default TabWithImages;

