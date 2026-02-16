import React from "react";

const CarBanner: any = ({ bannerData }: any) => {
  return (
    <div className="banner-container carbanner">
      
          <div
            className="banner"
            style={{ backgroundImage: `url(${encodeURI(bannerData?.banner_image)})` }}
          >
          <div className="banner-overlay"></div>
          <div className="banner-content w-100 py-5">
            <div className="container">
              <div className="row">
              </div>
            </div>
          </div>
        </div>
  
     
    </div>
  );
};

export default CarBanner;
