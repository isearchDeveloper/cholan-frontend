"use client";
import Banner from "@/app/components/common/banner";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ExpandableText from "@/app/components/common/ExpandableText";
import NewsForm from "@/app/components/news-letter/NewsForm";
import PlacesToVisit from "@/app/components/city/PlacesToVisit";
import ToursitAttraction from "@/app/components/city/ToursitAttraction";
import ReviewsWidget from "@/app/components/ReviewsWidget";
import LogoSlider from "@/app/components/home/LogoSlider";
import ThingsToDo from "@/app/components/city/ThingsToDo";
import AboutSection from "@/app/components/home/AboutSection";
import PopularPackages from "@/app/components/city/PopularPackages";
import CityBanner from "@/app/components/city/CityBanner";
import CityExpandableBanner from "@/app/components/city/CityExpandableBanner";

export default function CityIntroPage({
  slug,
  country,
  cityData,
}: {
  slug: string;
  country: "india" | "international-holidays";
  cityData: any | null;
}) {
  // STATIC TEMP DATA (you can replace later when backend is ready)
  //   const cityName = slug.replace(/-/g, " ").toUpperCase();
  console.log(cityData);
  const cityName =
    cityData?.title ||
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const overview =
    cityData?.city?.overview ||
    `${cityName} is a beautiful destination with rich culture and attractions.`;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: country === "india" ? "India" : "International Holidays",
      href: country === "india" ? "/india" : "/international-holidays",
    },
    { label: cityName, isCurrent: true },
  ];

  const bannerData = {
    title: cityData?.city?.title,
    subtitle: cityData?.city?.sub_title,
    imageUrl: cityData?.city?.banner_img
      ? `https://cdn.cholantours.com/${cityData.city.banner_img.replace(/^\/+/, "")}`
      : "/images/banner.webp",
  };

  // const aboutData = `
  //   ${cityName} is a beautiful destination with rich culture, historical places,
  //   natural beauty, and amazing food. This is static content for now.
  //   Replace it later with backend API data.
  // `;

  const faqData = [
    { question: `Why visit ${cityName}?`, answer: "Because it's beautiful!" },
    { question: `Best time to visit ${cityName}?`, answer: "October to March" },
  ];

  const staticPlacesToVisit = [
    {
      title: "Chinese Fishing Nets in Kochi",
      subtitle: "The huge cantilevered Chinese fishing nets that droop",
      image: "/images/tour/dubai.jpg",
    },
    {
      title: "Houseboat Cruise in Alleppey",
      subtitle: "Experience tour backwaters in a traditional houseboat",
      image: "/images/tour/city.webp",
    },
    {
      title: "Rolling Plantations in Munnar",
      subtitle: "Endless green tea plantations covering the hills",
      image: "/images/tour/dubai.jpg",
    },
    {
      title: "Thekkady’s Periyar National Park",
      subtitle: "Jungle safari and wildlife spotting in Thekkady",
      image: "/images/tour/tour-1.jpg",
    },

    {
      title: "Rolling Plantations in Munnar",
      subtitle: "Endless green tea plantations covering the hills",
      image: "/images/tour/tour-2.jpg",
    },
    {
      title: "Thekkady’s Periyar National Park",
      subtitle: "Jungle safari and wildlife spotting in Thekkady",
      image: "/images/tour/dubai.jpg",
    },
  ];
  // Place To visit data Dynamic
  const placesToVisit = 
   cityData?.city?.visit?.length > 0 ?cityData.city.visit.map((item: any) => ({
        title: item.title,
        subtitle: item.details,
        image: item.banner_image
          ? `https://cdn.cholantours.com/${item.banner_image}`
          : "/images/tour/default.webp",
      }))
    : staticPlacesToVisit;
  


  const StaticThingsToDoData = [
    { title: "Ayurvedic Massage", image: "/images/tour/backwaters.png" },
    { title: "Kathakali Dance", image: "/images/tour/elephant.png" },
    { title: "Spice Plantation", image: "/images/tour/spa.png" },
    { title: "Canoeing", image: "/images/tour/tea.png" },
    { title: "Ayurvedic Massage", image: "/images/tour/backwaters.png" },
    { title: "Kathakali Dance", image: "/images/tour/elephant.png" },
    { title: "Spice Plantation", image: "/images/tour/spa.png" },
    { title: "Canoeing", image: "/images/tour/tea.png" },
  ];
// Things to do Dynamic
  const thingsToDoData = cityData?.city?.things?.length > 0 ?
  cityData?.city?.things.map((items:any) => ({
              title:items.title,
              subtitle:items.details,
              image: items.banner_image
          ? `https://cdn.cholantours.com/${items.banner_image}`
          : "/images/tour/default.webp",
  })):StaticThingsToDoData;

// Tourist Attraction Place

const TouristAttractionPlace = cityData?.city?.attractions?.length > 0 ?
       cityData?.city?.attractions.map((items:any)=>({
        title: items.title,
        subtitle: items.details,
        image: items.banner_image
          ? `https://cdn.cholantours.com/${items.banner_image}`
          : "/images/tour/default.webp",
       })):StaticThingsToDoData;

  return (
    <div className="city-intro-page">
      {/* <Banner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        imageUrl={bannerData.imageUrl}
      /> */}
      <CityBanner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        imageUrl={bannerData.imageUrl}
      />

      <div className="container py-5">
        <Breadcrumb items={breadcrumbItems} />
        <div className="row">
          <div className="col-lg-8">
            <div>
              {/* <ExpandableText
                title={`${cityName} Overview`}
                text={overview}
                // collapsedLines={10}
              /> */}
              <CityExpandableBanner
                title={` About ${cityName}`}
                text={overview}
                wordLimit={200}
              />
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <NewsForm />
          </div>
        </div>
      </div>
      <div className="py-5">
        <PlacesToVisit cityName={cityName} data={placesToVisit} />
      </div>
      <PopularPackages
        citySlug={slug}
        country={country === "india" ? "india" : "international"}
      />
      <div className="py-5">
        <ThingsToDo cityName={cityName} data={thingsToDoData} />
      </div>

      <div className="py-5">
        <ToursitAttraction cityName={cityName} data={TouristAttractionPlace} />
      </div>

      <div className="py-5">
        <ReviewsWidget />
      </div>
      <div className="home-about">
        <AboutSection />
      </div>
      <div className="py-5">
        <LogoSlider />
      </div>
    </div>
  );
}
