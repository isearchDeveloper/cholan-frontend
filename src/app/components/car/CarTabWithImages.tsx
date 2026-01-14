import React from "react";
import CarTabWithImagesWithClient from "./ClientCarTabWithImages";
import CarTabWithImagesWithServer from "./ServerCarTabWithImages";

const CarTabWithImages: React.FC = () => {
  const jsEnabled = typeof window !== "undefined";

  return (
    <div suppressHydrationWarning>
      {jsEnabled ? (
        <CarTabWithImagesWithClient />
      ) : (
        <CarTabWithImagesWithServer />
      )}
    </div>
  );
};

export default CarTabWithImages;