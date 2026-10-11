import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Star, Zap, GraduationCap, Leaf, Wallet, VolumeX } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";

const services = [
  {
    title: "Boda Rides",
    description: "Convenient and reliable rides around Kabale for students and the wider community.",
    images: ["/images/boda-1.jpeg"],
  },
  {
    title: "Bike Rides",
    description: "Affordable short-distance transportation when you want to move quickly and economically.",
    images: ["/images/bike-1.jpeg", "/images/bike-2.jpeg", "/images/bike-3.jpeg"],
  },
  {
    title: "Car Rides",
    description: "Comfortable car transportation for longer trips, group travel, or when you need extra space.",
    images: ["/images/car-1.jpeg", "/images/car-2.jpeg"],
  },
  {
    title: "Deliveries",
    description: "Send packages, food, documents and other items to your desired destination.",
    images: ["/images/cargo-1.jpeg", "/images/cargo-2.jpeg"],
  },
  {
    title: "Moving Services",
    description: "Moving to another hostel or house? We help transport your belongings safely.",
    images: ["/images/cargo-2.jpeg", "/images/cargo-1.jpeg", "/images/car-1.jpeg"],
  },
];

const pillars = [
  { icon: Zap, title: "Zero Emissions", text: "No petrol, no exhaust. Every ride keeps Kabale's air clean." },
  { icon: Wallet, title: "Lower Costs", text: "Charging costs less than fuel, so you pay less per ride." },
  { icon: VolumeX, title: "Quiet Rides", text: "No engine noise — just smooth, calm journeys." },
  { icon: Leaf, title: "Protecting Nature", text: "Green transport for Kabale's beautiful green hills." },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Kabale University Student",
    quote: "Otuuse saved me during exam week! I needed to send notes to my friend across campus and they delivered it in 15 minutes. Highly reliable.",
  },
  {
    name: "David K.",
    role: "Local Business Owner",
    quote: "We use Otuuse for all our local deliveries. The riders are professional, polite, and always on time. Great service for businesses in Kabale.",
  },
  {
    name: "Jane A.",
    role: "Hostel Resident",
    quote: "Moving hostels is always a hassle, but the Otuuse moving service made it so easy. They handled my luggage with care and the price was very fair.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                <MapPin size={16} /> Serving Kabale, Uganda
              </span>
              <span className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm">
                <Zap size={16} /> 100% Electric Fleet
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                <GraduationCap size={16} /> Student-Focused
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Moving Kabale, <span className="text-orange-400 block">One Ride at a Time.</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-green-100 max-w-2xl leading-relaxed">
              Reliable, eco-friendly transportation, deliveries and moving services — powered by electricity and designed for Kabale University students and the wider Kabale community.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/request-service" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-4 rounded-xl font-bold transition">
                Request a Service <ArrowRight size={20} />
              </Link>
              <Link to="/why-electric" className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl font-bold transition">
                Why Electric? <Zap size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="text-4xl font-extrabold text-green-800">1000+</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Happy Riders</p></div>
            <div><p className="text-4xl font-extrabold text-green-800">500+</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Deliveries</p></div>
            <div><p className="text-4xl font-extrabold text-green-800">100%</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Electric Fleet</p></div>
            <div><p className="text-4xl font-extrabold text-green-800">0L</p><p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">Petrol Per Ride</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">What we do</p>
            <h2 className="mt-3 text-4xl font-bold text-green-950">Transportation made simple</h2>
            <p className="mt-4 text-gray-600 text-lg">From getting to campus to moving between hostels, Otuuse helps you get where you need to go — cleanly and affordably.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="group border border-gray-100 rounded-2xl p-5 bg-white hover:shadow-xl hover:-translate-y-1 transition">
                <ImageSlider images={service.images} alt={service.title} />
                <div className="mt-5 flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                    <Zap size={12} /> Electric
                  </span>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">{service.description}</p>
                <Link to="/services" className="inline-flex items-center gap-2 mt-5 text-green-800 font-semibold">
                  Learn more <ArrowRight size={17} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Electric */}
      <section className="py-20 bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-orange-400 font-bold uppercase tracking-wider text-sm">The Otuuse Difference</p>
              <h2 className="mt-3 text-4xl font-bold">Powered by Electricity. Driven by Purpose.</h2>
              <p className="mt-5 text-green-200 text-lg leading-relaxed">
                Every Otuuse ride runs on clean electric power — no petrol, no smoke, no noise. Because electric vehicles cost less to run, we keep our prices student-friendly while protecting the green hills and fresh air of Kabale.
              </p>
              <Link to="/why-electric" className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 px-6 py-4 rounded-xl font-bold transition">
                Discover Why Electric <ArrowRight size={20} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="bg-white/10 p-6 rounded-2xl">
                    <Icon className="text-orange-400" size={28} />
                    <h3 className="mt-4 font-bold">{pillar.title}</h3>
                    <p className="mt-2 text-sm text-green-200">{pillar.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-center">
            <div><p className="text-3xl font-extrabold text-orange-400">0L</p><p className="text-sm text-green-200 mt-1">Petrol used per ride</p></div>
            <div><p className="text-3xl font-extrabold text-orange-400">100%</p><p className="text-sm text-green-200 mt-1">Electric fleet</p></div>
            <div><p className="text-3xl font-extrabold text-orange-400">~50%</p><p className="text-sm text-green-200 mt-1">Lower running costs</p></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">Testimonials</p>
            <h2 className="mt-3 text-4xl font-bold text-green-950">Trusted by the Kabale Community</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <div className="flex gap-1 mb-4 text-orange-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-green-950">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
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
          <p className="mt-5 text-lg text-orange-50 max-w-2xl mx-auto">From campus rides to hostel shifting and deliveries, Otuuse is here to make student life easier — and greener.</p>
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