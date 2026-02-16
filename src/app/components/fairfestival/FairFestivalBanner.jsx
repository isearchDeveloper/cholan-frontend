import React from "react";

const FairFestivalBanner = () => {
  return (
    <div className="banner-container carbanner  ">
      <div
        className="banner"
        style={{
          backgroundImage: `url("/images/fair-festival-banner.webp")`,
        }}
      >
        <div className="banner-overlay"></div>

        <div className="banner-content w-100 py-5">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-8 col-md-10 col-12 text-center text-white">
                
                <h1 className="mb-3">
                  India Fair & Festival Packages
                </h1>

                <p className="mb-0">
                  Experience the vibrant culture, traditions, and celebrations
                  across India with our special fair & festival tours.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairFestivalBanner;
