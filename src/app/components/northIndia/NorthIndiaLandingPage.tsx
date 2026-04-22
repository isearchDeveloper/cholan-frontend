import OfferLandingPage, { OfferData } from "@/app/components/offerLanding/OfferLandingPage";

export default function NorthIndiaLandingPage({ offer }: { offer?: OfferData | null }) {
  return (
    <OfferLandingPage
      offer={offer}
      regionLabel="North India"
    />
  );
}
