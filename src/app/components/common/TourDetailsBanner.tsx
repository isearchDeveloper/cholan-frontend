"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"; // Added Thumbnails plugin
import "yet-another-react-lightbox/plugins/thumbnails.css"; // Added Thumbnails CSS
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PlanTripButton from "./PlanTripButton";

interface TourDetailsBannerProps {
  image: string;
  images: {
    image_alt: string;
    image_path: string;
  }[];
  className?: string;
  alt: string;
  title: string;
}

const TourDetailsBanner: React.FC<TourDetailsBannerProps> = ({
  image,
  images,
  className,
  alt,
  title,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1023);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const allImages = [image, ...images.map((img) => img.image_path)];
  const allAlts = [alt, ...images.map((img) => img.image_alt)];
  const slides = allImages.map((src) => ({ src }));

  const openLightbox = (index: number) => {
    setIsLoading(true);
    setPhotoIndex(index);

    if (preloadedImages.has(allImages[index])) {
      setIsOpen(true);
      setIsLoading(false);
    } else {
      const img = new window.Image();
      img.onload = () => {
        setIsOpen(true);
        setIsLoading(false);
        setPreloadedImages((prev) => new Set([...prev, allImages[index]]));
      };
      img.onerror = () => {
        setIsLoading(false);
      };
      img.src = allImages[index];
    }
  };

  const modal = () => {
    setOpenModal(true);
    setIsOpen(false);
    setIsMobile(false);
  };

  if (isMobile) {
    return (
      <>
        <div className={`${className ?? ""}`}>
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            className="mySwiper"
          >
            {allImages.map((src, index) => (
              <SwiperSlide key={index}>
                <div
                  className="cursor-pointer d-flex align-items-center justify-content-center"
                  onClick={() => openLightbox(index)}
                  style={{ height: "400px" }}
                >
                  <div className="position-relative w-100 h-100">
                    <Image
                      src={src || "/images/no-img.webp"}
                      alt={allAlts[index] || alt}
                      width={400}
                      height={300}
                      className="object-fit-cover w-100 h-100 rounded transition-transform duration-300 custom-hover"
                      unoptimized
                    />
                    {isLoading && (
                      <div className="absolute inset-0 bg-black/20 d-flex align-items-center justify-content-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={photoIndex}
          plugins={[Thumbnails]} // Added Thumbnails plugin
          on={{
            view: ({ index }) => setPhotoIndex(index),
          }}
          render={{
            slideHeader: () => (
              <div className="text-center py-3">
                <button
                  className="btn orange-btn"
                  onClick={() => modal()}
                >
                  Plan Your Trip
                </button>
              </div>
            ),
            slideFooter: () => (
              <div className="py-3 text-center">
                <h3 className="text-white m-0 fs-5">{allAlts[photoIndex] || null}</h3>
              </div>
            ),
            slide: ({ slide }) => (
              <div className="d-flex justify-content-center">
                <img
                  src={slide.src}
                  alt={""}
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                  className="rounded"
                />
              </div>
            ),
          }}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={`row position-relative gap-4 gap-sm-4 gap-md-0 ${
          className ?? ""
        }`}
      >
        {/* Left side: One large image */}
        <div
          className="left-banner col-lg-6 d-flex align-items-center justify-content-center group pe-0"
          onClick={() => openLightbox(0)}
        >
          <div className="position-relative w-100 h-100">
            <Image
              src={encodeURI(image) || "/images/no-img.webp"}
              alt={alt || "/images/no-img.webp"}
              width={800}
              height={500}
              className="object-fit-cover w-100 h-100 transition-transform duration-300 custom-hover rounded"
              priority
              unoptimized
            />
            {isLoading && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        <div className="right-banner col-lg-6 d-flex flex-col gap-2">
          <div className="row gap-4 gap-sm-4 gap-md-0">
            {images?.slice(0, 2).map((img, index) => (
              <div
                key={index}
                className="col-lg-6 d-flex align-items-center justify-content-center group pe-0"
                onClick={() => openLightbox(index + 1)}
              >
                <div className="position-relative w-100 h-100">
                  <Image
                    src={img.image_path || "/images/no-img.webp"}
                    alt={img.image_alt || "/images/no-img.webp"}
                    width={400}
                    height={250}
                    className="object-fit-cover w-100 h-100 rounded transition-transform duration-300 custom-hover"
                    unoptimized
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-content-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="row gap-4 gap-sm-4 gap-md-0">
            {images?.slice(2, 4).map((img, index) => (
              <div
                key={index}
                className="col-lg-6 d-flex align-items-center justify-content-center group pe-0"
                onClick={() => openLightbox(index + 3)}
              >
                <div className="position-relative w-100 h-100">
                  <Image
                    src={img.image_path || "/images/no-img.webp"}
                    alt={img.image_alt}
                    width={400}
                    height={250}
                    className="object-fit-cover w-100 h-100 rounded transition-transform duration-300 custom-hover"
                    unoptimized
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-content-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={photoIndex}
        plugins={[Thumbnails]}
        on={{
          view: ({ index }) => setPhotoIndex(index),
        }}
        render={{
          slideHeader: () => (
            <div className="text-center py-3">
              <button className="btn orange-btn" onClick={() => modal()}>
                Plan Your Trip
              </button>
            </div>
          ),
          slideFooter: () => (
            <div className="py-2 text-center">
              <h3 className="text-white m-0 fs-6">{allAlts[photoIndex] || null}</h3>
            </div>
          ),
          slide: ({ slide }) => (
            <div className="d-flex justify-content-center light-slide-img">
              <img
                src={slide.src}
                alt={""}
                style={{ width: "1000px", height: "400px", objectFit: "cover" }}
                className="rounded"
              />
            </div>
          ),
        }}
      />

      {openModal === true ? <PlanTripButton openModal={openModal}  setOpenModal={setOpenModal} setIsOpen={setIsOpen}/> : null}
    </>
  );
};

export default TourDetailsBanner;
