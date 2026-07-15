import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [active, setActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="relative"
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
      }}
    >
      <nav className="flex h-18 w-full items-center justify-between bg-[#09061A] px-6">
        <div className="flex flex-row items-center ml-2">
          <NavLink to="/" className="flex flex-row items-center">
            <img src={logo} alt="Logo" className="w-16 h-16" />
            <h1
              className="text-2xl text-white"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
              }}
            >
              Kai
            </h1>
          </NavLink>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-3xl mr-6 ml-auto"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className="flex flex-row items-center ml-auto gap-16 px-4 md:flex hidden">
          <NavLink
            to="/features"
            onClick={() => setActive("Features")}
            className={
              active === "Features"
                ? "text-white border-b-2 border-purple-500 pb-1"
                : "text-gray-400"
            }
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
            }}
          >
            Features
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setActive("About")}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
            }}
            className={
              active === "About"
                ? "text-white border-b-2 border-purple-500 pb-1"
                : "text-gray-400"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/login"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
            }}
            className="px-4 h-10 flex flex-row items-center text-white justify-center rounded-lg border border-white/60 hover:bg-white/40"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
            }}
            className="mr-10 px-4 h-10 flex flex-row items-center text-white justify-center rounded-lg bg-purple-700 hover:bg-purple-900"
          >
            Get Started
          </NavLink>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="absolute top-[76px] right-4 w-72 rounded-xl border border-white/10 bg-[#09061A] backdrop-blur-xl shadow-2xl overflow-hidden z-50">
          <NavLink
            to="/features"
            onClick={() => {
              setActive("Features");
              setIsMenuOpen(false);
            }}
            className="block px-6 py-4 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all duration-200"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Features
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => {
              setActive("About");
              setIsMenuOpen(false);
            }}
            className="block px-6 py-4 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all duration-200"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            About
          </NavLink>

          <div className="mx-6 border-t border-white/10" />

          <NavLink
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block px-6 py-4 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all duration-200"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Login
          </NavLink>

          <div className="p-4">
            <NavLink
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-lg bg-violet-600 py-3 text-center font-semibold text-white hover:bg-violet-700 transition-all duration-200"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Get Started
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
