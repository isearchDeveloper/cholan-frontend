import styles from "./Contact.module.css";
import Image from "next/image";

export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>

        {/* LEFT FORM */}
        <div className={styles.formBox}>
          <h3>
            <span>Send</span> Your Words
          </h3>

          <input type="text" placeholder="Your Name*" />
          <input type="email" placeholder="Your email*" />
          <textarea placeholder="Your message*" rows={5}></textarea>

          <button>Send</button>
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles.right}>

          <span className={styles.tag}>Contacts</span>

          <h2>
            From Easy App Access To A Step-By-Step Guide Video, Everything You
            Need To <span>Get Started Is Right Here.</span>
          </h2>

          <div className={styles.media}>

            {/* QR */}
            <div className={styles.qr}>

              {/* QR CODE */}
              <a href="https://cholantours.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/go-exploring/qr-go-exploring.png"
                  alt="Scan QR"
                  width={120}
                  height={120}
                />
              </a>

              {/* PLAY STORE */}
              <a
                href="https://play.google.com/store/apps/details?id=com.goexploring"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.store}
                  src="/go-exploring/play-store.png"
                  alt="Google Play"
                  width={150}
                  height={45}
                />
              </a>

              {/* APP STORE */}
              <a
                href="https://apps.apple.com/in/app/go-exploring/id6758142143"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.store}
                  src="/go-exploring/app-store.png"
                  alt="App Store"
                  width={150}
                  height={45}
                />
              </a>

            </div>

            {/* YOUTUBE */}
            <div className={styles.video}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/BpYLxh4VyfE?si=IAzV_MYEFLnOHBOj&amp;controls=0"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}