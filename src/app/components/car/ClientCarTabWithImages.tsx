"use client";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {  XPublicToken } from "@/app/urls/apiUrls";

// Types for API responses
interface Category {
  name: string;
  slug: string;
}

interface Car {
  title: string;
  slug: string;
  type: string;
  seats: number;
  primary_image: string;
  primary_image_alt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface Api1Response {
  status: string;
  message: string;
  data: {
    categories: Category[];
    cars: Car[];
    pagination: Pagination;
  };
}

interface CarsApiResponse {
  status: string;
  message: string;
  data: {
    cars: Car[];
    pagination: Pagination;
  };
}

const ImageComponent = ({ src, alt, href }: any) => (
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

const ClientCarTabWithImages: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 6
  });
  const [error, setError] = useState<string>("");

  // API URLs
  const API1_URL = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/page/settings/car`;
  const API2_URL = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cars`;
  const API3_URL = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cars`;

  // Axios configuration with headers
  const axiosConfig = {
    headers: {
      "X-Public-Token": XPublicToken,
    },
  };

  // AOS init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Fetch initial data (categories and first set of cars)
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Include limit parameter in the initial API call
      const response = await axios.get<Api1Response>(`${API1_URL}?limit=6`, axiosConfig);
      
      if (response.data.status === "success") {
        setCategories(response.data.data.categories);
        
        // Set initial cars from API1 response
        setCars(response.data.data.cars);
        setPagination(response.data.data.pagination);
      }
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Error fetching initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarsByPage = async (page: number = 1, categorySlug: string = "all") => {
    try {
      let url = "";
      
      if (categorySlug !== "all") {
        // Include limit parameter for category-specific calls
        url = `${API3_URL}?category=${categorySlug}&page=${page}&limit=6`;
      } else {
        // Include limit parameter for "all" category calls
        url = `${API2_URL}?page=${page}&limit=6`;
      }

      const response = await axios.get<CarsApiResponse>(url, axiosConfig);
      
      if (response.data.status === "success") {
        return {
          cars: response.data.data.cars,
          pagination: response.data.data.pagination
        };
      }
      return { cars: [], pagination: { total: 0, page: 1, limit: 6 } };
    } catch (err: any) {
      console.error("Error fetching cars:", err);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        setError("Authentication failed. Please check your token.");
      } else if (err.response?.status === 403) {
        setError("Access denied. Invalid token.");
      } else {
        setError("Failed to fetch cars data");
      }
      
      return { cars: [], pagination: { total: 0, page: 1, limit: 6 } };
    }
  };

  const handleTabChange = async (tabSlug: string) => {
    setActiveTab(tabSlug);
    setLoading(true);
    
    try {
      const result = await fetchCarsByPage(1, tabSlug === "all" ? "all" : tabSlug);
      setCars(result.cars);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Error changing tab:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadMoreLoading) return;
    
    const nextPage = pagination.page + 1;
    
    // Check if we have more data to load
    if (cars.length >= pagination.total) return;
    
    setLoadMoreLoading(true);
    
    try {
      const result = await fetchCarsByPage(
        nextPage, 
        activeTab === "all" ? "all" : activeTab
      );
      
      // Append new cars to existing ones
      setCars(prevCars => [...prevCars, ...result.cars]);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Error loading more cars:", err);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  // Check if load more button should be shown
  const shouldShowLoadMore = () => {
    return cars.length < pagination.total && pagination.limit <= cars.length;
  };

  // Retry function for error state
  const handleRetry = () => {
    setError("");
    fetchInitialData();
  };

  if (error) {
    return (
      <div className="container pt-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
          <div className="mt-3">
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handleRetry}
            >
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
          selectedIndex={activeTab === "all" ? 0 : categories.findIndex(cat => cat.slug === activeTab) + 1}
          onSelect={(index) => {
            if (index === 0) {
              handleTabChange("all");
            } else {
              handleTabChange(categories[index - 1].slug);
            }
          }}
        >
          <TabList className="nav nav-pills justify-content-center mb-4 gap-2">
            <Tab
              className="nav-link"
              selectedClassName="active bg-primary text-white"
            >
              All
            </Tab>
            {categories.map((category: Category) => (
              <Tab
                key={category.slug}
                className="nav-link"
                selectedClassName="active bg-primary text-white"
              >
                {category.name}
              </Tab>
            ))}
          </TabList>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border color-blue" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading cars...</p>
            </div>
          )}

          {/* All Cars Panel */}
          <TabPanel>
            {!loading && (
              <>
                <div className="row g-4">
                  {cars.map((car: Car) => (
                    <div className="col-md-4" key={`${car.slug}-${activeTab}`}>
                      <ImageComponent
                        src={car.primary_image}
                        alt={car.primary_image_alt || car.title}
                      />
                      <div className="text-black">
                        <h6 className="mt-4 text-center transition-colors duration-300">
                          {car.title}
                        </h6>
                      </div>
                    </div>
                  ))}
                  
                  {cars.length === 0 && !loading && (
                    <div className="col-12 text-center py-5">
                      <p>No cars found.</p>
                    </div>
                  )}
                </div>
                
                {shouldShowLoadMore() && (
                  <div className="text-center mt-4">
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
                          <span>
                            <Image
                              width={23}
                              height={23}
                              sizes="100vw"
                              src="/images/button-arrow.png"
                              alt="arrow"
                            />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </TabPanel>

          {/* Category-wise Panels */}
          {categories.map((category: Category) => (
            <TabPanel key={category.slug}>
              {!loading && (
                <>
                  <div className="row g-4">
                    {cars.map((car: Car) => (
                      <div className="col-md-4" key={`${car.slug}-${category.slug}`}>
                        <ImageComponent
                          src={car.primary_image}
                          alt={car.primary_image_alt || car.title}
                        />
                        <div className="text-black">
                          <h6 className="mt-4 text-center transition-colors duration-300">
                            {car.title}
                          </h6>
                        </div>
                      </div>
                    ))}
                    
                    {cars.length === 0 && !loading && (
                      <div className="col-12 text-center py-5">
                        <p>No cars found in {category.name} category.</p>
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
                            <span>
                              <Image
                                width={23}
                                height={23}
                                sizes="100vw"
                                src="/images/button-arrow.png"
                                alt="arrow"
                              />
                            </span>
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

export default ClientCarTabWithImages;