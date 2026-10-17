import { Link } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.jpeg";

const Navbar = ({ transparent = false }) => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Partners", to: "/partners" },
    { label: "Services", to: "/services" },
    { label: "Why Electric", to: "/why-electric" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "Students", to: "/students" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`relative z-50 ${transparent
        ? "absolute top-0 left-0 right-0"
        : "sticky top-0 bg-green-950/95 backdrop-blur border-b border-white/10"}`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="h-20 flex items-center justify-between gap-4">
          <Link to="/" onClick={closeMenu} className="flex items-center shrink-0" aria-label="Otuuse home">
            <img
              src={logo}
              alt="Otuuse Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/request-service"
              className="hidden sm:inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-5 py-3 rounded-xl font-semibold transition"
            >
              Request a Service
            </Link>
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="otuuse-navigation-menu"
            >
              {open ? <X size={27} /> : <Menu size={27} />}
            </button>
          </div>
        </div>

        {open && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className="fixed inset-0 top-20 z-40 cursor-default bg-black/20"
            />
            <div
              id="otuuse-navigation-menu"
              className="absolute z-50 right-4 left-4 sm:left-auto sm:right-6 top-full sm:w-[25rem] rounded-2xl border border-white/10 bg-green-950 shadow-2xl p-4 sm:p-5"
            >
              <div className="flex items-center justify-between px-2 pb-3 border-b border-white/10">
                <div>
                  <p className="text-white font-bold text-lg">Explore Otuuse</p>
                  <p className="text-green-200 text-sm">Where would you like to go?</p>
                </div>
                <span className="text-orange-400"><Menu size={22} /></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
                {links.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      label === "Why Electric"
                        ? "text-orange-300 hover:bg-orange-500 hover:text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{label}</span>
                    <ChevronRight size={16} className="text-orange-400 shrink-0" />
                  </Link>
                ))}
              </div>

              <Link
                to="/request-service"
                onClick={closeMenu}
                className="sm:hidden mt-3 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold transition"
              >
                Request a Service
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
