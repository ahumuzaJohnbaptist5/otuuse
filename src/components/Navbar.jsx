import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.jpeg"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
<Link to="/" className="flex items-center gap-3">
  {/* Dark green badge so the white logo pops on the white navbar */}
  <div className="bg-green-950 rounded-xl p-2 shadow-sm">
    <img
      src={logo}
      alt="Otuuse Logo"
      className="h-9 md:h-11 w-auto object-contain"
    />
  </div>
  <p className="hidden sm:block text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
    Move with confidence
  </p>
</Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-green-800"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 hover:text-green-800"
            >
              About
            </Link>

            <Link
              to="/services"
              className="text-sm font-medium text-gray-700 hover:text-green-800"
            >
              Services
            </Link>

            <Link
              to="/how-it-works"
              className="text-sm font-medium text-gray-700 hover:text-green-800"
            >
              How It Works
            </Link>

            <Link
              to="/students"
              className="text-sm font-medium text-gray-700 hover:text-green-800"
            >
              Students
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-gray-700 hover:text-green-800"
            >
              Contact
            </Link>

            <Link
              to="/request-service"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              Request a Service
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-gray-700"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-6 space-y-2">

            <Link
              onClick={() => setOpen(false)}
              to="/"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              Home
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/about"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              About
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/services"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              Services
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/how-it-works"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              How It Works
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/students"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              Students
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/contact"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              Contact
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/request-service"
              className="block text-center bg-orange-500 text-white px-4 py-3 rounded-xl font-semibold mt-3"
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