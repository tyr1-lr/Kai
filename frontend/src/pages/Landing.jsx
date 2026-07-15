import { NavLink } from "react-router-dom";
import iconMain from "../assets/icon.png";
import { Sparkle } from "lucide-react";

function Landing() {
  return (
    <div
      className="flex h-full flex-col lg:flex-row bg-[#010110]"
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
      }}
    >
      <div className="text-white w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-10 py-16 lg:pt-0 min-w-0">
        <h1 className="text-white text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-2">
          Your Personal
        </h1>
        <h1 className="text-purple-400 text-3xl sm:text-5xl lg:text-7xl font-bold">
          AI Workspace
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white w-full max-w-full mt-6 leading-7 text-white/85">
          Organize your tasks, notes, and goals with an AI assistant that helps
          you learn, study, and stay productive.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm ">
          <NavLink
            to="/register"
            className="px-4 h-14 w-full min-w-0 sm:w-82 flex flex-row items-center text-white justify-center rounded-lg bg-purple-700 hover:bg-purple-900"
          >
            Get Started
          </NavLink>
          <NavLink
            to="/login"
            className="px-4 h-14 w-full min-w-0 flex flex-row items-center text-white justify-center rounded-lg border border-white/60 hover:bg-white/40"
          >
            Login
          </NavLink>
        </div>

        <p className="mt-8 flex items-center gap-2 text-sm text-white/60">
          <Sparkle className="h-4 w-4 flex-shrink-0 text-yellow-300" />
          Built for students, developers, and dreamers.
        </p>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img src={iconMain} alt="Kai workspace" className="w-full max-w-4xl" />
      </div>
    </div>
  );
}

export default Landing;
