import FairFestivalBanner from "@/app/components/fairfestival/FairFestivalBanner";
import FairFestivalExpandableText from "@/app/components/fairfestival/FairFestivalExpandableText";
import CityEnquiryForm from "@/app/components/common/CityEnquiryForm";
import FAQAccordionFairFestival from "@/app/components/fairfestival/FAQAccordionFairFestival";
import { fairFestivalDetail } from "@/app/services/fairfestivalService";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import LogoSlider from "@/app/components/home/LogoSlider";
import { notFound } from "next/navigation";
import { getCanonical } from "@/app/lib/getCanonical";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ---------- SHARED FETCH ---------- */
async function getFestival(slug: string) {
  const data = await fairFestivalDetail(slug);
  return data?.data?.festival || null;
}

/* ---------- HTML CLEANER ---------- */
function stripHtml(text?: string) {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, "").trim();
}

/* ---------- METADATA ---------- */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // ⭐ MUST await

  const festival = await getFestival(slug);

  if (!festival) {
    return {
      title: "Festival Not Found",
      description: "Festival details not available",
    };
  }

  const description = stripHtml(festival.short_description).slice(0, 160);

  const canonical = await getCanonical(`/india/fairs-festivals/${slug}`);

  return {
    title: festival?.meta?.meta_title || festival.title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: festival?.meta?.meta_title || festival.title,
      description,
      url: canonical,
    },

    twitter: {
      title: festival?.meta?.meta_title || festival.title,
      description,
    },
  };
}

/* ---------- PAGE ---------- */
export default async function FestivalDetailPage({ params }: PageProps) {
  const { slug } = await params; //  MUST await

  const festival = await getFestival(slug);

  // console.log(festival)

  if (!festival) {
    return notFound();
  }

  // dynamic breadcrumb
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Fairs Festivals", href: "/india/fairs-festivals" },
    { label: festival.title, isCurrent: true },
  ];

  return (
    <div className="fair-festival-wrapper">
      {/* Reused banner */}
      <FairFestivalBanner banner={festival} />

      <div className="container py-5">
        <div className="row">
          <Breadcrumb items={breadcrumbItems} />
          <div className="col-lg-8">
            <FairFestivalExpandableText
              title={festival.title}
              subtitle={festival.sub_title}
              text={festival.short_description}
            />
          </div>

          <div className="col-lg-4 car-sticky">
            <CityEnquiryForm />
          </div>
        </div>

        {festival?.faqs?.length > 0 && (
          <div className="py-5 center-faqs">
            <div className="container">
              <FAQAccordionFairFestival faqs={festival.faqs} title={festival.faq_title} />
            </div>
          </div>
        )}
      </div>
      <div className="pb-5">
        <LogoSlider />
      </div>
    </div>
  );
}
