// import React from "react";

// interface BannerProps {
//   title: any;
//   subtitle: string;
//   imageUrl: string;
// }

// const Banner: React.FC<any> = ({ title, subtitle, imageUrl }) => {
//   return (
//     // <div className="banner" style={{ backgroundImage: `url(${imageUrl})` }}>
//     <div
//       className="banner"
//       style={{ backgroundImage: `url(${encodeURI(imageUrl)})` }}
//     >
//       <div className="banner-overlay"></div>

//       <div className="container">
//         <div className="banner-content">
//           <div className="banner-title">{subtitle}</div>
//           {/* <div className="banner-subtitle">{subtitle}</div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;


import React, { useState } from "react";

const Banner: React.FC<any> = ({ title, subtitle, imageUrl }) => {
  const [bgImage, setBgImage] = useState(imageUrl);

  const fallbackImages = [
    "/images/cholantours2.webp",
    "/images/cholantours1.webp",
    "/images/cholantours3.webp",

  ];

  const getImageIndex = (str: string): number => {
    let hash = 0;
    const titleStr = String(str || "default");

    for (let i = 0; i < titleStr.length; i++) {
      hash = titleStr.charCodeAt(i) + ((hash << 5) - hash);
    }

    return Math.abs(hash) % fallbackImages.length;
  };

  const fallbackImage = fallbackImages[getImageIndex(title)];

  return (
    <>
      {/* Hidden image to detect load error */}
      <img
        src={imageUrl}
        style={{ display: "none" }}
        onError={() => setBgImage(fallbackImage)}
      />

      <div
        className="banner"
        style={{
          backgroundImage: `url(${encodeURI(bgImage || fallbackImage)})`,
        }}
      >
        <div className="banner-overlay"></div>

        <div className="container">
          <div className="banner-content">
             <div className="banner-title">{title}</div>
            <div className="banner-title">{subtitle}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;