"use client";

import ThemeExpandableText from "./ThemeExpandableText";


interface ThemeOverviewProps {
  theme: string;
  title: string;
  city:string;
}



export default function ThemeOverview({ theme , title , city }: ThemeOverviewProps) {
  return (
    <div className="theme-overview-section">
      <h1 className="mb-3">{title ? title : `${city} Tour Packages`}</h1>
      <ThemeExpandableText text={theme} />
    </div>
  );
}
