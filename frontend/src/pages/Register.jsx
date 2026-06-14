import { NavLink } from "react-router-dom";
import bgAuth from "../assets/bgauth.png";
import logo from "../assets/logo.png";

function Register() {
    return (
        <div className="flex flex-row bg-[#050314] h-full gap-4 items-center justify-center">
            <div 
            style={{ backgroundImage: `url(${bgAuth})` }}
            className="border border-white/30 h-[580px] bg-cover w-[800px] rounded-lg text-white flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                    <img src={logo} alt="Logo" className="w-14 h-14" />
                    <h1 className="text-3xl text-purple-200 font-bold">
                        Kai
                    </h1>
                </div>
                <div className=" text-center mt-3">
                    <h1 className="text-xl font-bold">
                        Create Account!
                    </h1>
                    <p className="mt-1 text-white/60">
                        Join Kai and start your journey.
                    </p>
                </div>
                <div>
                    <div className=" w-[500px]">
                        <h2 className="text-white mt-4">
                            Usename
                        </h2>
                        <input
                            className="w-full h-10 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            placeholder="yourname"/>
                    </div>
                    <div className=" w-[500px]">
                        <h2 className="text-white mt-4">
                            Email
                        </h2>
                        <input
                            className="w-full h-10 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            placeholder="your@email.com"/>
                    </div>
                    <div className=" w-[500px]">
                        <h2 className="text-white mt-2">
                            Password
                        </h2>
                        
                        <input
                            className="w-full h-10 mb-1 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            placeholder="••••••••"/>
                    </div>
                    <div className=" w-[500px]">
                        <h2 className="text-white mt-2">
                            Confirm Password
                        </h2>
                        
                        <input
                            className="w-full h-10 mb-1 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            placeholder="••••••••"/>
                    </div>
                    <div className="mt-3 flex flex-row items-center justify-center">
                        <button
                        className="h-10 w-full justify-center flex items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                            Register
                        </button>
                    </div>
                    <div className="flex flex-row gap-2 flex justify-center mt-1">
                        <span className="text-white/70">
                            Already have an account?
                        </span>
                        <NavLink to="/login" className="text-purple-700 hover:text-purple-900">Login</NavLink>
                    </div>
                </div>
            </div>
             
        </div>
    );
}

export default Register;

