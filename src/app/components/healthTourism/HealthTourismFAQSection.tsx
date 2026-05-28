"use client";
import React from "react";
import FAQAccordion from "@/app/components/common/FAQAccordion";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later
   ───────────────────────────────────────────────── */

const FAQS = [
  {
    question: "Can my family accompany me?",
    answer:
      "Yes, absolutely. We assist in arranging accommodation nearby for accompanying family members and provide hospital access passes so they can visit during visiting hours.",
  },
  {
    question: "What documents should I carry?",
    answer:
      "You should carry your passport, medical visa, previous medical records and test reports, doctor's referral letter (if any), travel insurance documents, and the hospital invitation letter provided by Cholan Tours.",
  },
  {
    question: "How far in advance should I plan my travel?",
    answer:
      "We recommend planning at least 4–6 weeks in advance for elective procedures. This allows sufficient time for the virtual consultation, treatment planning, medical visa processing, and travel arrangements. For urgent cases, we can expedite the process.",
  },
  {
    question: "Are interpreters available?",
    answer:
      "Yes. Our partner hospitals offer professional interpreter services for over 15 languages including Arabic, French, Russian, Swahili, and more. Your personal healing coordinator can also assist with communication throughout your stay.",
  },
  {
    question: "Will my dietary and cultural needs be respected?",
    answer:
      "Absolutely. We coordinate with the hospital kitchen and recovery accommodation to arrange meals that meet your cultural and dietary requirements — including halal, kosher, vegan, diabetic-friendly, and other preferences.",
  },
  {
    question: "What is the cost difference compared to my home country?",
    answer:
      "Medical procedures in India typically cost 60–80% less than equivalent treatments in the US, UK, or Australia, with no compromise on quality, accreditation, or post-operative care. We provide a detailed cost estimate before you commit.",
  },
  {
    question: "How do I get started with Cholan Health Tours?",
    answer:
      "Simply fill out the enquiry form on this page or contact us directly. Our team will schedule a virtual consultation, review your medical case, and present a personalised treatment and travel plan within 48 hours.",
  },
];

const HealthTourismFAQSection: React.FC = () => (
  <section className="py-5 bg-white">
    <div className="container">
      <FAQAccordion
        faqs={FAQS}
        location="Frequently Asked Questions"
      />
    </div>
  </section>
);

export default HealthTourismFAQSection;
