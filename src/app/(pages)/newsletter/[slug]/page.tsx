import { Metadata } from "next";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import NewsForm from "@/app/components/news-letter/NewsForm";
import FAQAccordionForNews from "@/app/components/news-letter/FAQAccordionForNews";
import { XPublicToken } from "@/app/urls/apiUrls";

type PageProps = {
  params: {
    slug: string;
  };
};



const CDN_URL = "https://cdn.cholantours.com/";

async function getDetails(slug: string) {
  try {
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
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;


  const result = await getDetails(slug);

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
    openGraph: {
      title: item.meta_title || item.title,
      description: item.meta_description || "",
      images: item.primary_img
        ? [{ url: `${CDN_URL}${item.primary_img}` }]
        : [],
    },
  };
}

export default async function NewsLetterDetails({ params }: PageProps) {
  const { slug } = params;

  // console.log(slug)
  const result = await getDetails(slug);

  if (!result?.data) {
    return (
      <div className="container py-5">
        <h2>Newsletter not found</h2>
      </div>
    );
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

              <p className="-details-news-date">
                <strong>Published on:</strong>{" "}
                {new Date(item.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>

              <img
                src={
                  item.primary_img?.startsWith("http")
                    ? item.primary_img
                    : `${CDN_URL}${item.primary_img}`
                }
                alt={item.primary_img_alt || item.title}
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
                <FAQAccordionForNews
                  faqs={item.faqs}
                  name={item.faq_title}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
