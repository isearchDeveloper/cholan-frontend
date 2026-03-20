import React from "react";

interface BannerProps {
  title: any;
  subtitle: string;
  imageUrl: string;
}

const Banner: React.FC<any> = ({ title, subtitle, imageUrl }) => {
  return (
    // <div className="banner" style={{ backgroundImage: `url(${imageUrl})` }}>
    <div
      className="banner"
      style={{ backgroundImage: `url(${encodeURI(imageUrl)})` }}
    >
      <div className="banner-overlay"></div>

      <div className="container">
        <div className="banner-content">
          <div className="banner-title">{subtitle}</div>
          {/* <div className="banner-subtitle">{subtitle}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
