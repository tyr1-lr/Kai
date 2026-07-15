import iconMain from "../assets/icon.png";
import {
  ListChecks,
  NotebookPen,
  Target,
  MessageSquareText,
  Calendar1,
  Lightbulb,
} from "lucide-react";

function Features() {
  return (
    <div
      className="bg-[#010110] min-h-full px-6 sm:px-8 lg:px-10 py-10"
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
      }}
    >
      <div className="flex flex-col gap-10 text-white">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex flex-col max-w-2xl w-full justify-center items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center leading-tight">
              Powerful features, all in{" "}
              <span className="text-purple-500">one workspace.</span>
            </h1>
            <p className="text-base mt-4 text-center text-purple-200 max-w-md w-full">
              Everything you need to organize, plan, learn, and achieve more
              with the power of AI.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          <div className="group min-h-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
              <ListChecks className="h-10 w-10 text-violet-400" />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">Tasks</h2>

            <p className="mt-3 text-center text-sm leading-6 text-white/70">
              Organize your work, set priorities, and get things done.
            </p>
          </div>

          <div className="group min-h-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
              <NotebookPen className="h-10 w-10 text-violet-400" />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">Notes</h2>

            <p className="mt-3 text-center text-sm leading-6 text-white/70">
              Capture ideas and organize knowledge effortlessly.
            </p>
          </div>

          <div className="group min-h-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
              <Target className="h-10 w-10 text-violet-400" />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">Goals</h2>

            <p className="mt-3 text-center text-sm leading-6 text-white/70">
              Track your progress and stay consistent with your goals.
            </p>
          </div>

          <div className="group min-h-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
              <MessageSquareText className="h-10 w-10 text-violet-400" />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">
              AI Chat
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-white/70">
              Learn, brainstorm, and get AI assistance anytime.
            </p>
          </div>

          <div className="group min-h-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
              <Calendar1 className="h-10 w-10 text-violet-400" />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">
              Calendar
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-white/70">
              Manage your schedule and never miss important things.
            </p>
          </div>

          <div className="group min-h-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/15">
              <Lightbulb className="h-10 w-10 text-violet-400" />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">Ideas</h2>

            <p className="mt-3 text-center text-sm leading-6 text-white/70">
              Brainstorm, plan, and turn ideas into action with AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
