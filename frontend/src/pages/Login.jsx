import { NavLink, useNavigate } from "react-router-dom";
import bgAuth from "../assets/bgauth.png";
import logo from "../assets/logo.png";
import { useState } from "react";
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login({ route }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await api.post(route, {email, password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.detail || error.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-row bg-[#050314] h-full gap-4 items-center justify-center">
            <div 
            style={{ backgroundImage: `url(${bgAuth})` }}
            className="border border-white/30 h-[550px] bg-cover w-[800px] rounded-lg text-white flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    <h1 className="text-4xl text-purple-200 font-bold">
                        Kai
                    </h1>
                </div>
                <div className=" text-center mt-3">
                    <h1 className="text-2xl font-bold">
                        Welcome Back!
                    </h1>
                    <p className="mt-1 text-white/60">
                        Login to continue to your workspace.
                    </p>
                </div>
                <form onSubmit={handleSubmit} >
                    <div className=" w-[500px]">
                        <h2 className="text-white mt-4">
                            Email
                        </h2>
                        <input
                            type="text"
                            className="w-full h-10 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"/>
                    </div>
                    <div className=" w-[500px]">
                        <div className="flex flex-row items-center ">
                            <h2 className="text-white mt-2">
                                Password
                            </h2>
                            <NavLink to="/forgot-password" className="text-purple-700 mt-4 ml-auto hover:text-purple-900">
                                <span >
                                    Forget password?
                                </span>
                            </NavLink>
                        </div>
                        
                        <input
                            type="password"
                            value={password}
                            className="w-full h-10 mb-1 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"/>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </div>
                    <div className="mt-3 flex flex-row items-center justify-center">
                        <button
                        type="submit"
                        disabled={loading}
                        className="h-12 w-full justify-center flex items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                            {loading ? "Loggin in..." : "Login"}
                        </button>
                    </div>
                    <div className="flex flex-row gap-2 flex justify-center mt-1">
                        <span className="text-white/70">
                            Don't have an account?
                        </span>
                        <NavLink to="/register" className="text-purple-700 hover:text-purple-900">Register</NavLink>
                    </div>
                </form>
            </div>
             
        </div>
    );
}

export default Login;

