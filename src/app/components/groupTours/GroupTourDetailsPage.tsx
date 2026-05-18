"use client";

import React, { useState, useCallback } from "react";
import TourDetailsBanner from "@/app/components/common/TourDetailsBanner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import TourPlanFAQ from "@/app/components/common/TourPlanFAQ";
import EnquiryModal from "@/app/modals/enquiryModal";
import GroupTourSummaryCard from "./GroupTourSummaryCard";
import GroupTourBookingModal from "@/app/modals/GroupTourBookingModal";
import styles from "./grouptour.module.css";
import detailStyles from "./groupTourDetails.module.css";
import InclusionExclusionComponent from "@/app/components/common/InclusionExclusionComponent";

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


interface GroupTourDetailsPageProps {
  data: any;
}

export default function GroupTourDetailsPage({ data }: GroupTourDetailsPageProps) {
  const pkg = data?.package;
  const [openModal, setOpenModal] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [liveDepartures, setLiveDepartures] = useState<any[]>(
    pkg?.departures || pkg?.groupDepartures || []
  );

  const handleBookingSuccess = useCallback((departureId: number, passengers: number) => {
    setLiveDepartures((prev) =>
      prev.map((d) => {
        if (d.id === departureId) {
          const current = d.available_seats ?? d.seats ?? 0;
          return { ...d, available_seats: Math.max(0, current - passengers), seats: Math.max(0, current - passengers) };
        }
        return d;
      })
    );
  }, []);

  const nights = pkg?.duration_nights ?? 0;
  const days = pkg?.duration_days ?? 0;
  const durationLabel = `${nights > 0 ? `${nights} ${nights === 1 ? "Night" : "Nights"} / ` : ""}${days} ${days === 1 ? "Day" : "Days"}`;

  const badges: string[] = pkg?.badges || ["GROUP TOUR"];
  const facilities: string[] = pkg?.facilities || [];
  const cities: number = pkg?.cities_count ?? 0;

  // Map ALL departures from API → date tiles (including cancelled/soldout)
  const parseDepartures = (departures: any[]) => {
    if (!departures?.length) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return departures
      .filter((d: any) => {
        // Only hide past dates that are not cancelled/soldout
        const depDate = new Date(d.departure_date);
        // Show future dates always; also show past cancelled/soldout for reference? No — hide past.
        return depDate >= today;
      })
      .map((d: any) => {
        const dateObj = new Date(d.departure_date);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const isLastDay = dateObj <= tomorrow; // departure is today or tomorrow

        const availableSeats = d.available_seats ?? d.seats ?? 0;
        
        // computed_status comes from GroupTourPackageResource (departures array)
        // status comes from PackageResource (groupDepartures array)
        const computedStatus: string = d.status ?? "available";

        // Determine tile variant
        let variant: "green" | "yellow" | "red";
        if (computedStatus === "cancelled" || computedStatus === "soldout" || availableSeats === 0) {
          variant = "red";
        } else if (availableSeats <= 5 || isLastDay) {
          variant = "yellow";
        } else {
          variant = "green";
        }

        const isBookable = variant !== "red";

        return {
          id: d.id,
          departure_date: d.departure_date,
          month: dateObj.toLocaleString("en", { month: "short" }).toUpperCase(),
          year: dateObj.getFullYear().toString(),
          date: String(dateObj.getDate()).padStart(2, "0"),
          day: dateObj.toLocaleString("en", { weekday: "short" }),
          price: Math.round(Number(d.price)).toLocaleString("en-IN"),
          seats: availableSeats,
          status: computedStatus,
          variant,
          isBookable,
        };
      });
  };

  const allDates: any[] = parseDepartures(liveDepartures);
  // For the booking modal, only pass bookable dates
  const availableDates: any[] = allDates.filter((d) => d.isBookable);
  const datesCount: number = pkg?.dates_count ?? availableDates.length;

  // Starting price — from API or lowest available date
  const startingPrice = pkg?.starting_price
    ? Math.round(Number(pkg.starting_price)).toLocaleString("en-IN")
    : availableDates.length > 0
      ? availableDates[0].price
      : "0";

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
            images={(pkg.images || []).map((img: any) => ({
              image_path: img.url || img.image_path || "",
              image_alt: img.alt || img.image_alt || "",
            }))}
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
                    <div className={styles.priceValue}>{startingPrice}</div>
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
            {allDates.length > 0 && (
              <div className={detailStyles.section}>
                <h2 className={detailStyles.sectionHeading}>Available Departure Dates</h2>
                <div className={detailStyles.datesGrid}>
                  {allDates.map((d: any) => {
                    const isRed    = d.variant === "red";
                    const isYellow = d.variant === "yellow";
                    const isGreen  = d.variant === "green";

                    // Status label text
                    const statusLabel =
                      d.status === "cancelled"
                        ? "Cancelled"
                        : d.status === "soldout" || d.seats === 0
                        ? "Sold Out"
                        : `${d.seats} Seats`;

                    return (
                      <div
                        key={d.id}
                        className={[
                          detailStyles.dateTile,
                          isRed    ? detailStyles.dateTileRed    : "",
                          isYellow ? detailStyles.dateTileYellow : "",
                          isGreen  ? detailStyles.dateTileGreen  : "",
                          !d.isBookable ? detailStyles.dateTileDisabled : "",
                        ].join(" ")}
                        onClick={() => {
                          if (!d.isBookable) return;
                          setSelectedDate(d);
                          setOpenBookingModal(true);
                        }}
                        title={
                          !d.isBookable
                            ? d.status === "cancelled"
                              ? "This departure has been cancelled"
                              : "This departure is sold out"
                            : `Book for ${d.date} ${d.month} ${d.year}`
                        }
                      >
                        {/* Day row */}
                        <div className={detailStyles.dateTileDay}>{d.day}</div>

                        {/* Date string */}
                        <div className={detailStyles.dateTileDateStr}>
                          {d.date}-{d.month}-{d.year.slice(2)}
                        </div>

                        {/* Status badge */}
                        <div className={detailStyles.dateTileStatus}>{statusLabel}</div>

                        {/* Price */}
                        <div className={detailStyles.dateTilePriceNew}>₹ {d.price}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Overview / Long Description */}
            {pkg?.long_description && (
              <div className={detailStyles.section}>
                <h2 className={detailStyles.sectionHeading}>Tour Overview</h2>
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

            {/* 5. Inclusions & Exclusions */}
            {(pkg?.details?.includes?.length > 0 || pkg?.details?.excludes?.length > 0) && (
              <InclusionExclusionComponent
                inclusion={pkg?.details?.includes || []}
                exclusion={pkg?.details?.excludes || []}
              />
            )}

          </div>

          {/* ── RIGHT COLUMN — Summary Card ── */}
          <div className="col-12 col-lg-4">
            <GroupTourSummaryCard
              title={pkg?.title ?? "Group Tour Package"}
              badges={badges}
              rating={pkg?.rating ?? 0}
              startingPrice={startingPrice}
              durationLabel={durationLabel}
              cities={cities}
              datesCount={datesCount}
              facilities={facilities}
              nextDate={availableDates[0] ?? null}
              onBook={() => { setSelectedDate(null); setOpenBookingModal(true); }}
              onEnquire={() => setOpenModal(true)}
            />
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
        basePrice={pkg?.starting_price ? Number(pkg.starting_price) : 0}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
