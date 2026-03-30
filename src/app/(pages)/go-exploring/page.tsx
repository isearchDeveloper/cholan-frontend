
import Hero from "@/app/components/go-exploring/Hero"
import About from "@/app/components/go-exploring/About"
import Scale from "@/app/components/go-exploring/Scale"
import Steps from "@/app/components/go-exploring/Steps"
import Contact from "@/app/components/go-exploring/Contact"
import Cta from "@/app/components/go-exploring/CTA"
import FAQAccordionForCity from "@/app/components/car/CarFaq";
import ReviewsWidget from "@/app/components/ReviewsWidget";
export default function GoExploring() {

    const goExploringFaqs = [
  {
    question: "Do I need a guide license to register?",
    answer:
      "No, you can start without a license. However, having proper certifications can improve your credibility and increase bookings.",
  },
  {
    question: "How much commission does the platform charge?",
    answer:
      "We follow a zero upfront fee model. A small commission is charged only after a successful booking.",
  },
  {
    question: "How will I receive my payments?",
    answer:
      "Payments are securely processed and transferred directly to your registered bank account.",
  },
  {
    question: "Can I list tours in multiple cities?",
    answer:
      "Yes, you can list multiple experiences across different cities and manage them from your dashboard.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most listings are reviewed and approved within 24–48 hours depending on the submitted details.",
  },
];

    return(
        <>
        <Hero />
        <About />
        <Scale />
        <Steps />
        <div className="container">
      <FAQAccordionForCity
        title="Frequently Asked Questions"
        faqs={goExploringFaqs}
      />
        </div>
       
        <Contact />
        
               <div className="pt-5">
                 <ReviewsWidget />
               </div>
        <Cta />
        </>
    )
}