// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { devImgPath } from "@/app/urls/imageUrl";
// import { useRouter } from "next/navigation";

// const HoneymoonPackage = ({ data }: any) => {
//   const router = useRouter();

//   const setUrl = (slug: any, displaySlug: any) => {
//     router.push(`/packages/${slug}`);
//   };

//   return (
//     <section className="honeymoon-tour-sec common-padd">
//       <Image
//         width={1920}
//         height={900}
//         sizes="100vw"
//         src={data?.banner_image || "/images/no-img.webp"}
      
//        alt={data?.banner_image_alt }
//       />
//       <div className="container">
//         <div className="content-box">
//           <h2>{data?.package.title}</h2>
//           <h5>
//             {`${data?.package.details.duration_nights} Nights / ${data?.package.details.duration_days} Days`}
//             {/* Starts from ₹ ${data.package.price}* INR`} */}
//           </h5>
//           <button
//             onClick={() => setUrl(data.package.slug, data.package.display_slug)}
//             className="btn blue-btn mt-4 "
//           >
//             Book Now
//             <span>
//               <Image
//                 src="/images/button-arrow.png"
//                 width={23}
//                 height={23}
//                 sizes="100vw"
//                 alt=""
               
//               />
//             </span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HoneymoonPackage;





"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HoneymoonPackage = ({ data }: any) => {
  const router = useRouter();

  const [isJsEnabled, setIsJsEnabled] = useState(false);

  useEffect(() => {
    setIsJsEnabled(true); // JS is running
  }, []);

  const setUrl = (slug: any, displaySlug: any) => {
    router.push(`/packages/${slug}`);
  };

  const packageLink = `/packages/${data?.package.slug}`;

  return (
    <section className="honeymoon-tour-sec common-padd">
      <Image
        width={1920}
        height={900}
        sizes="100vw"
        src={data?.banner_image || "/images/no-img.webp"}
        alt={data?.banner_image_alt}
      />

      <div className="container">
        <div className="content-box">
          <h2>{data?.package.title}</h2>

          <h5>
            {`${data?.package.details.duration_nights} Nights / ${data?.package.details.duration_days} Days`}
          </h5>

          {/* ✅ JS ON → Button with onClick */}
          <div className="honeymoon-btn-wrapper">
  {/* ✅ JS ON */}
  {isJsEnabled && (
    <button
      onClick={() => setUrl(data.package.slug, data.package.display_slug)}
      className="btn blue-btn mt-4 book-btn"
    >
      Book Now
      <span>
        <Image
          src="/images/button-arrow.png"
          width={23}
          height={23}
          sizes="100vw"
          alt=""
        />
      </span>
    </button>
  )}

  {/* ✅ JS OFF */}
  <noscript>
    <a href={packageLink} className="btn blue-btn mt-4 book-btn">
      Book Now
      <span>
        <img
          src="/images/button-arrow.png"
          width="23"
          height="23"
          alt=""
        />
      </span>
    </a>
  </noscript>
</div>

        </div>
      </div>
    </section>
  );
};

export default HoneymoonPackage;
