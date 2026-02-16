import { fairFestivalData } from "@/app/data/fairFestivalDummyData";
import FairFestivalBanner from "@/app/components/fairfestival/FairFestivalBanner";
import FairFestivalExpandableText from "@/app/components/fairfestival/FairFestivalExpandableText";
import CityEnquiryForm from "@/app/components/common/CityEnquiryForm";
import FAQAccordionFairFestival from "@/app/components/fairfestival/FAQAccordionFairFestival";

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({
  params,
}: PageProps) {

  const { slug } = await params;

  const festival = fairFestivalData.find(
    (item) => item.slug === slug
  );

  if (!festival) {
    return {
      title: "Festival Not Found",
      description: "Festival details not available",
    };
  }

  return {
    title: festival.meta?.meta_title,
    description: festival.meta?.meta_description,

    openGraph: {
      title: festival.meta?.meta_title,
      description: festival.meta?.meta_description,
    },

    twitter: {
      title: festival.meta?.meta_title,
      description: festival.meta?.meta_description,
    },
  };
}

export default async function FestivalDetailPage({
  params,
}: PageProps) {

  const { slug } = await params;

  const festival = fairFestivalData.find(
    (item) => item.slug === slug
  );

  if (!festival) return <div>Not Found</div>;

  return (
    <div className="fair-festival-wrapper">
      <FairFestivalBanner />
      {/* bannerData={festival.banner} */}

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <FairFestivalExpandableText
              title={festival.overview.title}
              text={festival.overview.description}
            />
          </div>

          <div className="col-lg-4 car-sticky">
            <CityEnquiryForm />
          </div>
        </div>

        {festival.faqs?.length > 0 && (
          <div className="py-5 center-faqs">
            <div className="container">
              <FAQAccordionFairFestival faqs={festival.faqs} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
