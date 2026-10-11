import { Link } from "react-router-dom";
import { Zap, Leaf, Wallet, VolumeX, CheckCircle2, XCircle, ArrowRight, GraduationCap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const pillars = [
  { icon: Zap, title: "Zero Emissions", text: "No petrol, no exhaust smoke. Every kilometer you ride with Otuuse is a kilometer of clean air for Kabale." },
  { icon: Wallet, title: "Cheaper to Run", text: "Charging costs a fraction of fuel. Those savings go straight into lower, student-friendly prices." },
  { icon: VolumeX, title: "Quiet Rides", text: "No engine noise or vibrations — just smooth, calm journeys across campus and town." },
  { icon: Leaf, title: "Protecting Nature", text: "Kabale's green hills deserve green transport. Every electric ride helps preserve them for the next generation." },
];

const oldWay = [
  "Petrol prices push fares up every month",
  "Exhaust smoke pollutes the air students breathe",
  "Loud engine noise across campus and hostels",
  "Oil, filters and engine repairs add hidden costs",
];

const otuuseWay = [
  "Stable, student-friendly fares all semester",
  "Zero tailpipe emissions on every single ride",
  "Whisper-quiet electric motors",
  "Fewer moving parts means lower running costs",
];

const WhyElectric = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-green-950 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm mb-6">
              <Zap size={16} /> 100% Electric Fleet
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold">Why Electric?</h1>
            <p className="mt-6 text-lg text-green-200 max-w-2xl mx-auto">
              Because Kabale deserves clean air, quiet streets, and transport prices that don't rise with every fuel crisis. That's why every Otuuse vehicle runs on electricity.
            </p>
          </div>
        </section>

        {/* Four Pillars */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">The Otuuse Difference</p>
              <h2 className="mt-3 text-4xl font-bold text-green-950">Powered by Electricity. Driven by Purpose.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-green-950 text-lg">{pillar.title}</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{pillar.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-950">Petrol vs. Otuuse Electric</h2>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">See why switching to electric is better for your wallet and for Kabale.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-500 mb-6">The Old Petrol Way</h3>
                <ul className="space-y-4">
                  {oldWay.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-500">
                      <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-950 p-8 rounded-2xl text-white shadow-lg">
                <h3 className="text-xl font-bold mb-6">The Otuuse Electric Way</h3>
                <ul className="space-y-4">
                  {otuuseWay.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-green-100">
                      <CheckCircle2 size={20} className="text-orange-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Student Focus */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex w-14 h-14 rounded-full bg-orange-100 text-orange-600 items-center justify-center mb-6">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-3xl font-bold text-green-950 mb-6">Electric Means Affordable. Affordable Means Students.</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Electric vehicles cost less to "fuel" and maintain than petrol machines. We pass those savings directly to you — which is why Otuuse prices are built around a student's budget, not a fuel station's price board.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/students" className="inline-flex items-center justify-center gap-2 bg-green-950 hover:bg-green-900 text-white px-6 py-4 rounded-xl font-bold transition">
                See Student Benefits <ArrowRight size={20} />
              </Link>
              <Link to="/request-service" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold transition">
                Ride Electric Today <Zap size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyElectric;