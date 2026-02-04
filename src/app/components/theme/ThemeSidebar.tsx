"use client";

import Link from "next/link";

interface ThemeSidebarProps {
  citySlug: string;
  cityName: string;
  themes: {
    title: string;
    slug: string;
  }[];
}

export default function ThemeSidebar({
  citySlug,
  cityName,
  themes,
}: ThemeSidebarProps) {
  if (!themes || themes.length === 0) return null;

  return (
    <div className="sidebar-listing">
      <div className="mb-4 theme-section shadow-sm c-sec">
        <div className="d-flex align-items-center p-3 text-white">
          <img src="/images/icon-head-1.svg" className="icon" />
          <h6 className="ms-2 mb-0 text-white font-semibold">
            {cityName} Tour By Theme
          </h6>
        </div>

        <ul className="list-unstyled p-4">
          {themes.map((theme) => (
            <li key={theme.slug} className="mb-2">
              <Link
                href={`/india/${citySlug}-${theme.slug}`}
                className="text-decoration-none text-dark hover-link"
              >
                {theme.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
