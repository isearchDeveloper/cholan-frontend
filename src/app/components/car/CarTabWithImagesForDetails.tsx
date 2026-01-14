"use client";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {  XPublicToken } from "@/app/urls/apiUrls";

interface Car {
  title: string;
  slug: string;
  type: string;
  seats: number;
  primary_image: string;
  primary_image_alt?: string;
}

interface Category {
  name: string;
  slug: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data: {
    route: any;
    categories: Category[];
    cars: Car[];
    routes: any[];
    pagination: Pagination;
  };
}

const ImageComponent = ({ src, alt }: { src: string; alt: string }) => (
  <div className="group block">
    <div
      className="h-56 position-relative overflow-hidden rounded-4 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 custom-hover"
   
    >
      <Image
        src={src || "/images/no-img.webp"}
        alt={alt}
        width={400}
        height={250}
        className="w-100 h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-95"
      />
      <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-400 group-hover:h-2/3" />
    </div>
  </div>
);

const CarTabWithImagesDetails: React.FC<{ slug: string }> = ({ slug }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 6 });
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const axiosConfig = {
    headers: {
      "X-Public-Token": XPublicToken,
    },
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCarsPage("all", 1, true);
  }, [slug]);

  const fetchCarsPage = async (categorySlug: string, page: number, replace: boolean) => {
    try {
      if (replace) {
        setLoading(true);
      } else {
        setLoadMoreLoading(true);
      }

      let url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/route/cars?route=${slug}&page=${page}&limit=6`;
      if (categorySlug !== "all") {
        url += `&category=${categorySlug}`;
      }

      const resp = await axios.get<ApiResponse>(url, axiosConfig);

      if (resp.data.status === "success") {
        const { categories: apiCategories, cars: fetchedCars, pagination: pag } = resp.data.data;

        setCategories(apiCategories);

        if (replace) {
          setCars(fetchedCars);
        } else {
          setCars((prev) => [...prev, ...fetchedCars]);
        }

        setPagination(pag);
      } else {
        setError("Failed to load cars");
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
      setError("Failed to fetch cars");
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const handleTabChange = (categorySlug: string) => {
    setActiveTab(categorySlug);
    setPagination({ total: 0, page: 1, limit: 6 });
    fetchCarsPage(categorySlug, 1, true);
  };

  const handleLoadMore = () => {
    if (loadMoreLoading || cars.length >= pagination.total) return;

    const nextPage = pagination.page + 1;
    fetchCarsPage(activeTab, nextPage, false);
    setPagination((prev) => ({ ...prev, page: nextPage }));
  };

  const shouldShowLoadMore = () => cars.length < pagination.total;

  const handleRetry = () => {
    setError("");
    fetchCarsPage(activeTab, 1, true);
  };

  if (error) {
    return (
      <div className="container pt-5">
        <div className="alert alert-danger text-center">
          {error}
          <div className="mt-3">
            <button className="btn btn-primary btn-sm" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-5">
      <div className="row">
        <Tabs
          selectedIndex={
            activeTab === "all" ? 0 : categories.findIndex((c) => c.slug === activeTab) + 1
          }
          onSelect={(index) => {
            const newSlug = index === 0 ? "all" : categories[index - 1].slug;
            handleTabChange(newSlug);
          }}
        >
          <TabList className="nav nav-pills justify-content-center mb-4 gap-2">
            <Tab className="nav-link" selectedClassName="active bg-primary text-white">
              All
            </Tab>
            {categories.map((cat) => (
              <Tab
                key={cat.slug}
                className="nav-link"
                selectedClassName="active bg-primary text-white"
              >
                {cat.name}
              </Tab>
            ))}
          </TabList>

          {[{ name: "All", slug: "all" }, ...categories].map((cat) => (
            <TabPanel key={cat.slug}>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border color-blue" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading cars...</p>
                </div>
              ) : (
                <>
                  <div className="row g-4">
                    {cars && cars.length > 0 ? (
                      cars.map((car) => (
                        <div className="col-md-4" key={car.slug}>
                          <ImageComponent
                            src={car.primary_image}
                            alt={car.primary_image_alt || car.title}
                          />
                          <div className="text-black text-center mt-2">
                            <h6>{car.title}</h6>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center py-5">
                        {/* <p>No cars found in {cat.name} category.</p> */}
                        <p>No cars found.</p>
                      </div>
                    )}
                  </div>

                  {shouldShowLoadMore() && (
                    <div className="text-center mt-5">
                      <button
                        className="btn orange-btn inline-flex items-center gap-2"
                        onClick={handleLoadMore}
                        disabled={loadMoreLoading}
                      >
                        {loadMoreLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Loading...
                          </>
                        ) : (
                          <>
                            Load More
                            <Image
                              width={23}
                              height={23}
                              sizes="100vw"
                              src="/images/button-arrow.png"
                              alt="arrow"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CarTabWithImagesDetails;
