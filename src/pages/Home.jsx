import { Link } from "react-router-dom";
import {
  Bike,
  Car,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  Clock3,
  MapPin,
  Star
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  { icon: Bike, title: "Boda Rides", description: "Convenient and reliable rides around Kabale for students and the wider community." },
  { icon: Bike, title: "Bike Rides", description: "Affordable short-distance transportation when you want to move quickly and economically." },
  { icon: Car, title: "Car Rides", description: "Comfortable car transportation for longer trips, group travel, or when you need extra space." },
  { icon: Package, title: "Deliveries", description: "Send packages, food, documents and other items to your desired destination." },
  { icon: Truck, title: "Moving Services", description: "Moving to another hostel or house? We help transport your belongings safely." },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
              <MapPin size={16} /> Serving Kabale, Uganda
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Moving Kabale, <span className="text-orange-400 block">One Ride at a Time.</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-green-100 max-w-2xl leading-relaxed">
              Reliable transportation, deliveries and moving services designed for Kabale University students and the wider Kabale community.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/request-service" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-4 rounded-xl font-bold transition">
                Request a Service <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl font-bold transition">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats (Trust Building) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="text-4xl font-extrabold text-green-800">1000+</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Happy Riders</p></div>
            <div><p className="text-4xl font-extrabold text-green-800">500+</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Deliveries</p></div>
            <div><p className="text-4xl font-extrabold text-green-800">24/7</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Support</p></div>
            <div><p className="text-4xl font-extrabold text-green-800">50+</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Verified Drivers</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">What we do</p>
            <h2 className="mt-3 text-4xl font-bold text-green-950">Transportation made simple</h2>
            <p className="mt-4 text-gray-600 text-lg">From getting to campus to moving between hostels, Otuuse helps you get where you need to go.</p>
          </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="group border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition">
                  <div className="w-14 h-14 rounded-xl bg-green-50 text-green-800 flex items-center justify-center"><Icon size={28} /></div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{service.description}</p>
                  <Link to="/services" className="inline-flex items-center gap-2 mt-5 text-green-800 font-semibold">Learn more <ArrowRight size={17} /></Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials (Social Proof) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">Testimonials</p>
            <h2 className="mt-3 text-4xl font-bold text-green-950">Trusted by the Kabale Community</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", role: "Kabale University Student", quote: "Otuuse saved me during exam week! I needed to send notes to my friend across campus and they delivered it in 15 minutes. Highly reliable." },
              { name: "David K.", role: "Local Business Owner", quote: "We use Otuuse for all our local deliveries. The riders are professional, polite, and always on time. Great service for businesses in Kabale." },
              { name: "Jane A.", role: "Hostel Resident", quote: "Moving hostels is always a hassle, but the Otuuse moving service made it so easy. They handled my luggage with care and the price was very fair." }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4 text-orange-400">
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-green-950">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student CTA */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold">Built for Kabale University Students</h2>
          <p className="mt-5 text-lg text-orange-50 max-w-2xl mx-auto">From campus rides to hostel shifting and deliveries, Otuuse is here to make student life easier.</p>
          <Link to="/request-service" className="inline-flex items-center gap-2 mt-8 bg-green-950 hover:bg-green-900 px-7 py-4 rounded-xl font-bold transition">
            Request a Service <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;