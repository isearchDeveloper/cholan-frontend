import { Metadata } from "next";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import NewsForm from "@/app/components/news-letter/NewsForm";
import FAQAccordionForNews from "@/app/components/news-letter/FAQAccordionForNews";
import { XPublicToken } from "@/app/urls/apiUrls";

const CDN_URL = "https://cdn.cholantours.com/";

async function getDetails(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/news/${slug}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const result = await getDetails(params.slug);

  if (!result?.data) {
    return {
      title: "Newsletter Details | Cholan Tours",
      description: "Read the latest travel newsletters from Cholan Tours.",
    };
  }

  const item = result.data;

  return {
    title: item.meta_title?.trim() || item.title,
    description: item.meta_description?.trim() || "",
  };
}

export default async function NewsLetterDetails({ params }: any) {
  const result = await getDetails(params.slug);

  if (!result?.data) {
    return <div className="container py-5">Newsletter not found</div>;
  }

  const item = result.data;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News Letter", href: "/newsletter" },
    { label: item.title, isCurrent: true },
  ];

  return (
    <div className="news-details-wrapper">
      <div className="container py-5">
        <Breadcrumb items={breadcrumbItems} />

        <h1>{item.title}</h1>

        <img
          src={`${CDN_URL}${item.primary_img}`}
          className="img-fluid mb-3 w-100"
        />

        <div dangerouslySetInnerHTML={{ __html: item.description }} />

        <NewsForm />

        {item?.faqs?.length > 0 && (
          <FAQAccordionForNews
            faqs={item.faqs}
            name={item.faq_title}
          />
        )}
      </div>
    </div>
  );
}
