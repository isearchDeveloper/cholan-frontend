"use client";
 
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";
 
interface ImageComponentProps {
  src: string;
  alt: string;
  href: string;
}
 
function sanitizeAndTrimHtml(html?: string, words = 15) {
  if (!html) return "";
  let text = html.replace(/<[^>]+>/g, " ");
  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    text = textarea.value;
  }
  text = text.replace(/\s+/g, " ").trim();
  const parts = text.split(" ");
  return parts.length > words
    ? parts.slice(0, words).join(" ") + "..."
    : text;
}
 
function truncateTitle(text: string, wordLimit = 8) {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}
 
const amenitiesData = [
  { name: "flight", img: "/images/flight.png", label: "Flights" },
  { name: "transport", img: "/images/bus.png", label: "Transfers" },
  { name: "breakfast", img: "/images/food.png", label: "Breakfast" },
  { name: "hotel", img: "/hotel.svg", label: "Hotel" },
  { name: "train", img: "/train.png", label: "Train" },
  { name: "sightseeing", img: "/landscape.svg", label: "Sightseeing" },
  { name: "meal", img: "/meal.svg", label: "Meal" },
  { name: "restaurant", img: "/restaurant.svg", label: "Restaurant" },
  { name: "bar", img: "/pub.svg", label: "Bar" },
  { name: "wifi", img: "/wifi.svg", label: "Wi-Fi" },
];
 
const ImageComponent = ({ src, alt, href }: ImageComponentProps) => (
  <Link href={href} className="group block">
    <div
      className="h-70 custom-hover position-relative overflow-hidden rounded-4 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <Image
        src={src || "/images/no-img.webp"}
        alt={alt}
        width={400}
        height={600}
        className="w-100 h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-95"
      />
      <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-400 group-hover:h-2/3" />
    </div>
  </Link>
);
 
const Tourpackages: React.FC<any> = ({
  internationalData,
  noJsTourPackages,
}: any) => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);
 
  const [packagedata, setPackagedata] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState(0);
 
  const fetchPackages = async (slug: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/category/${slug}?limit=50&type=2`;
      const response = await axios.get(url, {
        headers: { "X-Public-Token": XPublicToken },
      });
 
      setPackagedata((prev: any) => ({
        ...prev,
        [slug]: response.data.data,
      }));
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };
 
  useEffect(() => {
    const slug = internationalData.categories[selectedIndex].slug;
    if (!packagedata[slug]) {
      fetchPackages(slug);
    }
  }, [selectedIndex]);
 
  return (
    <div className="container">
      {/* ✅ Wrap JS UI in .js-enabled */}
      <div className="row js-enabled">
        <h2 className="mb-4 text-center fs-3">
          International Tour Packages by Interest
        </h2>
 
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <TabList className="nav nav-pills justify-content-center mb-4 gap-2">
            {internationalData.categories.map((data: any) => (
              <Tab
                key={data.slug}
                className="nav-link"
                selectedClassName="active bg-primary text-white"
              >
                {data.name}
              </Tab>
            ))}
          </TabList>
 
          {/* Render TabPanel for each category */}
          {internationalData.categories.map((data: any) => {
            const dataForSlug = packagedata[data.slug];
 
            return (
              <TabPanel key={data.slug}>
                {dataForSlug ? (
                  <Swiper
                    spaceBetween={15}
                    slidesPerView={6}
                    navigation={{enabled: true}}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 4 },
                      1280: { slidesPerView: 4 },
                    }}
                    className="india-international-packages-slider"
                  >
                    {dataForSlug.packages?.map((pkg: any) => {
                      return (
                        <SwiperSlide key={pkg.slug}>
                          <a href={`/packages/${pkg.slug}`}>
                            <div className="ts-holiday-card">
                              <img src={pkg.primary_image || "/images/no-img.webp"} />
                              <div className="ts-holiday-content">
                                <h3 className="ts-holiday-title">{truncateTitle(pkg.title, 8)}</h3>
                                <div className="ts-holiday-duration">
                                  <span>
                                    <Image
                                      width={16}
                                      height={16}
                                      sizes="100vw"
                                      src="/images/moon.png"
                                      alt=""
                                    />
                                  </span>
                                  {pkg.details?.duration_nights ?? 0}{" "}
                                  {(pkg.details?.duration_nights ?? 0) < 2 ? "Night" : "Nights"}{" "}
                                  / {pkg.details?.duration_days ?? 0}{" "}
                                  {(pkg.details?.duration_days ?? 0) < 2 ? "Day" : "Days"}</div>
                                <a href={`/packages/${pkg.slug}`} className="ts-holiday-btn">Explore More</a>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                ) : (
                  <p>Loading packages...</p>
                )}
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
 
      {/* ✅ NOSCRIPT FALLBACK */}
      <noscript>
        <style>{`.js-enabled { display: none !important; }`}</style>
 
        <div className="row">
          <h2 className="mb-4 text-center fs-3">
            International Tour Packages by Interest
          </h2>
 
          {/* ✅ SAME TAB DESIGN AS JS – STATIC ONLY */}
          <div className="no-js-tablist nav nav-pills justify-content-center gap-2">
            {internationalData.categories.map((cat: any, index: number) => (
              <div
                key={cat.slug}
                className={`no-js-tab nav-link ${index === 0 ? "active" : ""}`}
              >
                {cat.name}
              </div>
            ))}
          </div>
 
          {/* ✅ 6 ITEMS – SAME CARD STRUCTURE */}
          <div className="row g-4 m-0">
            {noJsTourPackages?.length > 0 ? (
              noJsTourPackages.slice(0, 6).map((pkg: any) => (
                <div
                  className="  col-12
            col-sm-6
            col-md-4
            col-lg-3
            col-xl-2
            no-js-slide"
                  key={pkg.slug}
                >
                  <a href={`/packages/${pkg.slug}`} className="group block">
                    <div className="img-box shadow-md h-70 custom-hover position-relative overflow-hidden rounded-4 shadow-md ">
                      <img
                        className="w-100 h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-95"
                        src={pkg.primary_image || "/images/no-img.webp"}
                        alt={pkg.primary_image_alt || pkg.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </a>
 
                  <a className="text-black" href={`/packages/${pkg.slug}`}>
                    <h6 className="mt-3 text-center">
                      {pkg.location?.name || pkg.title}
                    </h6>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center w-100 py-4 text-gray-500">
                No packages found.
              </div>
            )}
          </div>
        </div>
      </noscript>
    </div>
  );
};
 
export default Tourpackages;