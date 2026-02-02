import { Metadata } from "next";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import NewsForm from "@/app/components/news-letter/NewsForm";
import FAQAccordionForNews from "@/app/components/news-letter/FAQAccordionForNews";
import { XPublicToken } from "@/app/urls/apiUrls";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
    },
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
      <div className="pt-4 pb-5">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <div className="row">
            <div className="col-lg-8">
              <h1 className="mb-2">{item.title}</h1>

              <img
                src={`${CDN_URL}${item.primary_img}`}
                className="img-fluid mb-3 w-100"
              />

              <div
                className="news-page-editor"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>

            <div className="col-lg-4">
              <div className="side-sticky-form">
                <NewsForm />
              </div>
            </div>
          </div>

          {item?.faqs?.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <FAQAccordionForNews faqs={item.faqs} name={item.faq_title} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
