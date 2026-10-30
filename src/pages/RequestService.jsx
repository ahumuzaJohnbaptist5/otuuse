import { useEffect, useState } from "react";
import { Send, MapPin, Phone, Clock, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RequestService = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    service: "",
    pickup: "",
    destination: "",
    phone: "",
    description: "",
    time: "",
  });

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const apiBase = "https://otuuse-api.onrender.com";

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    setLoadingServices(true);
    setError("");
    fetch(apiBase + "/api/services/", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Services could not be loaded (HTTP " + response.status + ").");
        return response.json();
      })
      .then((data) => {
        const available = Array.isArray(data) ? data : (data.results || []);
        setServices(available);
        if (available.length === 0) setError("No active services are configured yet. Please contact Otuuse or try again later.");
      })
      .catch((err) => {
        if (!controller.signal.aborted || err.name !== "AbortError") {
          setError("Could not connect to the booking service. Please retry or contact Otuuse directly.");
        } else {
          setError("The service request timed out. Please retry.");
        }
      })
      .finally(() => { clearTimeout(timeout); setLoadingServices(false); });
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [retryCount]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setConfirmation(null);
    setSubmitting(true);
    try {
      const response = await fetch(apiBase + "/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.customer_name.trim(),
          service: Number(formData.service),
          pickup: formData.pickup.trim(),
          destination: formData.destination.trim(),
          phone: formData.phone.trim(),
          notes: [formData.time && "Preferred time: " + formData.time, formData.description].filter(Boolean).join("\n"),
        }),
      });
      if (!response.ok) throw new Error("Your booking could not be saved. Please check the details and try again.");
      const booking = await response.json();
      setConfirmation(booking.id);
      setFormData({ customer_name: "", service: "", pickup: "", destination: "", phone: "", description: "", time: "" });
    } catch (err) {
      setError(err.message || "Unable to submit your booking right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-green-950">Request a Service</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below. Your booking will be sent directly to the Otuuse team.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            {error && <p role="alert" className="mb-6 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
            {confirmation && <p role="status" className="mb-6 rounded-xl bg-green-50 p-4 text-green-900">Booking #{confirmation} received successfully! Our team will contact you.</p>}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="customer_name" className="block text-sm font-semibold text-gray-700 mb-2">Your Full Name *</label>
                <input id="customer_name" name="customer_name" type="text" maxLength={100} required value={formData.customer_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="Your full name" />
              </div>
              
              {/* Service Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">What service do you need? *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {services.map((option) => (
                    <label
                      key={option.id}
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.service === String(option.id)
                          ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                          : "border-gray-200 hover:border-green-300 text-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={String(option.id)}
                        checked={formData.service === String(option.id)}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <span className="text-3xl mb-2">🚗</span>
                      <span className="text-sm font-medium">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {loadingServices && <p role="status">Loading available services...</p>}
              {!loadingServices && services.length === 0 && <div className="rounded-xl bg-amber-50 p-4 text-amber-900"><p>Online booking is unavailable until services can be loaded.</p><button type="button" onClick={() => setRetryCount((count) => count + 1)} className="mt-2 rounded-lg bg-green-800 px-4 py-2 font-semibold text-white hover:bg-green-900">Retry loading services</button></div>}
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
                disabled={submitting || loadingServices || services.length === 0 || !formData.service}
                className="w-full disabled:opacity-50 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                {submitting ? "Submitting..." : "Submit Booking"} <Send size={20} />
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Your booking will be recorded. Our team will contact you to confirm availability.
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