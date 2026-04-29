"use client";

import React, { useState } from "react";
import TourDetailsBanner from "@/app/components/common/TourDetailsBanner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import TourPlanFAQ from "@/app/components/common/TourPlanFAQ";
import EnquiryForm from "@/app/components/common/EnquiryForm";
import EnquiryModal from "@/app/modals/enquiryModal";
import GroupTourBookingModal from "@/app/modals/GroupTourBookingModal";
import styles from "./grouptour.module.css";
import detailStyles from "./groupTourDetails.module.css";

const Icons: Record<string, React.ReactNode> = {
  flight: <img src="/flight.svg" alt="Flights" width="16" height="16" />,
  flights: <img src="/flight.svg" alt="Flights" width="16" height="16" />,
  breakfast: <img src="/breakfast.svg" alt="Breakfast" width="16" height="16" />,
  "break fast": <img src="/breakfast.svg" alt="Breakfast" width="16" height="16" />,
  hotel: <img src="/hotel.svg" alt="Hotel" width="16" height="16" />,
  sightseeing: <img src="/landscape.svg" alt="Sightseeing" width="16" height="16" />,
  transport: <img src="/bus.svg" alt="Transport" width="16" height="16" />,
  transfers: <img src="/bus.svg" alt="Transfers" width="16" height="16" />,
  meal: <img src="/meal.svg" alt="Meal" width="16" height="16" />,
  train: <img src="/train.svg" alt="Train" width="16" height="16" />,
  wifi: <img src="/wifi.svg" alt="Wi-Fi" width="16" height="16" />,
};

const DATE_COLORS = ["#ef6d27", "#ef6d27", "#cc2c2c", "#cc2c2c", "#1a7a4a", "#1a7a4a", "#ef6d27"];

interface GroupTourDetailsPageProps {
  data: any;
}

