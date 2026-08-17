import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, MessageCircle, Camera } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-green-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xl">
                O
              </div>
              <h2 className="text-2xl font-extrabold text-white">OTUUSE</h2>
            </div>
            <p className="text-sm text-green-300 mb-4 max-w-xs leading-relaxed">
              Reliable transportation, deliveries, and moving services in Kabale. Moving Kabale, one ride at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange-400 transition" aria-label="Website"><Globe size={20} /></a>
              <a href="#" className="hover:text-orange-400 transition" aria-label="Chat"><MessageCircle size={20} /></a>
              <a href="#" className="hover:text-orange-400 transition" aria-label="Photos"><Camera size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-orange-400 transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition">Our Services</Link></li>
              <li><Link to="/how-it-works" className="hover:text-orange-400 transition">How It Works</Link></li>
              <li><Link to="/faq" className="hover:text-orange-400 transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
<div>
  <h3 className="text-white font-bold text-lg mb-4">Services</h3>
  <ul className="space-y-3 text-sm">
    <li><Link to="/services" className="hover:text-orange-400 transition">Boda-Boda Rides</Link></li>
    <li><Link to="/services" className="hover:text-orange-400 transition">Bike Rides</Link></li>
    <li><Link to="/services" className="hover:text-orange-400 transition">Car Rides</Link></li>
    <li><Link to="/services" className="hover:text-orange-400 transition">Package Delivery</Link></li>
    <li><Link to="/services" className="hover:text-orange-400 transition">Hostel Moving</Link></li>
  </ul>
</div>
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-400 mt-1 shrink-0" />
                <span>Kabale, Uganda<br/>Near Kabale University</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-400 shrink-0" />
                <a href="tel:256791475407" className="hover:text-orange-400 transition">+256 791 475 407</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-400 shrink-0" />
                <a href="mailto:hello@otuuse.com" className="hover:text-orange-400 transition">hello@otuuse.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 text-center text-xs text-green-400">
          <p>&copy; {new Date().getFullYear()} Otuuse Transportation Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;