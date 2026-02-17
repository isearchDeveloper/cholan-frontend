import React from "react";

export default function FairFestivalBanner({ banner }) {

  // 🔥 handle BOTH API structures
  const image =
    banner?.banner_img ||        // listing page
    banner?.primary_image ||     // detail page
    "/images/fair-festival-banner.webp";

  const title =
    banner?.title || "India Fair & Festival Packages";

  const subtitle =
    banner?.sub_title ||
    "Experience the vibrant culture, traditions, and celebrations across India.";

  return (
    <div className="banner-container carbanner">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="banner-overlay"></div>

        <div className="banner-content w-100 py-5">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-8 text-center text-white">

                <h1 className="mb-3">{title}</h1>
                <p className="mb-0">{subtitle}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
