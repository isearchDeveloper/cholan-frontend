import styles from "./About.module.css";

export default function About({ data }: any) {
  const images = data?.about_images || [];

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <span className={styles.tag}>About us</span>

          <h2>
          { data.about_title}
          </h2>

          {/* ✅ API DESCRIPTION (HTML) */}
          <div
            dangerouslySetInnerHTML={{
              __html: data?.about_description || "",
            }}
          />

          {/* ✅ BUTTON LINK FROM API */}
          <a href={data?.about_button_link || "#"}>
            <button className={styles.btn}>Find Out More</button>
          </a>
        </div>

        {/* RIGHT IMAGES */}
        <div className={styles.right}>
          
          {/* MAIN IMAGE */}
          {images[0] && (
            <div className={styles.imgMain}>
              <img src={images[0]} alt="about" />
            </div>
          )}

          {/* TOP IMAGE */}
          {images[1] && (
            <div className={styles.imgTop}>
              <img src={images[1]} alt="about" />
            </div>
          )}

          {/* BOTTOM IMAGE */}
          {images[2] && (
            <div className={styles.imgBottom}>
              <img src={images[2]} alt="about" />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}