"use client";

import React from "react";
import Link from "next/link";
import {
  Eye, Users, UtensilsCrossed, Map,
  MessageSquareShare, Briefcase, Handshake, Backpack,
} from "lucide-react";
import Banner from "@/app/components/common/banner";
import AtAGlance from "@/app/components/home/AtAGlance";
import LogoSlider from "@/app/components/home/LogoSlider";
import EnquiryForm from "@/app/components/common/EnquiryForm";
import styles from "@/app/components/southIndia/southIndia.module.css";

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

/* ── Static why-cholan items ── */
const whyItems = [
  {
    icon: <MessageSquareShare size={22} strokeWidth={1.5} />,
    title: "Experiences & Destinations",
    text: "From luxury escapes to spiritual journeys, every itinerary travel experiences.",
  },
  {
    icon: <Briefcase size={22} strokeWidth={1.5} />,
    title: "Services & Expertise",
    text: "Cholan Tours delivers seamless solutions, services, and group travel management.",
  },
  {
    icon: <Handshake size={22} strokeWidth={1.5} />,
    title: "Sustainability & Responsible Tourism",
    text: "We promote eco-friendly tourism, engagement in every journey.",
  },
  {
    icon: <Backpack size={22} strokeWidth={1.5} />,
    title: "Why Cholan Tours?",
    text: "Over two decades of expertise, service and multilingual support.",
  },
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
  const page = offer?.page;
  const bannerImg = page?.banner_img || "/images/Summer Offer.png";
  const sectionTitle = page?.h1_heading || `${regionLabel} Tour Packages`;

  const rawPackages = offer?.packages?.length
    ? mapApiPackages(offer.packages)
    : fallbackPackages;

  const topRow = rawPackages.slice(0, 3);
  const bottomRow = rawPackages.slice(3);

  return (
    <main>

      {/* 1. HERO BANNER */}
      <div className={styles.bannerWrap}>
        <Banner imageUrl={bannerImg} title="" subtitle="" />
      </div>

      {/* 2. DOODLE IMAGES LEFT/RIGHT + TITLE CENTER */}
      <div className={styles.titleBanner}>
        <div className={styles.titleDoodle}>
          <img src="/images/doodle-airplane-check-point-travel-around-world-concept 2.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div className={styles.titleCenter}>
          <h1 className={styles.sectionTitle}>{sectionTitle}</h1>
          <p className={styles.sectionSubtitle}>
            Discover thoughtfully curated {regionLabel} packages designed for summer - blending
            nature, heritage, wellness, and comfort into one seamless journey.
          </p>
        </div>
        <div className={styles.titleDoodle}>
          <img src="/images/doodle-airplane-check-point-travel-around-world-concept 1.png" alt="" loading="lazy" decoding="async" />
        </div>
      </div>

      {rawPackages.length > 0 && (
        <div className="container">
          <section className={styles.packagesSection}>
            <div className={styles.packagesGrid}>
              {topRow.map((pkg) => (
                <PackageCard key={pkg.slug || pkg.num} pkg={pkg} />
              ))}
            </div>
            {bottomRow.length > 0 && (
              <div className={bottomRow.length >= 3 ? styles.packagesGrid : styles.packagesGridBottom}>
                {bottomRow.map((pkg) => (
                  <PackageCard key={pkg.slug || pkg.num} pkg={pkg} />
                ))}
              </div>
            )}
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
      <section className={styles.whySection}>
        <div className={styles.whyLeft}>
          <img src="/images/tourismwhychose.webp" alt="Why Cholan Tours" loading="lazy" decoding="async" />
        </div>
        <div className={styles.whyRight}>
          <h2 className={styles.whyHeading}>Why Cholan Tours is Your Best Choice</h2>
          <p className={styles.whySubtext}>
            With years of expertise, we create thoughtfully curated journeys backed by
            seamless service and a strong commitment to responsible travel.
          </p>
          <div className={styles.whyItems}>
            {whyItems.map((item, i) => (
              <div key={i} className={styles.whyItem}>
                <div className={styles.whyItemIcon}>{item.icon}</div>
                <div>
                  <h4 className={styles.whyItemTitle}>{item.title}</h4>
                  <p className={styles.whyItemText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOOK YOUR HOLIDAYS */}
      <section className={styles.bookSection}>
        <div className="container">
          <div className={styles.bookInner}>
            <div className={styles.bookLeft}>
              <h2>Contact Us to Book Your Summer Holiday!</h2>
              <p>Hassle-free journeys with the expertise of our in-house Tour Managers.</p>
            </div>
            <div className={styles.bookRight}>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* 7. AT A GLANCE */}
      <AtAGlance />

      {/* 8. PARTNER LOGOS */}
      <LogoSlider />

    </main>
  );
}

function PackageCard({ pkg }: { pkg: PkgItem }) {
  return (
    <div className={styles.pkgCard}>
      <div className={styles.pkgImageWrap}>
        <img
          src={pkg.image}
          alt={pkg.imageAlt || pkg.title}
          loading="lazy"
          decoding="async"
          onError={(e: any) => { e.target.src = "/images/no-img.webp"; }}
        />
      </div>
      <div className={styles.pkgBody}>
        <div className={styles.pkgTitleRow}>
          <h3 className={styles.pkgTitle}>{pkg.title}</h3>
          <span className={styles.pkgNumber}>{pkg.num}</span>
        </div>
        <p className={styles.pkgDesc}>{pkg.desc}</p>
        <Link href={`/packages/${pkg.slug}`} className={styles.pkgBtn}>
          Explore Now <span>→</span>
        </Link>
      </div>
    </div>
  );
}
