import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/eventralogo.png";

const navItems = [
  { name: "All Events", path: "/" },
  { name: "Your Bookings", path: "/bookings" }, 
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur shadow-lg px-6 py-1 fixed w-full z-50">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Left: Logo and Name */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={Logo}
            alt="Eventra Logo"
            className="h-14 w-14"
          />
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent drop-shadow font-serif group-hover:opacity-90 transition">
            Eventra
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-1 text-base font-semibold transition-colors duration-200 group
                ${location.pathname === item.path
                  ? "text-blue-700"
                  : "text-gray-700 hover:text-blue-700"}
              `}
            >
              {item.name}
              <span
                className={`
                  absolute left-0 -bottom-0.5 h-0.5 w-full rounded bg-blue-700
                  transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }
                  origin-left
                `}
              />
            </Link>
          ))} 
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 shadow-lg animate-fade-in-down border-t border-blue-100">
          <div className="flex flex-col items-center py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full text-center py-2 rounded transition text-base font-semibold
                  ${location.pathname === item.path
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-blue-50"}
                `}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))} 
          </div>
        </div>
      )}
    </nav>
  );
}