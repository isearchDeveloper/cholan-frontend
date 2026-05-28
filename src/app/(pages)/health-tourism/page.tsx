import { Metadata } from "next";
import HealthTourismBanner from "@/app/components/healthTourism/HealthTourismBanner";
import HealthTourismAbout from "@/app/components/healthTourism/HealthTourismAbout";
import HealthTourismWhyIndia from "@/app/components/healthTourism/HealthTourismWhyIndia";
import HealthTourismHowItWorks from "@/app/components/healthTourism/HealthTourismHowItWorks";
import HealthTourismSpecialities from "@/app/components/healthTourism/HealthTourismSpecialities";
import HealthTourismPartnerHospitals from "@/app/components/healthTourism/HealthTourismPartnerHospitals";
import HealthTourismWhyCholan from "@/app/components/healthTourism/HealthTourismWhyCholan";
import HealthTourismExperienceCare from "@/app/components/healthTourism/HealthTourismExperienceCare";
import LogoSlider from "@/app/components/home/LogoSlider";
import WhyChoose from "@/app/components/home/WhyChoose";

export const metadata: Metadata = {
  title: "Health Tourism in India | Medical Travel Packages | Cholan Tours",
  description:
    "Plan your medical and wellness journey to India with Cholan Tours. We arrange hospital coordination, recovery stays, wellness retreats, and complete travel support for health tourism.",
};

const WHY_CHOOSE_DATA = [
  {
    title: "Expert Medical & Travel Team",
    details: [
      "Dedicated team with combined expertise in healthcare coordination and destination management",
      "Registered partner hospitals holding JCI and NABH accreditations",
      "Specialist matching based on your diagnosis, budget, and recovery goals",
      "Pre-arrival case review and virtual consultation arranged before you travel",
    ],
  },
  {
    title: "Accredited Hospital Network Across India",
    details: [
      "Exclusive partnerships with top-ranked hospitals in Chennai, Madurai, Trichy, and beyond",
      "Every facility personally vetted for safety, hygiene, and international patient services",
      "Access to robotic surgery, proton therapy, transplant centres, and speciality care",
      "Priority scheduling and dedicated international patient desks at all partner hospitals",
    ],
  },
  {
    title: "End-to-End Care Coordination",
    details: [
      "A personal Healing Coordinator assigned from first inquiry to final discharge",
      "Airport transfers, accommodation, meals, and in-hospital support all arranged",
      "Family accompaniment support including nearby stay and hospital access passes",
      "24×7 emergency support throughout your treatment and recovery period",
    ],
  },
  {
    title: "Transparent Pricing & Personalised Planning",
    details: [
      "Detailed cost estimates provided before you commit — no hidden charges",
      "Customised treatment and travel packages based on your exact medical needs",
      "Flexible payment support and assistance with insurance documentation where applicable",
      "Clear timelines for treatment, recovery, and return travel planning",
    ],
  },
  {
    title: "Cultural & Language Support",
    details: [
      "Professional interpreters available for 15+ languages including Arabic, French, and Russian",
      "Culturally sensitive meal arrangements — halal, kosher, vegan, and diabetic-friendly",
      "Guidance on Indian customs, hospital etiquette, and local recovery destinations",
      "Dedicated support for patients travelling alone or with elderly companions",
    ],
  },
];

const HEALTH_FAQ_DATA = [
  {
    title: "Can my family accompany me?",
    details: [
      "Yes, absolutely. We assist in arranging accommodation nearby for accompanying family members and provide hospital access passes so they can visit during visiting hours.",
    ],
  },
  {
    title: "What documents should I carry?",
    details: [
      "You should carry your passport, medical visa, previous medical records and test reports, doctor's referral letter (if any), travel insurance documents, and the hospital invitation letter provided by Cholan Tours.",
    ],
  },
  {
    title: "How far in advance should I plan my travel?",
    details: [
      "We recommend planning at least 4–6 weeks in advance for elective procedures. This allows sufficient time for the virtual consultation, treatment planning, medical visa processing, and travel arrangements. For urgent cases, we can expedite the process.",
    ],
  },
  {
    title: "Are interpreters available?",
    details: [
      "Yes. Our partner hospitals offer professional interpreter services for over 15 languages including Arabic, French, Russian, Swahili, and more. Your personal healing coordinator can also assist with communication throughout your stay.",
    ],
  },
  {
    title: "Will my dietary and cultural needs be respected?",
    details: [
      "Absolutely. We coordinate with the hospital kitchen and recovery accommodation to arrange meals that meet your cultural and dietary requirements — including halal, kosher, vegan, diabetic-friendly, and other preferences.",
    ],
  },
  {
    title: "What is the cost difference compared to my home country?",
    details: [
      "Medical procedures in India typically cost 60–80% less than equivalent treatments in the US, UK, or Australia, with no compromise on quality, accreditation, or post-operative care. We provide a detailed cost estimate before you commit.",
    ],
  },
  {
    title: "How do I get started with Cholan Health Tours?",
    details: [
      "Simply fill out the enquiry form on this page or contact us directly. Our team will schedule a virtual consultation, review your medical case, and present a personalised treatment and travel plan within 48 hours.",
    ],
  },
];

export default function HealthTourismPage() {
  return (
    <div>
      <HealthTourismBanner />
      <HealthTourismAbout />
      <HealthTourismWhyIndia />
      <HealthTourismHowItWorks />
      <HealthTourismSpecialities />
      <HealthTourismPartnerHospitals />
      <HealthTourismWhyCholan />
      <HealthTourismExperienceCare />
      <WhyChoose
        data={WHY_CHOOSE_DATA}
        heading="Why Choose Cholan Tours for Health Tourism?"
        description="From certified hospital partnerships and personalised care coordinators to complete travel logistics — here is why international patients trust Cholan Tours for their healing journey in India."
      />
      <div >
        <LogoSlider />
      </div>
    </div>
  );
}
