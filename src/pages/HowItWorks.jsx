import { Link } from "react-router-dom";
import { Smartphone, UserPlus, MessageCircle, Phone, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const steps = [
  {
    step: "01",
    icon: Smartphone,
    title: "Open the Otuuse App",
    description: "Download and open the Otuuse transport app on your phone. Available on both Android and iOS.",
    color: "bg-green-50 text-green-800"
  },
  {
    step: "02",
    icon: UserPlus,
    title: "Create an Account & Sign In",
    description: "Sign up with your phone number or email, then log in to access your personal Otuuse dashboard.",
    color: "bg-orange-50 text-orange-800"
  },
  {
    step: "03",
    icon: MessageCircle,
    title: "Chat with Our Online Agent",
    description: "Tell our agent what service you need — whether it's a ride, delivery, or moving — and share the pickup and destination details.",
    color: "bg-blue-50 text-blue-800"
  },
  {
    step: "04",
    icon: Phone,
    title: "We Reach Out Shortly",
    description: "The Otuuse team reviews your request and contacts you directly to confirm pickup, pricing, and next steps.",
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
              Getting a ride, sending a package, or moving hostels has never been easier. Here's our simple 4-step process.
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

        {/* What to Tell the Agent */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-green-950 text-center mb-10">What to Share with the Agent</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <p className="font-bold text-gray-900">Type of Service</p>
                    <p className="text-gray-600 text-sm">Boda ride, bike ride, car ride, package delivery, or moving service.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <p className="font-bold text-gray-900">Pickup Location</p>
                    <p className="text-gray-600 text-sm">Where you (or your package) are right now.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <p className="font-bold text-gray-900">Destination</p>
                    <p className="text-gray-600 text-sm">Where you want to go, or where the package should be delivered.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <p className="font-bold text-gray-900">Special Notes</p>
                    <p className="text-gray-600 text-sm">Time preference, number of bags, fragile items, or any other details.</p>
                  </div>
                </li>
              </ul>
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/request-service" 
                className="inline-flex items-center justify-center gap-2 bg-green-950 hover:bg-green-900 text-white px-8 py-4 rounded-xl font-bold transition"
              >
                Request a Service Now <ArrowRight size={20} />
              </Link>
              <a 
                href="https://wa.me/256791475407" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-green-950 px-8 py-4 rounded-xl font-bold transition"
              >
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;