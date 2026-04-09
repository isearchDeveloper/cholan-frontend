"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type DmcCity = {
  name: string;
  slug: string;
};

export default function Navigation({ headerData }: any) {
  const tabs = Object.keys(headerData?.holidays_mega_menu || {});
  const cityTabs = Object.keys(headerData?.city_list || {});
  const menus = headerData?.menus || [];
  const internationalTabs = headerData?.international_mega_menu || [];

  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const indianDmcCities: DmcCity[] =
    headerData?.dmcCity?.map((city: any) => ({
      // name: city.title?.replace(/dmc/gi, "").trim(),
      name: city.title,
      slug: city.slug,
    })) || [];

  // ✅ FIX 1: regionSlugMap with normalized keys to handle whitespace/case mismatches
  const regionSlugMap = (headerData?.regions || []).reduce((acc: any, r: any) => {
    if (r.name) {
      acc[r.name] = r.slug;
      acc[r.name.trim()] = r.slug; // trimmed version bhi store karo
    }
    return acc;
  }, {});

  // Scroll effect
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

  const closeAll = () => {
    setNavOpen(false);
    setMegaMenuOpen(null);
    setDropdownOpen(null);
  };

  useEffect(() => {
    closeAll();
  }, [pathname]);

  const closeMobileMenu = () => {
    if (window.innerWidth <= 1180) closeAll();
  };

  const handleHamburgerToggle = () => {
    setNavOpen(!navOpen);
  };

  const handleMegaMenuDesktopToggle = (menu: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.innerWidth <= 1180) {
      setMegaMenuOpen(megaMenuOpen === menu ? null : menu);
    }
  };

  const handleDropdownToggle = (menu: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.innerWidth <= 1180) {
      setDropdownOpen(dropdownOpen === menu ? null : menu);
    }
  };

  const worldRedirect = (slug: string) => {
    const finalSlug = slug === "sri-lanka-tour-packages" ? "srilanka" : slug;
    router.push(`/international-holidays/${finalSlug}`);
    closeAll();
  };

  const REGION_DISPLAY_LABELS: Record<string, string> = {
    "North India": "North India",
    "South India": "South India",
    "East & North East India": "North East",
    "West & Central India": "West Central",
  };

  const getRegionDisplayText = (regionName: string) => {
    return REGION_DISPLAY_LABELS[regionName] ?? regionName;
  };

  // ✅ FIX 2: Robust slug generation for holiday region links
  const getRegionHref = (tab: string) => {
    // regionSlugMap mein trimmed aur original dono try karo
    const slug = regionSlugMap[tab] ?? regionSlugMap[tab?.trim()] ?? null;
    if (slug) return `/india/${slug}`;
    // Fallback: tab name se slug generate karo
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

  const ArrowIcon = () => (
    <svg
      width="10"
      height="6"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.89223 4.48336L0.880039 1.47117C0.658555 1.24969 0.658555 0.917464 0.880039 0.718128L1.36731 0.208714C1.58879 0.00937791 1.92102 0.00937791 2.12035 0.208714L4.2466 2.35711L6.395 0.208714C6.59434 0.00937791 6.92656 0.00937791 7.14805 0.208714L7.63531 0.718128C7.8568 0.917464 7.8568 1.24969 7.63531 1.47117L4.62313 4.48336C4.42379 4.6827 4.09156 4.6827 3.89223 4.48336Z"
        fill="black"
      />
    </svg>
  );

  return (
    <>
      <nav className="custom-navbar">
        <div
          className={`menu-overlay ${
            navOpen || megaMenuOpen || dropdownOpen ? "show" : ""
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

                  if (menu.slug === "india") {
                    return (
                      <li
                        key={menu.id}
                        className="has-mega-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 991) setMegaMenuOpen("india");
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 991) setMegaMenuOpen(null);
                        }}
                      >
                        <Link href="/india">{menu.name}</Link>

                        <span
                          className="arrow"
                          onClick={(e) => handleMegaMenuDesktopToggle("india", e)}
                        >
                          <ArrowIcon />
                        </span>

                        {megaMenuOpen === "india" && (
                          <div
                            className={`mega-menu ${
                              megaMenuOpen === "india"
                                ? "show slide-up hovered"
                                : ""
                            }`}
                          >
                            <div className="container">
                              {cityTabs.map((tab, index) => (
                                <input
                                  key={`india-input-${index}`}
                                  type="radio"
                                  id={`india-tab-${index}`}
                                  name="india-tab"
                                  defaultChecked={index === 0}
                                  className="sr-only"
                                />
                              ))}

                              <div className="row">
                                {/* Tabs */}
                                <div className="col-lg-3 col-md-12 mega-menu-tabs">
                                  {cityTabs.map((tab, index) => (
                                    <label
                                      key={`india-label-${index}`}
                                      htmlFor={`india-tab-${index}`}
                                      className="tab-button"
                                      onMouseEnter={() => {
                                        if (window.innerWidth > 991) {
                                          const input = document.getElementById(
                                            `india-tab-${index}`
                                          ) as HTMLInputElement;
                                          if (input) input.checked = true;
                                        }
                                      }}
                                    >
                                      {tab}
                                    </label>
                                  ))}
                                </div>

                                {/* Menu Items */}
                                <div
                                  className={`${
                                    headerData?.india_promotion
                                      ? "col-lg-6"
                                      : "col-lg-9"
                                  } menu-columns`}
                                >
                                  {cityTabs.map((tab, index) => {
                                    const thisSections =
                                      headerData?.city_list?.[tab];
                                    const sortedIndiaSections = thisSections
                                      ? Object.entries(thisSections)
                                      : [];

                                    return (
                                      <div
                                        key={`india-panel-${index}`}
                                        className={`panel panel-${index}`}
                                      >
                                        <div className="menu-row">
                                          {sortedIndiaSections.map(
                                            (
                                              [sectionTitle, sectionItems]: [
                                                string,
                                                any
                                              ],
                                              i
                                            ) => {
                                              const hasCities =
                                                Array.isArray(
                                                  sectionItems?.cities
                                                ) &&
                                                sectionItems.cities.length > 0;
                                              const stateSlug =
                                                sectionItems?.state?.slug;
                                              const stateName =
                                                sectionItems?.state?.name ||
                                                sectionTitle;
                                              const sortedCities = hasCities
                                                ? sectionItems.cities
                                                : [];

                                              return (
                                                <div
                                                  key={i}
                                                  className="menu-column"
                                                >
                                                  {hasCities ? (
                                                    <div className="clickable-state underLine">
                                                      {stateSlug ? (
                                                        <Link
                                                          href={`/india/${stateSlug}`}
                                                          onClick={
                                                            closeMobileMenu
                                                          }
                                                        >
                                                          {stateName}
                                                        </Link>
                                                      ) : (
                                                        <span>{stateName}</span>
                                                      )}
                                                    </div>
                                                  ) : (
                                                    <div className="clickable-state">
                                                      {stateSlug ? (
                                                        <Link
                                                          href={`/india/${stateSlug}`}
                                                          onClick={
                                                            closeMobileMenu
                                                          }
                                                        >
                                                          {stateName}
                                                        </Link>
                                                      ) : (
                                                        <span>{stateName}</span>
                                                      )}
                                                    </div>
                                                  )}

                                                  {hasCities && (
                                                    <ul>
                                                      {[
                                                        ...sectionItems.cities,
                                                      ].map(
                                                        (
                                                          city: any,
                                                          j: number
                                                        ) => (
                                                          <li key={j}>
                                                            <Link
                                                              href={`/india/${city.slug}`}
                                                              onClick={
                                                                closeMobileMenu
                                                              }
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
                                            }
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* India Promotion */}
                                {headerData?.india_promotion && (
                                  <div className="col-lg-3 col-md-12 menu-promo">
                                    <Link
                                      href={
                                        headerData?.india_promotion?.link || "#"
                                      }
                                      onClick={closeMobileMenu}
                                      className="custom-hover p-0"
                                    >
                                      <Image
                                        src={
                                          headerData?.india_promotion
                                            ?.banner_image ||
                                          "/images/no-img.webp"
                                        }
                                        alt={
                                          headerData?.india_promotion
                                            ?.banner_image_alt || ""
                                        }
                                        width={300}
                                        height={180}
                                        className="h-54 object-cover rounded-1 mb-4 w-100 custom-hover"
                                      />
                                    </Link>
                                    <Link
                                      href={
                                        headerData?.india_promotion?.link || "#"
                                      }
                                      onClick={closeMobileMenu}
                                      className="fw-semibold p-0 mb-2"
                                    >
                                      <div className="promotion-titles">
                                        {headerData?.india_promotion?.title}
                                      </div>
                                    </Link>
                                    <p
                                      className="mb-0 text-sm"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          headerData?.india_promotion
                                            ?.details || "",
                                      }}
                                    />
                                    <Link
                                      href={
                                        headerData?.india_promotion?.link || "#"
                                      }
                                      onClick={closeMobileMenu}
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
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  /* ================= INTERNATIONAL ================= */

                  if (menu.slug === "international") {
                    return (
                      <li
                        key={menu.id}
                        className="has-mega-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 991)
                            setMegaMenuOpen("international");
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 991) setMegaMenuOpen(null);
                        }}
                      >
                        <Link href="/international-holidays">
                          {menu.name}
                        </Link>

                        <span
                          className="arrow"
                          onClick={(e) =>
                            handleMegaMenuDesktopToggle("international", e)
                          }
                        >
                          <ArrowIcon />
                        </span>

                        {megaMenuOpen === "international" && (
                          <div
                            className={`mega-menu ${
                              megaMenuOpen === "international"
                                ? "show slide-up hovered"
                                : ""
                            }`}
                          >
                            <div className="container">
                              {internationalTabs.map((_: any, i: number) => (
                                <input
                                  key={`int-tab-${i}`}
                                  type="radio"
                                  id={`int-tab-${i}`}
                                  name="international-tab"
                                  defaultChecked={i === 0}
                                  className="sr-only"
                                />
                              ))}

                              <div className="row">
                                {/* LEFT: Continents */}
                                <div className="col-lg-3 col-md-12 mega-menu-tabs">
                                  {internationalTabs.map(
                                    (continent: any, i: number) => (
                                      <label
                                        key={i}
                                        htmlFor={`int-tab-${i}`}
                                        className="tab-button"
                                        onMouseEnter={() => {
                                          if (window.innerWidth > 991) {
                                            const input =
                                              document.getElementById(
                                                `int-tab-${i}`
                                              ) as HTMLInputElement;
                                            if (input) input.checked = true;
                                          }
                                        }}
                                      >
                                        {continent.name}
                                      </label>
                                    )
                                  )}
                                </div>

                                {/* CENTER: Countries + Locations */}
                                <div
                                  className={`${
                                    headerData?.international_promotion
                                      ? "col-lg-6"
                                      : "col-lg-9"
                                  } menu-columns`}
                                >
                                  {internationalTabs.map(
                                    (continent: any, i: number) => (
                                      <div
                                        key={i}
                                        className={`panel panel-${i}`}
                                      >
                                        <div className="menu-row">
                                          {continent.countries
                                            ?.filter(
                                              (c: any) =>
                                                c.locations?.length > 0
                                            )
                                            .map(
                                              (country: any, j: number) => (
                                                <div
                                                  key={j}
                                                  className="menu-column international-mega-menu"
                                                >
                                                  <div className="clickable-state underLine">
                                                    <Link
                                                      href={`/international-holidays/${country.slug?.endsWith("-tour-packages") ? country.slug : `${country.slug}-tour-packages`}`}
                                                      onClick={closeMobileMenu}
                                                    >
                                                      {country.name}
                                                    </Link>
                                                  </div>
                                                  <ul>
                                                    {country.locations.map(
                                                      (
                                                        loc: any,
                                                        k: number
                                                      ) => (
                                                        <li key={k}>
                                                          <Link
                                                            href={`/international-holidays/${loc.slug?.endsWith("-tour-packages") ? loc.slug : `${loc.slug}-tour-packages`}`}
                                                            onClick={
                                                              closeMobileMenu
                                                            }
                                                          >
                                                            {loc.name}
                                                          </Link>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </div>
                                              )
                                            )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>

                                {/* RIGHT: Promo Image */}
                                {headerData?.international_promotion && (
                                  <div className="col-lg-3 col-md-12 menu-promo">
                                    <Link
                                      href={
                                        headerData?.international_promotion
                                          ?.link || "#"
                                      }
                                      onClick={closeMobileMenu}
                                      className="custom-hover p-0"
                                    >
                                      <Image
                                        src={
                                          headerData?.international_promotion
                                            ?.banner_image ||
                                          "/images/no-img.webp"
                                        }
                                        alt={
                                          headerData?.international_promotion
                                            ?.banner_image_alt || ""
                                        }
                                        width={300}
                                        height={180}
                                        className="h-54 object-cover rounded-1 mb-4 w-100"
                                      />
                                    </Link>
                                    <h5>
                                      {
                                        headerData?.international_promotion
                                          ?.title
                                      }
                                    </h5>
                                    <p
                                      className="mb-0 text-sm"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          headerData?.international_promotion
                                            ?.details || "",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  /* ================= HOLIDAYS ================= */

                  if (menu.slug === "holidays") {
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
                        <Link href="/customized-holidays">{menu.name}</Link>

                        <span
                          className="arrow"
                          onClick={(e) =>
                            handleMegaMenuDesktopToggle("holidays", e)
                          }
                        >
                          <ArrowIcon />
                        </span>

                        {megaMenuOpen === "holidays" && (
                          <div
                            className={`mega-menu ${
                              megaMenuOpen === "holidays"
                                ? "show slide-up hovered"
                                : ""
                            }`}
                          >
                            <div className="container">
                              {tabs.map((tab, index) => (
                                <input
                                  key={`holidays-input-${index}`}
                                  type="radio"
                                  id={`holidays-tab-${index}`}
                                  name="holidays-tab"
                                  defaultChecked={index === 0}
                                  className="sr-only"
                                />
                              ))}

                              <div className="row">
                                {/* Tabs */}
                                <div className="col-lg-3 col-md-12 mega-menu-tabs">
                                  {tabs.map((tab, index) => (
                                    <label
                                      key={`holidays-label-${index}`}
                                      htmlFor={`holidays-tab-${index}`}
                                      className="tab-button"
                                      onMouseEnter={() => {
                                        if (window.innerWidth > 991) {
                                          const input =
                                            document.getElementById(
                                              `holidays-tab-${index}`
                                            ) as HTMLInputElement;
                                          if (input) input.checked = true;
                                        }
                                      }}
                                    >
                                      {tab}
                                    </label>
                                  ))}
                                </div>

                                {/* Menu Items */}
                                <div
                                  className={`${
                                    headerData?.india_promotion
                                      ? "col-lg-6"
                                      : "col-lg-9"
                                  } menu-columns`}
                                >
                                  {tabs.map((tab, index) => {
                                    const thisSections =
                                      headerData?.holidays_mega_menu?.[tab];
                                    const regionSlugMap = (
                                      headerData?.regions || []
                                    ).reduce((acc: any, r: any) => {
                                      acc[r.name] = r.slug;
                                      return acc;
                                    }, {});

                                    const regionSlug = regionSlugMap[tab];
                                    // ✅ Modified: Sort STATES alphabetically
                                    const sortedIndiaSections = thisSections
                                      ? Object.entries(thisSections) : [];
                                    // const sortedIndiaSections = thisSections
                                    //   ? Object.entries(thisSections).sort(
                                    //       ([, a]: [string, any], [, b]: [string, any]) =>
                                    //         (Array.isArray(a?.cities) ? a.cities.length : 0) -
                                    //         (Array.isArray(b?.cities) ? b.cities.length : 0)
                                    //     )
                                    //   : [];

                                    return (
                                      <div
                                        key={`holidays-panel-${index}`}
                                        className={`panel panel-${index}`}
                                      >
                                        {/*  ALL OF REGION LINK (ONLY ONCE) */}
                                        <div className="clickable-state all-of-region underLine">
                                          <Link
                                            href={getRegionHref(tab)}
                                            onClick={closeMobileMenu}
                                          >
                                            All of {getRegionDisplayText(tab)}
                                          </Link>
                                        </div>

                                        <div className="menu-row">
                                          {sortedIndiaSections.map(
                                            (
                                              [
                                                sectionTitle,
                                                sectionItems,
                                              ]: [string, any],
                                              i
                                            ) => {
                                              const hasCities =
                                                Array.isArray(
                                                  sectionItems?.cities
                                                ) &&
                                                sectionItems.cities.length > 0;

                                              const stateName =
                                                sectionItems?.state?.name ||
                                                sectionTitle;

                                              const stateSlugFromApi =
                                                sectionItems?.state?.slug;

                                              const stateSlug =
                                                stateSlugFromApi &&
                                                stateSlugFromApi !== ""
                                                  ? stateSlugFromApi
                                                  : null;

                                              const sortedCities = hasCities
                                                ? [...sectionItems.cities]
                                                : [];

                                              return (
                                                <div
                                                  key={i}
                                                  className="menu-column"
                                                >
                                                  {hasCities ? (
                                                    <div className="clickable-state underLine">
                                                      {stateSlug ? (
                                                        <Link
                                                          href={`/india/${stateSlug}`}
                                                          onClick={
                                                            closeMobileMenu
                                                          }
                                                        >
                                                          {`${stateName} Tour Packages`}
                                                        </Link>
                                                      ) : (
                                                        <span>{`${stateName} Tour Packages`}</span>
                                                      )}
                                                    </div>
                                                  ) : (
                                                    <div className="clickable-state">
                                                      {stateSlug ? (
                                                        <Link
                                                          href={`/india/${stateSlug}`}
                                                          onClick={
                                                            closeMobileMenu
                                                          }
                                                        >
                                                          {`${stateName} Tour Packages`}
                                                        </Link>
                                                      ) : (
                                                        <span>{`${stateName} Tour Packages`}</span>
                                                      )}
                                                    </div>
                                                  )}

                                                  {hasCities && (
                                                    <ul>
                                                      {sortedCities.map(
                                                        (
                                                          city: any,
                                                          j: number
                                                        ) => (
                                                          <li key={j}>
                                                            <Link
                                                              href={`/india/${city.slug}`}
                                                              onClick={
                                                                closeMobileMenu
                                                              }
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
                                    );
                                  })}
                                </div>

                                {/* India Promotion */}
                                {headerData?.india_promotion && (
                                  <div className="col-lg-3 col-md-12 menu-promo">
                                    <Link
                                      href={
                                        headerData?.india_promotion?.link || "#"
                                      }
                                      onClick={closeMobileMenu}
                                      className="custom-hover p-0"
                                    >
                                      <Image
                                        src={
                                          headerData?.india_promotion
                                            ?.banner_image ||
                                          "/images/no-img.webp"
                                        }
                                        alt={
                                          headerData?.india_promotion
                                            ?.banner_image_alt || ""
                                        }
                                        width={300}
                                        height={180}
                                        className="h-54 object-cover rounded-1 mb-4 w-100 custom-hover"
                                      />
                                    </Link>
                                    <Link
                                      href={
                                        headerData?.india_promotion?.link || "#"
                                      }
                                      onClick={closeMobileMenu}
                                      className="fw-semibold p-0 mb-2"
                                    >
                                      <div className="promotion-titles">
                                        {headerData?.india_promotion?.title}
                                      </div>
                                    </Link>
                                    <p
                                      className="mb-0 text-sm"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          headerData?.india_promotion
                                            ?.details || "",
                                      }}
                                    />
                                    <Link
                                      href={
                                        headerData?.india_promotion?.link || "#"
                                      }
                                      onClick={closeMobileMenu}
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
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  /* ================= INDIAN DMC ================= */

                  if (menu.slug === "indian-dmc" && indianDmcCities.length > 0) {
                    return (
                      <li
                        key={menu.id}
                        className="has-mega-menu"
                        onMouseEnter={() => {
                          if (window.innerWidth > 991)
                            setMegaMenuOpen("indian-dmc");
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 991) setMegaMenuOpen(null);
                        }}
                      >
                        <Link href="/indian-dmc">{menu.name}</Link>

                        <span
                          className="arrow"
                          onClick={(e) =>
                            handleMegaMenuDesktopToggle("indian-dmc", e)
                          }
                        >
                          <ArrowIcon />
                        </span>

                        {megaMenuOpen === "indian-dmc" && (
                          <div className="mega-menu dmc-menu show">
                            <div className="container">
                              <div className="row">
                                <div className="col-lg-12 menu-columns">
                                  <div className="menu-row">
                                    {indianDmcCities.map(
                                      (city: DmcCity, i: number) => (
                                        <div key={i} className="menu-column">
                                          <div className="clickable-state underLine">
                                            <Link
                                              href={`/indian-dmc/${city.slug}`}
                                              onClick={closeMobileMenu}
                                            >
                                              {city.name}
                                            </Link>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  /* ================= LUXURY ================= */

                  if (menu.name?.toLowerCase() === "luxury") {
                    return (
                      <li
                        key={menu.id}
                        className="has-dropdown"
                        onMouseEnter={() => {
                          if (window.innerWidth > 991) {
                            setDropdownOpen("luxury");
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.innerWidth > 991) {
                            setDropdownOpen(null);
                          }
                        }}
                      >
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          Luxury
                        </a>

                        <span
                          className="arrow"
                          onClick={(e) => handleDropdownToggle("luxury", e)}
                        >
                          <ArrowIcon />
                        </span>

                        <ul
                          className={`dropdown-menu ${
                            dropdownOpen === "luxury" ? "show slide-up" : ""
                          }`}
                        >
                          <li>
                            <Link
                              href="/luxury-trains"
                              onClick={closeMobileMenu}
                            >
                              <Image
                                src="/images/icon/train-svg.svg"
                                width={23}
                                height={23}
                                alt=""
                              />
                              Luxury Trains
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/luxury-hotels"
                              onClick={closeMobileMenu}
                            >
                              <Image
                                src="/images/icon/hotel-svg.svg"
                                width={23}
                                height={23}
                                alt=""
                              />
                              Luxury Hotels
                            </Link>
                          </li>
                        </ul>
                      </li>
                    );
                  }

                  /* ================= DEFAULT / NORMAL ================= */

                  return (
                    <li key={menu.id}>
                      <Link href={`/${menu.slug}`}>{menu.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