export default function GroupTourDetailsPage({ data }: GroupTourDetailsPageProps) {
  const pkg = data?.package;
  const [openModal, setOpenModal] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  
  // Log the dynamic data to see the exact keys coming from the backend
  console.log("Dynamic Backend Package Data:", pkg);

  const nights = pkg?.details?.duration_nights ?? 0;
  const days = pkg?.details?.duration_days ?? 0;
  const durationLabel = `${nights > 0 ? `${nights} ${nights === 1 ? "Night" : "Nights"} / ` : ""}${days} ${days === 1 ? "Day" : "Days"}`;

  const badges: string[] = pkg?.badges || ["GROUP TOUR", "Short Trips"];
  const facilities: string[] = pkg?.details?.facilities || [];
  const cities: number = pkg?.cities ?? 0;
  const price: string = pkg?.price || "0";

  // Map groupDepartures from API → date tiles format
  const parseDepartures = (departures: any[]) => {
    if (!departures?.length) return pkg?.available_dates || [];
    return departures.map((d: any) => {
      const dateObj = new Date(d.departure_date);
      return {
        id: d.id || d.journey_date_id || d.departure_id || 0,
        month: dateObj.toLocaleString("en", { month: "short" }),
        year: dateObj.getFullYear().toString(),
        date: String(dateObj.getDate()).padStart(2, "0"),
        day: dateObj.toLocaleString("en", { weekday: "short" }),
        price: Math.round(Number(d.price)).toLocaleString("en-IN"),
        seats: d.seats_available !== undefined ? d.seats_available : (d.available_seats || d.seats || 0),
      };
    });
  };

  const availableDates: any[] = parseDepartures(pkg?.groupDepartures);
  const datesCount: number = pkg?.dates ?? availableDates.length;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Group Tour Packages", href: "/group-tours" },
    { label: pkg?.title || "Tour Details", isCurrent: true },
  ];

  return (
    <div className="details-wrapper">
      <div className="container mx-auto pt-4 pb-5">

        <Breadcrumb items={breadcrumbItems} />

        {/* Images Gallery */}
        {pkg?.primary_image && (
          <TourDetailsBanner
            image={encodeURI(pkg.primary_image)}
            images={pkg.images || []}
            alt={pkg.primary_image_alt || pkg.title}
            title={pkg.title}
          />
        )}

        <div className="row mt-4 gap-4 gap-lg-0">

          {/* ── LEFT COLUMN ── */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">

            {/* 1. Tour Summary Card */}
            <div className={detailStyles.summaryCard}>
              <div className={styles.topSection}>
                <div className={styles.dataArea}>
                  {/* Badges */}
                  <div className={styles.badges}>
                    {badges.map((b: string, i: number) => (
                      <span key={i} className={i === 0 ? styles.badgePrimary : styles.badgeSecondary}>
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h1 className={detailStyles.detailTitle}>{pkg?.title}</h1>

                  {/* Description + Stars */}
                  <div className={styles.descRow}>
                    {pkg?.short_description && (
                      <p
                        className={styles.desc}
                        dangerouslySetInnerHTML={{
                          __html: pkg.short_description.replace(/<[^>]*>/g, ""),
                        }}
                      />
                    )}
                    <div className={styles.stars}>
                      {"★".repeat(Math.min(pkg?.rating || 0, 5))}
                      {"☆".repeat(Math.max(0, 5 - (pkg?.rating || 0)))}
                    </div>
                  </div>

                  {/* Facilities */}
                  {facilities.length > 0 && (
                    <div className={styles.includes}>
                      {facilities.map((item: string, i: number) => (
                        <React.Fragment key={item}>
                          <div className={styles.includeItem}>
                            {Icons[item] ?? null}
                            <span style={{ textTransform: "capitalize" }}>{item}</span>
                          </div>
                          {i < facilities.length - 1 && (
                            <span className={styles.sep}>|</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Box */}
                <div className={styles.priceBox}>
                    <div className={styles.priceCurrency}>INR</div>
                    <div className={styles.priceLabel}>Starting from</div>
                    <div className={styles.priceValue}>{price}</div>
                    <div className={styles.priceNote}>Per person on twin sharing</div>
                  </div>
              </div>

              <hr className={styles.divider} />

              {/* Stats + Book Now */}
              <div className={styles.bottomSection}>
                <div className={styles.stats}>
                  {cities > 0 && (
                    <>
                      <div className={styles.statContainer}>
                        <span className={styles.statValue}>{cities}</span>
                        <span className={styles.statLabel}>Cities</span>
                      </div>
                      <div className={styles.statDivider} />
                    </>
                  )}
                  {datesCount > 0 && (
                    <>
                      <div className={styles.statContainer}>
                        <span className={styles.statValue}>{datesCount}</span>
                        <span className={styles.statLabel}>Dates</span>
                      </div>
                      <div className={styles.statDivider} />
                    </>
                  )}
                  <div className={styles.statContainer}>
                    <span className={styles.statValue}>{durationLabel}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn orange-btn d-flex align-items-center gap-2"
                  onClick={() => {
                    setSelectedDate(null);
                    setOpenBookingModal(true);
                  }}
                >
                  Book Now
                  <span><img src="/images/button-arrow.png" alt="" width={16} height={16} /></span>
                </button>
              </div>
            </div>

            {/* 2. Available Dates Grid */}
            {availableDates.length > 0 && (
              <div className={detailStyles.section}>
                <h2 className={detailStyles.sectionHeading}>Group Tour Packages</h2>
                <div className={detailStyles.datesGrid}>
                  {availableDates.map((d: any, i: number) => (
                    <div 
                      key={i} 
                      className={detailStyles.dateTile}
                      onClick={() => {
                        setSelectedDate(d);
                        setOpenBookingModal(true);
                      }}
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      {/* Left — colored month + year */}
                      <div
                        className={detailStyles.dateTileLeft}
                        style={{ background: DATE_COLORS[i % DATE_COLORS.length] }}
                      >
                        <span className={detailStyles.dateMon}>{d.month}</span>
                        <span className={detailStyles.dateYear}>{d.year || "2026"}</span>
                      </div>
                      {/* Right — date | day + price */}
                      <div className={detailStyles.dateTileRight}>
                        <span className={detailStyles.dateDayRow}>{d.date} | {d.day}</span>
                        <span className={detailStyles.dateTilePrice}>₹{d.price}</span>
                        {d.seats > 0 && (
                          <span style={{ fontSize: "11px", color: "#d85711", fontWeight: 700, marginTop: "2px" }}>{d.seats} Seats Left</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Overview / Long Description */}
            {pkg?.long_description && (
              <div className={detailStyles.section}>
                <h2 className={detailStyles.sectionHeading}>Group Tour Packages</h2>
                <div
                  className={detailStyles.overviewText}
                  dangerouslySetInnerHTML={{ __html: pkg.long_description }}
                />
              </div>
            )}

            {/* 4. Itinerary */}
            {pkg?.itineraries?.length > 0 && (
              <div className={detailStyles.section}>
                <h2 className={detailStyles.sectionHeading}>Itinerary</h2>
                <TourPlanFAQ faqData={pkg.itineraries} />
              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN — Sticky Form ── */}
          <div className="col-12 col-lg-4">
            <div className="side-sticky-form">
              <EnquiryForm
                title={pkg?.title}
                package_slug={pkg?.slug}
              />
            </div>
          </div>
        </div>
      </div>


      <EnquiryModal
        openModal={openModal}
        setopenModal={setOpenModal}
        title={pkg?.title}
        duration={durationLabel}
        slug={pkg?.slug}
      />
      <GroupTourBookingModal
        openModal={openBookingModal}
        setOpenModal={setOpenBookingModal}
        packageId={pkg?.id || pkg?.package_id || 0}
        title={pkg?.title || "Group Tour Package"}
        selectedDate={selectedDate}
        availableDates={availableDates}
        basePrice={Number(price.replace(/,/g, "")) || 0}
      />
    </div>
  );
}
