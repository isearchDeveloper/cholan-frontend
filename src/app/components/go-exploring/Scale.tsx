"use client";

import styles from "./Scale.module.css";

/* =========================
   TYPES (STRICT)
========================= */
type ApiFeature = {
  id?: number;
  title: string;
  description?: string;
  desc?: string;
  icon?: string;
};

type ScaleProps = {
  data?: {
    features?: ApiFeature[];
    feature_section_description?: string;
  };
};

/* =========================
   FALLBACK DATA
========================= */
const fallbackFeatures: ApiFeature[] = [
  {
    title: "Reach Global Travelers",
    desc: "Get discovered by international and domestic travelers searching for authentic India experiences.",
    icon: "🌍",
  },
  {
    title: "Zero Upfront Fees",
    desc: "List unlimited tours for free. Pay only when you complete bookings.",
    icon: "💸",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track views, bookings, and performance in real-time.",
    icon: "📊",
  },
];

/* =========================
   COMPONENT
========================= */
export default function Scale({ data }: ScaleProps) {
  
  /* 🔥 Normalize API → UI format */
  const items: ApiFeature[] = (data?.features?.length
    ? data.features
    : fallbackFeatures
  ).map((item) => ({
    title: item.title,
    desc: item.description || item.desc || "",
    icon: item.icon || "",
  }));

  return (
    <section className={styles.scale}>
      <div className={styles.container}>
        
        {/* ================= HEADING ================= */}
        <div className={styles.heading}>
          <h2>
            Everything You Need to <span>Scale</span>
          </h2>

          {/* ✅ HTML render from API */}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html:
                data?.feature_section_description ||
                "<p>We give Indian travel guides the same global-grade tools that big operators use — completely free to start.</p>",
            }}
          />
        </div>

        {/* ================= GRID ================= */}
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={i} className={styles.card}>
              
              {/* ICON */}
              {item.icon && (
                item.icon.startsWith("http") ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className={styles.icon}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.icon}>{item.icon}</div>
                )
              )}

              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}