import Image from "next/image";
import Breadcrumb from "../common/Breadcrumb";
 
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Legacy of Cholan Tours", isCurrent: true },
];
 
 
function LegacyTextContent() {
  return (
    <div className="legacy-block">
      <h2 className="legacy-block-title">Legacy of Cholan Tours</h2>
 
      <div className="legacy-block-body">
        <p>
          For over two decades, Cholan Tours has been a transformative force in the
          travel and tourism industry, redefining excellence in destination
          management. What began as a modest initiative has evolved into a <b>leading
          Destination Management Company</b> (DMC), renowned for its customised travel
          experiences, extensive pan-India network and commitment to sustainability.
        </p>
 
        <p>
          From its humble beginnings in 2003, Cholan Tours has expanded
          significantly, growing from a single office to <b>13 branches across India.</b>
          The company started with just one sedan and has now built a formidable
          travel fleet of over 150 vehicles, including luxury buses, M1 vans, cabs
          and SUVs.
        </p>
 
        <p>
          <b>Recognised by the Ministry of Tourism, Government of India,</b> and a
          five-time recipient of the prestigious <b>National Tourism Award,</b> Cholan
          Tours has played a key role in shaping India&apos;s tourism landscape. The
          company&apos;s dedication to responsible tourism is evident in its
          eco-friendly initiatives, community engagement and support for
          underprivileged children&apos;s education.
        </p>
 
        <p>
          The &apos;<b>Drive with Pride</b>&apos; initiative by Cholan Tours is a
          transformative step towards addressing unemployment by empowering young,
          energetic individuals to participate in tourism-related activities. This
          initiative not only provides sustainable income-generating (IGP)
          opportunities but also nurtures a skilled workforce for the industry&apos;s
          future.
        </p>
 
        <p>
          At the heart of Cholan Tours is a dynamic <b>team of over 300 professionals,</b>
          whose expertise and multilingual proficiency in English, French, Spanish,
          Hindi, Tamil, Kannada, Telugu, Malayalam and more ensure seamless
          communication and exceptional service. Their dedication to excellence
          transforms every journey into an enriching and unforgettable experience.
        </p>
 
        <p>
          With the tourism sector on the cusp of rapid expansion, Cholan Tours is
          dynamically <b>operating across India, Sri Lanka and Nepal,</b> offering a
          diverse range of travel experiences tailored to various traveller
          preferences. From leisure, pilgrimage and adventure tourism to
          specialised segments like medical and wellness travel, MICE and luxury
          experiences, the company ensures seamless and immersive journeys. Backed
          by deep-rooted expertise, a strong regional presence and an unwavering
          commitment to excellence, Cholan Tours continues to enhance its services,
          delivering unparalleled travel solutions that redefine exploration and
          hospitality.
        </p>
 
        <p>
          With a strategic vision for the future, guided by its <b>Founder and
          Managing Director, Mr. Pandian Kumaravel</b> and <b>Operations Director, Mrs.
          Mythily Pandian,</b> Cholan Tours is set to scale greater heights.
          Strengthening partnerships, leveraging technology, enhancing customer
          experience, and promoting sustainable tourism remain at the core of its
          growth strategy.
        </p>
 
        <p>
          Cholan Tours is not just about travel; it is about crafting journeys and
          creating lifelong memories, setting new benchmarks in the global tourism
          industry.
        </p>
      </div>
    </div>
  );
}
 
export default function LegacyContent() {
  return (
    <div className="bg-light">
      <main className="legacy-main">
        {/* Banner Section */}
        <section className="legacy-banner">
          <div className="legacy-banner-image">
            <Image
              src="/images/CT-Legacy.jpg"
              alt="Legacy of Cholan Tours"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </section>
 
        {/* Breadcrumb Section */}
        <section className="legacy-breadcrumb">
          <div className="container">
            <div className="breadcrumb-spc">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>
        </section>
 
        {/* Main Content Section */}
        <section className="legacy-content-section">
          <div className="container">
            {/* Block styled like the screenshot */}
            <LegacyTextContent />
          </div>
        </section>
      </main>
    </div>
  );
}