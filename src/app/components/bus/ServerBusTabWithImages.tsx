import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";

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

interface Api1Response {
  status: string;
  message: string;
  data: {
    categories: Category[];
    buses: Car[];
  };
}

interface CarsApiResponse {
  status: string;
  message: string;
  data: {
    bus: Car[];
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

const ClientBusTabWithImages: React.FC<{
  categories: Category[];
  data: Record<string, Car[]>;
}> = ({ categories, data }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [displayCars, setDisplayCars] = useState<Car[]>(data.all || []);

  // AOS init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleTabChange = (tabSlug: string) => {
    setActiveTab(tabSlug);
    setDisplayCars(data[tabSlug] || []);
  };

  const getSelectedIndex = () => {
    if (activeTab === "all") return 0;
    const index = categories.findIndex(cat => cat.slug === activeTab);
    return index !== -1 ? index + 1 : 0;
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <Tabs
          selectedIndex={getSelectedIndex()}
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

          {/* All Cars Panel */}
          <TabPanel>
            <div className="row g-4">
              {displayCars.map((car: Car) => (
                <div className="col-md-4" key={`${car.slug}-all`}>
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
              
              {displayCars.length === 0 && (
                <div className="col-12 text-center py-5">
                  <p>No buses found.</p>
                </div>
              )}
            </div>
          </TabPanel>

          {/* Category-wise Panels */}
          {categories.map((category: Category) => (
            <TabPanel key={category.slug}>
              <div className="row g-4">
                {displayCars.map((car: Car) => (
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
                
                {displayCars.length === 0 && (
                  <div className="col-12 text-center py-5">
                    <p>No buses found in {category.name} category.</p>
                  </div>
                )}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

async function fetchAllCars(
  slug: string,
  baseUrl: string,
  axiosConfig: any
): Promise<Car[]> {
  const cars: Car[] = [];
  let page = 1;
  let hasMore = true;
  const limit = 20;

  while (hasMore) {
    let url = baseUrl;
    if (slug !== "all") {
      url += `?category=${slug}&page=${page}&limit=${limit}`;
    } else {
      url += `?page=${page}&limit=${limit}`;
    }

    const response = await axios.get<CarsApiResponse>(url, axiosConfig);
    
    if (response.data.status === "success") {
      const newCars = response.data.data.bus || [];
      cars.push(...newCars);
      hasMore = newCars.length === limit;
    } else {
      hasMore = false;
    }

    page++;
  }

  return cars;
}

const ServerBusTabWithImages = async () => {
  // API URLs
  const DEV_URL = process.env.NEXT_PUBLIC_UAT_URL;
  const API1_URL = `${DEV_URL}/api/v1/page/settings/bus`;
  const API2_URL = `${DEV_URL}/api/v1/buses`;
  const API3_URL = `${DEV_URL}/api/v1/buses`;

  // Axios configuration with headers
  const axiosConfig = {
    headers: {
      "X-Public-Token": XPublicToken,
    },
  };

  // Fetch categories
  const response1 = await axios.get<Api1Response>(API1_URL, axiosConfig);
  const categories: Category[] = response1.data.status === "success" 
    ? response1.data.data.categories 
    : [];

  // Fetch all cars for "all"
  const allCars = await fetchAllCars("all", API2_URL, axiosConfig);

  // Fetch all cars for each category
  const categoryData: Record<string, Car[]> = {};
  for (const cat of categories) {
    categoryData[cat.slug] = await fetchAllCars(cat.slug, API3_URL, axiosConfig);
  }

  const initialData = { all: allCars, ...categoryData };

  if (categories.length === 0) {
    return (
      <div className="container pt-5">
        <div className="alert alert-danger text-center" role="alert">
          No categories found.
        </div>
      </div>
    );
  }

  return <ClientBusTabWithImages categories={categories} data={initialData} />;
};

export default ServerBusTabWithImages;