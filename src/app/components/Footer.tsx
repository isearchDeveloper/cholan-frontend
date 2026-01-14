"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { XPublicToken } from "../urls/apiUrls";
import axios from "axios";
import TripAdvisorWidget from "./TripAdvisorWisget";

// type TabKey = "about" | "international" | "india" | "blogs" | "investors";

type TabKey = "about" | "international" | "india" | "blogs";

interface TabContent {
  sectionTitle: string;
  description: string;
  logoSrc: string;
  logoWidth: number;
  links: { label: string; href: string }[];
}

const tabLabels: Record<TabKey, string> = {
  about: "About Cholan Tours",
  international: "International Tours",
  india: "India Tours",
  blogs: "Travel Blogs",
  //investors: "Investor Relations",
};

const FooterSec = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [worldMenuData, setWorldMenuData] = useState<any>(null);
  const [indiaMenuData, setIndiaMenuData] = useState<any>(null);

  useEffect(() => {
    const fetchWorldMenu = async () => {
      try {
        const response = await axios.get<any>(
          `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/top-trending-international`,
          {
            headers: {
              "X-Public-Token": XPublicToken,
            },
          }
        );
        setWorldMenuData(response?.data);
      } catch (err) {
        console.error("Error fetching India menu:", err);
      }
    };

    fetchWorldMenu();
  }, []);

  useEffect(() => {
    const fetchIndiaMenu = async () => {
      try {
        const response = await axios.get<any>(
          `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/exclusive`,
          {
            headers: {
              "X-Public-Token": XPublicToken,
            },
          }
        );
        setIndiaMenuData(response?.data);
      } catch (err) {
        console.error("Error fetching India menu:", err);
      }
    };

    fetchIndiaMenu();
  }, []);

  const tabContent: Record<TabKey, TabContent> = {
    about: {
      sectionTitle: "About Cholan Tours",
      description: `Cholan Tours is one of India's fast-growing ISO 9001:2015 quality-certified Destination Management Companies (DMC). Our services are approved by The Ministry of Tourism, Government of India.`,
      logoSrc: "/images/logo-white-tagline.webp",
      logoWidth: 200,
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Awards and Recognition", href: "/awards-and-recognition" },
        { label: "Legacy Of Cholan Tours", href: "/legacy-of-cholan" },
        { label: "Our Team", href: "/our-team" },
        { label: "Our Partners", href: "/our-partners" },
        // { label: "Our Credentials", href: "/credentials" },
        { label: "Indian DMC", href: "/indian-dmc" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "CSR Policy", href: "/csr" },
        { label: "Awards & Achievements", href: "/awards-and-achievements" },
        { label: "Policies", href: "/policies" },
      ],
    },
    international: {
      sectionTitle: "International Tours",
      description:
        "Explore exciting international holiday packages with Cholan Tours, offering curated travel experiences to destinations worldwide.",
      logoSrc: "/images/logo-white-tagline.webp",
      logoWidth: 250,
      links:
        worldMenuData?.data?.length > 0
          ? worldMenuData?.data
              .slice(0, 5)
              .filter((item: any) => item?.title && item?.slug)
              .map((item: any) => ({
                label: item.title,
                href: `/packages/${item.slug}`,
              }))
          : [],
    },

    india: {
      sectionTitle: "India Tours",
      description:
        "Discover the beauty of India with our tailored holiday packages, from cultural tours to scenic getaways.",
      logoSrc: "/images/logo-white-tagline.webp",
      logoWidth: 250,
      links:
        indiaMenuData?.data?.length > 0
          ? indiaMenuData?.data
              .slice(0, 5)
              .filter((item: any) => item?.title && item?.slug)
              .map((item: any) => ({
                label: item.title,
                href: `/packages/${item.slug}`,
              }))
          : [],
    },
    blogs: {
      sectionTitle: "Travel Blogs",
      description:
        "Read our travel blogs for inspiration, tips, and stories from destinations around the globe.",
      logoSrc: "/images/logo-white-tagline.webp",
      logoWidth: 250,
      links: [
        {
          label: "Adventure",
          href: "https://www.cholantours.com/blog/adventure/",
        },
        {
          label: "Cultural",
          href: "https://www.cholantours.com/blog/cultural/",
        },
        {
          label: "Family Travel",
          href: "https://www.cholantours.com/blog/family-travel/",
        },
        {
          label: "Heritage",
          href: "https://www.cholantours.com/blog/heritage/",
        },
        {
          label: "Wildlife",
          href: "https://cholantours.com/blog/wildlife/",
        },
        {
          label: "Inspiration",
          href: "https://www.cholantours.com/blog/inspiration/",
        },
      ],
    },
    // investors: {
    //   sectionTitle: "Investor Resources",
    //   description:
    //     "Learn about investment opportunities and our vision for growth at Cholan Tours.",
    //   logoSrc: "/images/logo-white-tagline.webp",
    //   logoWidth: 250,
    //   links: [
    //     { label: "Financial Reports", href: "/investors/reports" },
    //     { label: "Investor Updates", href: "/investors/updates" },
    //     { label: "Partnerships", href: "/investors/partnerships" },
    //     { label: "Contact Investors Team", href: "/investors/contact" },
    //   ],
    // },
  };

  const quickLinks = [
    // { label: "Help", href: "/contact-us" },
    // { label: "Vision & Mission", href: "/vision-mission" },
    { label: "India Tour Packages", href: "/india" },
    { label: "World Holiday Packages", href: "/international-holidays" },
    { label: "Customized Holidays", href: "/customized-holidays" },
    { label: "Car Rental", href: "/car-rental" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Careers", href: "/careers" },
    // { label: "News Letter", href: "/news" },
    // { label: "Profile", href: "/profile" },

    //  { label: "Our Team", href: "/our-team" },
  ];

  const socialMedia = [
    {
      src: "/images/media1.webp",
      href: "https://www.facebook.com/CholanToursPrivateLimited/",
      alt: "Facebook",
    },
    {
      src: "/images/media2.webp",
      href: "https://x.com/cholantour",
      alt: "Twitter",
    },
    {
      src: "/images/media3.png",
      href: "https://in.linkedin.com/company/cholan-tours",
      alt: "LinkedIn",
    },
    {
      src: "/images/media5.png",
      href: "https://www.instagram.com/cholan_tours/",
      alt: "Instagram",
    },
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-tabs">
            {(Object.keys(tabLabels) as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "active" : ""}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <div className="footer-content">
            <div className="footer-content-box">
              <div className="row gap-4 gap-md-0">
                <div className="col-md-6 col-lg-3">
                  <div className="logo-box">
                    <div className="footer-logo">
                      <Image
                        width={tabContent[activeTab]?.logoWidth}
                        height={70}
                        sizes="100vw"
                        src={tabContent[activeTab]?.logoSrc}
                        alt="Cholan Tours Logo"
                      />
                    </div>
                    <p>{tabContent[activeTab]?.description}</p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="footer-menu">
                    <h3>{tabContent[activeTab]?.sectionTitle}</h3>
                    <ul>
                      {tabContent[activeTab]?.links?.map((link, index) => {
                        const words = link.label.trim().split(/\s+/);
                        const truncatedLabel =
                          words.length > 4
                            ? words.slice(0, 4).join(" ") + "..."
                            : link.label;

                        const isExternal = link.href.startsWith("http");

                        return (
                          <li key={index}>
                            {isExternal ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link.label}
                              >
                                {truncatedLabel}
                              </a>
                            ) : (
                              <Link href={link.href} title={link.label}>
                                {truncatedLabel}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="footer-menu">
                    <h3>Quick Links</h3>
                    <ul>
                      {quickLinks.map((link, index) => (
                        <li key={index}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <ul>
                      <li>
                        <Link href="tel:+91 431 4226100">
                          <span>
                            <Image
                              width={20}
                              height={20}
                              sizes="100vw"
                              src="/images/call-two.png"
                              alt=""
                            />
                          </span>
                          +91 431 4226100
                        </Link>
                      </li>
                      <li>
                        <Link href="mailto:enquiry@cholantours.com">
                          <span>
                            <Image
                              width={20}
                              height={20}
                              sizes="100vw"
                              className="pt-1"
                              src="/images/mgg.png"
                              alt=""
                            />
                          </span>
                          enquiry@cholantours.com
                        </Link>

                        <p>CIN: U31100TN2010PTC078389</p>
                      </li>
                      <li>
                        <span>
                          <Image
                            width={20}
                            height={20}
                            sizes="100vw"
                            src="/images/address.png"
                            alt=""
                          />
                        </span>
                        No 4, Annai Avenue, Srirangam, Trichy, Tamil Nadu
                        620006, India.
                      </li>
                    </ul>
                  </div>
                  {/* <TripAdvisorWidget /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-media">
          <h5>Follow us on</h5>
          <ul>
            {socialMedia.map((media, index) => (
              <li key={index}>
                <Link target="_blank" href={media.href}>
                  <Image
                    width={12}
                    height={12}
                    sizes="100vw"
                    src={media.src}
                    alt={media.alt}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="copyright-sec">
          <p>© {new Date().getFullYear()} Cholan Tours. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSec;
