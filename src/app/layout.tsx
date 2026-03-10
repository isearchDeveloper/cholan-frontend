import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderSec from "./components/Header";
import FooterSec from "./components/Footer";
import HeaderWrapper from "./components/headerWrapper";
import PlanTripButton from "./components/common/PlanTripButton";
import BackToTopButton from "./components/common/BackToTopButton";
import { fetchHomeData } from "./services/homeService";
import CookieBanner from "./components/common/CookieBanner";
import FooterDesktopSec from "./components/FooterDesktop";
import { FormProvider } from "./context/FormContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata = {
  openGraph: {
    type: "website",
    siteName: "CholanTours",
    images: [
      {
        url: "https://www.cholantours.com/public/uploads/logo.png",
        width: 600,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cholantour",
    creator: "@cholantour",
  },
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [commonMetaData] = await Promise.all([fetchHomeData()]);
  const meta = commonMetaData?.data?.meta || {};
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
       
        {/* ✅ No-JS CSS fallback (for slider, menus, pagination) */}
        <noscript>
          <style>{`
            body.no-js .js-only {
              display: none !important;
            }
            body.no-js .no-js-show {
              display: block !important;
            }
          `}</style>
        </noscript>

        {/* Google Tag Manager (head) */}
        {meta.meta_details && (
          <div
            dangerouslySetInnerHTML={{
              __html: meta.meta_details,
            }}
          />
        )}

        {/* SEO Schema for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cholantours.com",
              url: "https://www.cholantours.com",
              logo: "https://www.cholantours.com/public/uploads/logo.png",
              sameAs: [
                "https://www.facebook.com/CholanToursPrivateLimited/",
                "https://x.com/cholantour",
                "https://www.instagram.com/cholan_tours/",
                "https://www.youtube.com/@cholantoursofficial",
              ],
              telephone: "+91-431-422-6100",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Annai Avenue",
                addressRegion: "Trichy",
                streetAddress:
                  "No. 4 Annai Avenue, Srirangam, Trichy, Tamilnadu",
                postalCode: "620006",
              },
            }),
          }}
        />
      </head>

      {/* ✅ Add no-js class */}
      <body className={`no-js ${inter.variable}`} cz-shortcut-listen="true">
        {/* Google Tag Manager (body) */}
        {meta.meta_body_details && (
          <div
            dangerouslySetInnerHTML={{
              __html: meta.meta_body_details,
            }}
          />
        )}
        <FormProvider>
          <HeaderWrapper />
          {children}
          {/* <FooterSec /> */}
          <FooterDesktopSec />
          <PlanTripButton />

          <BackToTopButton />
          {/* <CookieBanner /> */}
        </FormProvider>

        {/* ✅ When JS loads → remove no-js class */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                document.body.classList.remove('no-js');
              });
            `,
          }}
        />

      <div id="twiK">
          {/* Tawk.to Script */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/5c95d5dfc37db86fcfcf6c2b/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </div>
      
    <script src="https://elfsightcdn.com/platform.js" async></script>
    <div className="elfsight-app-d45a979a-17cf-4159-a859-1be7eadd19b0" data-elfsight-app-lazy></div>


      </body>
    </html>
  );
}
