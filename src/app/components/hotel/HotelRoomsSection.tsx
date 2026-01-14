// "use client";

// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import HotelCard from "@/app/components/hotel/HotelCard";
// import "swiper/css";
// import "swiper/css/pagination";

// export default function HotelRoomsSection({ rooms, slug }: any) {
//   const [jsEnabled, setJsEnabled] = useState(false);

//   useEffect(() => {
//     setJsEnabled(true);
//   }, []);

//   if (!rooms || rooms.length === 0) return null;

//   // ✅ Helpers for Fallback Data
//   const getImageUrl = (room: any) => {
//     if (room?.images?.length > 0 && room.images[0].image_path)
//       return room.images[0].image_path;
//     return room?.primary_image || "/images/no-img.webp";
//   };

//   const getImageAlt = (room: any) => {
//     if (room?.images?.length > 0 && room.images[0].image_alt)
//       return room.images[0].image_alt;
//     return room?.title || "Hotel Room";
//   };

//   const cleanText = (text: string, limit = 100) => {
//     if (!text) return "";
//     const stripped = text
//       .replace(/<[^>]*>/g, "") // remove HTML tags
//       .replace(/\*\*(.*?)\*\*/g, "$1") // remove markdown bold
//       .trim();
//     return stripped.length > limit ? stripped.slice(0, limit) + "..." : stripped;
//   };

//   return (
//     <div className="mt-5 hotel-rooms-section">
//       <h2 className="mb-4 text-center fs-3">Luxury Hotel Rooms</h2>

//       {/* ✅ JS Enabled – Swiper Carousel */}
//       {jsEnabled ? (
//         <div className="js-enabled">
//           <Swiper
//             spaceBetween={20}
//             slidesPerView={1}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             breakpoints={{
//               768: { slidesPerView: 2, spaceBetween: 20 },
//               1024: { slidesPerView: 4, spaceBetween: 20 },
//             }}
//             pagination={{ clickable: true }}
//             modules={[Autoplay, Pagination]}
//             className="mySwiper"
//           >
//             {rooms.map((room: any, index: number) => (
//               <SwiperSlide key={index}>
//                 <HotelCard data={room} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       ) : (
//         // 🚫 JS Disabled – Static Fallback (first 4 cards)
//         <div className="js-disabled">
//           <div className="row justify-content-center g-4 mt-4">
//             {rooms.slice(0, 4).map((room: any, index: number) => (
//               <div key={index} className="col-md-3 col-sm-6">
//                 <div className="max-w-100 p-4 overflow-hidden bg-white rounded-4 heritage-card p-0 tourCard shadow-none">
//                   {/* 🖼️ Image */}
//                   {/* <a href={`/luxury-hotels/${room.slug}`}> */}
//                     <img
//                       className="w-100 h-56 object-cover rounded-4 custom-hover"
//                       src={getImageUrl(room)}
//                       alt={getImageAlt(room)}
//                       onError={(e) =>
//                         ((e.target as HTMLImageElement).src = "/images/no-img.webp")
//                       }
//                     />
//                   {/* </a> */}

//                   {/* 📄 Text Content */}
//                   <div className="mt-3 pb-0 text-center px-2">
//                     <h5 className="mb-2 text-black font-semibold">
//                       {room?.title}
//                     </h5>
//                     <div className="text-[#575757] text-sm mb-2">
//                       <p className="line-clamp-hotel text-muted">
//                         {cleanText(room?.details || room?.short_description, 100)}
//                       </p>
//                     </div>
//                   </div>

//                   {/* 🔘 Static Button */}
//                   <div className="mx-auto w-100 mt-3 px-2 pb-3">
//                     <div className="button text-center">
//                       <a
                        
//                         className="btn blue-btn w-100 d-inline-flex align-items-center justify-content-center"
//                         style={{
//                           backgroundColor: "#05164D",
//                           color: "#fff",
//                           borderRadius: "8px",
//                           textDecoration: "none",
//                           padding: "10px 0",
//                           fontWeight: "500",
//                           transition: "all 0.3s ease",
//                         }}
//                       >
//                         {room.slug ? "View Details" : "Enquire Nowwww"}
//                         <span className="ms-2">
//                           <img
//                             src="/images/button-arrow.png"
//                             width={20}
//                             height={20}
//                             alt="arrow"
//                             style={{ filter: "invert(1)" }}
//                           />
//                         </span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import HotelCard from "@/app/components/hotel/HotelCard";
import HotelEnquiryModal from "@/app/modals/hotelEnquiryModal";
import "swiper/css";
import "swiper/css/pagination";

export default function HotelRoomsSection({ rooms, slug }: any) {
  const [jsEnabled, setJsEnabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    setJsEnabled(true);
  }, []);

  if (!rooms || rooms.length === 0) return null;

  // ✅ Helpers for Fallback Data
  const getImageUrl = (room: any) => {
    if (room?.images?.length > 0 && room.images[0].image_path)
      return room.images[0].image_path;
    return room?.primary_image || "/images/no-img.webp";
  };
  const getImageAlt = (room: any) => {
    if (room?.images?.length > 0 && room.images[0].image_alt)
      return room.images[0].image_alt;
    return room?.title || "Hotel Room";
  };
  const cleanText = (text: string, limit = 100) => {
    if (!text) return "";
    const stripped = text
      .replace(/<[^>]*>/g, "") // remove HTML tags
      .replace(/\*\*(.*?)\*\*/g, "$1") // remove markdown bold
      .trim();
    return stripped.length > limit ? stripped.slice(0, limit) + "..." : stripped;
  };

  return (
    <>
      <div className="mt-5 hotel-rooms-section">
        <h2 className="mb-4 text-center fs-3">Luxury Hotel Rooms</h2>
        {/* ✅ JS Enabled – Swiper Carousel */}
        {jsEnabled ? (
          <div className="js-enabled">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {rooms.map((room: any, index: number) => (
                <SwiperSlide key={index}>
                  <HotelCard
                    data={room}
                    setopenModal={setOpenModal}
                    setSelectedRoom={setSelectedRoom}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          // 🚫 JS Disabled – Static Fallback (first 4 cards)
          <div className="js-disabled">
            <div className="row justify-content-center g-4 mt-4">
              {rooms.slice(0, 4).map((room: any, index: number) => (
                <div key={index} className="col-md-3 col-sm-6">
                  <HotelCard
                    data={room}
                    setopenModal={setOpenModal}
                    setSelectedRoom={setSelectedRoom}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <HotelEnquiryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        slug={slug}
        selectedRoom={selectedRoom}
      />
    </>
  );
}