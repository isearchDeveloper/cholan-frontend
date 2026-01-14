"use client";

import { useEffect } from "react";
import TripAdvisorWidget from "./TripAdvisorWisget";

export default function GoogleReviews() {
  useEffect(() => {
    // Load Elfsight script (only once)
    if (!document.querySelector(`script[src="https://elfsightcdn.com/platform.js"]`)) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="customer-rate">
      <div className="container">
        <div className="common-header-center">
          <h2 className="fs-3">
            <span>What Travellers Say About Us?</span>
          </h2>
        </div>
        <div className="customer-rate-wraper">
          <div
            className="elfsight-app-e3ee4787-6689-434d-9efd-47581053d784"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}