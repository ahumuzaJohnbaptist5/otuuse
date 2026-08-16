import { useState } from "react";
import { Send, MapPin, Phone, Clock, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RequestService = () => {
  const [formData, setFormData] = useState({
    service: "",
    pickup: "",
    destination: "",
    phone: "",
    description: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map service IDs to readable names
    const serviceNames = {
      boda: "Boda Ride",
      bike: "Bike Ride",
      delivery: "Package Delivery",
      moving: "Hostel/House Moving",
    };

    // Construct the WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `*🚀 NEW OTUUSE SERVICE REQUEST*\n\n` +
      `*Service:* ${serviceNames[formData.service] || formData.service}\n` +
      `*Pickup:* ${formData.pickup}\n` +
      `*Destination:* ${formData.destination}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Preferred Time:* ${formData.time || "ASAP"}\n` +
      `*Details:* ${formData.description || "None"}\n\n` +
      `_Sent from otuuse.com_`
    );

    // ⚠️ REPLACE THIS WITH YOUR ACTUAL WHATSAPP NUMBER (country code + number, no + sign)
    const whatsappNumber = "256791475407";

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");

    // Show confirmation
    alert("Opening WhatsApp to send your request... If WhatsApp doesn't open, please call us directly.");

    // Reset form
    setFormData({
      service: "",
      pickup: "",
      destination: "",
      phone: "",
      description: "",
      time: "",
    });
  };

  const serviceOptions = [
    { id: "boda", label: "Boda Ride", icon: "🛵" },
    { id: "bike", label: "Bike Ride", icon: "🚲" },
    { id: "delivery", label: "Delivery", icon: "📦" },
    { id: "moving", label: "Moving", icon: "🏠" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-green-950">Request a Service</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below. Your request will be sent directly to our WhatsApp for instant processing.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Service Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">What service do you need? *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {serviceOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.service === option.id
                          ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                          : "border-gray-200 hover:border-green-300 text-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={option.id}
                        checked={formData.service === option.id}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <span className="text-3xl mb-2">{option.icon}</span>
                      <span className="text-sm font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="pickup"
                      value={formData.pickup}
                      onChange={handleChange}
                      placeholder="e.g., Kabale University Main Gate"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destination *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" size={20} />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g., Kikungulu Hostel"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+256 7XX XXX XXX"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="e.g., Now, 2:00 PM, Tomorrow Morning"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-gray-400" size={20} />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us more (e.g., number of bags, specific items, landmarks...)"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                Send Request via WhatsApp <Send size={20} />
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Your request will open in WhatsApp. Press send to complete the booking.
              </p>
            </form>
          </div>

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Prefer to talk directly?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:256791475407" 
                className="inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                <Phone size={18} /> Call Otuuse
              </a>
              <a 
                href="https://wa.me/256791475407" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                WhatsApp Otuuse
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestService;