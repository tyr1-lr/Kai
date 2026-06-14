import iconMain from "../assets/icon.png";
import logo from "../assets/logo.png";
import { UsersRound, Heart, Blocks, Eye, Rocket } from "lucide-react";

function About() {
    return (
        <div className="bg-[#050314] h-full px-10">
            <div className=" h-[310px] text-white px-2 flex flex-row items-center">
                <div className="h-[300px] w-[700px] flex flex-col justify-center px-4 ml-10">
                    <h1 className="flex font-bold flex-row items-center text-6xl">
                        About Kai 
                        <img src={logo} alt="Logo" className="w-16 h-16" />
                    </h1>
                    <p className="text-xl">
                        Kai was created to bring tasks, notes, goals, and AI assistance into a single workspace.
                    </p>
                    <div className="grid grid-cols-2 mt-4 gap-4 ">
                        <div className="border h-24 px-4 flex flex-row items-center bg-[#08081C] border-white/40 rounded-lg gap-4">
                            <UsersRound className="h-16 w-16 text-purple-600 "/>
                            <div className="flex flex-col">
                                <h3>
                                    Built for
                                </h3>
                                <span>
                                    students & developers
                                </span>
                            </div>
                            
                        </div>
                        <div className="border h-24 px-4 flex flex-row items-center bg-[#08081C] border-white/40 rounded-lg gap-4">
                            <Heart className="h-16 w-16 text-purple-600 "/>
                            <div className="flex flex-col">
                                <h3>
                                    Made with
                                </h3>
                                <span>
                                    passion & purpose
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" text-white flex flex-row items-center justify-center">
                    <img src={iconMain} alt="icon" className="h-[300px] w-[600px] "/>
                </div>
            </div>
            <div className="text-white h-[280px] px-20 gap-4 grid grid-cols-3">
                <div className="flex flex-col border bg-[#08081C] rounded-xl border-white/40 px-4 items-center justify-center">
                    <div className="text-white h-20 mt-2 flex flex-row items-center justify-center">
                        <Blocks className="h-18 w-18 text-purple-600"/>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-4xl font-bold">Our Mission</h1>
                        <p className="text-2xl mt-2">
                            Help people think clearly, stay organized, and learn faster using AI.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col border bg-[#08081C] rounded-xl border-white/40 px-4 items-center justify-center">
                    <div className="text-white h-20 mt-2 flex flex-row items-center justify-center">
                        <Eye className="h-18 w-18 text-purple-600"/>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-4xl font-bold">Our Vision</h1>
                        <p className="text-2xl mt-2">
                            A future where productivity tools work together, not compete for attention.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col border bg-[#08081C] rounded-xl border-white/40 px-4 items-center justify-center">
                    <div className="text-white h-20 mt-2 flex flex-row items-center justify-center">
                        <Rocket className="h-18 w-18 text-purple-600"/>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-4xl font-bold">Our Purpose</h1>
                        <p className="text-2xl mt-2">
                            To build a workspace that empowers everyone to achieve more.
                        </p>
                    </div>
                </div>
            </div>
             
        </div>
    );
}

export default About;

