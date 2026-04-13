import Image from "next/image";
 
 
export default function AtAGlance() {
  return (
    <section className="glance-section">
      <div className="glance-container">
 
        <h2 className="glance-title">Cholan Tours at a Glance</h2>
 
        <div className="glance-grid">
 
          {/* ITEM 1 */}
          <div className="glance-item">
            <div className="glance-icon">
              <Image
                src="/images/sus1.png"
                alt="Sustainability & Innovation"
                width={120}
                height={120}
              />
            </div>
            <ul>
              <li>100% Running on Solar Energy</li>
              <li>100% Paperless Office</li>
            </ul>
          </div>
 
          {/* ITEM 2 */}
          <div className="glance-item">
            <div className="glance-icon">
              <Image
                src="/images/sus2.png"
                alt="Operational Strength"
                width={120}
                height={120}
              />
            </div>
            <ul>
              <li>150+ Fleets</li>
              <li>13 Offices Across the Country</li>
              <li>300+ Dedicated Staff</li>
            </ul>
          </div>
 
          {/* ITEM 3 */}
          <div className="glance-item">
            <div className="glance-icon">
              <Image
                src="/images/sus3.png"
                alt="Award Recognition"
                width={120}
                height={120}
              />
            </div>
            <ul>
              <li>5 Time National Tourism Award Winner</li>
              <li>Bagged 50+ National & International Awards</li>
            </ul>
          </div>
 
          {/* ITEM 4 */}
          <div className="glance-item">
            <div className="glance-icon">
              <Image
                src="/images/sus4.png"
                alt="Credibility & Global Presence"
                width={120}
                height={120}
              />
            </div>
            <ul>
              <li>Approved by Ministry of Tourism, Government of India</li>
              <li>Member of 25+ Global Tourism Networks</li>
            </ul>
          </div>
 
        </div>
      </div>
    </section>
  );
}
