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
          <h2 className="banner-title">{title}</h2>
          <h6 className="banner-subtitle">{subtitle}</h6>
        </div>
      </div>
    </div>
  );
};

export default Banner;
