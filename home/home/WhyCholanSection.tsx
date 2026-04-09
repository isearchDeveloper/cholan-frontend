"use client";

import styles from "./whycholan.module.css";

const data = [
  {
    icon: "/images/684908.png",
    title: "Experiences & Destinations",
    text: "From luxury escapes to spiritual journeys, every itinerary is crafted for unforgettable travel experiences.",
    number: "01",
  },
  {
    icon: "/images/942748.png",
    title: "Services & Expertise",
    text: "Cholan Tours delivers seamless solutions, including customised itineraries, MICE services, and group travel management.",
    number: "02",
  },
  {
    icon: "/images/2909592.png",
    title: "Sustainability & Responsible Tourism",
    text: "We promote eco-friendly tourism, cultural preservation, and meaningful community engagement in every journey.",
    number: "03",
  },
  {
    icon: "/images/2920277.png",
    title: "Why Cholan Tours?",
    text: "Over two decades of expertise, delivering tailored travel with award-winning service and multilingual support.",
    number: "04",
  },
];

const WhyCholanSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* TOP CONTENT */}
        <div className={styles.top}>
          <h2 className={styles.heading}>
            Why Cholan Tours is Your Best Choice
          </h2>

          <div className={styles.rightText}>
            <p>
              With years of expertise, we create thoughtfully curated journeys
              backed by seamless service and a strong commitment to responsible travel.
            </p>

            <a href="/about-us" className={styles.link}>
              About Cholan Tour →
            </a>
          </div>
        </div>

        {/* CARDS */}
        <div className={styles.grid}>
          {data.map((item, i) => (
            <div key={i} className={styles.card}>
              
              <span className={styles.number}>{item.number}</span>

              <img
                src={item.icon}
                alt={item.title}
                className={styles.icon}
              />

              <h4 className={styles.title}>{item.title}</h4>

              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyCholanSection;