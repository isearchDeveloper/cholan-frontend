import React from "react";

interface BannerProps {
  title: any;
  subtitle: string;
  imageUrl: string;
}

const IntBanner: React.FC<any> = ({ data }) => {
  return (
    <div
      className="banner "
      style={{ backgroundImage: `url(${encodeURI(data.banner_image)})` }}
    >
      {/* <div className="banner" style={{ backgroundImage: `url(/images/tour/int_banner.webp)` }}> */}
      <div className="banner-overlay"></div>
      <div className="banner-content">
        {/* <h2 className="banner-title">{title}</h2>
        <h6 className="banner-subtitle">{subtitle}</h6> */}
      </div>
    </div>
  );
};

export default IntBanner;
