import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `*New Contact Message - Otuuse Website*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Subject:* ${formData.subject}\n` +
      `*Message:* ${formData.message}`
    );
    
    // Replace with your actual WhatsApp number
    window.open(`https://wa.me/256791475407?text=${whatsappMessage}`, "_blank");
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-green-950 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold">Contact Otuuse</h1>
            <p className="mt-4 text-lg text-green-200 max-w-2xl mx-auto">
              Have questions? Need transportation? Reach out — we're always ready to help.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 flex items-center justify-center mb-4">
                    <MapPin size={24} />
                  </div>
                  <h3 className="font-bold text-green-950 text-lg">Our Location</h3>
                  <p className="text-gray-600 mt-2">Kabale, Uganda<br />Near Kabale University</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center mb-4">
                    <Phone size={24} />
                  </div>
                  <h3 className="font-bold text-green-950 text-lg">Phone & WhatsApp</h3>
                  <p className="text-gray-600 mt-2">+256 700 000 000</p>
                  <p className="text-gray-600">Available 24/7</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-bold text-green-950 text-lg">Email Us</h3>
                  <p className="text-gray-600 mt-2">hello@otuuse.com</p>
                  <p className="text-gray-600">We reply within 24 hours</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-bold text-green-950 text-lg">Operating Hours</h3>
                  <p className="text-gray-600 mt-2">Monday – Sunday<br />6:00 AM – 11:00 PM</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
                  <h2 className="text-2xl font-bold text-green-950 mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell us more..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                    >
                      Send Message <Send size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Need Transport Now CTA */}
        <section className="py-16 bg-green-950 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Need Transportation Now?</h2>
            <p className="text-green-200 mb-8 text-lg">
              Don't wait — call or WhatsApp us for immediate service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:+256700000000" 
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition"
              >
                <Phone size={20} /> Call Otuuse
              </a>
              <a 
                href="https://wa.me/256700000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition"
              >
                WhatsApp Otuuse
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;