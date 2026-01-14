"use client";
import Link from "next/link";
 
const LocalExpertiseSection = () => {
  return (
    <section
      className="local-expertise-section"
      style={{
        backgroundImage: "url('/images/experts-banner-1.webp')",
      }}
    >
      {/* Overlay */}
      <div className="local-expertise-overlay" />
 
      {/* Content */}
      <div className="local-expertise-content pt-5 mt-5">
        {/* Icon */}
        <div className="local-expertise-icon pt-5">✦</div>
 
        {/* Heading */}
        <h2 className="local-expertise-heading">
          Curated Experiences by <br></br>Local Experts

        </h2>
 
        {/* Description */}
        {/* <p className="local-expertise-text">
          Explore India’s timeless beauty with Cholan Tours - your trusted
          travel partner for tailor-made journeys, cultural experiences, and
          seamless travel services across every corner of the country.
        </p>
  */}
        {/* CTA */}
        <Link href="/india" className="local-expertise-cta">
          <span className="local-expertise-cta-fill"></span>
          <span className="local-expertise-cta-text">
            Come Explore With Us
          </span>
        </Link>
      </div>
    </section>
  );
};
 
export default LocalExpertiseSection;