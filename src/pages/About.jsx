import { Target, Eye, MapPin, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-green-950 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold">About Otuuse</h1>
            <p className="mt-4 text-lg text-green-200 max-w-2xl mx-auto">
              A Kabale-based transportation company built to make movement easier, safer, and more reliable for our community.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-orange-500 font-bold uppercase tracking-wider text-sm">Who We Are</p>
              <h2 className="mt-3 text-4xl font-bold text-green-950">Moving Kabale Forward</h2>
             <p className="mt-5 text-gray-600 text-lg leading-relaxed">
                Otuuse is a Kabale-based transportation and delivery company providing convenient mobility solutions for students, businesses, and the wider community. We connect customers with reliable transportation services ranging from boda-boda and bicycle rides to car rides, package deliveries, and hostel moving services.
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                We started Otuuse because we saw a gap in reliable, trustworthy, and affordable transport in Kabale. Students were struggling to move between hostels, and locals were wasting time searching for reliable riders. We decided to fix that.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-green-950 text-lg">Local Focus</h3>
                <p className="text-sm text-gray-600 mt-2">Proudly serving Kabale town and surrounding areas.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="font-bold text-green-950 text-lg">Community First</h3>
                <p className="text-sm text-gray-600 mt-2">Prices and services designed with locals in mind.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-green-950 text-white flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-green-950 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide safe, reliable, and affordable transportation and delivery services that solve everyday mobility challenges for the people of Kabale, with a special dedication to university students.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-6">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-bold text-green-950 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and technologically advanced transportation platform in Western Uganda, making movement seamless for everyone.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;