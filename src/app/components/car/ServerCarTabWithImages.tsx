import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
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

const ImageComponent = ({ src, alt }: any) => (
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

const ServerCarTabWithImages: React.FC = async () => {
  // API URL
  const API1_URL = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/page/settings/car?limit=6`;

  // Fetch initial data (categories and first set of cars) on server
  const response = await fetch(API1_URL, {
    headers: {
      "X-Public-Token": XPublicToken,
    },
    cache: 'no-store', // Ensure fresh data on each request
  });

  let categories: Category[] = [];
  let cars: Car[] = [];
  let error = "";

  if (!response.ok) {
    error = "Failed to fetch data";
  } else {
    const data: Api1Response = await response.json();

    if (data.status !== "success") {
      error = "Failed to fetch data";
    } else {
      categories = data.data.categories;
      cars = data.data.cars;
    }
  }

  if (error) {
    return (
      <div className="container pt-5">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-5">
      <div className="row">
        <Tabs selectedIndex={0}>
          <TabList className="nav nav-pills justify-content-center mb-4 gap-2">
            <Tab
              className="nav-link active bg-primary text-white"
            >
              All
            </Tab>
            {categories.map((category: Category) => (
              <Tab
                key={category.slug}
                className="nav-link"
              >
                {category.name}
              </Tab>
            ))}
          </TabList>
          {/* All Cars Panel */}
          <TabPanel>
            <div className="row g-4">
              {cars.map((car: Car) => (
                <div className="col-md-4" key={car.slug}>
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
              {cars.length === 0 && (
                <div className="col-12 text-center py-5">
                  <p>No cars found.</p>
                </div>
              )}
            </div>
          </TabPanel>
          {/* Category-wise Panels - Empty since only first tab loaded */}
          {categories.map((category: Category) => (
            <TabPanel key={category.slug}>
              <div className="row g-4">
                <div className="col-12 text-center py-5">
                  <p>No cars loaded for this category.</p>
                </div>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ServerCarTabWithImages;