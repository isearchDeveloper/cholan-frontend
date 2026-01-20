import { Metadata } from "next";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import GetInTouchForm from "@/app/components/customize-holidays/GetInTouchForm";
import NewsForm from "@/app/components/news-letter/NewsForm";
import FAQAccordionForNews from "@/app/components/news-letter/FAQAccordionForNews";
import { XPublicToken } from "@/app/urls/apiUrls";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


const CDN_URL = "https://cdn.cholantours.com/";

async function getNewsDetails(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/news/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Public-Token": XPublicToken,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("News API failed:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("News API error:", error);
    return null;
  }
}




export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const result = await getNewsDetails(slug);

    if (!result || !result.data) {
      return {
        title: "Cholan Tours News and Press Releases - Cholan Tours",
        description: "Stay updated with latest Cholan Tours news, travel stories, destination updates, tour announcements, and insights. Read travel tips by experts for your next journey.",
      };
    }

    const news = result.data;

    return {
      title: news.meta_title?.trim() || news.title || "News Details | Cholan Tours",
      description:
        news.meta_description?.trim() ||
        "Latest travel news and updates from Cholan Tours.",
      openGraph: {
        title: news.meta_title || news.title,
        description: news.meta_description || "",
        images: news.image ? [{ url: news.image }] : [],
      },
    };
  } catch (error) {
    console.error("generateMetadata error:", error);

    return {
      title: "News Details | Cholan Tours",
      description: "Read the latest travel news and updates from Cholan Tours.",
    };
  }
}




export default async function NewsDetails({ params }: PageProps) {
  const { slug } = await params;

  const result = await getNewsDetails(slug);

  if (!result || !result.data) {
    return (
      <div className="container py-5">
        <h2>News not found</h2>
      </div>
    );
  }

  const news = result.data;


  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: news.title, isCurrent: true },
  ];

  

  return (
    <div className="news-details-wrapper">
      <div className="pt-4 pb-5">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <div className="row">
            <div className="col-lg-8">
              <h1 className="mb-2">{news.title}</h1>
              <p className="-details-news-date">
                <strong>Published on:</strong>{" "}
                {new Date(news.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })}
                </p>


              <img
                    src={news.primary_img?.startsWith("http")
                      ? news.primary_img
                      : `${CDN_URL}${news.primary_img}`
                    }
                    alt={news.primary_img_alt || news.title}
                    className="img-fluid mb-3 w-100"
                  />
              <div className="news-page-editor" dangerouslySetInnerHTML={{ __html: news.description }} />
            </div>

            <div className="col-lg-4">
             <div className="side-sticky-form">   
              <NewsForm />
              </div>
            </div>
          </div>
          <div className="row">
             {news?.faqs && news.faqs.length > 0 && (
              <div className="row mt-5">
                <div className="col-12">
                  <FAQAccordionForNews
                    faqs={news.faqs}
                    name={news.faq_title}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
