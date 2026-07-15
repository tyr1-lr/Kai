import iconMain from "../assets/icon.png";
import logo from "../assets/logo.png";
import { UsersRound, Heart, Blocks, Eye, Rocket } from "lucide-react";

function About() {
  return (
    <div
      className="bg-[#010110] min-h-full px-6 sm:px-10 lg:px-16 py-12"
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
      }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          <h1 className="flex items-center justify-center lg:justify-start text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            About Kai
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 ml-2"
            />
          </h1>

          <p className="mt-6 text-center lg:text-left text-base sm:text-lg lg:text-xl text-white/80 max-w-xl">
            Kai was created to bring tasks, notes, goals, and AI assistance into
            a single workspace.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex items-center gap-4">
              <UsersRound className="h-12 w-12 text-violet-500 flex-shrink-0" />

              <div>
                <h3 className="text-lg text-white">Built for</h3>

                <p className="text-white/70">Students & Developers</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex items-center gap-4">
              <Heart className="h-12 w-12 text-violet-500 flex-shrink-0" />

              <div>
                <h3 className="text-lg text-white">Made with</h3>

                <p className="text-white/70">Passion & Purpose</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 justify-center">
          <img src={iconMain} alt="Kai" className="w-full max-w-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16 pb-10">
        <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
            <Blocks className="h-10 w-10 text-violet-400" />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-white">
            Our Mission
          </h2>

          <p className="mt-3 text-center text-white/70 leading-7">
            Help people think clearly, stay organized, and learn faster using
            AI.
          </p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
            <Eye className="h-10 w-10 text-violet-400" />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-white">
            Our Vision
          </h2>

          <p className="mt-3 text-center text-white/70 leading-7">
            A future where productivity tools work together, not compete for
            attention.
          </p>
        </div>

        <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
            <Rocket className="h-10 w-10 text-violet-400" />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-white">
            Our Purpose
          </h2>

          <p className="mt-3 text-center text-white/70 leading-7">
            To build a workspace that empowers everyone to achieve more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
