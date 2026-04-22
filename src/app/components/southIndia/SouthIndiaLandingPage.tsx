import OfferLandingPage, { OfferData } from "@/app/components/offerLanding/OfferLandingPage";

export default function SouthIndiaLandingPage({ offer }: { offer?: OfferData | null }) {
  return (
    <OfferLandingPage
      offer={offer}
      regionLabel="South India"
    />
  );
}
