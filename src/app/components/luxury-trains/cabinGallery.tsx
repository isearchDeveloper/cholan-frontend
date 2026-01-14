"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; 


const CabinGallery = ({ cabinData }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");

 
  const handleImageClick = (cabin: any) => {
    setSelectedImages(
      cabin.images.map((img: any) => ({
        src: img.image_path,
        alt: `${cabin.title} image`,
      }))
    );
    setSelectedTitle(cabin.title);
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
    setSelectedImages([]);
    setSelectedTitle("");
  };

  return (
    <div className="train-cabin-section container">
      <h2 className=" text-center mb-4 fs-3">Indian-Splendour Cabins</h2>
      <div className="row">
        {cabinData.map((cabin: any, index: any) => (
          <div className="col-lg-4" key={index}>
            <div className="d-flex flex-column gap-3">
              <div className="h-64 position-relative custom-hover" >
                <Image
                  width={600}
                  height={400}
                  src={cabin.images[0]?.image_path || "/images/no-img.webp"}
                  className="w-100 h-full object-cover rounded-4"
                  alt={cabin.images[0]?.image_alt }
                  onClick={() => handleImageClick(cabin)}
                 
                />
              </div>
              <h5 className="text-center">{cabin.title}</h5>
            </div>
          </div>
        ))}
      </div>


      <Lightbox
        open={showModal}
        close={closeModal}
        slides={selectedImages}
        render={{
          slide: ({ slide }) => (
            <img
              src={slide.src}
              alt="/images/no-img.webp"
              className="img-fluid"
             
            />
          ),
        }}
        carousel={{ finite: selectedImages.length <= 1 }}
        controller={{ closeOnBackdropClick: true }}
        plugins={[]}
      />
    </div>
  );
};

export default CabinGallery;