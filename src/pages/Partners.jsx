import { Handshake, Bike, Car, Store, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const partnerTypes = [
  {
    icon: Bike,
    title: "Riders & Drivers",
    description: "Join our transport network and help customers get around Kabale safely and reliably.",
    benefits: ["More service requests", "Flexible earning opportunities", "A trusted platform for customers"],
  },
  {
    icon: Car,
    title: "Transport & Fleet Owners",
    description: "Work with Otuuse to coordinate available vehicles for rides, deliveries, and moving services.",
    benefits: ["Reach more customers", "Coordinate bookings", "Support local mobility"],
  },
  {
    icon: Store,
    title: "Local Businesses",
    description: "Partner with us for dependable package deliveries, business errands, and logistics support.",
    benefits: ["Convenient delivery support", "Better customer reach", "Local business collaboration"],
  },
  {
    icon: Building2,
    title: "Schools & Institutions",
    description: "Explore transport and delivery arrangements for students, staff, and institutional needs.",
    benefits: ["Student-focused mobility", "Organised service requests", "A local point of contact"],
  },
];

const Partners = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      <section className="bg-green-950 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-orange-400 font-bold uppercase tracking-widest text-sm">Grow with Otuuse</p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-extrabold">Our Partners</h1>
          <p className="mt-5 text-lg lg:text-xl text-green-100 max-w-3xl mx-auto">
            We work with local riders, drivers, businesses, and institutions to make transportation and delivery more reliable across Kabale.
          </p>
          <a href="#partner-types" className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition">
            Explore partnerships <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section id="partner-types" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">Who can partner with us?</p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-green-950">A stronger local transport network</h2>
            <p className="mt-4 text-gray-600">Bring your skills, vehicles, services, or community connections. Together, we can make everyday movement easier.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {partnerTypes.map(({ icon: Icon, title, description, benefits }) => (
              <article key={title} className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-green-100 text-green-900 flex items-center justify-center">
                  <Icon size={27} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-green-950">{title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{description}</p>
                <ul className="mt-5 space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-green-700 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl bg-green-950 text-white p-8 lg:p-12 text-center">
            <Handshake size={42} className="mx-auto text-orange-400" />
            <h2 className="mt-5 text-3xl lg:text-4xl font-bold">Interested in partnering with Otuuse?</h2>
            <p className="mt-4 text-green-100 max-w-2xl mx-auto">
              Tell us about your transport service, business, or institution. Our team can discuss a suitable way to work together.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="inline-flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition">
                Contact our team <ArrowRight size={18} />
              </Link>
              <Link to="/request-service" className="inline-flex justify-center items-center bg-white text-green-950 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition">
                Request a service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Partners;
