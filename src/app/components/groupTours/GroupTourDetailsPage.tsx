"use client";

import React, { useState, useCallback, useRef } from "react";
import TourDetailsBanner from "@/app/components/common/TourDetailsBanner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import TourPlanFAQ from "@/app/components/common/TourPlanFAQ";
import EnquiryModal from "@/app/modals/enquiryModal";
import GroupTourSummaryCard from "./GroupTourSummaryCard";
import GroupTourBookingModal from "@/app/modals/GroupTourBookingModal";
import styles from "./grouptour.module.css";
import detailStyles from "./groupTourDetails.module.css";
import InclusionExclusionComponent from "@/app/components/common/InclusionExclusionComponent";
import FAQAccordion from "@/app/components/common/FAQAccordion";

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
  const [termsExpanded, setTermsExpanded] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [liveDepartures, setLiveDepartures] = useState<any[]>(
    // API returns group_tour_schedules — fallback to old keys for safety
    pkg?.group_tour_schedules || pkg?.departures || pkg?.groupDepartures || []
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

  // duration & facilities are nested under pkg.details in the new API
  const nights = pkg?.details?.duration_nights ?? pkg?.duration_nights ?? 0;
  const days   = pkg?.details?.duration_days   ?? pkg?.duration_days   ?? 0;
  const durationLabel = `${nights > 0 ? `${nights} ${nights === 1 ? "Night" : "Nights"} / ` : ""}${days} ${days === 1 ? "Day" : "Days"}`;

  const badges: string[]    = pkg?.badges || ["GROUP TOUR"];
  const facilities: string[] = pkg?.details?.facilities || pkg?.facilities || [];
  // cities_count — API returns extra_destinations array, derive count from it
  const cities: number = pkg?.cities_count ?? pkg?.extra_destinations?.length ?? 0;

  // Map ALL departures from API → date tiles (past dates shown as red/expired, not hidden)
  const parseDepartures = (departures: any[]) => {
    if (!departures?.length) return [];
    const now = new Date(); // exact current moment — includes time

    return departures.map((d: any) => {
      // Combine departure_date + departure_time; expire 1 hour before departure
      const depTime = d.departure_time ?? "00:00:00";
      const departureDateTime = new Date(`${d.departure_date}T${depTime}`);
      const cutoff = new Date(departureDateTime.getTime() - 60 * 60 * 1000); // 1 hr before
      const dateObj = new Date(d.departure_date); // date-only for display
      const isPast = cutoff < now;

      // "last day" = departure is today (same calendar date) but not yet past
      const todayDateStr = now.toISOString().slice(0, 10);
      const isLastDay = !isPast && d.departure_date === todayDateStr;

      const availableSeats = d.available_seats ?? d.seats ?? 0;
      const computedStatus: string = isPast ? "expired" : (d.status ?? "available");

      // Price: new API nests price inside pricing.base_price
      const rawPrice = d.pricing?.base_price ?? d.price ?? 0;

      // Determine tile variant
      let variant: "green" | "yellow" | "red";
      if (isPast || computedStatus === "cancelled" || computedStatus === "soldout" || availableSeats === 0) {
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
        price: Math.round(Number(rawPrice)).toLocaleString("en-IN"),
        seats: availableSeats,
        status: computedStatus,
        variant,
        isBookable,
        pricing: d.pricing ?? null,
      };
    });
  };

  const allDates: any[] = parseDepartures(liveDepartures);
  // For the booking modal, only pass bookable dates
  const availableDates: any[] = allDates.filter((d) => d.isBookable);
  const datesCount: number = pkg?.dates_count ?? availableDates.length;

  // Starting price — fallback chain: pkg.price → pkg.starting_price → first bookable date → first any date
  const startingPrice =
    pkg?.price && Number(pkg.price) > 0
      ? Math.round(Number(pkg.price)).toLocaleString("en-IN")
      : pkg?.starting_price && Number(pkg.starting_price) > 0
        ? Math.round(Number(pkg.starting_price)).toLocaleString("en-IN")
        : availableDates.length > 0
          ? availableDates[0].price
          : allDates.length > 0
            ? allDates[0].price
            : "—";

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
          <div className="col-12 col-lg-8 d-flex flex-column gap-4 exp-text-area">

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
                      d.status === "expired"
                        ? "Expired"
                        : d.status === "cancelled"
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
            {(() => {
              const itineraries = pkg?.itineraries?.length > 0
                ? pkg.itineraries
                : pkg?.details?.itineraries?.length > 0
                  ? pkg.details.itineraries
                  : null;
              return itineraries ? (
                <div className={detailStyles.section}>
                  <h2 className={detailStyles.sectionHeading}>Itinerary</h2>
                  <TourPlanFAQ faqData={itineraries} />
                </div>
              ) : null;
            })()}

            {/* 5. Inclusions & Exclusions */}
            {(pkg?.details?.includes?.length > 0 || pkg?.details?.excludes?.length > 0) && (
              <InclusionExclusionComponent
                inclusion={pkg?.details?.includes || []}
                exclusion={pkg?.details?.excludes || []}
              />
            )}

            {/* 6. Terms & Conditions */}
            {pkg?.privacy_policy && (
              <div ref={termsRef} className={detailStyles.section}>
                <div className={detailStyles.termsHeader}>
                  <span className={detailStyles.termsIcon}>📋</span>
                  <h2 className={detailStyles.sectionHeading} style={{ margin: 0 }}>
                    Terms &amp; Conditions
                  </h2>
                </div>

                <div className={detailStyles.termsWrapper}>
                  <div
                    className={detailStyles.termsContent}
                    style={{ maxHeight: termsExpanded ? "none" : "160px", overflow: "hidden" }}
                    dangerouslySetInnerHTML={{ __html: pkg.privacy_policy }}
                  />
                  {!termsExpanded && (
                    <div className={detailStyles.termsFade} />
                  )}
                </div>

                <button
                  type="button"
                  className={detailStyles.termsToggleBtn}
                  onClick={() => {
                    const isCollapsing = termsExpanded;
                    setTermsExpanded((p) => !p);
                    if (isCollapsing && termsRef.current) {
                      termsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {termsExpanded ? (
                    <>Show Less <span className={detailStyles.termsChevron}>▲</span></>
                  ) : (
                    <>Read More <span className={detailStyles.termsChevron}>▼</span></>
                  )}
                </button>
              </div>
            )}

            {/* 7. FAQs */}
            {pkg?.faqs?.length > 0 && (
              <div className={detailStyles.section}>
                <FAQAccordion
                  faqs={pkg.faqs}
                  location={pkg.faq_title || "Frequently Asked Questions"}
                />
              </div>
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
        packageSlug={pkg?.slug || ""}
        title={pkg?.title || "Group Tour Package"}
        selectedDate={selectedDate}
        availableDates={availableDates}
        basePrice={
          pkg?.price && Number(pkg.price) > 0
            ? Number(pkg.price)
            : pkg?.starting_price
              ? Number(pkg.starting_price)
              : 0
        }
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
