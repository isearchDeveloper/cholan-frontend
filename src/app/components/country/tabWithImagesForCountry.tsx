
"use client";

import { Tabs, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";

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

const ImageComponentCountry: React.FC<any> = ({ slug, initialData }: any) => {

  const [countryData, setCountryData] = useState<any>(initialData);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // SSR determines first page list
  const [hasMore, setHasMore] = useState(
    initialData?.pagination?.total > initialData?.pagination?.per_page
  );

  // JS Enabled flag
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true); // JS ON after hydration
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Fetch with JS only
  const fetchData = async (page: number) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/page/settings/${slug}?page=${page}`,
        {
          headers: {
            "X-Public-Token": XPublicToken,
          },
        }
      );
      if (response.data.status === "success") {
        if (page === 1) {
          setCountryData(response.data.data);
        } else {
          setCountryData((prev: any) => ({
            ...prev,
            locations: [...prev.locations, ...response.data.data.locations],
            pagination: response.data.data.pagination,
          }));
        }

        const { current_page, per_page, total } =
          response.data.data.pagination;
        const remainingItems = total - current_page * per_page;
        setHasMore(remainingItems > 0);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const next = currentPage + 1;
    setCurrentPage(next);
    fetchData(next);
  };

  // Base URL
  const baseSlug = initialData?.details?.slug?.replace("-tour-packages", "");

  return (
    <div className="container pt-0 pb-5">
      <div className="common-header-center">
          <h2 className="fs-3">India Holiday Packages By City and States</h2>
        </div>

      {/* ✅ NoScript fallback – static SSR HTML only */}
      <noscript>
        <div className="row g-4">
          {[...(initialData.locations || [])]
            // ✅ Sort alphabetically by name (case-insensitive)
            .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
            .map((loc: any) => (
              <div className="col-lg-4" key={loc.slug}>
                <a href={`/${baseSlug}/${loc.slug}`}>
                  <div className="h-64 position-relative overflow-hidden rounded-4 shadow-md custom-hover">
                    <img
                      src={loc?.details?.banner_image || "/images/no-img.webp"}
                      alt={loc?.details?.banner_image_alt || "Image"}
                      className="w-100 h-full object-cover"
                    />
                  </div>
                </a>
                <a className="text-black" href={`/${baseSlug}/${loc.slug}`}>
                  <h6 className="mt-4 text-center text-capitalize">{loc.name}</h6>
                </a>
              </div>
            ))}
        </div>
      </noscript>

      {/* ✅ JS enabled → show Tabs */}
      {jsEnabled && (
        <div className="row">
          <Tabs>
            <TabPanel>
              <div className="row g-4">
                {/* ✅ Sort locations alphabetically (case-insensitive) */}
                {[...(countryData.locations || [])]
                  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
                  .map((data: any) => (
                    <div className="col-lg-4" key={data.slug}>
                      <ImageComponent
                        src={data?.details?.banner_image}
                        alt={data?.details?.banner_image_alt}
                        href={`/${baseSlug}/${data.slug}`}
                      />
                      <Link href={`/${baseSlug}/${data.slug}`} className="text-black">
                        <h6 className="mt-4 text-center text-capitalize">
                          {data.name}
                        </h6>
                      </Link>
                    </div>
                  ))}
              </div>

              {hasMore && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="btn orange-btn inline-flex items-center gap-2"
                  >
                    {loading ? "Loading..." : "Load More"}
                    <span>
                      <Image width={23} height={23} src="/images/button-arrow.png" alt="" />
                    </span>
                  </button>
                </div>
              )}

            </TabPanel>
          </Tabs>

        </div>
      )}

      {/* ✅ JS disabled → Tabs removed, handled already by <noscript> */}


    </div>
  );
};

export default ImageComponentCountry;


