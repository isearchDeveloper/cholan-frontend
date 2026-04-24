"use client";

import React, { useState } from "react";

import Link from "next/link";
import { Eye, Users, UtensilsCrossed, Map } from "lucide-react";
import AtAGlance from "@/app/components/home/AtAGlance";
import LogoSlider from "@/app/components/home/LogoSlider";
import WhyCholanSection from "@/app/components/common/WhyCholanSection";
import VacationContactSection from "@/app/components/common/VacationContactSection";
import styles from "@/app/components/southIndia/southIndia.module.css";
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

export interface OfferData {
  page?: {
    title?: string;
    h1_heading?: string;
    banner_img?: string;
    banner_img_alt?: string;
    overview?: string;
  };
  packages?: any[];
}

export interface OfferLandingPageProps {
  offer?: OfferData | null;
  /** Shown in title fallback e.g. "South India" or "North India" */
  regionLabel: string;
  /** Fallback packages shown when API returns none */
  fallbackPackages?: PkgItem[];
}

/* ── Static benefit items ── */
const benefits = [
  { icon: <Eye size={30} strokeWidth={1.5} />, title: "Maximum Sightseeing", text: "Explore more, See more & Travel more" },
  { icon: <Users size={30} strokeWidth={1.5} />, title: "Tour Managers", text: "Specialists on tour to take good care of you" },
  { icon: <UtensilsCrossed size={30} strokeWidth={1.5} />, title: "Meals included", text: "Delicious food covered in one price" },
  { icon: <Map size={30} strokeWidth={1.5} />, title: "Best Plans", text: "Crafted itineraries with maximum attractions" },
];


/* ── Helpers ── */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
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

/* ── Component ── */
export default function OfferLandingPage({
  offer,
  regionLabel,
  fallbackPackages = [],
}: OfferLandingPageProps) {
  const [openModal, setOpenModal] = useState(false);
  const page = offer?.page;
  const bannerImg = page?.banner_img || "/images/Summer Offer.png";
  const h1Heading = page?.h1_heading;
  const fallbackTitle = page?.title || `${regionLabel} Tour Packages`;

  const rawPackages = offer?.packages?.length
    ? mapApiPackages(offer.packages)
    : fallbackPackages;

  // Split into rows of 3; last row centered if < 3 cards
  const rows: PkgItem[][] = [];
  for (let i = 0; i < rawPackages.length; i += 3) {
    rows.push(rawPackages.slice(i, i + 3));
  }

  return (
    <main>
      {openModal && <PlanTripButton openModal={openModal} setOpenModal={setOpenModal} hideButton={true} />}

      {/* 1. HERO BANNER */}
      <div className={styles.bannerWrap}>
        <img
          src={bannerImg}
          alt={h1Heading || fallbackTitle}
          className={styles.bannerImg}
          onError={(e: any) => { e.target.src = "/images/Summer Offer.png"; }}
        />
      </div>

      {/* 2. DOODLE IMAGES LEFT/RIGHT + TITLE CENTER */}
      <div className={styles.titleBanner}>
        <div className={styles.titleDoodle}>
          <img src="/images/doodle-airplane-check-point-travel-around-world-concept 2.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div className={styles.titleCenter}>
          <h1 className={styles.sectionTitle}>{h1Heading || fallbackTitle}</h1>
          {page?.overview ? (
            <div
              className={styles.sectionSubtitle}
              dangerouslySetInnerHTML={{ __html: page.overview }}
            />
          ) : (
            <p className={styles.sectionSubtitle}>
              Discover thoughtfully curated {regionLabel} packages designed for summer - blending
              nature, heritage, wellness, and comfort into one seamless journey.
            </p>
          )}
        </div>
        <div className={styles.titleDoodle}>
          <img src="/images/doodle-airplane-check-point-travel-around-world-concept 1.png" alt="" loading="lazy" decoding="async" />
        </div>
      </div>

      {rows.length > 0 && (
        <div className="container">
          <section className={styles.packagesSection}>
            {rows.map((row, i) => (
              <div
                key={i}
                className={row.length === 3 ? styles.packagesGrid : styles.packagesGridBottom}
                style={i > 0 ? { marginTop: "24px" } : undefined}
              >
                {row.map((pkg) => (
                  <PackageCard
                    key={pkg.slug || pkg.num}
                    pkg={pkg}
                    onBookNow={() => setOpenModal(true)}
                  />
                ))}
              </div>
            ))}
          </section>
        </div>
      )}

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

      {/* 7. AT A GLANCE */}
      <AtAGlance />

      {/* 8. PARTNER LOGOS */}
      <LogoSlider />

    </main>
  );
}

function PackageCard({ pkg, onBookNow }: { pkg: PkgItem; onBookNow: () => void }) {
  return (
    <Link href={`/packages/${pkg.slug}`} className={styles.pkgCard} style={{ textDecoration: "none", color: "inherit" }}>
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
          <button
            type="button"
            className={styles.pkgBookBtn}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookNow(); }}
          >
            Book Now <span>→</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
