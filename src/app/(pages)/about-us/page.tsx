// "use client";

import AOS from "aos";
import "aos/dist/aos.css";
import Breadcrumb from "@/app/components/common/Breadcrumb";

import AboutSection from "@/app/components/home/AboutSection";

import LogoSlider from "@/app/components/home/LogoSlider";
import Image from "next/image";
import AboutBanner from "@/app/components/about/aboutbanner";
import ExpandableText from "@/app/components/common/ExpandableText";
import AboutCustomerRate from "@/app/components/home/CustomarRate";
import AwardsTimeline from "@/app/components/about/AwardsTimeline";
import CholanToursComponent from "@/app/components/about/CholanToursComponent";
import LifeAtCholanToursComponent from "@/app/components/about/LifeAtCholanToursComponent";
import EmployeeCard from "@/app/components/about/team";
import { fetchPackageReviewData } from "@/app/services/reveiwService";
import CustomerRate from "@/app/components/about/AboutCustomarRate";
import { fetchAboutPageData } from "@/app/services/aboutServices";
import { getCanonical } from "@/app/lib/getCanonical";
import ReviewsWidget from "@/app/components/ReviewsWidget";

export async function generateMetadata({ params }: any) {
  const data = await fetchAboutPageData();

  const meta = data?.data?.details?.meta || {};
  const canonical = await getCanonical("/about-us");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta.meta_details || "";

  return {
    title: meta?.meta_title || "Cholan Tours",
    description: meta?.meta_description || "Cholan Tours",
    keywords: meta.meta_keywords || "",
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || "Cholan Tours",
      url: currentUrl,
      description: meta?.meta_description || "Cholan Tours",
    },

    twitter: {
      title: meta?.meta_title || "Cholan Tours",
      url: currentUrl,
      description: meta?.meta_description || "Cholan Tours",
    },
  };
}

const staticBreadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "About Us", isCurrent: true },
];

