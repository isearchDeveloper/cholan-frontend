"use client";

import React, { useState } from "react";

import Link from "next/link";
import { Eye, Users, UtensilsCrossed, Map } from "lucide-react";
import AtAGlance from "@/app/components/home/AtAGlance";
import LogoSlider from "@/app/components/home/LogoSlider";
import WhyCholanSection from "@/app/components/common/WhyCholanSection";
import VacationContactSection from "@/app/components/common/VacationContactSection";
import FAQAccordionCar from "@/app/components/car/CarFaq";
import styles from "@/app/components/southIndia/southIndia.module.css";
import tabStyles from "./summerPackages.module.css";
import { OfferData } from "@/app/components/offerLanding/OfferLandingPage";
import PlanTripButton from "@/app/components/common/PlanTripButton";

/* ── Types ── */
interface PkgItem {
  num: string;
  title: string;
  desc: string;
  slug: string;
  image: string;
  imageAlt?: string;
}

export interface SummerPageData {
  title?: string;
  overview?: string;
  banner_img?: string;
  banner_img_alt?: string;
  is_active?: boolean;
  faq_title?: string;
  faqs?: { question: string; answer: string }[];
  meta?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    h1_heading?: string;
    meta_details?: string;
  };
}

/* ── Helpers ── */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();
}

function stripHtml(html: string): string {
  const stripped = html?.replace(/<[^>]*>/g, "") || "";
  return decodeEntities(stripped);
}

function mapApiPackages(apiPkgs: any[]): PkgItem[] {
  return apiPkgs.map((p: any, i: number) => ({
    num: String(i + 1).padStart(2, "0"),
    title: p.title || "",
    desc: stripHtml(p.short_description || ""),
    slug: p.slug || "",
    image: p.primary_image || "/images/no-img.webp",
    imageAlt: p.primary_image_alt || p.title || "",
  }));
}

/* ── Static data ── */
const benefits = [
  { icon: <Eye size={30} strokeWidth={1.5} />, title: "Maximum Sightseeing", text: "Explore more, See more & Travel more" },
  { icon: <Users size={30} strokeWidth={1.5} />, title: "Tour Managers", text: "Specialists on tour to take good care of you" },
  { icon: <UtensilsCrossed size={30} strokeWidth={1.5} />, title: "Meals included", text: "Delicious food covered in one price" },
  { icon: <Map size={30} strokeWidth={1.5} />, title: "Best Plans", text: "Crafted itineraries with maximum attractions" },
];

/* ── Tab config ── */
const TABS = [
  { key: "south", label: "South India", slug: "south-india" },
  { key: "north", label: "North East India", slug: "north-east-india" },
] as const;

type TabKey = typeof TABS[number]["key"];

/* ── Props ── */
export interface SummerPackagesPageProps {
  southOffer?: OfferData | null;
  northOffer?: OfferData | null;
  summerPage?: SummerPageData | null;
}

