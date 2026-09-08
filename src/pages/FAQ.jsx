import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <div className="inline-flex w-14 h-14 rounded-full bg-green-100 text-green-800 items-center justify-center mb-4 mx-auto">
              <HelpCircle size={28} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-green-950">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-gray-600">Everything you need to know about Otuuse and our transportation services.</p>
          </div>

          <div className="space-y-4">
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <summary className="font-bold text-lg text-green-950 cursor-pointer list-none flex justify-between">
                What services does Otuuse provide? <span className="text-orange-500 text-2xl">+</span>
              </summary>
              <p className="mt-4 text-gray-600">We provide Boda-Boda rides, bicycle rides, car rides, package deliveries, and hostel moving services within Kabale.</p>
            </details>

            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <summary className="font-bold text-lg text-green-950 cursor-pointer list-none flex justify-between">
                Do you operate around Kabale University? <span className="text-orange-500 text-2xl">+</span>
              </summary>
              <p className="mt-4 text-gray-600">Yes! Kabale University students are our primary focus. We understand the campus and the surrounding hostels perfectly.</p>
            </details>

            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <summary className="font-bold text-lg text-green-950 cursor-pointer list-none flex justify-between">
                How do I book a ride or delivery? <span className="text-orange-500 text-2xl">+</span>
              </summary>
              <p className="mt-4 text-gray-600">You can easily book through the Request a Service page on our website, or send us a message directly on WhatsApp at +256 791 475 407.</p>
            </details>

            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <summary className="font-bold text-lg text-green-950 cursor-pointer list-none flex justify-between">
                Can you move my luggage between hostels? <span className="text-orange-500 text-2xl">+</span>
              </summary>
              <p className="mt-4 text-gray-600">Absolutely. Our moving service is designed specifically to help students transport their belongings safely and affordably.</p>
            </details>
          </div>

          <div className="mt-12 text-center">
            <a href="https://wa.me/256791475407" target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold inline-block shadow-lg">
              Contact Support on WhatsApp
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
