import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.jpeg";

const Navbar = ({ transparent = false }) => {
  const [open, setOpen] = useState(false);

  const link = "px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-orange-500 transition";
  const electricLink = "px-3 py-2 rounded-lg text-sm font-semibold text-orange-300 hover:bg-orange-500 hover:text-white transition";
  const mobileLink = "block px-4 py-3 rounded-lg text-white hover:bg-orange-500 transition";

  return (
    <header
      className={
        transparent
          ? "absolute top-0 left-0 right-0 z-50"
          : "sticky top-0 z-50 bg-green-950/95 backdrop-blur border-b border-white/10"
      }
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo (white logo sits cleanly on the dark navbar) */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Otuuse Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link to="/" className={link}>Home</Link>
            <Link to="/about" className={link}>About</Link>
            <Link to="/partners" className={link}>Partners</Link>
            <Link to="/services" className={link}>Services</Link>
            <Link to="/why-electric" className={electricLink}>Why Electric</Link>
            <Link to="/how-it-works" className={link}>How It Works</Link>
            <Link to="/students" className={link}>Students</Link>
            <Link to="/contact" className={link}>Contact</Link>

            <Link
              to="/request-service"
              className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              Request a Service
            </Link>
          </div>

          {/* Mobile button */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-6 space-y-1 bg-green-950/95 backdrop-blur rounded-b-2xl px-2">
            <Link onClick={() => setOpen(false)} to="/" className={mobileLink}>Home</Link>
            <Link onClick={() => setOpen(false)} to="/about" className={mobileLink}>About</Link>
            <Link onClick={() => setOpen(false)} to="/partners" className={mobileLink}>Partners</Link>
            <Link onClick={() => setOpen(false)} to="/services" className={mobileLink}>Services</Link>
            <Link onClick={() => setOpen(false)} to="/why-electric" className={mobileLink}>Why Electric</Link>
            <Link onClick={() => setOpen(false)} to="/how-it-works" className={mobileLink}>How It Works</Link>
            <Link onClick={() => setOpen(false)} to="/students" className={mobileLink}>Students</Link>
            <Link onClick={() => setOpen(false)} to="/contact" className={mobileLink}>Contact</Link>

            <Link
              onClick={() => setOpen(false)}
              to="/request-service"
              className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold mt-3"
            >
              Request a Service
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;