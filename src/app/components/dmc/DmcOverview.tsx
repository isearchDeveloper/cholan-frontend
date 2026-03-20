import styles from "./DmcOverview.module.css";

interface DmcOverviewProps {
  content: string;
  cityName: string;
}

export default function DmcOverview({ content }: DmcOverviewProps) {
  return (
    <section className={styles.overview}>
      <div className="container">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}