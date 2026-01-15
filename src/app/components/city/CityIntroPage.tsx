"use client";
import Banner from "@/app/components/common/banner";
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
export default function CityIntroPage({ slug }: { slug: string }) {
  // STATIC TEMP DATA (you can replace later when backend is ready)
  //   const cityName = slug.replace(/-/g, " ").toUpperCase();
   
  const cityName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "India", href: "/india" },
    { label: cityName, isCurrent: true },
  ];

  const bannerData = {
    title: `${cityName} Tourism`,
    subtitle: `Explore ${cityName} - Culture, Attractions & More`,
    imageUrl: "/images/banner.webp",
  };

  const aboutData = `
    ${cityName} is a beautiful destination with rich culture, historical places,
    natural beauty, and amazing food. This is static content for now.
    Replace it later with backend API data.
  `;

  const faqData = [
    { question: `Why visit ${cityName}?`, answer: "Because it's beautiful!" },
    { question: `Best time to visit ${cityName}?`, answer: "October to March" },
  ];

  const placesToVisit = [
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
  const thingsToDoData = [
    { title: "Ayurvedic Massage", image: "/images/tour/backwaters.png" },
            { title: "Kathakali Dance", image: "/images/tour/elephant.png" },
            { title: "Spice Plantation", image: "/images/tour/spa.png" },
            { title: "Canoeing", image: "/images/tour/tea.png" },
            { title: "Ayurvedic Massage", image: "/images/tour/backwaters.png" },
            { title: "Kathakali Dance", image: "/images/tour/elephant.png" },
            { title: "Spice Plantation", image: "/images/tour/spa.png" },
            { title: "Canoeing", image: "/images/tour/tea.png" },
            
  ];

  return (
    <div className="city-intro-page">
      <Banner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        imageUrl={bannerData.imageUrl}
      />

      <div className="container py-5">
        <Breadcrumb items={breadcrumbItems} />
        <div className="row">
          <div className="col-lg-8">
            <div>
              <ExpandableText
                title={`${cityName} Overview`}
                subtitle=""
                text={aboutData}
                collapsedLines={3}
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
        <PopularPackages citySlug={slug} />
      <div className="py-5">
        <ThingsToDo
          cityName={cityName}
          data={thingsToDoData}
        />
      </div>

    <div className="py-5">
        <ToursitAttraction cityName={cityName} data={placesToVisit} />
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
