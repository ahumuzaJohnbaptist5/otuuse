import { Link } from "react-router-dom";
import { ClipboardList, Search, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Make a Request",
    description: "Tell us what transportation or delivery service you need via our website, WhatsApp, or a quick phone call.",
    color: "bg-green-50 text-green-800"
  },
  {
    step: "02",
    icon: Search,
    title: "We Match You",
    description: "Otuuse instantly connects your request to the nearest available, verified rider or driver.",
    color: "bg-orange-50 text-orange-800"
  },
  {
    step: "03",
    icon: Truck,
    title: "We Transport",
    description: "Your passenger, package, or belongings are picked up and transported safely across Kabale.",
    color: "bg-blue-50 text-blue-800"
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "You Arrive / Receive",
    description: "You reach your destination safely, or your item is delivered right to your hands.",
    color: "bg-purple-50 text-purple-800"
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-green-950 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold">How Otuuse Works</h1>
            <p className="mt-4 text-lg text-green-200 max-w-2xl mx-auto">
              Getting a ride, sending a package, or moving hostels has never been easier. Here is our simple 4-step process.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="relative">
              {/* Connecting Line (Visible on Desktop) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
              
              <div className="grid lg:grid-cols-4 gap-8 relative z-10">
                {steps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                      <div className={`w-16 h-16 mx-auto rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                        <Icon size={32} />
                      </div>
                      <span className="text-orange-500 font-bold text-sm tracking-wider">STEP {item.step}</span>
                      <h3 className="mt-2 text-xl font-bold text-green-950">{item.title}</h3>
                      <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to move?</h2>
            <p className="text-orange-50 mb-8 text-lg">
              Skip the hassle of negotiating with random riders. Book with Otuuse today.
            </p>
            <Link 
              to="/request-service" 
              className="inline-flex items-center gap-2 bg-green-950 hover:bg-green-900 text-white px-8 py-4 rounded-xl font-bold transition"
            >
              Request a Service Now <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;