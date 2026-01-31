// components/news/NewsHero.tsx
import { XPublicToken } from "@/app/urls/apiUrls";

export default async function NewsHero({
  slug,
}: {
  slug: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=${slug}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  const pageData = data?.data?.details;

  if (!pageData) return null;

  return (
    <>
      <section
        className="news-hero-banner"
        style={{
          backgroundImage: `url('${pageData.banner_image}')`,
        }}
      >
        <div className="container text-center py-5">
          <h1 className="fw-bold display-4">
            {pageData.title}
          </h1>
        </div>
      </section>

      {pageData.short_description && (
        <section className="py-5 container">
          <div
            dangerouslySetInnerHTML={{
              __html: pageData.short_description,
            }}
          />
        </section>
      )}
    </>
  );
}
