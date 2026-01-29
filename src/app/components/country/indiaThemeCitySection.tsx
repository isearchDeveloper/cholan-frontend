"use client";

import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ThemeOverview from "@/app/components/theme/ThemeOverview";

import ReviewsWidget from "@/app/components/ReviewsWidget";
import FAQAccordionForCity from "@/app/components/city/FAQAccordionForCity";

/* ===== STATIC DATA (API later) ===== */

const THEME_STATIC_DATA: any = {
  honeymoon: {
    title: "Honeymoon Destinations in India",
    about:
      "Explore the most romantic honeymoon destinations in India. From beaches to hill stations, find the perfect escape for couples.",
    banner:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    faqs: [
      {
        q: "Which are the best honeymoon destinations in India?",
        a: "Goa, Manali, Shimla, Kerala, Andaman and Kashmir are top honeymoon places.",
      },
      {
        q: "What is the best time for honeymoon trips?",
        a: "October to March is ideal for most honeymoon destinations in India.",
      },
      {
        q: "Are honeymoon packages customizable?",
        a: "Yes, packages can be fully customized as per your preference.",
      },
    ],
  },
};

const THEME_CITIES: Record<string, { city: string; img: string }[]> = {
  honeymoon: [
    {
      city: "kerala",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "manali",
      img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "shimla",
      img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  family: [
    {
      city: "jaipur",
      img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "udaipur",
      img: "https://images.unsplash.com/photo-1599661046827-dacde6976546?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "mysore",
      img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  adventure: [
    {
      city: "leh-ladakh",
      img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "spiti",
      img: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "rishikesh",
      img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  "hill-station": [
    {
      city: "ooty",
      img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "munnar",
      img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "darjeeling",
      img: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  wildlife: [
    {
      city: "jim-corbett",
      img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "ranthambore",
      img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "kaziranga",
      img: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1200&auto=format&fit=crop",
    },
  ],

  pilgrimage: [
    {
      city: "varanasi",
      img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "haridwar",
      img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      city: "tirupati",
      img: "https://images.unsplash.com/photo-1623054062458-4e3b6f48d40b?q=80&w=1200&auto=format&fit=crop",
    },
  ],
};

export default function indiaThemeCitySection({ theme }: { theme: string }) {
  const fallbackData = {
    title: `${theme.replace("-", " ")} Destinations in India`,
    about: `Explore the best ${theme.replace("-", " ")} destinations across India with curated travel experiences.`,
    banner:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    faqs: [
      {
        q: `Which are the best ${theme.replace("-", " ")} places in India?`,
        a: "India offers multiple destinations suitable for this theme across mountains, beaches and heritage cities.",
      },
      {
        q: `What is the best time to visit?`,
        a: "October to March is generally the best time to travel across most destinations in India.",
      },
    ],
  };

  const data = THEME_STATIC_DATA[theme] || fallbackData;

  const cities = THEME_CITIES[theme] || [];

  if (!data) return null;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "India", href: "/india" },
    { label: data.title, isCurrent: true },
  ];

  return (
    <div className="theme-landing-page">
      {/* ===== Banner ===== */}
      <div className="theme-banner">
        <Image
          src={data.banner}
          alt={data.title}
          fill
          priority
          className="theme-banner-img"
        />
        <div className="theme-banner-overlay">
          <h1>{data.title}</h1>
        </div>
      </div>

      {/* ===== Breadcrumb + About ===== */}
      <div className="container py-5">
        <Breadcrumb items={breadcrumbItems} />
        <ThemeOverview theme={theme} />
      </div>

      {/* ===== Cities Grid ===== */}
      <div className="container pb-5">
        <h2 className="text-center mb-4">Popular Cities for {theme}</h2>

        <div className="row g-4">
          {cities.map((item) => (
            <div key={item.city} className="col-6 col-md-4 col-lg-3">
              <Link
                href={`/india/${item.city}-${theme}-tour-packages`}
                className="theme-card"
              >
                <div className="theme-img-wrapper">
                  <Image
                    src={item.img}
                    alt={item.city}
                    width={400}
                    height={300}
                    className="theme-img"
                  />
                  <div className="theme-overlay">
                    <span className="text-capitalize">{`${item.city} ${theme} Packages`}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FAQ ===== */}
      {/* ===== FAQ SECTION (using existing component) ===== */}
      <div className="py-5">
        <div className="container">
          <FAQAccordionForCity
            title={`FAQs About ${data.title}`}
            faqs={data.faqs.map((f: any) => ({
              question: f.q,
              answer: f.a,
            }))}
          />
        </div>
      </div>

      {/* ===== Reviews ===== */}
      <div className="py-5">
        <ReviewsWidget />
      </div>
    </div>
  );
}
