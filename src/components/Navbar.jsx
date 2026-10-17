import { Link } from "react-router-dom";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";

const Navbar = ({ transparent = false }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("otuuse-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("otuuse-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const primaryLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Partners", to: "/partners" },
  ];

  const moreLinks = [
    { label: "Why Electric", to: "/why-electric" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "Students", to: "/students" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`relative z-50 transition-colors duration-200 ${transparent
        ? "absolute top-0 left-0 right-0"
        : darkMode
          ? "sticky top-0 bg-gray-950/95 backdrop-blur border-b border-white/10"
          : "sticky top-0 bg-white/95 backdrop-blur border-b border-gray-200"}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="h-20 flex items-center justify-between gap-4">
          <Link to="/" onClick={closeMenu} className="flex items-center shrink-0" aria-label="Otuuse home">
            <span className="flex items-center justify-center rounded-xl bg-green-950 px-3 py-1.5 shadow-sm">
              <img
                src={logo}
                alt="Otuuse company logo"
                className="h-11 md:h-12 w-auto max-w-[145px] object-contain"
              />
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {primaryLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={`text-sm lg:text-base font-semibold transition whitespace-nowrap hover:text-orange-500 ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className={`inline-flex items-center justify-center gap-2 h-11 w-11 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? "border-gray-700 text-yellow-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-100"}`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/request-service"
              className="hidden sm:inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-5 py-3 rounded-xl font-semibold transition whitespace-nowrap"
            >
              Request a Service
            </Link>

            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? "border-gray-700 text-white hover:bg-gray-800" : "border-gray-200 text-gray-800 hover:bg-gray-100"}`}
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
              className={`absolute z-50 right-4 left-4 sm:left-auto sm:right-6 top-full sm:w-[25rem] rounded-2xl border shadow-2xl p-4 sm:p-5 ${darkMode ? "border-gray-700 bg-gray-950" : "border-gray-200 bg-white"}`}
            >
              <div className={`flex items-center justify-between px-2 pb-3 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                <div>
                  <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Explore Otuuse</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>More pages and information</p>
                </div>
                <span className="text-orange-500"><Menu size={22} /></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
                {moreLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-orange-500 hover:text-white ${label === "Why Electric" ? "text-orange-500" : darkMode ? "text-gray-100" : "text-gray-800"} ${darkMode ? "hover:bg-orange-500" : "hover:bg-orange-500"}`}
                  >
                    <span>{label}</span>
                    <ChevronRight size={16} className="text-orange-500 shrink-0" />
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
