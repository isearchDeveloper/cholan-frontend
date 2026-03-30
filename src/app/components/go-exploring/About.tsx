import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <span className={styles.tag}>About us</span>

          <h2>
            Who Are <span>We</span>
          </h2>

          <p>
            India is a diversified land with varied culture, lifestyles,
            history, heritage and traditions surprising the global tourists
            every time they visit Mother India.
          </p>

          <p>
            A first time traveller to India always gets amazed to look at the
            magnificent palaces and forts, beautifully architected temples
            housing intricate sculptures and figurines and the featured
            destinations dotted across the country.
          </p>

          <a href="/about-us" ><button className={styles.btn}>Find Out More</button></a>
        </div>

        {/* RIGHT IMAGES */}
        <div className={styles.right}>
          <div className={styles.imgMain}>
            <img src="/go-exploring/activity1.jpg" />
          </div>

          <div className={styles.imgTop}>
            <img src="/go-exploring/activity2.jpg" />
          </div>

          <div className={styles.imgBottom}>
            <img src="/go-exploring/activity3.jpg" />
          </div>
        </div>

      </div>
    </section>
  );
}