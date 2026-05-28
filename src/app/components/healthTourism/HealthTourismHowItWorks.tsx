"use client";
import React from "react";
import {
  Video,
  ClipboardList,
  FileCheck,
  PlaneTakeoff,
  UserCheck,
  Languages,
  Salad,
  Leaf,
} from "lucide-react";
import styles from "./healthTourism.module.css";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later:
   const data = await fetchHealingJourneySteps();
   ───────────────────────────────────────────────── */

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: JourneyStep[] = [
  {
    id: 1,
    icon: <Video size={26} strokeWidth={1.5} />,
    title: "Virtual Consultation and Case Review",
    description:
      "Our specialists review your case and recommend the most suitable hospital, specialist, and care path.",
  },
  {
    id: 2,
    icon: <ClipboardList size={26} strokeWidth={1.5} />,
    title: "Personalised Healing Plan",
    description:
      "Receive a customised roadmap toward recovery. All this is included in the packages presented under the Health Tourism.",
  },
  {
    id: 3,
    icon: <FileCheck size={26} strokeWidth={1.5} />,
    title: "Visa Guidance and Documentation",
    description:
      "We provide the formal hospital invitation letter required for your medical visa and guide you through every step.",
  },
  {
    id: 4,
    icon: <PlaneTakeoff size={26} strokeWidth={1.5} />,
    title: "Travel & Accommodation Arrangements",
    description:
      "We arrange flights, airport transfers, and accommodation. This will give you the best Health Tourism experience in India.",
  },
  {
    id: 5,
    icon: <UserCheck size={26} strokeWidth={1.5} />,
    title: "Dedicated Personal Care Executive",
    description:
      "A personal Healing Coordinator is assigned from day one. They assist you wherever you are and remain your point of contact.",
  },
  {
    id: 6,
    icon: <Languages size={26} strokeWidth={1.5} />,
    title: "Interpreter & Communication Services",
    description:
      "Professional interpreters are available for 15+ languages, ensuring clear communication with your team.",
  },
  {
    id: 7,
    icon: <Salad size={26} strokeWidth={1.5} />,
    title: "Nutrition, Dietary & Cultural Support",
    description:
      "We arrange culturally sensitive meals, vegan, halal, kosher, vegetarian, diabetic-friendly, in coordination with the hospital.",
  },
  {
    id: 8,
    icon: <Leaf size={26} strokeWidth={1.5} />,
    title: "Recovery & Wellness Tourism",
    description:
      "We offer the option to combine your recovery with a restorative stay. You can opt for Ayurvedic treatments with our Health Tourism packages.",
  },
];

/* ── Single step card ── */
const StepCard: React.FC<{ step: JourneyStep }> = ({ step }) => (
  <div className={styles.howCard}>
    <div className={styles.howCardIcon}>{step.icon}</div>
    <h3 className={styles.howCardTitle}>{step.title}</h3>
    <p className={styles.howCardDesc}>{step.description}</p>
  </div>
);

/* ── Main section ── */
const HealthTourismHowItWorks: React.FC = () => (
  <section className={styles.howSection}>
    <div className="container">

      <div className={styles.howHeader}>
        <h2 className={styles.howHeading}>Your Healing Journey – How It Works</h2>
        <p className={styles.howSubtext}>
          From the moment you reach out, our dedicated team begins crafting your personalised healing
          journey with precision and care. Every step is thoughtfully coordinated so that you can
          focus on one thing: getting better.
        </p>
      </div>

      <div className={styles.howGrid}>
        {STEPS.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>

    </div>
  </section>
);

export default HealthTourismHowItWorks;
