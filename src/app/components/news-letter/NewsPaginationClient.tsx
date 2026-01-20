"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";     
import { XPublicToken } from "@/app/urls/apiUrls";
 
const CDN_URL = "https://cdn.cholantours.com/";
 
export default function NewsPaginationClient() {
  const [news, setNews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
 
  async function loadNews(pageNo: number) {
    setLoading(true);
 
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/news/page/list?page=${pageNo}&limit=${limit}`,
      {
        headers: { "X-Public-Token": XPublicToken },
        next: { revalidate: 60 },
      }
    );
 
    const data = await res.json();
    const items = data?.news || [];
 
    setNews(items);
 
    // Calculate total pages WITHOUT total count from backend
    if (items.length < limit) {
      setTotalPages(pageNo); // LAST PAGE
    } else {
      setTotalPages(pageNo + 1); // NEXT PAGE MAY EXIST
    }
 
    setLoading(false);
  }
 
  useEffect(() => {
    loadNews(page);
  }, [page]);
 
  return (
<div>
      {loading ? (
<p className="text-center">Loading news...</p>
      ) : (
<div className="news-magazine-grid">
          {news.map((item: any) => (
<article className="news-magazine-item" key={item.id}>
<Link href={`/news/${item.slug}`}>
<img
                  src={
                    item.primary_img?.startsWith("http")
                      ? item.primary_img
                      : `${CDN_URL}${item.primary_img}`
                  }
                  alt={item.primary_img_alt || item.title}
                  className="w-100"
                />
</Link>
 
              <div className="news-text-wrapper beige-bg">
<p className="news-date">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
</p>
 
                <Link href={`/news/${item.slug}`}>
<h2 className="news-headline">{item.title}</h2>
</Link>
 
                <div
                  className="news-description line-clamp"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
 
                <Link href={`/news/${item.slug}`} className="news-btn">
                  Read More
</Link>
</div>
</article>
          ))}
</div>
      )}
 
      {/* Pagination Controls */}
<div className="pagination-wrapper text-center mt-4 flex justify-center items-center gap-3 my-pagination-wrap">
  {/* Previous Button */}
  {page > 1 && (
<button
      onClick={() => setPage(page - 1)}
      className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
>
<Image
        width={20}
        height={20}
        src="/images/button-arrow.png"
        alt="arrow"
        style={{ transform: "rotate(180deg)" }}
      />
      Previous
</button>
  )}
 
  {/* Next Button */}
  {page < totalPages && (
<button
      onClick={() => setPage(page + 1)}
      className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
>
      Next
<Image
        width={20}
        height={20}
        src="/images/button-arrow.png"
        alt="arrow"
      />
</button>
  )}
 
</div>
 
    </div>
  );
}