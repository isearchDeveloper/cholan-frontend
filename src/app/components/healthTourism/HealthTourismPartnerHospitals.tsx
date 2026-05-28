"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./healthTourism.module.css";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later:
   const data = await fetchPartnerHospitals();
   ───────────────────────────────────────────────── */

interface Hospital {
  id: number;
  name: string;
  city: string;
  specialities: string;
  logo: string;
  slug: string;
}

const HOSPITALS: Hospital[] = [
  {
    id: 1,
    name: "Apollo Hospitals",
    city: "Chennai & Pan-India",
    specialities: "Specialities: Cardiac surgery, neurology, transplants.",
    logo: "/images/health-partner-apollo.png",
    slug: "apollo-hospitals",
  },
  {
    id: 2,
    name: "GVN Hospitals",
    city: "Trichy",
    specialities: "Specialities: Trauma care, Cancer care and orthopaedics.",
    logo: "/images/health-partner-gvn.png",
    slug: "gvn-hospitals",
  },
  {
    id: 3,
    name: "Kaveri Medical Centre",
    city: "Chennai",
    specialities:
      "Specialities- Neurosciences, and Organ Transplants (Liver & Bone Marrow)",
    logo: "/images/health-partner-kaveri.png",
    slug: "kaveri-medical-centre",
  },
  {
    id: 4,
    name: "MMHRC Hospitals",
    city: "Madurai",
    specialities:
      "Specialities- Cardiac Sciences, Gastro Sciences, Neuro Sciences",
    logo: "/images/health-partner-mmhrc.png",
    slug: "mmhrc-hospitals",
  },
];

const INTRO = {
  heading: "Our Partner Hospitals",
  description:
    "We work exclusively with India's most prestigious JCI and NABH-accredited hospitals. Every facility in our network has been personally vetted for clinical outcomes, safety standards, and international guest services. With Health Tourism services, we ensure the best facilities just for you.",
};

/* ── Single hospital card ── */
const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => (
  <div className={styles.partnerCard}>
    <img
      src={hospital.logo}
      alt={hospital.name}
      className={styles.partnerLogo}
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/images/cholantours2.webp";
      }}
    />
    <p className={styles.partnerName}>{hospital.name}</p>
    <p className={styles.partnerCity}>{hospital.city}</p>
    <hr className={styles.partnerDivider} />
    <p className={styles.partnerSpecialities}>{hospital.specialities}</p>
  </div>
);

/* ── Main section ── */
const HealthTourismPartnerHospitals: React.FC = () => (
  <section className={styles.partnersSection}>
    <div className="container">

      {/* Heading + description */}
      <div className={styles.partnersHeader}>
        <h2 className={styles.partnersHeading}>{INTRO.heading}</h2>
        <p className={styles.partnersDesc}>{INTRO.description}</p>
      </div>

      {/* Hospital cards grid — each card has its own dashed border */}
      <div className={styles.partnersGrid}>
        {HOSPITALS.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>

      {/* CTA */}
      <div className={styles.partnersCta}>
        <Link href="/contact-us" className={styles.partnersCtaBtn}>
          Contact Us
          <ArrowRight size={17} strokeWidth={2.2} className={styles.ctaArrow} />
        </Link>
      </div>

    </div>
  </section>
);

export default HealthTourismPartnerHospitals;
