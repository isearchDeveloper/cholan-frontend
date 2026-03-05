"use client";
import Image from "next/image";
import Breadcrumb from "../common/Breadcrumb";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const awardSlides = [
  { type: "large", images: ["/images/Cholan-achievement-01.jpg"] },
  {
    type: "stack",
    images: [
      "/images/Cholan-achievement-02.jpg",
      "/images/Cholan-achievement-03.jpg",
    ],
  },
  { type: "large", images: ["/images/Cholan-achievement-04.jpg"] },
  { type: "large", images: ["/images/Cholan-achievement-05.jpg"] },
  {
    type: "stack",
    images: [
      "/images/Cholan-achievement-06.jpg",
      "/images/Cholan-achievement-07.jpg",
    ],
  },
  { type: "large", images: ["/images/Cholan-achievement-08.jpg"] },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Awards and Recognitions", isCurrent: true },
];

export default function AwardsContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  const openPopup = (img: string) => {
    setActiveImage(img);
    setIsOpen(true);
  };

  interface Award {
    title: string;
    description: string;
    banner_image: string;
    award_year: number;
  }

  const [awardsData, setAwardsData] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  const XPublicToken =
    "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=awards-and-achievements`,
      {
        headers: {
          Accept: "application/json",
          "X-Public-Token": XPublicToken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.awards) {
          // Sort latest awards on top
          const sortedAwards = [...data.data.awards].sort(
            (a, b) => b.award_year - a.award_year
          );
          setAwardsData(sortedAwards);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const membershipsData = [
    {
      logo: "/images/Ministry_of_Tourism_India.svg",
      title: "Ministry of Tourism, Government of India",
    },
    {
      logo: "/images/IATA.png",
      title: "International Air Transport Association",
    },
    {
      logo: "/images/IATO.png",
      title: "Indian Association of Tour Operators",
    },
    {
      logo: "/images/ustoa.png",
      title: "Associate Member of the United States Tour Operators Association",
    },
    {
      logo: "/images/LUFTHANSA.png",
      title: "Lufthansa City Centre",
    },

    {
      logo: "/images/ICPB.png",
      title: "India Convention Promotion Bureau",
    },
    {
      logo: "/images/PATA.png",
      title: "Pacific Asia Travel Association",
    },
    {
      logo: "/images/OTOAI.png",
      title: "Outbound Tour Operators Association of India",
    },
    {
      logo: "/images/ITTA.png",
      title: "Indian Tourist Transporters Association",
    },
    {
      logo: "/images/TAAI.png",
      title: "Travel Agents Association of India",
    },
    {
      logo: "/images/TAFI.png",
      title: "Travel Agents Federation of India",
    },
    {
      logo: "/images/ISO.png",
      title: "ISO 9001:2015 Certified",
    },
    {
      logo: "/images/KTM.png",
      title: "Kerala Travel Mart Society",
    },
    {
      logo: "/images/KTS.png",
      title: "Karnataka Tourism Society",
    },
    {
      logo: "/images/FICCI.png",
      title: "Federation of Indian Chambers of Commerce & Industry",
    },

    {
      logo: "/images/FIEO.png",
      title: "Federation of Indian Export Organizations",
    },

    // 👉 ADD MORE OBJECTS — AUTO RENDER
  ];

  return (
    <div className="bg-light">
      <main className="awards-main">
        {/* ===== Banner Section ===== */}
        <section className="awards-banner">
          <div className="awards-banner-image">
            <Image
              src="/images/CT-Awards.jpg"
              alt="Awards & Recognition"
              fill
              priority
            />
          </div>
        </section>

        <section className="award-breadcrumb">
          <div className="container">
            <div className="breadcrumb-spc">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>
        </section>

        {/* ===== Awards Gallery Section ===== */}

        <section className="awards-gallery-section">
          <div className="container">
            <h2 className="awards-gallery-title">Awards & Recognition</h2>

            <p className="awards-gallery-desc">
              Cholan Tours has been recognised with more than 60 prestigious
              national and international awards for its outstanding contribution
              to the tourism industry. These honours underscore the company's
              consistent delivery of high-quality travel experiences, its
              commitment to innovation, and its leadership in promoting
              responsible and sustainable tourism practices. The accolades also
              reflect the trust it has earned from clients and partners, as well
              as the dedication of its professional team in setting new
              benchmarks in destination management.
            </p>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="lux-swiper"
            >
              {awardSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  {slide.type === "large" && (
                    <div
                      className="lux-large-image"
                      onClick={() => openPopup(slide.images[0])}
                    >
                      <img src={slide.images[0]} alt="Award" />
                    </div>
                  )}

                  {slide.type === "stack" && (
                    <div className="lux-small-images-stack">
                      {slide.images.map((img, i) => (
                        <div
                          key={i}
                          className="lux-small-image"
                          onClick={() => openPopup(img)}
                        >
                          <img src={img} alt="Award" />
                        </div>
                      ))}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ===== Image Popup ===== */}
        {isOpen && (
          <div className="image-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="image-modal" onClick={(e) => e.stopPropagation()}>
              <img src={activeImage} alt="Award Full View" />
              <button className="modal-close" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* ===== Awards List Section ===== */}
        <section className="awards-list-section">
          <div className="container">
            <p className="awards-intro-text">
              <strong>Over the years, Cholan Tours has been consistently recognised for
                its excellence, innovation, and leadership in the travel and
                tourism sector. Below is a curated list of some of the most
                prestigious honours received:</strong>
            </p>

            <div className="awards-list">
              {loading ? (
                <p>Loading awards...</p>
              ) : awardsData.length === 0 ? (
                <p>No awards found.</p>
              ) : (
                awardsData.map((award, index) => (
                  <div className="award-card" key={index}>
                    <div
                      className="award-logo"
                      style={{ cursor: "pointer" }}
                      onClick={() => openPopup(award.banner_image)}
                    >
                      <img src={award.banner_image} alt={award.title} />
                    </div>
                    <div className="award-info">
                      <h3>{award.title} ({award.award_year})</h3>
                      <p>{award.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ===== Professional Memberships & Associations ===== */}
        <section className="memberships-section">
          <div className="container">
            <h2 className="memberships-title">
              Professional Memberships And Associations
            </h2>

            <p className="memberships-desc">
              <p>Cholan Tours is proudly affiliated with a wide range of respected
                professional bodies at both national and international levels.
                These memberships reflect our continued commitment to excellence,
                regulatory compliance, and thought leadership within the travel
                and tourism industry.</p>
              <p> Through active collaboration with government tourism departments
                and global travel organisations, we contribute to policy
                development, uphold industry standards, and support the collective
                advancement of the travel community.</p>
              <p>Our awards and accreditations stand as a testament to the
                dedication, hard work, and commitment that define our
                organisation. Notably, we are the first South Indian company to
                receive <b>five National Tourism Awards</b> as the Best Inbound Tour
                Operator in India from the Ministry of Tourism, Government of
                India. Cholan Tours was also recognised by the <b>Confederation of
                  Indian Industry (CII)</b> as one of the <b>Top 25 Innovative
                    Organisations in India.</b> Further strengthening this recognition, we
                won the <b>CII Industrial Innovation Award 2016</b> in the Service-Medium
                Enterprises category.</p>
              <p> In October 2016, at the <b>Federation of Indian Export Organisations
                (FIEO)</b> Regional Export Awards for the year 2014-15, Cholan Tours
                was honoured with the <b>Gold Award</b> in the Best Service Provider
                category in the Southern Region.</p>
              <p>These awards and recognitions continually motivate us to enhance
                the value we deliver, contribute meaningfully to society, and play
                our part in nation-building.</p>
              <p> As a leading <b>Destination Management Company,</b> we have been
                expanding our presence and capabilities across India for over two
                decades. Alongside the growth of our service portfolio, our active
                association with national and international tourism bodies
                reinforces client trust and confidence. It also enables us to
                build strong global networks, exchange knowledge, and adopt best
                practices for mutual growth and excellence.
              </p>
            </p>
            <div className="memberships-grid">
              {membershipsData.map((item, index) => (
                <div className="membership-card" key={index}>
                  <div className="membership-logo">
                    <img src={item.logo} alt={item.title} />
                  </div>
                  <p className="membership-name">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