/* ── Component ── */
export default function SummerPackagesPage({ southOffer, northOffer, summerPage }: SummerPackagesPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(TABS[0].key);
  const [openModal, setOpenModal] = useState(false);

  const offerMap: Record<TabKey, OfferData | null | undefined> = {
    south: southOffer,
    north: northOffer,
  };

  const activeOffer = offerMap[activeTab];
  const activeTabConfig = TABS.find(t => t.key === activeTab)!;

  const previewPackages = activeOffer?.packages?.length
    ? mapApiPackages(activeOffer.packages).slice(0, 3)
    : [];

  const bannerImg = summerPage?.banner_img || "/images/summer-banner.webp";
  const bannerAlt = summerPage?.banner_img_alt || "Summer Tour Packages";
  const h1Title = summerPage?.meta?.h1_heading || "Summer Tour Packages";
  const hasFaqs = summerPage?.faqs && summerPage.faqs.length > 0;

  return (
    <main>
      {/* Single Plan Your Trip modal — shared by all Book Now buttons */}
      <PlanTripButton openModal={openModal} setOpenModal={setOpenModal} hideButton={true} />

      {/* 1. HERO BANNER */}
      <div className={styles.bannerWrap}>
        <img
          src={bannerImg}
          alt={bannerAlt}
          className={styles.bannerImg}
          onError={(e: any) => { e.target.src = "/images/Summer Offer.png"; }}
        />
      </div>

      {/* 2. DOODLE TITLE */}
      <div className={styles.titleBanner}>
        <div className={styles.titleDoodle}>
          <img src="/images/doodle-airplane-check-point-travel-around-world-concept 2.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div className={styles.titleCenter}>
          <h1 className={styles.sectionTitle}>{h1Title}</h1>
          {summerPage?.overview ? (
            <div
              className={styles.sectionSubtitle}
              dangerouslySetInnerHTML={{ __html: summerPage.overview }}
            />
          ) : (
            <p className={styles.sectionSubtitle}>
              Discover thoughtfully curated summer packages designed to blend nature, heritage, wellness, and comfort into one seamless journey.
            </p>
          )}
        </div>
        <div className={styles.titleDoodle}>
          <img src="/images/doodle-airplane-check-point-travel-around-world-concept 1.png" alt="" loading="lazy" decoding="async" />
        </div>
      </div>

      {/* 3. TABS + PACKAGES */}
      <div className="container">
        <section className={styles.packagesSection}>

          {/* TAB SWITCHER */}
          <div className={tabStyles.tabWrapper}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`${tabStyles.tab} ${activeTab === tab.key ? tabStyles.tabActive : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {previewPackages.length > 0 ? (
            <>
              <div className={styles.packagesGrid}>
                {previewPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.slug || pkg.num}
                    pkg={pkg}
                    onBookNow={() => setOpenModal(true)}
                  />
                ))}
              </div>
              <div className={tabStyles.viewAllWrap}>
                <Link
                  href={`/summer-tour-packages/${activeTabConfig.slug}`}
                  className="btn orange-btn d-flex align-items-center gap-2"
                  style={{ whiteSpace: "nowrap", fontSize: "13px", padding: "8px 20px" }}
                >
                  View All {activeTabConfig.label} Packages
                  <span><img src="/images/button-arrow.png" alt="" width={16} height={16} /></span>
                </Link>
              </div>
            </>
          ) : (
            <div className={tabStyles.emptyState}>
              <p>No packages available for {activeTabConfig.label} at the moment. Please check back soon.</p>
            </div>
          )}

        </section>
      </div>

      {/* 4. MORE BENEFITS */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>More Benefits</h2>
            <p className={styles.sectionSubtitle}>
              Designed to enhance your comfort, convenience, and overall stay experience.
            </p>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitText}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOLAN TOURS */}
      <WhyCholanSection />

      {/* 6. BOOK YOUR HOLIDAYS */}
      <VacationContactSection />

      {/* 7. FAQ */}
      {hasFaqs && (
        <div className="py-5">
          <div className="container">
            <FAQAccordionCar
              faqs={summerPage!.faqs!}
              title={summerPage?.faq_title || "FAQs on Summer"}
            />
          </div>
        </div>
      )}

      {/* 8. AT A GLANCE */}
      <AtAGlance />

      {/* 9. PARTNER LOGOS */}
      <LogoSlider />

    </main>
  );
}

/* ── Package Card ── */
function PackageCard({ pkg, onBookNow }: { pkg: PkgItem; onBookNow: () => void }) {
  return (
    <Link href={`/packages/${pkg.slug}`} className={styles.pkgCard} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div className={styles.pkgImageWrap}>
        <span className={styles.pkgHotBadge}>🔥 Hot Selling</span>
        <img
          src={pkg.image}
          alt={pkg.imageAlt || pkg.title}
          loading="lazy"
          decoding="async"
          onError={(e: any) => { e.target.src = "/images/no-img.webp"; }}
        />
      </div>
      <div className={styles.pkgBody}>
        <span className={styles.pkgNumber}>{pkg.num}</span>
        <div className={styles.pkgTitleRow}>
          <h3 className={styles.pkgTitle}>{pkg.title}</h3>
        </div>
        <p className={styles.pkgDesc}>{pkg.desc}</p>
        <div className={styles.pkgBtnGroup}>
          <span className={styles.pkgBtn}>
            Explore Now <span>→</span>
          </span>
          <button type="button" className={styles.pkgBookBtn} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookNow(); }}>
            Book Now <span>→</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
