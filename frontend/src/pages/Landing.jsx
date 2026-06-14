import { NavLink } from "react-router-dom";
import iconMain from "../assets/icon.png";
import { Sparkle } from "lucide-react";

function Landing() {
    return (
        <div className="flex flex-row bg-[#050314] h-full gap-4">
            <div className="text-white w-[600px] flex flex-col justify-center px-10 ml-8">
                <h1 className="text-white text-7xl font-bold">Your Personal</h1>
                <h1 className="text-purple-400 text-7xl font-bold">AI Workspace</h1>
                <p className="text-xl text-white w-[400px] mt-4">
                    Organize your tasks, notes, and goals with an AI assistant that helps you learn, study, and stay productive.
                </p>
                <div className="flex flex-row mt-4 gap-4">
                    <NavLink to="/register" className="px-4 h-14 w-32 flex flex-row items-center text-white justify-center rounded-lg bg-purple-700 hover:bg-purple-900">
                        Get Started
                    </NavLink>
                    <NavLink to="/login" className="px-4 h-14 w-32 flex flex-row items-center text-white justify-center rounded-lg border border-white/60 hover:bg-white/40">
                        Login
                    </NavLink>  
                </div>

                <p className="flex flex-row mt-4 text-white/60 gap-2">
                    <Sparkle className="text-yellow-300"/>
                    Built for students, developers, and dreamers.
                </p>
            </div>
            <div className=" text-white flex flex-row items-center justify-center mr-4">
                <img src={iconMain} alt="icon" className="h-[600px] w-[860px] "/>
            </div>
             
        </div>
    );
}

export default Landing;

