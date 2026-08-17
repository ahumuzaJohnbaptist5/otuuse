import { Link } from "react-router-dom";
import { Bike, Package, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bike, Car, Package, Truck, ArrowRight, CheckCircle2 } from "lucide-react";

const serviceDetails = [
  {
    id: "boda",
    icon: Bike,
    title: "Boda-Boda Rides",
    color: "bg-green-50 text-green-800",
    description: "Convenient, safe, and reliable motorcycle rides around Kabale. Whether you are heading to class, work, or across town, our verified riders will get you there on time.",
    features: ["Verified & polite riders", "Quick pickup times", "Safe helmets provided", "Fair, transparent pricing"]
  },
  {
    id: "bike",
    icon: Bike, // Using Bike icon for bicycle
    title: "Bicycle Rides",
    color: "bg-orange-50 text-orange-800",
    description: "Affordable and eco-friendly transportation for short-distance trips. Perfect for navigating the steep hills and busy streets of Kabale without breaking a sweat or your budget.",
    features: ["Highly affordable", "Eco-friendly", "Great for short distances", "Navigate traffic easily"]
  },

  {
  id: "car",
  icon: Car,
  title: "Car Rides",
  color: "bg-indigo-50 text-indigo-800",
  description: "Comfortable and spacious car transportation for longer distances, group travel, airport transfers, or when you need more room than a boda-boda offers. Perfect for moving with friends or carrying larger items.",
  features: ["Comfortable seating", "Weather protection", "Group travel friendly", "Extra luggage space", "Long-distance capable"]
},

  {
    id: "delivery",
    icon: Package,
    title: "Package Deliveries",
    color: "bg-blue-50 text-blue-800",
    description: "Send food, documents, groceries, or online purchases to any destination in Kabale. We treat your items with care and ensure they arrive safely and quickly.",
    features: ["Real-time updates via WhatsApp", "Careful handling of items", "Food-safe delivery", "Business & personal deliveries"]
  },
  {
    id: "moving",
    icon: Truck,
    title: "Hostel & House Moving",
    color: "bg-purple-50 text-purple-800",
    description: "Moving from one hostel to another or shifting houses? Don't stress about the heavy lifting. Otuuse provides reliable transport for your luggage and belongings.",
    features: ["Careful handling of luggage", "Spacious transport options", "Student-friendly rates", "Assistance with loading/unloading"]
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-green-950 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold">Our Services</h1>
            <p className="mt-4 text-lg text-green-200 max-w-2xl mx-auto">
              Comprehensive transportation and delivery solutions tailored for Kabale University students, local businesses, and the community.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="space-y-16">
              {serviceDetails.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={service.id} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Text Content */}
                    <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                      <div className={`inline-flex w-14 h-14 rounded-xl ${service.color} items-center justify-center mb-4`}>
                        <Icon size={28} />
                      </div>
                      <h2 className="text-3xl font-bold text-green-950 mb-4">{service.title}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>
                      
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-700">
                            <CheckCircle2 size={20} className="text-orange-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link 
                        to="/request-service" 
                        state={{ serviceType: service.id }} // Passes the service type to the form
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
                      >
                        Request {service.title} <ArrowRight size={18} />
                      </Link>
                    </div>

                    {/* Visual Placeholder (You can add real images here later) */}
                    <div className={`w-full h-64 lg:h-80 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <Icon size={80} className="text-green-800 opacity-20" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Need something else?</h2>
            <p className="text-orange-50 mb-8 text-lg">
              If you have special transportation requirements or a large business delivery, reach out to us. We are happy to help!
            </p>
            <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-950 hover:bg-green-900 text-white px-8 py-4 rounded-xl font-bold transition">
              Chat with us on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;