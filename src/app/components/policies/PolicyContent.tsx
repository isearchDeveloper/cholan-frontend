// import React from "react";
import Breadcrumb from "../common/Breadcrumb";

// interface PolicyContentProps {
//   title: string;
//   content: string;
// }

// export default function PolicyContent({ title, content }: PolicyContentProps) {
//   const breadcrumbItems = [
//     { label: "Home", href: "/" },
//     { label: title, isCurrent: true },
//   ];

//   return (
//     <div className="min-vh-100 bg-light">

//       {/* Banner */}
//       <section
//         className="banner py-5 text-white"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2)), url('/images/banner.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <img src="/images/banner.jpg" alt={title} className="d-none" />
//       </section>

//       {/* Content */}
//       <section className="pb-5 pt-4">
//         <div className="container">
//           <Breadcrumb items={breadcrumbItems} />

//           <div
//             className="text-muted policy-content"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </div>
//       </section>

//     </div>
//   );
// }

import Image from "next/image";


const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Our Policies", isCurrent: true },
];

export default function PolicyContent() {
  return (
    <div className=" bg-light">
      <main className="policy-main">
        {/* ===== Banner Section ===== */}
        <section className="policy-banner">
          <div className="policy-banner-image">
            <Image
              src="/images/policies.webp"
              alt="Policy Banner"
              fill
              priority
            />
          </div>
        </section>
 

       <section className="policy-breadcrumb">
  <div className="container">
    <div className="breadcrumb-spc">
    <Breadcrumb items={breadcrumbItems} />

    </div>
  </div>
</section>


        <section className="policy-intro-section">
          <div className="policy-intro-container">
            <p className="policy-eyebrow">CHOLAN TOURS EXCELLENCE</p>

            <h1 className="policy-heading">Our Commitment Through Policy</h1>

            <p className="policy-description">
              At Cholan Tours, our policies reflect the core principles we
              uphold: responsibility, transparency, and care. They are designed
              to maintain high standards across all areas of operation, from
              guest experience and team welfare to compliance and
              sustainability. These policies form the foundation of a company
              culture that is ethical, inclusive, and continuously evolving to
              meet the expectations of travellers, partners, and the tourism
              community.
            </p>
          </div>
        </section>

        <div className="container">
          <section className="policy-sdg-section">
            <div className="policy-sdg-container">
              <div className="policy-sdg-layout">
                {/* LEFT : FULL SDG GRID */}
                <div className="policy-sdg-left">
                  <Image
                    src="/images/Sustainable_Development_Goals-01.png"
                    alt="UN Sustainable Development Goals"
                    width={500}
                    height={400}
                  />
                </div>

                {/* RIGHT : FOCUS GOALS (IMAGES ONLY) */}
                <div className="policy-sdg-focus">
                  <div className="sdg-focus-card">
                    <Image
                      src="/images/01.png"
                      alt="No Poverty"
                      width={170}
                      height={170}
                    />
                  </div>

                  <div className="sdg-focus-card">
                    <Image
                      src="/images/05.png"
                      alt="Gender Equality"
                      width={170}
                      height={170}
                    />
                  </div>

                  <div className="sdg-focus-card">
                    <Image
                      src="/images/08.png"
                      alt="Decent Work and Economic Growth"
                      width={170}
                      height={170}
                    />
                  </div>

                  <div className="sdg-focus-card">
                    <Image
                      src="/images/12.png"
                      alt="Responsible Consumption and Production"
                      width={170}
                      height={170}
                    />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="policy-sdg-text">
                We have built our quality framework in alignment with the United
                Nations Sustainable Development Goals, integrating our values
                into action. Specifically, our policies are shaped by Goal 1: No
                Poverty, Goal 5: Gender Equality, Goal 8: Decent Work and
                Economic Growth, and Goal 12: Responsible Consumption and
                Production. These global goals guide our efforts to create
                lasting impact through inclusive employment, equitable growth,
                and responsible tourism practices.
              </p>
            </div>
          </section>

          <section className="policy-details-section">
            <div className="policy-details-container">
              {/* Responsibility */}
              <div className="policy-detail-block">
                <h2>Responsibility</h2>
                <p>
                  At Cholan Tours, we believe that tourism should contribute
                  positively to the destinations we serve. Our responsibility
                  extends beyond providing memorable travel experiences to
                  ensuring ethical, transparent and sustainable practices in all
                  areas of operation. We are committed to reducing environmental
                  impact, supporting local economies and engaging with
                  communities in ways that foster respect and development.
                </p>
                <p>
                  Every member of our team is guided by a code of conduct that
                  reflects our values of integrity, inclusivity, and
                  accountability. We aim to build long-term relationships with
                  our clients, partners and stakeholders, based on trust and
                  mutual respect. Our responsibility includes prioritising the
                  safety of travellers, maintaining fair labour practices, and
                  delivering services with honesty and professionalism.
                </p>
              </div>

              {/* Heritage & Culture */}
              <div className="policy-detail-block">
                <h2>Heritage &amp; Culture</h2>
                <p>
                  Cholan Tours recognises the importance of preserving the rich
                  cultural and historical heritage of the regions we promote. We
                  actively promote responsible tourism that honours traditions,
                  respects sacred sites and supports local artisans and heritage
                  initiatives. Our itineraries are curated to offer authentic
                  cultural experiences without compromising the dignity or
                  integrity of the communities involved.
                </p>
                <p>
                  We ensure our travellers are informed and encouraged to engage
                  with cultural sites in respectful ways. Our team works closely
                  with local guides and heritage experts to preserve stories,
                  crafts and customs for future generations. We advocate for
                  tourism that enriches both visitors and hosts while protecting
                  what makes each destination unique.
                </p>
              </div>

              {/* Welfare */}
              <div className="policy-detail-block">
                <h2>Welfare</h2>
                <p>
                  The welfare of our employees, guests, partners and the
                  communities we operate in is central to our business
                  philosophy. Cholan Tours is committed to providing a safe,
                  inclusive and supportive environment where everyone is treated
                  with dignity and respect. We prioritise employee wellbeing
                  through fair employment practices, professional development
                  opportunities and work-life balance.
                </p>
                <p>
                  We also extend this commitment to the broader communities we
                  serve by supporting initiatives in education, health and
                  empowerment. Through our social programmes and partnerships,
                  we strive to uplift underrepresented groups and contribute
                  meaningfully to local development. Our welfare policies are
                  regularly reviewed to ensure they remain relevant, responsive
                  and impactful.
                </p>
              </div>

              {/* Data & Security */}
              <div className="policy-detail-block">
                <h2>Data &amp; Security</h2>
                <p>
                  At Cholan Tours, we take the protection of personal and
                  corporate data seriously. We are committed to maintaining the
                  confidentiality, integrity and availability of all sensitive
                  information entrusted to us by our clients, partners, and
                  employees. Our data protection policies comply with applicable
                  legal standards and are designed to safeguard information from
                  unauthorised access, disclosure or misuse.
                </p>
                <p>
                  All systems and platforms we use are secured with advanced
                  technologies and monitored for potential risks. We train our
                  staff on data security best practices and ensure that every
                  department understands the importance of secure information
                  handling. Transparency and trust are key to our operations,
                  and we continuously evaluate our systems to maintain the
                  highest standards of data protection.
                </p>
              </div>

              {/* Risk Management */}
              <div className="policy-detail-block">
                <h2>Risk Management Policy</h2>
                <p>
                  Cholan Tours adopts a proactive approach to identifying and
                  mitigating risks that could affect our operations, clients or
                  reputation. Our risk management policy ensures preparedness
                  across all areas of travel service delivery, including safety,
                  compliance, financial stability and crisis response. We
                  conduct regular risk assessments and maintain contingency
                  plans to address unexpected events.
                </p>
                <p>
                  Each department is trained to recognise potential
                  vulnerabilities and take immediate action to minimise impact.
                  Our priority is the safety and satisfaction of our travellers,
                  and we coordinate closely with local authorities, partners and
                  international bodies to ensure reliable and resilient
                  operations. Risk management at Cholan Tours is not just a
                  procedure, but a core pillar of our commitment to excellence
                  and responsibility.
                </p>
              </div>

              {/* Cancellation Policies */}
              <div className="policy-detail-block">
                <h2>Cancellation Policies</h2>
                <p>
                  We understand that travel plans may change, and our
                  cancellation policies are designed to offer flexibility while
                  ensuring fair practice. Cholan Tours provides clear and
                  transparent terms related to cancellations, amendments, and
                  refunds which are communicated at the time of booking. We
                  strive to accommodate our clients’ needs while balancing
                  operational commitments with our suppliers and partners.
                </p>
                <p>
                  Cancellation timelines and charges may vary depending on the
                  type of service or destination. However, our team remains
                  accessible to support travellers through the process with
                  empathy and clarity. Our goal is to manage cancellations with
                  professionalism and provide alternative options whenever
                  possible, ensuring a smooth and respectful experience.
                </p>
              </div>

              {/* SOP */}
              <div className="policy-detail-block">
                <h2>Standard Operating Procedures (SOP)</h2>
                <p>
                  Standard Operating Procedures (SOP) at Cholan Tours serve as a
                  structured framework that ensures consistency, efficiency and
                  quality across all functions. From itinerary planning and
                  customer service to vendor coordination and safety compliance,
                  every aspect of our operation is guided by well-defined
                  protocols. These procedures are regularly updated to reflect
                  industry trends, technological advancements and client
                  expectations.
                </p>
                <p>
                  Our SOPs also serve as a training foundation for new
                  employees, ensuring seamless onboarding and a shared
                  understanding of service excellence. They help us uphold our
                  standards in both routine and high-pressure scenarios,
                  supporting our mission to deliver reliable and professional
                  travel experiences. Through SOPs, Cholan Tours maintains its
                  reputation for quality, consistency and customer satisfaction.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
