"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";
import { useRouter } from "next/navigation";

const REGION_DISPLAY_LABELS: Record<string, string> = {
  "North India": "North India",
  "South India": "South India",
  "East & North East India": "North East",
  "East & North India": "North East",
  "West & Central India": "West Central",
};

const getRegionDisplayText = (regionName: string) => {
  return REGION_DISPLAY_LABELS[regionName] ?? regionName;
};

const getRegionSlugMap = (regions: any[] = []) => {
  return regions.reduce((acc: any, r: any) => {
    if (r.name) {
      acc[r.name] = r.slug;
      acc[r.name.trim()] = r.slug; // ✅ FIX: trimmed version bhi store karo mismatch avoid karne ke liye
    }
    return acc;
  }, {});
};

// ✅ FIX: Robust region href generator
const getRegionHref = (tab: string, regionSlugMap: Record<string, string>) => {
  const slug = regionSlugMap[tab] ?? regionSlugMap[tab?.trim()] ?? null;
  if (slug) return `/india/${slug}`;
  return `/india/${tab
    .toLowerCase()
    .replace(/east\s*&\s*north\s*east/i, "north-east")
    .replace(/west\s*&\s*central/i, "west-central")
    .replace(/&/g, "")
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()}-tour-packages`;
};

interface MegaMenuProps {
  headerData: any;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

type DmcCity = {
  name: string;
  slug: string;
};

const normalizeInternationalMenu = (menu: any[]) => {
  if (!Array.isArray(menu)) return [];
  return menu.map((continent) => ({
    region: continent.name,
    slug: continent.slug,
    countries: (continent.countries || []).filter(
      (c: any) => c.locations && c.locations.length > 0
    ),
  }));
};

export default function Navigation({
  headerData,
  navOpen,
  setNavOpen,
}: MegaMenuProps) {
  // ✅ FIX: Empty string se start karo, useEffect mein set karo — hydration mismatch avoid hoga
  const [activeIndiaTab, setActiveIndiaTab] = useState("");

  // ✅ FIX: Holidays ke liye alag state — India tab se independent
  const [activeHolidaysTab, setActiveHolidaysTab] = useState("");

  const [internationalTabs, setInternationalTabs] = useState<any[]>([]);
  const [activeWorldTab, setActiveWorldTab] = useState("Trending");
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [worldPage, setWorldPage] = useState(0);
  const [worldMenuData, setWorldMenuData] = useState<any>(null);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.id = "scrolled";
        setIsScrolled(true);
      } else {
        document.body.removeAttribute("id");
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // International menu normalize
  useEffect(() => {
    if (headerData?.international_mega_menu) {
      const data = normalizeInternationalMenu(
        headerData.international_mega_menu
      );
      setInternationalTabs(data);
      if (data.length > 0) {
        setActiveWorldTab(data[0].region);
      }
    }
  }, [headerData?.international_mega_menu]);

  // ✅ FIX: city_list se pehla tab initialize karo — useEffect mein taaki SSR mismatch na ho
  useEffect(() => {
    if (headerData?.city_list) {
      const firstTab = Object.keys(headerData.city_list)[0];
      if (firstTab && !activeIndiaTab) setActiveIndiaTab(firstTab);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerData?.city_list]);

  // ✅ FIX: holidays_mega_menu se first tab initialize karo
  useEffect(() => {
    if (headerData?.holidays_mega_menu) {
      const firstTab = Object.keys(headerData.holidays_mega_menu)[0];
      if (firstTab) setActiveHolidaysTab(firstTab);
    }
  }, [headerData?.holidays_mega_menu]);

  const closeAll = () => {
    setNavOpen(false);
    setMegaMenuOpen(null);
    setToursDropdownOpen(false);
    setWorldPage(0);
  };

  const handleMegaMenuToggle = (
    menu: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (window.innerWidth <= 1180) {
      setMegaMenuOpen(megaMenuOpen === menu ? null : menu);
      setToursDropdownOpen(false);
      setWorldPage(0);
    }
  };

  const handleToursDropdownToggle = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (window.innerWidth <= 1180) {
      setToursDropdownOpen(!toursDropdownOpen);
      setMegaMenuOpen(null);
    }
  };

  const handleHamburgerToggle = () => {
    setNavOpen(!navOpen);
    if (navOpen) closeAll();
  };

  const router = useRouter();

  const onRedirect = (slug: any) => {
    router.push(`/${slug}`);
  };

  const worldRedirect = (slug: any) => {
    router.push(`/international-holidays/${slug}`);
  };

  const closeMobileMenu = () => {
    if (window.innerWidth <= 1180) {
      setNavOpen(false);
      setMegaMenuOpen(null);
      setToursDropdownOpen(false);
    }
  };

  // ✅ FIX: regionSlugMap normalized keys ke saath
  const regionSlugMap = getRegionSlugMap(headerData?.regions);

  // India tab ke liye region slug
  const indiaRegionSlug = regionSlugMap[activeIndiaTab] ?? regionSlugMap[activeIndiaTab?.trim()] ?? null;

  const indianDmcCities: DmcCity[] =
    headerData?.dmcCity?.map((city: any) => ({
      name: city.title,
      slug: city.slug,
    })) || [];

  return (
    <nav className="custom-navbar">
      <div
        className={`menu-overlay ${
          navOpen || megaMenuOpen || toursDropdownOpen ? "show" : ""
        }`}
        onClick={closeAll}
      ></div>

      <div className="container">
        <div className="row">
          {/* Hamburger */}
          <button
            className={`hamburger ${navOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            onClick={handleHamburgerToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`mg-menu-wrap ${navOpen ? "show" : ""}`}>
            <ul className={`nav-links ${navOpen ? "show" : ""}`}>

              {headerData?.menus?.map((menu: any) => {

                /* ================= INDIA ================= */

                if (menu.type === "india") {
                  return (
                    <li
                      key={menu.id}
                      className="has-mega-menu"
                      onMouseEnter={() => {
                        if (window.innerWidth > 991) {
                          setMegaMenuOpen("india");
                          setToursDropdownOpen(false);
                        }
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth > 991) setMegaMenuOpen(null);
                      }}
                    >
                      <Link
                        href="/india"
                        onClick={() => {
                          setMegaMenuOpen(null);
                          setNavOpen(false);
                        }}
                      >
                        {menu.name}
                      </Link>

                      <span
                        className="arrow"
                        onClick={(e: any) => handleMegaMenuToggle("india", e)}
                      >
                        <svg width="10" height="6" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.89223 4.48336L0.880039 1.47117C0.658555 1.24969 0.658555 0.917464 0.880039 0.718128L1.36731 0.208714C1.58879 0.00937791 1.92102 0.00937791 2.12035 0.208714L4.2466 2.35711L6.395 0.208714C6.59434 0.00937791 6.92656 0.00937791 7.14805 0.208714L7.63531 0.718128C7.8568 0.917464 7.8568 1.24969 7.63531 1.47117L4.62313 4.48336C4.42379 4.6827 4.09156 4.6827 3.89223 4.48336Z" fill="black" />
                        </svg>
                      </span>

                      <div
                        className={`mega-menu ${
                          megaMenuOpen === "india" ? "show slide-up hovered" : ""
                        }`}
                      >
                        <div className="container">
                          <div className="row">
                            {/* India Tabs */}
                            <div className="col-lg-3 col-md-12 mega-menu-tabs">
                              {headerData?.city_list &&
                                Object.keys(headerData.city_list).map((tab) => {
                                  // ✅ FIX: activeIndiaTab empty hone par pehla tab active dikhao
                                  const cityKeys = Object.keys(headerData.city_list);
                                  const resolvedTab = activeIndiaTab || cityKeys[0] || "";
                                  return (
                                    <button
                                      key={tab}
                                      className={`tab-button ${resolvedTab === tab ? "active" : ""}`}
                                      onClick={() => setActiveIndiaTab(tab)}
                                    >
                                      {tab}
                                    </button>
                                  );
                                })}
                            </div>

                            {/* India Menu Sections */}
                            <div
                              className={`${
                                headerData?.india_promotion
                                  ? "col-lg-6"
                                  : "col-lg-9"
                              } menu-columns`}
                            >
                              {/* ✅ FIX: "All of Region" link REMOVED — sirf Holiday menu mein hona chahiye, India mein nahi */}

                              <div className="menu-row">
                                {headerData?.city_list &&
                                  Object.entries(
                                    headerData.city_list[
                                      activeIndiaTab || Object.keys(headerData.city_list)[0] || ""
                                    ] || {}
                                  ).map(([sectionTitle, sectionItems]: [string, any], i) => {
                                    const hasCities =
                                      Array.isArray(sectionItems?.cities) &&
                                      sectionItems.cities.length > 0;
                                    const stateSlug = sectionItems?.state?.slug;
                                    const stateName = sectionItems?.state?.name || sectionTitle;

                                    return (
                                      <div key={i} className="menu-column">
                                        <div className="clickable-state underLine">
                                          {stateSlug ? (
                                            <Link
                                              href={`/india/${stateSlug}`}
                                              onClick={closeMobileMenu}
                                            >
                                              {stateName}
                                            </Link>
                                          ) : (
                                            <span>{stateName}</span>
                                          )}
                                        </div>

                                        {hasCities && (
                                          <ul>
                                            {[...sectionItems.cities].map(
                                              (city: any, j: number) => (
                                                <li key={j}>
                                                  <Link
                                                    href={`/india/${city.slug}`}
                                                    onClick={closeMobileMenu}
                                                  >
                                                    {city.name}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>

                            {/* India Promotion */}
                            {headerData?.india_promotion ? (
                              <div className="col-lg-3 col-md-12 menu-promo">
                                {headerData.india_promotion.banner_image &&
                                  headerData.india_promotion.banner_image.trim() !==
                                    "" && (
                                    <Link
                                      href={
                                        headerData.india_promotion.link || "#"
                                      }
                                      className="custom-hover p-0"
                                      onClick={closeMobileMenu}
                                    >
                                      <Image
                                        src={
                                          headerData.india_promotion
                                            .banner_image ||
                                          "/images/no-img.webp"
                                        }
                                        alt={
                                          headerData.india_promotion
                                            .banner_image_alt || ""
                                        }
                                        width={300}
                                        height={180}
                                        className="h-54 object-cover rounded-1 mb-4 w-100 custom-hover"
                                      />
                                    </Link>
                                  )}
                                <Link
                                  href={headerData.india_promotion.link || "#"}
                                  onClick={() => setMegaMenuOpen(null)}
                                  className="fw-semibold p-0 mb-2"
                                >
                                  {headerData.india_promotion.title}
                                </Link>
                                <p
                                  className="mb-0 text-sm"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      headerData.india_promotion.details || "",
                                  }}
                                />
                                <Link
                                  href={headerData.india_promotion.link || "#"}
                                  onClick={() => setMegaMenuOpen(null)}
                                  className="p-0 mt-3 border-0"
                                >
                                  <div className="btn blue-btn">
                                    Explore Now{" "}
                                    <span>
                                      <Image
                                        width={23}
                                        height={23}
                                        sizes="100vw"
                                        src="/images/button-arrow.png"
                                        alt=""
                                      />
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                /* ================= INTERNATIONAL ================= */

                if (menu.type === "international") {
                  return (
                    <li
                      key={menu.id}
                      className="has-mega-menu"
                      onMouseEnter={() => {
                        if (window.innerWidth > 991) setMegaMenuOpen("world");
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth > 991) setMegaMenuOpen(null);
                      }}
                    >
                      <Link
                        href="/international-holidays"
                        onClick={() => {
                          setMegaMenuOpen(null);
                          setNavOpen(false);
                        }}
                      >
                        {menu.name}
                      </Link>

                      <span
                        className="arrow"
                        onClick={(e: any) => handleMegaMenuToggle("world", e)}
                      >
                        <svg width="10" height="6" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.89223 4.48336L0.880039 1.47117C0.658555 1.24969 0.658555 0.917464 0.880039 0.718128L1.36731 0.208714C1.58879 0.00937791 1.92102 0.00937791 2.12035 0.208714L4.2466 2.35711L6.395 0.208714C6.59434 0.00937791 6.92656 0.00937791 7.14805 0.208714L7.63531 0.718128C7.8568 0.917464 7.8568 1.24969 7.63531 1.47117L4.62313 4.48336C4.42379 4.6827 4.09156 4.6827 3.89223 4.48336Z" fill="black" />
                        </svg>
                      </span>

                      <div
                        className={`mega-menu ${
                          megaMenuOpen === "world"
                            ? "show slide-up hovered"
                            : ""
                        }`}
                      >
                        <div className="container">
                          <div className="row">
                            {/* INTERNATIONAL TABS (LEFT) */}
                            <div className="col-lg-3 col-md-12 mega-menu-tabs">
                              {internationalTabs.map((tab) => (
                                <button
                                  key={tab.region}
                                  className={`tab-button ${
                                    activeWorldTab === tab.region ? "active" : ""
                                  }`}
                                  onClick={() => setActiveWorldTab(tab.region)}
                                >
                                  {tab.region}
                                </button>
                              ))}
                            </div>

                            {/* INTERNATIONAL MENU */}
                            <div
                              className={`${
                                headerData?.international_promotion
                                  ? "col-lg-6"
                                  : "col-lg-9"
                              } menu-columns`}
                            >
                              <div className="menu-row">
                                {internationalTabs
                                  .find((t) => t.region === activeWorldTab)
                                  ?.countries.map(
                                    (country: any, i: number) => (
                                      <div key={i} className="menu-column">
                                        <div className="clickable-state underLine">
                                          <Link
                                            href={`/international-holidays/${country.slug}`}
                                            onClick={closeMobileMenu}
                                          >
                                            {country.name}
                                          </Link>
                                        </div>
                                        {country.locations &&
                                          country.locations.length > 0 && (
                                            <ul>
                                              {country.locations.map(
                                                (loc: any, j: number) => (
                                                  <li key={j}>
                                                    <Link
                                                      href={`/international-holidays/${loc.slug}`}
                                                      onClick={closeMobileMenu}
                                                    >
                                                      {loc.name}
                                                    </Link>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                      </div>
                                    )
                                  )}
                              </div>
                            </div>

                            {/* PROMOTION */}
                            {headerData?.international_promotion && (
                              <div className="col-lg-3 col-md-12 menu-promo">
                                <Link
                                  href={
                                    headerData.international_promotion.link ||
                                    "#"
                                  }
                                  onClick={closeMobileMenu}
                                >
                                  <Image
                                    src={
                                      headerData.international_promotion
                                        .banner_image || "/images/no-img.webp"
                                    }
                                    width={300}
                                    height={180}
                                    className="w-100 mb-3 rounded"
                                    alt=""
                                  />
                                </Link>
                                <Link
                                  href={
                                    headerData.international_promotion.link ||
                                    "#"
                                  }
                                  className="fw-semibold p-0"
                                >
                                  {headerData.international_promotion.title}
                                </Link>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      headerData.international_promotion
                                        .details || "",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                /* ================= HOLIDAYS ================= */

                if (menu.type === "holiday") {
                  return (
                    <li
                      key={menu.id}
                      className="has-mega-menu"
                      onMouseEnter={() => {
                        if (window.innerWidth > 991)
                          setMegaMenuOpen("holidays");
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth > 991) setMegaMenuOpen(null);
                      }}
                    >
                      <Link
                        href="/customized-holidays"
                        onClick={() => {
                          setMegaMenuOpen(null);
                          setNavOpen(false);
                        }}
                      >
                        {menu.name}
                      </Link>

                      <span
                        className="arrow"
                        onClick={(e: any) =>
                          handleMegaMenuToggle("holidays", e)
                        }
                      >
                        <svg width="10" height="6" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.89223 4.48336L0.880039 1.47117C0.658555 1.24969 0.658555 0.917464 0.880039 0.718128L1.36731 0.208714C1.58879 0.00937791 1.92102 0.00937791 2.12035 0.208714L4.2466 2.35711L6.395 0.208714C6.59434 0.00937791 6.92656 0.00937791 7.14805 0.208714L7.63531 0.718128C7.8568 0.917464 7.8568 1.24969 7.63531 1.47117L4.62313 4.48336C4.42379 4.6827 4.09156 4.6827 3.89223 4.48336Z" fill="black" />
                        </svg>
                      </span>

                      <div
                        className={`mega-menu ${
                          megaMenuOpen === "holidays"
                            ? "show slide-up hovered"
                            : ""
                        }`}
                      >
                        <div className="container">
                          <div className="row">
                            {/* ✅ FIX: holidays_mega_menu se tabs — india_mega_menu nahi */}
                            <div className="col-lg-3 col-md-12 mega-menu-tabs">
                              {headerData?.holidays_mega_menu &&
                                Object.keys(headerData.holidays_mega_menu).map(
                                  (tab) => (
                                    <button
                                      key={tab}
                                      className={`tab-button ${
                                        activeHolidaysTab === tab ? "active" : ""
                                      }`}
                                      onClick={() => setActiveHolidaysTab(tab)}
                                    >
                                      {tab}
                                    </button>
                                  )
                                )}
                            </div>

                            {/* ✅ FIX: holidays_mega_menu ka content + activeHolidaysTab */}
                            <div
                              className={`${
                                headerData?.india_promotion
                                  ? "col-lg-6"
                                  : "col-lg-9"
                              } menu-columns`}
                            >
                              {/*  FIX: All of Region link with correct slug */}
                              <div className="clickable-state all-of-region underLine mobile-region-tab">
                                <Link
                                  href={getRegionHref(
                                    activeHolidaysTab,
                                    regionSlugMap
                                  )}
                                  onClick={closeMobileMenu}
                                >
                                  All of{" "}
                                  {getRegionDisplayText(activeHolidaysTab)}
                                </Link>
                              </div>

                              <div className="menu-row">
                                {/* ✅ FIX: holidays_mega_menu use karo, india_mega_menu nahi */}
                                {headerData?.holidays_mega_menu &&
                                  headerData.holidays_mega_menu[
                                    activeHolidaysTab
                                  ] &&
                                  Object.entries(
                                    headerData.holidays_mega_menu[
                                      activeHolidaysTab
                                    ] || {}
                                  ).map(
                                    (
                                      [sectionTitle, sectionItems]: [
                                        string,
                                        any
                                      ],
                                      i
                                    ) => {
                                      const hasCities =
                                        Array.isArray(sectionItems?.cities) &&
                                        sectionItems.cities.length > 0;

                                      const stateSlug =
                                        sectionItems?.state?.slug &&
                                        sectionItems.state.slug !== ""
                                          ? sectionItems.state.slug
                                          : null;

                                      const stateName =
                                        sectionItems?.state?.name ||
                                        sectionTitle;

                                      return (
                                        <div key={i} className="menu-column">
                                          {hasCities ? (
                                            stateSlug ? (
                                              <div className="clickable-state underLine">
                                                <Link
                                                  href={`/india/${stateSlug}`}
                                                  onClick={closeMobileMenu}
                                                >
                                                  {`${stateName} Tour Packages`}
                                                </Link>
                                              </div>
                                            ) : (
                                              <div className="clickable-state underLine noLink">
                                                <span>{`${stateName} Tour Packages`}</span>
                                              </div>
                                            )
                                          ) : stateSlug ? (
                                            <div className="clickable-state">
                                              <Link
                                                href={`/india/${stateSlug}`}
                                                onClick={closeMobileMenu}
                                              >
                                                {`${stateName} Tour Packages`}
                                              </Link>
                                            </div>
                                          ) : (
                                            <div className="clickable-state">
                                              <span>{`${stateName} Tour Packages`}</span>
                                            </div>
                                          )}

                                          {hasCities && (
                                            <ul>
                                              {[...sectionItems.cities].map(
                                                (city: any, j: number) => (
                                                  <li key={j}>
                                                    <Link
                                                      href={`/india/${city.slug}`}
                                                      onClick={closeMobileMenu}
                                                    >
                                                      {`${city.name} Tour Packages`}
                                                    </Link>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </div>

                            {/* India Promotion (same) */}
                            {headerData?.india_promotion ? (
                              <div className="col-lg-3 col-md-12 menu-promo">
                                {headerData.india_promotion.banner_image &&
                                  headerData.india_promotion.banner_image.trim() !==
                                    "" && (
                                    <Link
                                      href={
                                        headerData.india_promotion.link || "#"
                                      }
                                      className="custom-hover p-0"
                                      onClick={closeMobileMenu}
                                    >
                                      <Image
                                        src={
                                          headerData.india_promotion
                                            .banner_image ||
                                          "/images/no-img.webp"
                                        }
                                        alt={
                                          headerData.india_promotion
                                            .banner_image_alt || ""
                                        }
                                        width={300}
                                        height={180}
                                        className="h-54 object-cover rounded-1 mb-4 w-100 custom-hover"
                                      />
                                    </Link>
                                  )}
                                <Link
                                  href={headerData.india_promotion.link || "#"}
                                  onClick={() => setMegaMenuOpen(null)}
                                  className="fw-semibold p-0 mb-2"
                                >
                                  {headerData.india_promotion.title}
                                </Link>
                                <p
                                  className="mb-0 text-sm"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      headerData.india_promotion.details || "",
                                  }}
                                />
                                <Link
                                  href={headerData.india_promotion.link || "#"}
                                  onClick={() => setMegaMenuOpen(null)}
                                  className="p-0 mt-3 border-0"
                                >
                                  <div className="btn blue-btn">
                                    Explore Now{" "}
                                    <span>
                                      <Image
                                        width={23}
                                        height={23}
                                        sizes="100vw"
                                        src="/images/button-arrow.png"
                                        alt=""
                                      />
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                /* ================= LUXURY ================= */

                if (menu.type === "luxury") {
                  return (
                    <li key={menu.id} className="has-dropdown"
                      onMouseEnter={() => {
                        if (window.innerWidth > 991) setToursDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth > 991) setToursDropdownOpen(false);
                      }}
                    >
                      <a onClick={handleToursDropdownToggle}>
                        {menu.name}
                      </a>

                      <span onClick={handleToursDropdownToggle} className="arrow">
                        <svg width="10" height="6" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.89223 4.48336L0.880039 1.47117C0.658555 1.24969 0.658555 0.917464 0.880039 0.718128L1.36731 0.208714C1.58879 0.00937791 1.92102 0.00937791 2.12035 0.208714L4.2466 2.35711L6.395 0.208714C6.59434 0.00937791 6.92656 0.00937791 7.14805 0.208714L7.63531 0.718128C7.8568 0.917464 7.8568 1.24969 7.63531 1.47117L4.62313 4.48336C4.42379 4.6827 4.09156 4.6827 3.89223 4.48336Z" fill="black" />
                        </svg>
                      </span>

                      <ul
                        className={`dropdown-menu ${
                          toursDropdownOpen ? "show slide-up" : ""
                        }`}
                      >
                        <li>
                          <Link
                            href="/luxury-trains"
                            onClick={() => {
                              setToursDropdownOpen(false);
                              setNavOpen(false);
                            }}
                          >
                            <Image
                              src="/images/icon/train-svg.svg"
                              width={23}
                              height={23}
                              sizes="100vw"
                              alt=""
                            />
                            Luxury Trains
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/luxury-hotels"
                            onClick={() => {
                              setToursDropdownOpen(false);
                              setNavOpen(false);
                            }}
                          >
                            <Image
                              src="/images/icon/hotel-svg.svg"
                              width={23}
                              height={23}
                              sizes="100vw"
                              alt=""
                            />
                            Luxury Hotels
                          </Link>
                        </li>
                      </ul>
                    </li>
                  );
                }

                /* ================= INDIAN DMC ================= */

                if (menu.slug === "indian-dmc" && indianDmcCities.length > 0) {
                  return (
                    <li key={menu.id} className="has-mega-menu"
                      onMouseEnter={() => {
                        if (window.innerWidth > 991)
                          setMegaMenuOpen("indian-dmc");
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth > 991) setMegaMenuOpen(null);
                      }}
                    >
                      <Link
                        href="/indian-dmc"
                        onClick={() => {
                          setMegaMenuOpen(null);
                          setNavOpen(false);
                        }}
                      >
                        {menu.name}
                      </Link>

                      <span
                        className="arrow"
                        onClick={(e: any) =>
                          handleMegaMenuToggle("indian-dmc", e)
                        }
                      >
                        <svg width="10" height="6" viewBox="0 0 8 5" fill="none">
                          <path d="M3.89223 4.48336L0.880039 1.47117C0.658555 1.24969 0.658555 0.917464 0.880039 0.718128L1.36731 0.208714C1.58879 0.00937791 1.92102 0.00937791 2.12035 0.208714L4.2466 2.35711L6.395 0.208714C6.59434 0.00937791 6.92656 0.00937791 7.14805 0.208714L7.63531 0.718128C7.8568 0.917464 7.8568 1.24969 7.63531 1.47117L4.62313 4.48336C4.42379 4.6827 4.09156 4.6827 3.89223 4.48336Z" />
                        </svg>
                      </span>

                      <div
                        className={`mega-menu ${
                          megaMenuOpen === "indian-dmc"
                            ? "show slide-up"
                            : ""
                        }`}
                      >
                        <div className="container">
                          <div className="menu-row">
                            {indianDmcCities.map((city) => (
                              <div key={city.slug} className="menu-column">
                                <div className="clickable-state underLine">
                                  <Link
                                    href={`/indian-dmc/${city.slug}`}
                                    onClick={closeMobileMenu}
                                  >
                                    {city.name}
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                /* ================= NORMAL ================= */

                return (
                  <li key={menu.id}>
                    <Link href={`/${menu.slug}`} onClick={closeMobileMenu}>
                      {menu.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
