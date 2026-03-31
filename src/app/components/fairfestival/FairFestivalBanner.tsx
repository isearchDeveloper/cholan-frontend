// import React from "react";

// export default function FairFestivalBanner({ banner }) {

//   //  handle BOTH API structures
//   const image =
//     banner?.banner_img ||        // listing page
//     banner?.primary_image ||     // detail page
//     "";

//   const title =
//     banner?.title || "";

//   const subtitle =
//     banner?.sub_title ||
//     "";

//   return (
//     <div className="banner-container carbanner">
//       <div
//         className="banner"
//         style={{
//           backgroundImage: `url(${image})`,
//         }}
//       >
//         <div className="banner-overlay"></div>

//         <div className="banner-content w-100 py-5">
//           <div className="container">
//             <div className="row justify-content-center align-items-center">
//               <div className="col-lg-8 text-center text-white">

//                 <div className="mb-3 banner-title">{title}</div>
//                 {subtitle && (
//                   <div className="mb-0 banner-subtitle">
//                     {subtitle}
//                   </div>
//                 )}


//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";

type BannerType = {
  banner_img?: string;
  primary_image?: string;
  title?: string;
  sub_title?: string;
};

export default function FairFestivalBanner({ banner }: { banner: BannerType }) {
  
  const image =
    banner?.banner_img ||
    banner?.primary_image ||
    "";

  const title = banner?.title || "";
  const subtitle = banner?.sub_title || "";

  /* =========================
     FALLBACK IMAGES
  ========================= */
  const fallbackImages = [
    "/images/festival-placeholder-1.webp",
    "/images/festival-placeholder-2.webp",
  ];

  const getImageIndex = (str: string): number => {
    let hash = 0;
    const text = String(str || "default");

    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    return Math.abs(hash) % fallbackImages.length;
  };

  const fallbackImage = fallbackImages[getImageIndex(title)];

  const [bgImage, setBgImage] = useState(image || fallbackImage);

  /* =========================
     IMAGE LOAD HANDLING
  ========================= */
  useEffect(() => {
    if (!image) {
      setBgImage(fallbackImage);
      return;
    }

    const img = new Image();
    img.src = image;

    img.onload = () => setBgImage(image);
    img.onerror = () => setBgImage(fallbackImage);
  }, [image, fallbackImage]);

  return (
    <div className="banner-container carbanner">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="banner-overlay"></div>

        {/* ✅ CONTENT */}
        {(title || subtitle) && (
          <div className="banner-content w-100 py-5">
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-8 text-center text-white">

                  {title && (
                    <div className="mb-3 banner-title">
                      {title}
                    </div>
                  )}

                  {subtitle && (
                    <div className="mb-0 banner-subtitle">
                      {subtitle}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}