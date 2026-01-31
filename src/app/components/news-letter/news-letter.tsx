// import React from "react";
// import { Metadata } from "next";
// import { XPublicToken } from "@/app/urls/apiUrls";
// import NewsPagination from "./NewsPagination";


// export const metadata: Metadata = {
//   title: "News Cholan Tours",
// };

// interface CMSDetails {
//   title?: string;
//   banner_image?: string;
//   banner_image_alt?: string;
//   short_description?: string | null;
//   description?: string;
// }

// interface CMSResponse {
//   data?: {
//     details?: CMSDetails;
//   };
// }

// async function getPageDetails(): Promise<CMSDetails | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=news`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-Public-Token": XPublicToken,
//         },
//         next: { revalidate: 60 },
//       },
//     );

//     if (!res.ok) return null;
//     const data: CMSResponse = await res.json();
//     return data?.data?.details || null;
//   } catch (error) {
//     console.error("News Banner Fetch Error:", error);
//     return null;
//   }
// }

// export default async function NewsLetter() {
//   const pageData = await getPageDetails();

//   if (!pageData) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//         <p className="text-secondary fs-5">
//           Content not available at the moment.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 bg-light">
//       {/* Banner */}
//       <section
//         className="news-hero-banner"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.3)), url('${pageData.banner_image}')`,
//         }}
//         aria-label={pageData.banner_image_alt || pageData.title}
//       >
//         <div className="container text-center py-5">
//           <h1 className="fw-bold display-4 newsletter-page-title">
//             {pageData.title}
//           </h1>
//         </div>
//       </section>

//       {/* Short Description */}
//       {pageData?.short_description && (
//         <section className="py-5">
//           <div className="container">
//             <div
//               className="text-muted"
//               dangerouslySetInnerHTML={{
//                 __html: pageData.short_description,
//               }}
//             />
//           </div>
//         </section>
//       )}

//       {/* PAGINATION SECTION */}
//       {/* <section className="py-5">
//         <div className="container">
//           <NewsPagination initialNews={news}/>
//         </div>
//       </section> */}

//       {/* Description */}
//       {pageData?.description && (
//         <section className="py-5">
//           <div className="container">
//             <div
//               className="text-muted"
//               dangerouslySetInnerHTML={{
//                 __html: pageData.description,
//               }}
//             />
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }
