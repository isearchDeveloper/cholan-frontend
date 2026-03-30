import styles from "./Scale.module.css";

const features = [
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
  {
    title: "Affiliate & Creator Network",
    desc: "Collaborate with travel bloggers and influencers.",
    icon: "🤝",
  },
  {
    title: "GST & INR Compliant",
    desc: "All payments follow Indian tax laws automatically.",
    icon: "🇮🇳",
  },
  {
    title: "Quality Badge",
    desc: "Earn trust with verified listings and increase bookings.",
    icon: "🛡️",
  },
];

export default function Scale() {
  return (
    <section className={styles.scale}>
      <div className={styles.container}>
        
        {/* HEADING */}
        <div className={styles.heading}>
          <h2>
            Everything You Need to <span>Scale</span>
          </h2>
          <p>
            We give Indian travel guides the same global-grade tools that big
            operators use - completely free to start.
          </p>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {features.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}