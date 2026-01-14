"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MegaMenu from "./common/MegaMenu";
import MegaMenuDesktop from "./common/MegaMenuDesktop";

const HeaderSec = ({ headerData }: any) => {
  const [selectedLang] = useState("EN");
  const [open, setOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // Renamed from menuOpen for consistency
  const languages = ["EN", "FR", "ES", "BN"];
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed (e.g., 768px for tablet/mobile)
    };
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMobileLogoClick = (e?: React.SyntheticEvent) => {
    // Prevent default behavior when called from an event handler
    e?.preventDefault();
    setNavOpen(false); // Close the menu if open
    router.push("/"); // Navigate to home
  };

  // ✅ Handle Logo Click (Mobile + Desktop)
  // const handleLogoClick = () => {
  //   if (window.innerWidth <= 1180) {
  //     // ✅ Close mobile menu
  //     const body = document.querySelector("body");
  //     body?.classList.remove("menu-open");
  //     setMenuOpen(false);
  //   }

  //   // ✅ Redirect home
  //   router.push("/");
  // };

  useEffect(() => {
    // Initialize Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr,es,de,it,pt,nl,ru,zh-CN,iw",
        },
        "google_translate_element"
      );
    };
    // Load Google Translate script
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
    return () => {
      document.body.removeChild(addScript);
    };
  }, []);
  // // const handleLogoClick = () => {
  // //   if (window.innerWidth <= 1180) {
  // //     setNavOpen(false);
  // //     setMegaMenuOpen(null);
  // //     setToursDropdownOpen(false);
  // //      router.push("/");
  // //   }
  // // };

  //   router.push("/");
  // };

  // List of 10 languages + flagsss
  const languageOptions = [
    { code: "en", label: "English", img: "/images/flags/us.svg" },
    {
      code: "zh-CN",
      label: "Chinese (Simplified)",
      img: "/images/flags/cn.svg",
    },
    { code: "nl", label: "Dutch", img: "/images/flags/nl.svg" },
    { code: "fr", label: "French", img: "/images/flags/fr.svg" },
    { code: "de", label: "German", img: "/images/flags/de.svg" },
    { code: "iw", label: "Hebrew", img: "/images/flags/il.svg" },
    { code: "it", label: "Italian", img: "/images/flags/it.svg" },
    { code: "pt", label: "Portuguese (Brazil)", img: "/images/flags/br.svg" },
    { code: "ru", label: "Russian", img: "/images/flags/ru.svg" },
    { code: "es", label: "Spanish", img: "/images/flags/es.svg" },
  ];

  // Trigger google translate change event
  const changeLang = (lang: string) => {
    const interval = setInterval(() => {
      const select = document.querySelector(
        "select.goog-te-combo"
      ) as HTMLSelectElement;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <header>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-3">
            <div className="logo-box">
              {isMobile ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleMobileLogoClick}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleMobileLogoClick(e)
                  }
                >
                  <Image
                    width={300}
                    height={60}
                    sizes="100vw"
                    src="/images/logo.webp"
                    alt="Logo"
                  />
                </div>
              ) : (
                <Link href="/">
                  <Image
                    width={300}
                    height={60}
                    sizes="100vw"
                    src="/images/logo.webp"
                    alt="Logo"
                  />
                </Link>
              )}
            </div>
          </div>
          {/* Right Section */}
          <div className="col-lg-9">
            <div className="right-menu">
              {/* Top Section (WhatsApp + Language) */}
              <div className="top-sec">
                <ul>
                  <li>
                    <Link target="_blank" href="https://wa.me/914314226100">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#fff"
                            d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24 c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6 C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3 L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3 l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24 c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2 c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
                          ></path>
                          <path
                            fill="#40c351"
                            d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8l6-1.6l0.6,0.3 c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
                          ></path>
                          <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4 s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6 s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4 c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8 C20.6,19.3,19.7,17,19.3,16z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      +91 431 4226100
                    </Link>
                  </li>
                  <li>
                    <div className="custom-lang-dropdown">
                      <div
                        id="google_translate_element"
                        style={{ display: "none" }}
                      ></div>

                      <button className="lang-btn">
                       
                        🌐 Select Language ▾
                      </button>
                      <ul className="lang-list">
                        {languageOptions.map((item) => (
                          <li
                            key={item.code}
                            onClick={() => changeLang(item.code)}
                          >
                            <Image
                              src={item.img}
                              width={20}
                              height={20}
                              alt={item.label}
                              style={{ marginRight: "8px" }}
                            />
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Main Menu Section */}
              <div className="main-menu">
                {/* Mobile + Tablet Menu */}
                <div className="mobile-menu">
                  <MegaMenu
                    headerData={headerData}
                    navOpen={navOpen}
                    setNavOpen={setNavOpen}
                  />
                </div>
                {/* Desktop + Large Screens Menu */}
                <div className="desktop-menu">
                  <MegaMenuDesktop headerData={headerData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSec;
