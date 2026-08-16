import { HelpCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  {
    q: "What services does Otuuse provide?",
    a: "Otuuse provides Boda-Boda rides, bicycle rides, package deliveries, and hostel/house moving services within Kabale."
  },
  {
    q: "Does Otuuse operate around Kabale University?",
    a: "Yes! Kabale University students are our primary focus. We understand the campus, the surrounding hostels, and the specific transportation challenges students face."
  },
  {
    q: "Can Otuuse move my belongings from one hostel to another?",
    a: "Absolutely. Our Hostel & House Moving service is designed specifically to help students and residents transport their luggage and belongings safely and affordably."
  },
  {
    q: "How do I book a ride or request a delivery?",
    a: "You can easily book through the 'Request a Service' page on our website, call our direct line, or send us a message on WhatsApp. We will match you with an available rider immediately."
  },
  {
    q: "How much does Otuuse charge?",
    a: "Our pricing is transparent, fair, and designed with students in mind. Prices depend on the distance of the trip or the size of the delivery. Contact us via WhatsApp for a quick quote!"
  },
  {
    q: "Where exactly does Otuuse operate?",
    a: "We currently operate throughout Kabale town, including Kabale University, Kikungulu, and surrounding neighborhoods. We are constantly expanding our coverage area."
  },
  {
    q: "Is my package safe during delivery?",
    a: "Yes. Our riders are verified and trained to handle items with care. Whether it's food, documents, or fragile packages, we ensure it reaches its destination safely."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <div className="inline-flex w-14 h-14 rounded-full bg-green-100 text-green-800 items-center justify-center mb-4">
              <HelpCircle size={28} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-green-950">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about Otuuse and our transportation services in Kabale.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-lg text-green-950 list-none">
                  {faq.q}
                  <span className="text-orange-500 transition group-open:rotate-45 text-2xl font-light">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 bg-green-950 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
            <p className="text-green-200 mb-6">Our team is always ready to help you out.</p>
            <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition">
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;