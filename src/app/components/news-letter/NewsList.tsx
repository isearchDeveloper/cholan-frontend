// // components/news/NewsList.tsx

// import { XPublicToken } from "@/app/urls/apiUrls";
// import NewsPagination from "./NewsPagination";

// async function getNews(page = 1) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/news/page/list?type=news&page=${page}&limit=10`,
//     {
//       headers: { "X-Public-Token": XPublicToken },
//       next: { revalidate: 60 },
//     }
//   );

//   return res.json();
// }

// export default async function NewsList() {
//   const data = await getNews(1);
//  const news = data?.news || []; 

//   return <NewsPagination initialNews={news} />;
// }


import NewsPagination from "./NewsPagination";
import { XPublicToken } from "@/app/urls/apiUrls";

async function getList(type: string, page = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/news/page/list?type=${type}&page=${page}&limit=10`,
    {
      headers: { "X-Public-Token": XPublicToken },
      next: { revalidate: 60 },
    }
  );

  return res.json();
}

export default async function NewsList({
  type,
}: {
  type: "news" | "newsletter";
}) {
  const data = await getList(type, 1);
  const items = data?.news || [];

  return <NewsPagination initialNews={items} type={type} />;
}
