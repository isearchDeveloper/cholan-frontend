

// src/app/components/FooterDesktop.tsx (SERVER COMPONENT)

import Image from "next/image";
import Link from "next/link";

import {
  fetchHomeExclusiveData,
  trendingInternationalHomePackageData,
} from "../services/homeService";
import TripAdvisorWidget from "./TripAdvisorWisget";

const getTruncatedLabel = (label: string): string => {
  const words = label.trim().split(/\s+/);
  return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : label;
};

export default async function FooterDesktopSec() {
  // Fetch data server-side
  const worldMenuData = await trendingInternationalHomePackageData();
  const indiaMenuData = await fetchHomeExclusiveData();

  const getWorldLinks = () => [
    { label: "International Tour Packages", href: "/international-holidays" },
    { label: "Sri Lanka Tour Packages", href: "/international-holidays/sri-lanka-tour-packages" },
    { label: "Bali Tour Packages", href: "/international-holidays/bali-tour-packages" },
    { label: "Thailand Tour Packages", href: "/international-holidays/thailand-tour-packages" },
    { label: "Dubai Tour Packages", href: "/international-holidays/dubai-tour-packages" },
    { label: "Vietnam Tour Packages", href: "/international-holidays/vietnam-tour-packages" },
    { label: "Maldives Tour Packages", href: "/international-holidays/maldives-tour-packages" },
    { label: "Singapore Tour Packages", href: "/international-holidays/singapore-tour-packages" },
    { label: "Bhutan Tour Packages", href: "/international-holidays/bhutan-tour-packages" },
  ];

  const getIndiaLinks = () => [
    { label: "Goa Tour Packages", href: "/india/goa-tour-packages" },
    { label: "Kerala Tour Packages", href: "/india/kerala-tour-packages" },
    { label: "Rajasthan Tour Packages", href: "/india/rajasthan-tour-packages" },
    { label: "Andaman & Nicobar Islands", href: "/india/andaman-tour-packages" },
    { label: "Kashmir Tour Packages", href: "/india/jammu-kashmir-tour-packages" },
    { label: "Tamil Nadu Tour Packages", href: "/india/tamil-nadu-tour-packages" },
    { label: "Meghalaya Tour Packages", href: "/india/meghalaya-tour-packages" },
    { label: "Gujarat Tour Packages", href: "/india/gujarat-tour-packages" },
  ];

  const aboutLinks = [
    { label: "About Us", href: "/about-us" },
     { label: "Awards and Recognition", href: "/awards-and-recognition" },
     { label: "Legacy of Cholan Tours", href: "/legacy-of-cholan" },
     { label: "Indian DMC", href: "/indian-dmc" },
    { label: "Our Team", href: "/our-team" },
    { label: "Our Partners", href: "/our-partners" },
    // { label: "Our Credentials", href: "/credentials" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "CSR Policy", href: "/csr" },
    // { label: "Awards & Achievements", href: "/awards-and-achievements" },
     { label: "Policies", href: "/policies" },
  ];

  const internationalHoneymoon = [
    { label: "Maldives Honeymoon Package", href: "/packages/romantic-maldives-honeymoon-package-4-days-3-nights" },
    { label: "Honeymoon Gateway to Greece", href: "/packages/honeymoon-gateway-to-greece-7-days-6-nights" },
    { label: "Romantic Thailand Tour Package", href: "/packages/romantic-thailand-tour-package-11-days-10-nights" },
    { label: "Hong Kong Romantic Tour Package", href: "/packages/hong-kong-romantic-and-vibrant-tour-package-6-days-5-nights" },
    { label: "Extravagant Europe Tour Package", href: "/packages/extravagant-europe-tour-17-days-16-nights" },
    { label: "Bali with Nusa Penida Tour", href: "/packages/romantic-bali-with-nusa-penida-tour-package-4-days-3-nights" },
    { label: "Signature Spain Tour Package", href: "/packages/signature-spain-a-classic-highlights-tour-8-days-7-nights" },
    { label: "Highlights of Italy", href: "/packages/highlights-of-italy-6-days-5-nights" },
    { label: "Australia Panorama Tour Package", href: "/packages/explore-australia-15-days-14-nights" }
  ];


  const internationalTopDestinations = [
    { label: "Greece Tour Packages", href: "/international-holidays/greece-tour-packages" },
    { label: "New Zealand Tour Packages", href: "/international-holidays/new-zealand-tour-packages" },
    { label: "Australia Tour Packages", href: "/international-holidays/Australia-tour-packages" },
    { label: "Italy Tour Packages", href: "/international-holidays/italy-tour-packages" },
    { label: "London Tour Packages", href: "/international-holidays/london-tour-packages" },
    { label: "Switzerland Tour Packages", href: "/international-holidays/switzerland-tour-packages" },
    { label: "Tokyo Tour Packages", href: "/international-holidays/tokyo-tour-packages" },
    { label: "Netherland Tour Packages", href: "/international-holidays/netherland-tour-packages" },
    { label: "Spain Tour Packages", href: "/international-holidays/spain-tour-packages" }
  ];

  const DiscoverLink = [
    { label: "Customized Holidays", href: "/customized-holidays" },
    { label: "About us", href: "/about-us" },
    { label: "Our Team", href: "/our-team" },
    { label: "Trusted DMC", href: "/indian-dmc" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact-us" }
  ];


  const indiaHoneymoon = [
    { label: "South Kerala Honeymoon Package", href: "/packages/special-honeymoon-tour-to-south-kerala-kerala-delight-8-days-7-nights" },
    { label: "Goa Honeymoon Package", href: "/packages/goa-holiday-tour-package-5-days-4-nights" },
    { label: "Manali Honeymoon Package", href: "/packages/manali-adventure-a-5-day-itinerary-for-nature-and-thrill-seekers-5-days-4-nights" },
    { label: "Ladakh Honeymoon Package", href: "/packages/discover-ladakhs-splendor-leh-pangong-lake-nubra-valley-and-turtuk-village-8-days-7-nights" },
    { label: "Glimpse of Kashmir Tour Package", href: "/packages/kashmir-delights-tour-4-days-3-nights" },
    { label: "Sikkim Romantic Tour Package", href: "/packages/sikkim-romantic-getaway-tour-8-days-7-nights" },
    { label: "Arunachal & Nagaland Tours", href: "/packages/captivating-arunachal-nagaland-tour-8-days-7-nights" },
    { label: "Mesmerising Meghalaya Honeymoon Package", href: "/packages/the-mesmerising-meghalaya-tour-8-days-7-nights" }
  ];


  const indiaTopDestinations = [
    { label: "Delhi Tour Packages", href: "/india/delhi-tour-packages" },
    { label: "Jaipur Tour Packages", href: "/india/jaipur-tour-packages" },
    { label: "Udaipur Tour Packages", href: "/india/udaipur-tour-packages" },
    { label: "Maharashtra Tour Packages", href: "/india/maharashtra-tour-packages" },
    { label: "Varanasi Tour Packages", href: "/india/varanasi-tour-packages" },
    { label: "Agra Tour Packages", href: "/india/agra-tour-packages" },
    { label: "Chennai Tour Packages", href: "/india/chennai-tour-packages" },
    { label: "Leh Tour Packages", href: "/india/leh-tour-packages" }
  ];

  const travelBlogInternational = [
    { label: "Places to Visit in Singapore", href: "/blog/places-to-visit-in-singapore/" },
    { label: "Places to Visit in Australia", href: "/blog/places-to-visit-in-australia/" },
    { label: "Places to Visit in Japan", href: "/blog/places-to-visit-in-japan/" },
    { label: "Places to Visit in Bhutan", href: "/blog/places-to-visit-in-bhutan/" },
    { label: "Places to Visit in China", href: "/blog/places-to-visit-in-china/" },
    { label: "Places to Visit in Cambodia", href: "/blog/places-to-visit-in-cambodia/" },
    { label: "Places to Visit in Georgia", href: "/blog/places-to-visit-in-georgia/" },
    { label: "Places to Visit in Cyprus", href: "/blog/places-to-visit-in-cyprus/" }
  ];

  const travelBlogIndia = [
    { label: "Best Honeymoon Destinations In Kerala", href: "/blog/best-honeymoon-destinations-in-kerala/" },
    { label: "India's Best Street Food", href: "/blog/street-food-in-india/" },
    { label: "Mahamaham Festival: The Kumbh Mela of South India", href: "/blog/mahamaham-the-kumbhmela-of-southindia/" },
    { label: "Top 10 Most Underrated Beaches in India", href: "/blog/top-10-most-underrated-beaches-in-india/" },
    { label: "Top Beaches In South India", href: "/blog/top-beaches-in-south-india/" },
    { label: "10 Most Popular Temples of South India", href: "/blog/10-most-popular-temples-of-south-india/" },
    { label: "Top 10 Heritage Sites in Karnataka", href: "/blog/historic-monuments-in-karnataka/" },
    { label: "Top 10 Honeymoon Destinations in South India", href: "/blog/top-honeymoon-destination-in-south-india/" }
  ];

  const travelBlogVisit = [
    { label: "Best Time to Visit India in December", href: "/blog/best-places-to-visit-in-india-in-december/" },
    { label: "Best Time to Visit India in January", href: "/blog/best-places-to-visit-in-india-in-january/" },
    { label: "Best Time to Visit India in February", href: "/blog/best-places-to-visit-in-india-in-february/" },
    { label: "Best Time to Visit India in March", href: "/blog/best-places-to-visit-in-india-in-march/" },
    { label: "Best Places To Visit In Kerala In February", href: "/blog/best-places-to-visit-in-kerala-in-february/" },
    { label: "Places To Visit In Kerala During Christmas", href: "/blog/places-to-visit-in-kerala-during-christmas/" },
    { label: "Best Places to Visit in South India in February", href: "/blog/top-5-places-south-india-visit-february/" },
    { label: "Places to Visit in South India During Summer", href: "/blog/six-must-visit-places-during-summer-in-south-india/" },
    { label: "Best Places To Visit In India During Diwali", href: "/blog/best-places-to-visit-in-india-during-diwali/" }
  ];


  const blogLinks = [
    { label: "Adventure", href: "/blog/adventure/" },
    { label: "Cultural", href: "/blog/cultural/" },
    { label: "Family Travel", href: "/blog/family-travel/" },
    { label: "Heritage", href: "/blog/heritage/" },
    { label: "Wildlife", href: "/blog/wildlife/" },
    { label: "Inspiration", href: "/blog/inspiration/" },
  ];

  const quickLinks = [
    { label: "India Tour Packages", href: "/india" },
    { label: "International Holiday Packages", href: "/international-holidays" },
    { label: "Customized Holidays", href: "/customized-holidays" },
    { label: "Car Rental", href: "/car-rental" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "News", href: "/news" },
     { label: "Newsletter", href: "/newsletter" }
  ];

  const socialMedia = [
    { src: "/images/media1.webp", href: "https://www.facebook.com/CholanToursPrivateLimited/", alt: "Facebook" },
    { src: "/images/media2.webp", href: "https://x.com/cholantour", alt: "Twitter" },
    { src: "/images/media3.png", href: "https://www.linkedin.com/company/cholantours/", alt: "LinkedIn" },
    { src: "/images/media5.png", href: "https://www.instagram.com/cholan_tours/", alt: "Instagram" },
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">

          {/* Tabs */}
          <input type="radio" name="footer-tab" id="tab-about" defaultChecked hidden />
          <input type="radio" name="footer-tab" id="tab-international" hidden />
          <input type="radio" name="footer-tab" id="tab-india" hidden />
          <input type="radio" name="footer-tab" id="tab-blogs" hidden />

          <div className="footer-tabs">
            <button><label htmlFor="tab-about">About Cholan Tours</label></button>
            <button><label htmlFor="tab-international">International Tours</label></button>
            <button><label htmlFor="tab-india">India Tours</label></button>
            <button><label htmlFor="tab-blogs">Travel Blogs</label></button>
          </div>

          <div className="footer-content">
            <div className="footer-content-box">
              <div className="row gap-4 gap-md-0">

                {/* About / Description */}
                <div className="col-md-6 col-lg-3">
                  <div className="tab-content about-tab">
                    <div className="logo-box">
                      <div className="footer-logo">
                        <Image width={200} height={70} src="/images/logo-white-tagline.webp" alt="Cholan Tours Logo" />
                        <p>Cholan Tours is one of India's fast-growing ISO 9001:2015 quality-certified Destination Management Companies (DMC). Our services are approved by The Ministry of Tourism, Government of India.</p>
                      </div>
                      {/* <TripAdvisorWidget /> */}
                    </div>
                    <div className="footer-menu about-tab brochure-link mt-4">
                      <h3>Corporate Brochure</h3>
                      <ul>
                      <li><Link href="/Cholan_Tours_Corporate_Brochure_English.pdf" target="_blank">English</Link></li>
                      <li>|</li>
                      <li><Link href="/Brochure_Corporativo_Cholan_Tours_Spanish.pdf" target="_blank">Spanish</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="tab-content international-tab">
                    <div className="footer-menu international-tab">
                      <h3>Tour Packages</h3>
                      <ul>{getWorldLinks().map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                    </div>
                  </div>

                  <div className="tab-content india-tab">
                    <div className="footer-menu india-tab">
                      <h3>India Tours</h3>
                      <ul>{getIndiaLinks().map((link: any, i: any) => <li key={i}><Link href={link.href} title={link.title}>{link.label}</Link></li>)}</ul>
                    </div>
                  </div>

                  <div className="tab-content blogs-tab">
                    <div className="footer-menu">
                      <h3>International</h3>
                      <ul>{travelBlogInternational.map((link: any, i: any) => <li key={i}><Link href={link.href} title={link.title}>{link.label}</Link></li>)}</ul>
                    </div>
                  </div>
                </div>

                {/* About Links */}
                <div className="col-md-6 col-lg-3">
                  <div className="footer-menu about-tab">
                    <h3>About Cholan Tours</h3>
                    <ul>{aboutLinks.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>

                  </div>

                  <div className="footer-menu international-tab">
                    <h3>International Honeymoon Packages</h3>
                    <ul>{internationalHoneymoon.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                  </div>

                  <div className="footer-menu india-tab">
                    <h3>India Honeymoon Packages</h3>
                    <ul>{indiaHoneymoon.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                  </div>

                  <div className="footer-menu blogs-tab">
                    <h3>India</h3>
                    <ul>{travelBlogIndia.map((link, i) => <li key={i}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}</ul>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="col-md-6 col-lg-3">
                  <div className="footer-menu about-tab">
                    <h3>Quick Links</h3>
                    <ul> {quickLinks.map((link, i) => ( <li key={i}> <Link href={link.href} target={link.label === "Blogs" ? "_blank" : "_self"} rel={link.label === "Blogs" ? "noopener noreferrer" : undefined} > {link.label} </Link> </li> ))} </ul>
                  </div>
                  <div className="footer-menu blogs-tab">
                    <h3>Best Time to Visit</h3>
                    <ul>{travelBlogVisit.map((link, i) => <li key={i}><Link href={link.href}>{link.label}</Link></li>)}</ul>
                  </div>
                  <div className="footer-menu international-tab">
                    <h3>Top International Destinations</h3>
                    <ul>{internationalTopDestinations.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                  </div>

                  <div className="footer-menu india-tab">
                    <h3>Top India Destinations</h3>
                    <ul>{indiaTopDestinations.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                  </div>
                </div>

                {/* Contact */}
                <div className="col-md-6 col-lg-3">
                  <div className="footer-menu blogs-tab">
                    <h3>Discover us</h3>
                    <ul>{DiscoverLink.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                    {/* Social */}
                    <div className="footer-media">
                      <h5>Follow us on</h5>
                      <ul>
                        {socialMedia.map((media, i) => (
                          <li key={i}>
                            <Link href={media.href} target="_blank">
                              <Image width={12} height={12} src={media.src} alt={media.alt} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="footer-contact about-tab">
                    <h3>Contact Us</h3>
                    <ul>
                      <li><Link href="tel:+91 431 4226100"><span>
                        <Image
                          width={20}
                          height={20}
                          sizes="100vw"
                          src="/images/call-two.png"
                          alt=""
                        />
                      </span>+91 431 4226100</Link></li>
                      <li><Link href="mailto:enquiry@cholantours.com"> <span>
                        <Image
                          width={20}
                          height={20}
                          sizes="100vw"
                          className="pt-1"
                          src="/images/mgg.png"
                          alt=""
                        />
                      </span>enquiry@cholantours.com</Link> <p>CIN: U31100TN2010PTC078389</p></li>
                      <li> <span>
                        <Image
                          width={20}
                          height={20}
                          sizes="100vw"
                          src="/images/address.png"
                          alt=""
                        />
                      </span>No 4, Annai Avenue, Srirangam, Trichy, Tamil Nadu 620006, India.</li>
                    </ul>

                    {/* Social */}
                    <div className="footer-media social-footer-links">
                      <h5>Follow us on</h5>
                      <ul>
                        {socialMedia.map((media, i) => (
                          <li key={i}>
                            <Link href={media.href} target="_blank">
                              <Image width={12} height={12} src={media.src} alt={media.alt} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  { /* International Tab */}
                  <div className="footer-menu international-tab">
                    <h3>Discover us</h3>
                    <ul>{DiscoverLink.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                    {/* Social */}
                    <div className="footer-media">
                      <h5>Follow us on</h5>
                      <ul>
                        {socialMedia.map((media, i) => (
                          <li key={i}>
                            <Link href={media.href} target="_blank">
                              <Image width={12} height={12} src={media.src} alt={media.alt} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  { /* India Tab */}
                  <div className="footer-menu india-tab">
                    <h3>Discover us</h3>
                    <ul>{DiscoverLink.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                    {/* Social */}
                    <div className="footer-media">
                      <h5>Follow us on</h5>
                      <ul>
                        {socialMedia.map((media, i) => (
                          <li key={i}>
                            <Link href={media.href} target="_blank">
                              <Image width={12} height={12} src={media.src} alt={media.alt} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-sec">
          <p>© {new Date().getFullYear()} Cholan Tours. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
