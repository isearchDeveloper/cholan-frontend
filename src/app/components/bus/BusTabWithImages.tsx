import React from "react";
import CarTabWithImagesWithClient from "./ClientBusTabWithImages";
import CarTabWithImagesWithServer from "./ServerBusTabWithImages";

const BusTabWithImages: React.FC = () => {
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

export default BusTabWithImages;