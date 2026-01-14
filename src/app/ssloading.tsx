"use client";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".global-loader")
        ?.classList.add("fade-out");
    }, 5000);
  }, []);

  return (
    <div className="global-loader">
      <img src="/images/cholan-loader-logo.gif" alt="Loading..." className="loader-gif" />
    </div>
  );
}
