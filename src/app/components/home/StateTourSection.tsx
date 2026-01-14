"use client";
import Image from "next/image";
import Link from "next/link";
 
 
const StateTourSection = () => {
  return (
    <section className="state-tour-section">
  <div className="state-tour-grid">
 
    <div className="tour-card tour-card--india">
      <Link href="/india" className="tour-card-link">
        <div className="tour-card-overlay"></div>
        <span className="tour-card-title tour-card-title--large">India</span>
 
        <div className="tour-card-arrow-wrap">
          <div className="tour-card-arrow">↗</div>
        </div>
      </Link>
    </div>
 
    <div className="state-tour-right">
 
      <div className="tour-card tour-card--nepal tour-card--small">
        <Link
          href="/international-holidays/nepal-tour-packages"
          className="tour-card-link"
        >
          <div className="tour-card-overlay"></div>
          <span className="tour-card-title">Nepal</span>
 
          <div className="tour-card-arrow-wrap">
            <div className="tour-card-arrow">↗</div>
          </div>
        </Link>
      </div>
 
      <div className="tour-card tour-card--srilanka tour-card--small">
        <Link
          href="/international-holidays/sri-lanka-tour-packages"
          className="tour-card-link"
        >
          <div className="tour-card-overlay"></div>
          <span className="tour-card-title">Sri Lanka</span>
 
          <div className="tour-card-arrow-wrap">
            <div className="tour-card-arrow">↗</div>
          </div>
        </Link>
      </div>
 
    </div>
  </div>
</section>
 
  );
};
 
export default StateTourSection;