export default async function AboutUs() {
  const data = await fetchAboutPageData();

  const [packageReviewData] = await Promise.all([fetchPackageReviewData()]);

  return (
    <div className="aboutus-wrapper">
      <AboutBanner bannerData={data?.data?.details} />
      <div className="pt-4 pb-5">
        <div className="container">
          <Breadcrumb items={staticBreadcrumbItems} />

          <section className="ct-section">
            <div className="ct-container">
              <div className="ct-left">
                <h2 className="ct-title">Cholan Tours Pvt. Ltd</h2>

                <p className="ct-copy">
                  For over 20 years, Cholan Tours has emerged as a leading force
                  in destination management, offering expertly customised travel
                  experiences backed by a strong pan-India presence. Evolving
                  from a humble beginning into a nationally recognised DMC, the
                  company is celebrated for its excellence, innovation and
                  sustainability-driven approach. <br></br><br></br>Recognised by the Ministry of
                  Tourism, Government of India, and honoured with five National
                  Tourism Awards, Cholan Tours has significantly contributed to
                  shaping India’s tourism landscape through eco-conscious
                  practices, community engagement and support for inclusive
                  growth.
                </p>
              </div>

              <div className="ct-right">
                {/* Main Large Image */}
                <div className="ct-image ct-image-main">
                  <img
                    src="/images/nataraja-img.webp"
                    alt="Meenakshi Temple"
                  />
                </div>

                {/* Small Overlapping Image */}
                <div className="ct-image ct-image-small">
                  <img
                    src="/images/Meenakshi.webp"
                    alt="Nataraja Image"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="cmd-section">
            <div className="cmd-container">
              {/* LEFT IMAGE */}
              <div className="cmd-left">
                <img
                  src="/images/Pandian.webp"
                  alt="Pandian Kumaravel"
                  className="cmd-portrait"
                />
              </div>

              {/* RIGHT MESSAGE */}
              <div className="cmd-right">
                <h2 className="cmd-title">Message from the CMD</h2>

                <div className="cmd-copy">
                  <p>
                    At Cholan Tours, our journey has always been guided by a
                    deep passion for travel and a commitment to excellence. From
                    our modest beginnings to becoming one of India’s leading
                    Destination Management Companies, every milestone has been
                    built on trust, dedication, and a relentless pursuit of
                    quality. Our focus remains on crafting meaningful travel
                    experiences that go beyond sightseeing — journeys that
                    inspire, connect, and leave lasting impressions.
                  </p>

                  <p>
                    As we look to the future, sustainability, innovation, and
                    inclusive growth will continue to define our path. We take
                    pride in empowering communities, nurturing young talent
                    through initiatives like ‘Drive with Pride’, and promoting
                    responsible tourism practices across regions. With a strong
                    team, a growing global presence, and unwavering values, we
                    are excited to explore new horizons and welcome the world
                    with open arms.
                  </p>
                </div>

                {/* SIGNATURE BELOW */}
                <div className="cmd-signature-block">
                  <img
                    src="/images/Pandian Signature Black.webp"
                    alt="Signature"
                    className="cmd-signature"
                  />

                  <div className="cmd-name">
                    <strong>Pandian Kumaravel</strong>
                    <div>CMD, Cholan Tours Pvt. Ltd.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="three-section">
            <div className="three-container">
              {/* Card 1 */}
              <div className="three-card">
                <img
                  src="/images/Legacy.webp"
                  alt="Legacy of Cholan Tours"
                  className="three-img"
                />

                <h3 className="three-title">Legacy Of Cholan Tours</h3>

                <p className="three-text">
                  Rooted in South India's rich heritage, Cholan Tours carries
                  forward a legacy of cultural pride and travel excellence. With
                  decades of experience, it continues to inspire journeys that
                  connect people with the soul of the region.
                </p>
              </div>

              {/* Card 2 */}
              <div className="three-card">
                <img
                  src="/images/Excellence.webp"
                  alt="Cholan Tours Excellence"
                  className="three-img"
                />

                <h3 className="three-title">Cholan Tours Excellence</h3>

                <p className="three-text">
                  Cholan Tours is known for its professionalism, personalized
                  service, and commitment to quality. Every journey is crafted
                  with care, reflecting our promise of excellence in every
                  detail.
                </p>
              </div>

              {/* Card 3 */}
              <div className="three-card">
                <img
                  src="/images/Milestones.webp"
                  alt="Milestones in History"
                  className="three-img"
                />

                <h3 className="three-title">Milestones In History</h3>

                <p className="three-text">
                  Our journey is marked by significant achievements that
                  showcase our growth, resilience, and innovation. These
                  milestones reflect the vision and dedication that have shaped
                  Cholan Tours into a trusted name in travel.
                </p>
              </div>
            </div>
          </section>
          <section className="hs-section">
            <div className="hs-inner">
              {/* CARD 1 */}
              <div className="hs-card">
                <div className="hs-head hs-head-green">
                  <h4>SUSTAINABILITY &amp; INNOVATION</h4>
                </div>

                <div className="hs-body">
                  <ul>
                    <li>100% Running on Solar Energy</li>
                    <li>100% Paperless Office Environment</li>
                  </ul>
                </div>

                <div className="hs-point"></div>
              </div>

              {/* CARD 2 */}
              <div className="hs-card">
                <div className="hs-head hs-head-aqua">
                  <h4>OPERATIONAL STRENGTH</h4>
                </div>

                <div className="hs-body">
                  <ul>
                    <li>150+ Fleets Operating Nationwide</li>
                    <li>13 Offices Across the Country</li>
                    <li>300+ Dedicated Staff Members</li>
                  </ul>
                </div>

                <div className="hs-point"></div>
              </div>

              {/* CARD 3 */}
              <div className="hs-card">
                <div className="hs-head hs-head-yellow">
                  <h4>AWARDS &amp; RECOGNITION</h4>
                </div>

                <div className="hs-body">
                  <ul>
                    <li>5-Time National Tourism Award Winner</li>
                    <li>Over 50 National & International Awards Earned</li>
                  </ul>
                </div>

                <div className="hs-point"></div>
              </div>

              {/* CARD 4 */}
              <div className="hs-card">
                <div className="hs-head hs-head-salmon">
                  <h4>CREDIBILITY &amp; GLOBAL PRESENCE</h4>
                </div>

                <div className="hs-body">
                  <ul>
                    <li>
                      Approved by Ministry of Tourism, Government of India
                    </li>
                    <li>Member of 25+ Global Tourism Networks</li>
                  </ul>
                </div>

                <div className="hs-point"></div>
              </div>
            </div>
          </section>
          <section className="wwo-section">
            <div className="wwo-wrap">
              <div className="wwo-header">
                <h2 className="wwo-title">What We Offer</h2>
                <p className="wwo-sub">
                  Discover A Complete Range Of Tourism Experiences Across India,
                  Nepal, And Sri Lanka.
                  <br />
                  From Cultural Journeys To Luxury Escapes, We Craft Every Trip
                  With Care, Comfort, And Authenticity.
                </p>
              </div>

              <div className="wwo-grid">
                {/* 360 Tourism */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t1.png"
                      alt="360 Tourism"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">360° Tourism</h3>
                    <p className="wwo-item-desc">
                      Cholan Tours presents an extensive range of thoughtfully
                      designed tourism programmes.
                    </p>
                  </div>
                </div>

                {/* Fleet Service */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t2.png"
                      alt="Fleet Service"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">Fleet Service</h3>
                    <p className="wwo-item-desc">
                      From luxury cars to spacious coaches, our fleet is designed to suit every journey and group size.
                    </p>
                  </div>
                </div>

                {/* Destination Management */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t3.png"
                      alt="Destination Management"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">Destination Management</h3>
                    <p className="wwo-item-desc">
                      Destination management is handled by a team of highly
                      experienced professionals.
                    </p>
                  </div>
                </div>

                {/* Travel Consulting */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t4.png"
                      alt="Travel Consulting"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">Travel Consulting</h3>
                    <p className="wwo-item-desc">
                      Passionate travel consultants offering expert personalised
                      guidance.
                    </p>
                  </div>
                </div>

                {/* Travel Risk Management */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t5.png"
                      alt="Risk Management"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">Travel Risk Management</h3>
                    <p className="wwo-item-desc">
                      Ensuring the safety and wellbeing of every traveller
                      across all journeys.
                    </p>
                  </div>
                </div>

                {/* Sustainable Travel */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t6.png"
                      alt="Sustainable Travel"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">Sustainable Travel</h3>
                    <p className="wwo-item-desc">
                      Eco-friendly travel options designed for responsible
                      global travellers.
                    </p>
                  </div>
                </div>

                {/* Group Tours */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t7.png"
                      alt="Group Tours"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">Group Tours</h3>
                    <p className="wwo-item-desc">
                      Wide range of fixed departure group tours designed for
                      enjoyment and diversity.
                    </p>
                  </div>
                </div>

                {/* MICE */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t8.png"
                      alt="MICE"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">MICE</h3>
                    <p className="wwo-item-desc">
                      Expert planning for Meetings, Incentives, Conferences and
                      Exhibitions.
                    </p>
                  </div>
                </div>

                {/* Wellness Tourism */}
                <div className="wwo-item">
                  <div className="wwo-icon">
                    <img
                      src="/images/t9.png"
                      alt="Wellness Tourism"
                    />
                  </div>
                  <div className="wwo-content">
                    <h3 className="wwo-item-title">Wellness Tourism</h3>
                    <p className="wwo-item-desc">
                      Rejuvenate your mind and body with holistic wellness
                      experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="test-section">
            <div className="test-inner">
              <div className="test-top">
                <span className="test-badge">DON'T TAKE OUR WORD</span>
                <h2 className="test-heading">CLIENT TESTIMONIALS</h2>
              </div>

              <div className="test-row">
                {/* Card 1 */}
                <div className="test-card">
                  <div className="test-card-inner">
                    <p className="test-quote">
                      CholanTours made my recent visit to India convenient,
                      safe, and unforgettable. From my native place to the
                      places I visited in India, the hospitality I received made
                      me revisit the country. I'd love to explore more Indian
                      places on my next visit.
                    </p>
                  </div>
                  <div className="test-name">Anny</div>
                  {/* <div className="test-role">Marketing Head, ABC Chemicals</div> */}
                </div>

                {/* Card 2 */}
                <div className="test-card">
                  <div className="test-card-inner">
                    <p className="test-quote">
                      I lack words to express the experience I gained during my
                      holiday in Australia. With Cholan tours, I explored
                      Melbourne, Sydney, Brisbane, and Cairns in my Australia
                      visit. Everything, from flight and accommodation to
                      sightseeing, was fine. I will consult the tour operator
                      again for my next trips.
                    </p>
                  </div>
                  <div className="test-name">Anubhav Kumar Kaushik</div>
                  {/* <div className="test-role">Divisional Manager, Corpo Inc.</div> */}
                </div>

                {/* Card 3 */}
                <div className="test-card">
                  <div className="test-card-inner">
                    <p className="test-quote">
                      We had a family trip to Rome, Millan, and Venice in Italy.
                      Our neighbor suggested we book our travels from
                      Cholantours. It was a convenient and safe trip with a
                      pleasant experience. My children enjoyed the drive and
                      sightseeing covered in their itinerary. Good tours and
                      travels company.
                    </p>
                  </div>
                  <div className="test-name">Brianna Hernandez</div>
                  {/* <div className="test-role">Founder &amp; CEO, Marine Engineering</div> */}
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <LifeAtCholanToursComponent
          data={data?.data?.details?.description}
          title={data?.data?.details?.title}
        /> */}
        {/* <EmployeeCard /> */}
        {/* <div className="about-us-rate rating">
          {packageReviewData?.data && (
            <CustomerRate reviews={packageReviewData.data} />
          )}
        </div> */}

        <ReviewsWidget />

        {/* <AboutSection /> */}
        <div className="pt-5">
          <LogoSlider />
        </div>
      </div>
    </div>
  );
}
