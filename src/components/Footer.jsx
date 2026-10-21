import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, MessageCircle, Camera, MoveHorizontal, MoveVertical, RotateCcw } from "lucide-react";
import logo from "../assets/logo.jpeg";

const Footer = () => {
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  useEffect(() => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.style.transform = `translateX(${panX}px)`;
      mainContent.style.transition = "transform 120ms ease-out";
    }
    return () => {
      if (mainContent) {
        mainContent.style.transform = "";
        mainContent.style.transition = "";
      }
    };
  }, [panX]);

  useEffect(() => {
    const updatePanY = () => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      setPanY(maxScroll ? Math.round((window.scrollY / maxScroll) * 100) : 0);
    };
    window.addEventListener("scroll", updatePanY, { passive: true });
    window.addEventListener("resize", updatePanY);
    updatePanY();
    return () => {
      window.removeEventListener("scroll", updatePanY);
      window.removeEventListener("resize", updatePanY);
    };
  }, []);

  const handlePanY = (value) => {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: maxScroll * (Number(value) / 100), behavior: "auto" });
    setPanY(Number(value));
  };

  const resetPan = () => {
    setPanX(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPanY(0);
  };

  return (
    <footer className="bg-green-950 text-green-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="Otuuse Logo" className="h-12 md:h-14 w-auto object-contain" />
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
              <li><Link to="/partners" className="hover:text-orange-400 transition">Our Partners</Link></li>
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
              <li><Link to="/services" className="hover:text-orange-400 transition">Bike Hire</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition">Car Rides</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition">Package Delivery</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition">Hostel Moving</Link></li>
              <li><Link to="/why-electric" className="hover:text-orange-400 transition">Why Electric</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-400 mt-1 shrink-0" />
                <span>Kabale, Uganda<br />Near Kabale University</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-400 shrink-0" />
                <a href="tel:+256791475407" className="hover:text-orange-400 transition">+256 791 475 407</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-400 shrink-0" />
                <a href="mailto:otuuse26@gmail.com" className="hover:text-orange-400 transition">otuuse26@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Pan X / Pan Y controls */}
        <section aria-label="Page pan controls" className="mb-8 rounded-2xl border border-green-800 bg-green-900/60 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-white font-semibold">Pan X / Pan Y</h3>
              <p className="text-xs text-green-300 mt-1">Adjust horizontal content position or move vertically through the page.</p>
            </div>
            <button type="button" onClick={resetPan} className="inline-flex items-center justify-center gap-2 self-start sm:self-auto rounded-lg border border-green-700 px-3 py-2 text-sm text-green-100 hover:bg-green-800 transition">
              <RotateCcw size={15} /> Reset
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-medium text-green-100 mb-2"><MoveHorizontal size={16} /> Pan X <span className="ml-auto text-orange-300 tabular-nums">{panX}px</span></span>
              <input aria-label="Pan X horizontal content position" type="range" min="-120" max="120" step="1" value={panX} onChange={(event) => setPanX(Number(event.target.value))} className="w-full accent-orange-500 cursor-pointer" />
              <span className="flex justify-between text-xs text-green-400 mt-1"><span>Left</span><span>Center</span><span>Right</span></span>
            </label>
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-medium text-green-100 mb-2"><MoveVertical size={16} /> Pan Y <span className="ml-auto text-orange-300 tabular-nums">{panY}%</span></span>
              <input aria-label="Pan Y vertical page position" type="range" min="0" max="100" step="1" value={panY} onChange={(event) => handlePanY(event.target.value)} className="w-full accent-orange-500 cursor-pointer" />
              <span className="flex justify-between text-xs text-green-400 mt-1"><span>Top</span><span>Middle</span><span>Bottom</span></span>
            </label>
          </div>
        </section>

        <div className="border-t border-green-800 pt-8 text-center text-xs text-green-400">
          <p>&copy; {new Date().getFullYear()} Otuuse Transportation Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
