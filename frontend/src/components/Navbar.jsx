import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [active, setActive] = useState(null);

    return (
        <nav className="flex flex-row h-18 w-full bg-[#09061A]">
            <div className="flex flex-row items-center ml-2">
                <NavLink 
                to="/"
                className="flex flex-row items-center">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    <h1 className="text-2xl text-white">
                        Kai
                    </h1>
                </NavLink>
            </div>

            <div className="flex flex-row items-center ml-auto gap-16 px-4">
                <NavLink
                    to="/features"
                    onClick={() => setActive("Features")}
                    className={
                        active === "Features"
                            ? "text-white border-b-2 border-purple-500 pb-1"
                            : "text-gray-400"
                    }
                >
                    Features
                </NavLink>

                <NavLink
                    to="/about"
                    onClick={() => setActive("About")}
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
                className="px-4 h-10 flex flex-row items-center text-white justify-center rounded-lg border border-white/60 hover:bg-white/40">
                    Login
                </NavLink>

                <NavLink 
                to="/register"
                className="mr-10 px-4 h-10 flex flex-row items-center text-white justify-center rounded-lg bg-purple-700 hover:bg-purple-900">
                    Get Started
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;