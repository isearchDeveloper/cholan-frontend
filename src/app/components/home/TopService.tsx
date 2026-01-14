"use client";
import React from "react";
 
interface TourService {
  title: string;
  banner_image?: string;
  banner_image_alt?: string;
  link: string;
}
 
interface TopServiceProps {
  tourServices: TourService[];
}
 
const TopService: React.FC<TopServiceProps> = ({ tourServices }) => {
  if (!tourServices || tourServices.length === 0) return null;
  return (
    <section className="top-service-section">
      <div className="top-service-container">
        {/* Heading */}
        <h2 className="top-service-heading">Tour Services</h2>
 
        <p className="top-service-subtext">
          We Provide Car &amp; Bus Rental Services, Luxury Trains and Hotels as these are very important for us.
        </p>
        <p className="top-service-subtext top-service-subtext--spaced">
          The Tailor-made specialists in offering customised tour packages for you.
        </p>
 
        {/* GRID */}
        <div className="top-service-grid">
          {tourServices.slice(0, 3).map((data) => (
            <a key={data.title} href={data.link} className="top-service-link">
              <article className="top-service-card">
                {/* IMAGE */}
                <div className="top-service-image-wrap">
                  <img
                    src={
                      data.title === "Car Rental"
                        ? "/images/car-rentals-in-india.webp"
                        : data.title === "Bus Rental"
                        ? "/images/volvo-bus-rental.webp"
                        : data.title === "Customized Holidays"
                        ? "/images/customized-holidays-cholantours.webp"
                        : data.banner_image || "/images/no-img.webp"
                    }
                    alt={data.banner_image_alt || data.title}
                    className="top-service-image"
                  />
                </div>
 
                {/* BODY */}
                <div className="top-service-body">
                  <h3 className="top-service-card-title">
                    {data.title}
                  </h3>
 
                  <p className="top-service-card-text">
                    {data.title === "Car Rental" &&
                      "Comfortable and well-maintained cars with professional drivers."}
 
                    {data.title === "Bus Rental" &&
                      "Spacious and reliable buses with expert drivers for long-distance journeys."}
 
                    {data.title === "Customized Holidays" &&
                      "Tailor-made holiday experiences crafted to your preferences with stays."}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default TopService;