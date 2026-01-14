import React from "react";
import BusDetailsTabWithImagesWithClient from "./ClientBusDetailsTabWithImages";
import BusDetailsTabWithImagesWithServer from "./ServerBusdetailsTabWithImages";

interface BusDetailsTabWithImagesProps {
  slug: string;
}

const BusDetailsTabWithImages: React.FC<BusDetailsTabWithImagesProps> = ({ slug }) => {
  const jsEnabled = typeof window !== "undefined";

  return (
    <div suppressHydrationWarning>
      {jsEnabled ? (
        <BusDetailsTabWithImagesWithClient slug={slug} />
      ) : (
      
        <BusDetailsTabWithImagesWithServer slug={slug} />
      )}
    </div>
  );
};

export default BusDetailsTabWithImages;