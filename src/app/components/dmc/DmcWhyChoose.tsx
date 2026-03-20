// app/components/dmc/DmcWhyChoose.tsx

import styles from "./DmcWhyChoose.module.css";
import { FaCheck } from "react-icons/fa";

interface WhyChooseItem {
  id: string;
  title: string;
  description?: string;
}

interface DmcWhyChooseProps {
  items: WhyChooseItem[];
  cityName: string;
}

export default function DmcWhyChoose({ items, cityName }: DmcWhyChooseProps) {
  return (
    <section className={styles.whyChoose}>
      <div className="container">
        <h2 className={styles.title}>
          Why Choose Cholan Tours as Your DMC in {cityName}
        </h2>

        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              
              {/* ICON */}
              <div className={styles.iconWrapper}>
                <FaCheck className={styles.icon} />
              </div>

              {/* TEXT */}
              <p className={styles.cardTitle}>{item.title}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}