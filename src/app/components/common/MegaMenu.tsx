"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";
import { useRouter } from "next/navigation";
// Tabs
const indiaTabs = [
  "North India",
  "South India",
  "East & North India",
  "West & Central India",
];
const worldTabs = ["Trending", "Countries", "Regions", "Cities", "Continents"];
// World Promo Data
const worldPromo = {
  img: "/images/banne2.jpg",
  title: "Explore the World",
  desc: "Discover global destinations and unique adventures.",
  buttonText: "Explore Now",
};

interface MegaMenuProps {
  headerData: any;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

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
  const [activeIndiaTab, setActiveIndiaTab] = useState("North India");
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
  
  return (
    <nav className="custom-navbar">
      <div
        className={`menu-overlay ${navOpen || megaMenuOpen || toursDropdownOpen ? "show" : ""
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
              {/* ================= INDIA MENU ================= */}
              <li
                className="has-mega-menu"
                onMouseEnter={() => {
                  if (window.innerWidth > 991) {
                    setMegaMenuOpen("india");
                    setToursDropdownOpen(false);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 991) {
                    setMegaMenuOpen(null);
                  }
                }}
              >
                <Link
                  href="/india"
                  onClick={(e: any) => {
                    setMegaMenuOpen(null);
                    setNavOpen(false);
                  }}
                >
                  India
                </Link>
                <span
                  onClick={(e: any) => handleMegaMenuToggle("india", e)}
                  className="arrow"
                >
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
                </span>
                <div
                  className={`mega-menu ${megaMenuOpen === "india" ? "show slide-up hovered" : ""
                    }`}
                >
                  <div className="container">
                    <div className="row">
                      {/* India Tabs */}
                      <div className="col-lg-3 col-md-12 mega-menu-tabs">
                        {headerData?.india_mega_menu &&
                          Object.keys(headerData?.india_mega_menu).map(
                            (tab) => (
                              <button
                                key={tab}
                                className={`tab-button ${activeIndiaTab === tab ? "active" : ""
                                  }`}
                                onClick={() => setActiveIndiaTab(tab)}
                              >
                                {tab}
                              </button>
                            )
                          )}
                      </div>
                      {/* India Menu Sections */}
                      <div
                        className={`${headerData?.india_promotion ? "col-lg-6" : "col-lg-9"
                          } menu-columns`}
                      >
                        <div className="menu-row">
                          {headerData?.india_mega_menu &&
                            headerData?.india_mega_menu[activeIndiaTab] &&
                            Object.entries(
                              headerData?.india_mega_menu[activeIndiaTab] || {}
                            )
                              .sort((a, b) => {
                                const aItem = a[1] as any;
                                const bItem = b[1] as any;

                                const nameA = (aItem?.state?.name || a[0] || "")
                                  .toString()
                                  .toLowerCase();

                                const nameB = (bItem?.state?.name || b[0] || "")
                                  .toString()
                                  .toLowerCase();

                                return nameA.localeCompare(nameB);
                              })
                              .map(
                                (
                                  [sectionTitle, sectionItems]: [string, any],
                                  i
                                ) => {
                                  const hasCities =
                                    Array.isArray(sectionItems?.cities) &&
                                    sectionItems.cities.length > 0;
                                  const stateSlug = sectionItems?.state?.slug;
                                  const stateName =
                                    sectionItems?.state?.name || sectionTitle;
                                  return (
                                    <div key={i} className="menu-column">
                                      {/* State Heading - Conditionally render as link or heading */}
                                      {hasCities ? (
                                        // When cities exist, show as regular heading
                                        stateSlug ? (
                                          <h4 className="clickable-state underLine">
                                            {" "}
                                            <Link
                                              href={`/india/${stateSlug}`}
                                              onClick={closeMobileMenu}
                                            >
                                              {stateName}
                                            </Link>
                                          </h4>
                                        ) : (
                                          <h4 className="clickable-state underLine noLink">
                                            {" "}
                                            <span>{stateName} </span>{" "}
                                          </h4>
                                        )
                                      ) : stateSlug ? (
                                        // When no cities but has slug, show as clickable link
                                        <h4 className="clickable-state">
                                          <Link
                                            href={`/india/${stateSlug}`}
                                            onClick={() => {
                                              closeMobileMenu();
                                            }}
                                          >
                                            {stateName}
                                          </Link>
                                        </h4>
                                      ) : (
                                        // Fallback - just show as heading
                                        <h4>{stateName}</h4>
                                      )}
                                      {/* City List - Only show when cities exist */}
                                      {hasCities && (
                                        <ul>
                                          {[...sectionItems.cities]
                                            .sort((a, b) =>
                                              a.name.localeCompare(b.name)
                                            )
                                            .map((city: any, j: number) => (
                                              <li key={j}>
                                                <Link
                                                  href={`/india/${city.slug}`}
                                                  onClick={() => {
                                                    closeMobileMenu();
                                                  }}
                                                >
                                                  {city.name}
                                                </Link>
                                              </li>
                                            ))}
                                        </ul>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                        </div>
                      </div>
                      {headerData?.india_promotion ? (
                        <div className="col-lg-3 col-md-12 menu-promo">
                          {headerData?.india_promotion?.banner_image &&
                            headerData?.india_promotion?.banner_image.trim() !==
                            "" && (
                              <Link
                                href={headerData?.india_promotion?.link}
                                className="custom-hover p-0"
                                onClick={() => {
                                  closeMobileMenu();
                                }}
                              >
                                <Image
                                  src={
                                    headerData?.india_promotion?.banner_image ||
                                    "/images/no-img.webp"
                                  }
                                  alt={
                                    headerData?.india_promotion
                                      ?.banner_image_alt
                                  }
                                  width={300}
                                  height={180}
                                  className="h-54 object-cover rounded-1 mb-4 w-100 custom-hover"
                                />
                              </Link>
                            )}
                          <Link
                            href={headerData?.india_promotion?.link}
                            onClick={() => setMegaMenuOpen(null)}
                            className="fw-semibold p-0 mb-2"
                          >
                            {headerData?.india_promotion?.title}
                          </Link>
                          <p
                            className="mb-0 text-sm"
                            dangerouslySetInnerHTML={{
                              __html: headerData?.india_promotion?.details,
                            }}
                          />
                          <Link
                            href={headerData?.india_promotion?.link || ""}
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
              <li
                className="has-mega-menu"
                onMouseEnter={() => {
                  if (window.innerWidth > 991) {
                    setMegaMenuOpen("world");
                    setToursDropdownOpen(false);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 991) {
                    setMegaMenuOpen(null);
                  }
                }}
              >
                <Link
                  href="/international-holidays"
                  onClick={() => {
                    setMegaMenuOpen(null);
                    setNavOpen(false);
                  }}
                >
                  International
                </Link>
                <span
                  onClick={(e: any) => handleMegaMenuToggle("world", e)}
                  className="arrow"
                >
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
                </span>
                <div
                  className={`mega-menu ${megaMenuOpen === "world" ? "show slide-up hovered" : ""
                    }`}
                >
                  <div className="container">
                    <div className="row">
                      {/* INTERNATIONAL TABS (LEFT) */}
                      <div className="col-lg-3 col-md-12 mega-menu-tabs">
                        {internationalTabs.map((tab) => (
                          <button
                            key={tab.region}
                            className={`tab-button ${activeWorldTab === tab.region ? "active" : ""
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
    headerData?.international_promotion ? "col-lg-6" : "col-lg-9"
  } menu-columns`}
>
  <div className="menu-row">
    {internationalTabs
      .find((t) => t.region === activeWorldTab)
      ?.countries.map((country: any, i: number) => (
        <div key={i} className="menu-column">
          {/* COUNTRY */}
          <h4 className="clickable-state underLine">
            <Link
              href={`/international-holidays/${country.slug}`}
              onClick={closeMobileMenu}
            >
              {country.name}
            </Link>
          </h4>

          {/* LOCATIONS */}
          {country.locations && country.locations.length > 0 && (
            <ul>
              {country.locations.map((loc: any, j: number) => (
                <li key={j}>
                  <Link
                    href={`/international-holidays/${loc.slug}`}
                    onClick={closeMobileMenu}
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
  </div>
</div>


                      {/* PROMOTION (UNCHANGED) */}
                      {headerData?.international_promotion && (
                        <div className="col-lg-3 col-md-12 menu-promo">
                          <Link
                            href={headerData.international_promotion.link}
                            onClick={closeMobileMenu}
                          >
                            <Image
                              src={
                                headerData.international_promotion.banner_image ||
                                "/images/no-img.webp"
                              }
                              width={300}
                              height={180}
                              className="w-100 mb-3 rounded"
                              alt=""
                            />
                          </Link>
                          <Link
                            href={headerData.international_promotion.link}
                            className="fw-semibold p-0"
                          >
                            {headerData.international_promotion.title}
                          </Link>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: headerData.international_promotion.details,
                            }}
                          />
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </li>
              {/* ================= OTHERS ================= */}
              <li
                className="has-dropdown"
                onMouseEnter={() => {
                  if (window.innerWidth > 991) {
                    setToursDropdownOpen(true);
                    setMegaMenuOpen(null);
                    setNavOpen(false);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 991) {
                    setToursDropdownOpen(false);
                  }
                }}
              >
                <a onClick={handleToursDropdownToggle}>Luxury</a>
                <span onClick={handleToursDropdownToggle} className="arrow">
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
                </span>
                <ul
                  className={`dropdown-menu ${toursDropdownOpen ? "show slide-up" : ""
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
              <li>
                <Link
                  href="/customized-holidays"
                  onClick={() => setNavOpen(false)}
                >
                  Customized Holidays
                </Link>
              </li>
              <li>
                <Link href="/car-rental" onClick={() => setNavOpen(false)}>
                    Car Rental
                  </Link>
              </li>
              <li>
                <Link href="/indian-dmc" onClick={() => setNavOpen(false)}>
                  Indian DMC
                </Link>
              </li>
              <li>
                <Link href="/contact-us" onClick={() => setNavOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
