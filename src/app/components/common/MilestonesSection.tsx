import Image from "next/image";

const milestonesData = [
  {
    image: "/images/window-to-the-world.webp",
    text:
      "The journey began in 1998 when the company was launched under the name Window to the World with just three staff members. That same year, a branch office was established in Delhi and the first Ambassador car was purchased. However, following the global travel downturn after the 9/11 attacks, the company made the difficult decision to wind up its operations. By 2002, Window to the World was officially closed, paving the way for a stronger vision ahead.",
  },
  {
    image: "/images/a-new-beginning-with-south-tourism.webp",
    text:
      "On 14 February 2003, the founders launched South Tourism to focus on B2B operations across South India. By mid-year, branch offices in Bangalore and Cochin were opened. Three new cars were added to support the expanding services.",
  },
  {
    image: "/images/steady-expansion.webp",
    text:
      "The momentum continued in 2004 with the opening of additional branches in Trivandrum and Chennai. Five more vehicles were added to the fleet, and the company joined the Indian Association of Tour Operators (IATO), solidifying its professional standing in the industry.",
  },
  {
    image: "/images/the-birth-of-indian-panorama.webp",
    text:
      "On 15 March 2005, the company expanded nationwide through the launch of the brand Indian Panorama. That year also saw a branch office opened in Madurai and the addition of 20 vehicles to the Delhi fleet. South Tourism was officially approved by the Ministry of Tourism, Government of India.",
  },
  {
    image: "/images/building-momentum.webp",
    text:
      "In 2006, the company joined the Kerala Travel Mart (KTM) and expanded its fleet by 30 vehicles, marking continued growth and reach.",
  },
  {
    image: "/images/operational-refinement.webp",
    text:
      "With the entry of Ms. Mythily Pandian in 2007, internal operations were streamlined and several new systems were introduced. The company also expanded its affiliations by joining prominent global tourism bodies including IATA, PATA, ASTA, AFTA, and TAAI.",
  },
  {
    image: "/images/embracing-digital-and-fleet-growth.webp",
    text:
      "2008 was a year of transformation. The fleet grew by 50 vehicles, including buses. Indian Panorama received official recognition from the Ministry of Tourism. An HR Manager was appointed, and a transition to paperless operations marked the company's commitment to eco-friendly practices.",
  },
  {
    image: "/images/the-birth-of-indian-panorama-1.webp",
    text:
      "In 2009, South Tourism and Indian Panorama were officially registered as trademarks. An additional 20 vehicles were added, further strengthening the fleet.",
  },
  {
    image: "/images/establishing-cholan-tours-pvt-ltd.webp",
    text:
      "A landmark year, 2010 saw the formal registration of Cholan Tours Pvt Ltd. The brand won the National Tourism Award under the Indian Panorama label and added 50 more vehicles. The company also developed proprietary in-house travel software.",
  },
  {
    image: "/images/national-recognition-and-infrastructure-growth.webp",
    text:
      "During this period, Cholan Tours received multiple National Tourism Awards and FIEO’s Gold Award for Best Service Provider. The fleet grew to 150 vehicles, and the company opened new offices in Tanjore, Mumbai, Alleppey, and Periyar. Solar panel installations began, producing up to 28 KW of renewable energy. The company became ISO 9001:2015 certified and strengthened its position as a quality-driven DMC.",
  },
  {
    image: "/images/award-innovation-and-outreach.webp",
    text:
      "Cholan Tours was recognised by the Confederation of Indian Industry (CII) as one of the Top 25 Innovative Organisations and won the CII Industrial Innovation Award. The fleet grew to 230 vehicles, and a new branch opened in Hyderabad. Staff strength rose to 430.",
  },
  {
    image: "/images/global-footprint-and-digital-transformation.webp",
    text:
      "Cholan Tours became a franchisee of Lufthansa City Centre and received the LCC Green Award. A mobile app for internal operations was introduced, documentation digitised, and TripAdvisor Hall of Fame Award achieved.",
  },
  {
    image: "/images/resilience-during-crisis.webp",
    text:
      "The pandemic years tested the tourism industry. In 2020, 160 vehicles were sold and staff reduced. Recovery followed in 2021–22, with fleet and staff rebuilding. Tamil Nadu Tourism recognised the company for inbound and domestic excellence.",
  },
  {
    image: "/images/continued-recognition-and-growth.webp",
    text:
      "In 2023, Cholan Tours won the World Travel Award as India’s Leading DMC and the Economic Times Travel & Tourism Award. Fleet increased to 140 vehicles and staff to 190. Trademark registration completed.",
  },
  {
    image: "/images/scallig-new-heights.webp",
    text:
      "By 2024, the fleet reached 160 vehicles with a team of 300 professionals. Cholan Tours became a member of FICCI and received the TripAdvisor Award for outstanding customer service.",
  },
];

export default function MilestonesSection() {
  return (
    <section className="milestone">
      <div className="container">
        <h4 className="ceo-subtitle subtitle text-center mb-3">Milestones in History</h4>
      </div>

      <div className="spacer-20"></div>

      {milestonesData.map((item, index) => (
        <div
          key={index}
          className={`row-1 ${index % 2 !== 0 ? "reverse" : ""}`}
        >
          {/* IMAGE */}
          <div className="image-section">
            <Image
              src={item.image}
              alt={`Milestone ${index + 1}`}
              width={300}
              height={200}
              priority={index < 2}
              style={index % 2 === 0 ? { marginLeft: "100px" } : {}}
            />
          </div>

          {/* CONTENT */}
          <div className="content-section-1">
            <h2></h2>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
