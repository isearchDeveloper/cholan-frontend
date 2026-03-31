import Hero from "@/app/components/go-exploring/Hero";
import About from "@/app/components/go-exploring/About";
import Scale from "@/app/components/go-exploring/Scale";
import Steps from "@/app/components/go-exploring/Steps";
import Contact from "@/app/components/go-exploring/Contact";
import Cta from "@/app/components/go-exploring/CTA";
import FAQAccordionForCity from "@/app/components/car/CarFaq";
import ReviewsWidget from "@/app/components/ReviewsWidget";
import { fetchGoExploringData } from "@/app/services/goservice";

export default async function GoExploring() {
  const data = await fetchGoExploringData();

  if (!data) return <div>No Data Found</div>;

  return (
    <>
      <Hero data={data} />
      <About data={data} />
      <Scale data={data} />
        {/* <Scale /> */}
      <Steps />

      <div className="container">
        <FAQAccordionForCity
  title={data.faq_title || "Frequently Asked Questions"}
  faqs={data.faqs || []}
/>
      </div>

      <Contact />
      <div className="pt-5">
        <ReviewsWidget />
      </div>
      <Cta />
    </>
  );
}