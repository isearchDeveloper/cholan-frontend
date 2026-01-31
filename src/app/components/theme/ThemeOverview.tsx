"use client";

import ThemeExpandableText from "./ThemeExpandableText";


interface ThemeOverviewProps {
  theme: string;
}

const THEME_OVERVIEW_DATA: Record<string, string> = {
  honeymoon: `
    <p><strong>Honeymoon destinations in India</strong> offer the perfect blend of romance, privacy, scenic beauty, and unforgettable experiences for newly married couples. From the golden beaches of <em>Goa</em> to the snow-covered mountains of <em>Manali and Shimla</em>, India is filled with places where love truly blossoms.</p>

    <p>Couples can enjoy peaceful sunsets by the sea, cozy stays in mountain cottages, candlelight dinners, nature walks, and luxury resorts designed especially for honeymooners. These destinations provide the ideal setting to relax, celebrate, and create lifelong memories together.</p>

    <p>Whether you prefer beach vibes, hill station serenity, backwater cruises in Kerala, or royal experiences in Rajasthan, India has something unique for every couple. Honeymoon packages often include private sightseeing, romantic room decorations, special dinners, and comfortable travel arrangements.</p>

    <ul>
      <li><strong>Goa</strong> – Beaches, nightlife, and romantic resorts</li>
      <li><strong>Manali & Shimla</strong> – Snowfall, valleys, and cozy weather</li>
      <li><strong>Kerala</strong> – Backwaters, houseboats, and greenery</li>
      <li><strong>Andaman</strong> – Crystal clear water and peaceful islands</li>
    </ul>

    <p><em>The best time for a honeymoon in India</em> is generally between October and March when the weather is pleasant across most destinations. With customizable honeymoon packages, couples can plan their dream trip exactly the way they want.</p>
  `,

  family: `
    <p><strong>Family destinations in India</strong> are full of culture, history, entertainment, and experiences suitable for all age groups. Whether you are traveling with kids, parents, or grandparents, India offers destinations that provide comfort, learning, and fun together.</p>

    <p>From royal palaces in <em>Jaipur and Udaipur</em> to peaceful nature retreats in <em>Kerala and Mysore</em>, family trips are designed to create bonding moments and joyful memories. These places offer a mix of sightseeing, relaxation, shopping, and local experiences.</p>

    <p>Family tour packages usually include well-planned itineraries, comfortable hotels, guided sightseeing, and activities that keep everyone engaged without feeling rushed or tired.</p>

    <ul>
      <li><strong>Jaipur</strong> – Forts, palaces, and cultural experiences</li>
      <li><strong>Udaipur</strong> – Lakes, heritage hotels, and boat rides</li>
      <li><strong>Mysore</strong> – History, gardens, and calm environment</li>
      <li><strong>Kerala</strong> – Nature, wildlife, and backwaters</li>
    </ul>

    <p><em>Family holidays in India</em> are best enjoyed between October and March when the climate is pleasant and suitable for sightseeing across regions.</p>
  `,

  adventure: `
    <p><strong>Adventure destinations in India</strong> are perfect for travelers who love thrill, nature, and outdoor activities. From the rugged mountains of <em>Leh Ladakh</em> to the remote beauty of <em>Spiti Valley</em> and the river rafting hub of <em>Rishikesh</em>, adventure awaits at every corner.</p>

    <p>Adventure trips include trekking, camping, biking, rafting, paragliding, and exploring untouched landscapes. These experiences are ideal for solo travelers, friends, and groups seeking excitement and adrenaline rush.</p>

    <p>Adventure tour packages are carefully designed with safety measures, experienced guides, and proper planning to ensure travelers enjoy without worry.</p>

    <ul>
      <li><strong>Leh Ladakh</strong> – Bike trips, high passes, and lakes</li>
      <li><strong>Spiti Valley</strong> – Remote valleys and trekking routes</li>
      <li><strong>Rishikesh</strong> – River rafting and camping</li>
      <li><strong>Auli</strong> – Skiing and snow adventures</li>
    </ul>

    <p><em>The best season for adventure travel</em> varies by destination but mostly falls between May to September for mountains and October to April for river and outdoor sports.</p>
  `,
};


export default function ThemeOverview({ theme }: ThemeOverviewProps) {
  // const overviewHtml =
  //   THEME_OVERVIEW_DATA[theme] ||
  //   `<p>Explore the best ${theme} destinations across India with curated travel experiences.</p>`;

  return (
    <div className="theme-overview-section">
      <h2 className="mb-3">About This Theme</h2>
      <ThemeExpandableText text={theme} />
    </div>
  );
}
