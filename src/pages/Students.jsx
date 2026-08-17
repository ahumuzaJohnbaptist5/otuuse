import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Building, Package, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const studentServices = [
  {
    icon: BookOpen,
    title: "Need a Ride to Class?",
    description: "Running late for an 8 AM lecture? Skip the long walks and crowded taxi parks. Get a quick, affordable boda or bike ride straight to the Kabale University campus gates.",
    color: "bg-green-50 text-green-800"
  },
  {
    icon: Building,
    title: "Moving Hostels?",
    description: "Semester ending or shifting to a new place? Don't break your back carrying mattresses and suitcases up Kabale's steep hills. Let our moving team handle your luggage safely.",
    color: "bg-orange-50 text-orange-800"
  },
  {
    icon: Package,
    title: "Need Something Delivered?",
    description: "Forgot your notes at home? Need food delivered to your room while you study? We pick it up and drop it off exactly where you need it, fast.",
    color: "bg-blue-50 text-blue-800"
  },
  {
    icon: GraduationCap,
    title: "Group Travel or Events?",
    description: "Going for a group project, church event, or weekend trip? Book an Otuuse car ride for comfortable group transportation with your friends.",
    color: "bg-indigo-50 text-indigo-800"
  }
];

const Students = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 lg:p-8">
        {studentServices.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <Link to="/request-service" className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition">
                Book Now <ArrowRight size={18} />
              </Link>
            </div>
          );
        })}
      </div>

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-green-950 text-white py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full text-sm mb-6 text-orange-300">
              <GraduationCap size={16} />
              Dedicated to Kabale University
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold">Built for Student Life</h1>
            <p className="mt-6 text-lg text-green-200 max-w-2xl mx-auto">
              From getting to campus to moving between hostels, Otuuse makes university life easier, safer, and more affordable.
            </p>
          </div>
        </section>

        {/* Services for Students */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-green-950">How We Help You</h2>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">We understand the unique challenges students face in Kabale. Here is how we make your day smoother.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {studentServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-green-950 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    <Link to="/request-service" className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition">
                      Book Now <ArrowRight size={18} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Student Promise */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-green-950 mb-6">The Otuuse Student Promise</h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              <div className="p-6">
                <p className="text-4xl font-extrabold text-orange-500 mb-2">Fair</p>
                <p className="text-gray-600 text-sm">Student-friendly rates with no hidden surge pricing.</p>
              </div>
              <div className="p-6 border-l border-r border-gray-100">
                <p className="text-4xl font-extrabold text-orange-500 mb-2">Safe</p>
                <p className="text-gray-600 text-sm">Verified riders who know the campus and hostel routes.</p>
              </div>
              <div className="p-6">
                <p className="text-4xl font-extrabold text-orange-500 mb-2">Fast</p>
                <p className="text-gray-600 text-sm">Quick pickups so you never miss a lecture or exam.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Students;