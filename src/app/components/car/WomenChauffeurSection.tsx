import Image from "next/image";

interface WCSCard {
  id: number;
  title: string;
  image: string;
  image_alt: string;
}

interface ChauffeurSection {
  section_title: string;
  section_description: string;
  cards: WCSCard[];
}

export default function WomenChauffeurSection({
  chauffeurSection,
}: {
  chauffeurSection: ChauffeurSection;
}) {
  return (
    <section className="wcs-section py-5">
      <div className="ts-container px-3 px-lg-0">
        <div className="wcs-header">
          <h2 className="wcs-title">{chauffeurSection.section_title}</h2>
          <div
            className="wcs-description"
            dangerouslySetInnerHTML={{ __html: chauffeurSection.section_description }}
          />
        </div>

        <div className="wcs-grid">
          {chauffeurSection.cards.map((card) => (
            <div key={card.id} className="wcs-card">
              <Image
                src={`${card.image}`}
                alt={card.image_alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <div className="wcs-card-overlay">
                <p className="wcs-card-label">{card.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
