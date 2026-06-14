import iconMain from "../assets/icon.png";
import { ListChecks, NotebookPen, Target, MessageSquareText, Calendar1, Lightbulb } from "lucide-react";

function Features() {
    return (
        <div className="bg-[#050314] h-full px-10">
            <div className="flex flex-col gap-2 text-white h-full">
                <div className="flex flex-col text-white items-center w-full h-[200px] justify-center mt-4">
                    <div className="flex flex-col w-[605px] justify-center items-center">
                        <h1 className="text-6xl text-center">
                            Powerful features, all in{" "}
                            <span className="text-purple-500">
                                one workspace.
                            </span>
                        </h1>
                        <p className="text-base mt-4 text-center text-purple-200 w-[400px]">
                            Everything you need to organize, plan, learn, and achieve more with the power of AI.
                        </p>
                    </div>
                    
                </div>
                <div className=" grid grid-cols-3 grid-rows-2 gap-4 text-white mb-4 h-[380px] px-24">
                    <div className="border border-white/20 rounded-lg px-4 flex flex-row items-center bg-white/10 gap-2">
                        <ListChecks className="w-24 h-24 rounded-lg ml-4 text-violet-400 rounded-lg bg-violet-500/20"/>
                        <div className="w-[250px]">
                            <h1 className="text-xl">
                                Tasks
                            </h1>
                            <p className="text-sm text-white/70">
                                Organize your work, set priorities, and get things done.
                            </p>
                        </div>
                        
                    </div>
                    <div className="border border-white/20 rounded-lg px-4 flex flex-row items-center bg-white/10 gap-2">
                        <NotebookPen className="w-24 h-24 rounded-lg ml-4 text-violet-400 rounded-lg bg-violet-500/20"/>
                        <div className="w-[250px]">
                            <h1 className="text-xl">
                                Notes
                            </h1>
                            <p className="text-sm text-white/70">
                                Capture ideas and organize knowledge effortlessly.
                            </p>
                        </div>
                    </div>
                    <div className="border border-white/20 rounded-lg px-4 flex flex-row items-center bg-white/10 gap-2">
                        <Target className="w-24 h-24 rounded-lg ml-4 text-violet-400 rounded-lg bg-violet-500/20"/>
                        <div className="w-[250px]">
                            <h1 className="text-xl">
                                Goals
                            </h1>
                            <p className="text-sm text-white/70">
                                Track your progress and stay consistent with your goals.
                            </p>
                        </div>
                    </div>
                    <div className="border border-white/20 rounded-lg px-4 flex flex-row items-center bg-white/10 gap-2">
                        <MessageSquareText className="w-24 h-24 rounded-lg ml-4 text-violet-400 rounded-lg bg-violet-500/20"/>
                        <div className="w-[250px]">
                            <h1 className="text-xl">
                                AI Chat
                            </h1>
                            <p className="text-sm text-white/70">
                                Learn, brainstorm, and get AI assistance anytime.
                            </p>
                        </div>
                    </div>
                    <div className="border border-white/20 rounded-lg px-4 flex flex-row items-center bg-white/10 gap-2">
                        <Calendar1 className="w-24 h-24 rounded-lg ml-4 text-violet-400 rounded-lg bg-violet-500/20"/>
                        <div className="w-[250px]">
                            <h1 className="text-xl">
                                Calendar
                            </h1>
                            <p className="text-sm text-white/70">
                                Manage your schedule and never miss important things.
                            </p>
                        </div>
                    </div>
                    <div className="border border-white/20 rounded-lg px-4 flex flex-row items-center bg-white/10 gap-2">
                        <Lightbulb className="w-24 h-24 rounded-lg ml-4 text-violet-400 rounded-lg bg-violet-500/20"/>
                        <div className="w-[250px]">
                            <h1 className="text-xl">
                                Ideas
                            </h1>
                            <p className="text-sm text-white/70">
                                Brainstorm, plan, and turn ideas into action with AI.
                            </p>
                        </div>
                    </div>
                    
                </div>

            </div>
             
        </div>
    );
}

export default Features;

