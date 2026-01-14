import React from "react";
import CarDetailsTabWithImagesWithClient from "./ClientCarDetailsTabWithImages";
import CarDetailsTabWithImagesWithServer from "./ServerCarDetailsTabWithImages";

interface CarDetailsTabWithImagesProps {
  slug: string;
}

const CarDetailsTabWithImages: React.FC<CarDetailsTabWithImagesProps> = ({ slug }) => {
  const jsEnabled = typeof window !== "undefined";

  return (
    <div suppressHydrationWarning>
      {jsEnabled ? (
        <CarDetailsTabWithImagesWithClient slug={slug} />
      ) : (
      
        <CarDetailsTabWithImagesWithServer slug={slug} />
      )}
    </div>
  );
};

export default CarDetailsTabWithImages;
