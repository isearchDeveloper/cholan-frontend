// import { Inter } from "next/font/google";
// import "./globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import HeaderSec from "./components/Header";
// import FooterSec from "./components/Footer";
// import HeaderWrapper from "./components/headerWrapper";
// import PlanTripButton from "./components/common/PlanTripButton";
// import BackToTopButton from "./components/common/BackToTopButton";
// import { fetchHomeData } from "./services/homeService";
// import CookieBanner from "./components/common/CookieBanner";
// import FooterDesktopSec from "./components/FooterDesktop";
// import { FormProvider } from "./context/FormContext";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [commonMetaData] = await Promise.all([fetchHomeData()]);
//   const meta = commonMetaData?.data?.meta || {};
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/favicon.ico" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="theme-color" content="#000000" />
//         <meta property="og:type" content="website" />
//         <meta property="og:site_name" content="CholanTours" />
//         <meta
//           property="og:image"
//           content="https://www.cholantours.com/public/uploads/logo.png"
//         />
//         <meta property="og:image:url" content="https://www.cholantours.com/public/uploads/logo.png" />
//         <meta property="og:image:width" content="600" />
//         <meta property="og:image:height" content="600" />
//         <meta name="twitter:card" content="summary" />
//         <meta
//           property="twitter:image"
//           content="https://www.cholantours.com/public/uploads/logo.png"
//         />
//         {meta.meta_title && (
//           <>
//             <meta property="og:title" content={meta.meta_title || "CholanTours"} />
//             <meta property="og:description" content={meta.meta_description || ""} />
//             <meta name="twitter:title" content={meta.meta_title || "Cholan Tours"} />
//             <meta name="twitter:description" content={meta.meta_description || ""} />
//           </>
//         )}

//         <meta name="twitter:site" content="@cholantour" />
//         <meta name="twitter:creator" content="@cholantour" />

//         {/*  No-JS CSS fallback (for slider, menus, pagination) */}
//         <noscript>
//           <style>{`
//             body.no-js .js-only {
//               display: none !important;
//             }
//             body.no-js .no-js-show {
//               display: block !important;
//             }
//           `}</style>
//         </noscript>

//         {/* Google Tag Manager (head) */}
//         {meta.meta_details && (
//           <div
//             dangerouslySetInnerHTML={{
//               __html: meta.meta_details,
//             }}
//           />
//         )}

//         {/* SEO Schema for Organization */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Organization",
//               name: "Cholantours.com",
//               url: "https://www.cholantours.com",
//               logo: "https://www.cholantours.com/public/uploads/logo.png",
//               sameAs: [
//                 "https://www.facebook.com/CholanToursPrivateLimited/",
//                 "https://x.com/cholantour",
//                 "https://www.instagram.com/cholan_tours/",
//                 "https://www.youtube.com/@cholantoursofficial",
//               ],
//               telephone: "+91-431-422-6100",
//               address: {
//                 "@type": "PostalAddress",
//                 addressLocality: "Annai Avenue",
//                 addressRegion: "Trichy",
//                 streetAddress:
//                   "No. 4 Annai Avenue, Srirangam, Trichy, Tamilnadu",
//                 postalCode: "620006",
//               },
//             }),
//           }}
//         />
//       </head>

//       {/* ✅ Add no-js class */}
//       <body className={`no-js ${inter.variable}`} cz-shortcut-listen="true">
//         {/* Google Tag Manager (body) */}
//         {meta.meta_body_details && (
//           <div
//             dangerouslySetInnerHTML={{
//               __html: meta.meta_body_details,
//             }}
//           />
//         )}
//         <FormProvider>
//           <HeaderWrapper />
//           {children}
//           {/* <FooterSec /> */}
//           <FooterDesktopSec />
//           <PlanTripButton />

//           <BackToTopButton />
//           {/* <CookieBanner /> */}
//         </FormProvider>

//         {/* ✅ When JS loads → remove no-js class */}
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               document.addEventListener('DOMContentLoaded', function() {
//                 document.body.classList.remove('no-js');
//               });
//             `,
//           }}
//         />

//       <div id="twiK">
//           {/* Tawk.to Script */}
//         <script
//           type="text/javascript"
//           dangerouslySetInnerHTML={{
//             __html: `
//               var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
//               (function(){
//                 var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
//                 s1.async=true;
//                 s1.src='https://embed.tawk.to/5c95d5dfc37db86fcfcf6c2b/default';
//                 s1.charset='UTF-8';
//                 s1.setAttribute('crossorigin','*');
//                 s0.parentNode.insertBefore(s1,s0);
//               })();
//             `,
//           }}
//         />
//       </div>
//       </body>
//     </html>
//   );
// }

// new version code

import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderWrapper from "./components/headerWrapper";
import FooterDesktopSec from "./components/FooterDesktop";
import PlanTripButton from "./components/common/PlanTripButton";
import BackToTopButton from "./components/common/BackToTopButton";
import { fetchHomeData } from "./services/homeService";
import { FormProvider } from "./context/FormContext";
// layout.tsx
import type { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cholan Tours",
  description: "Cholan Tours",
  icons: { icon: "/favicon.ico" },

  verification: {
    google: "PASTE_GOOGLE_VERIFICATION_CODE_HERE",
  },

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
    card: "summary",
    site: "@cholantour",
    creator: "@cholantour",
    images: ["https://www.cholantours.com/public/uploads/logo.png"],
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
      <body className={`no-js ${inter.variable}`}>
        {/* ✅ GTM HEAD */}
        {meta.gtm_head && (
          <Script
            id="gtm-head"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: meta.gtm_head }}
          />
        )}

        {/* ✅ GTM BODY */}
        {meta.gtm_body && (
          <noscript dangerouslySetInnerHTML={{ __html: meta.gtm_body }} />
        )}

        <FormProvider>
          <HeaderWrapper />
          {children}
          <FooterDesktopSec />
          <PlanTripButton />
          <BackToTopButton />
        </FormProvider>

        {/* ✅ Remove no-js */}
        <Script id="no-js-remove" strategy="afterInteractive">
          {`document.body.classList.remove('no-js');`}
        </Script>

        {/* ✅ Tawk.to */}
        <Script id="tawk" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/5c95d5dfc37db86fcfcf6c2b/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
