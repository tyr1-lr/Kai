import bgAuth from "../assets/bgauth.png";
import logo from "../assets/logo.png";

function ForgetPassword() {
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
                        Reset Password
                    </h1>
                    <p className="mt-1 text-white/60">
                        Enter your email address to recieve a verification code, then set your new password.
                    </p>
                </div>
                <div>
                    <div className=" w-[500px]">
                        <h2 className="text-white mt-4">
                            Email
                        </h2>
                        <input
                            className="w-full h-10 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            placeholder="your@email.com"/>
                    </div>
                    <div className=" w-[500px]">
                        <h2 className="text-white mt-4">
                            Verification Code
                        </h2>
                        <input
                            type="text"
                            className="w-full h-10 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="123456"
                            />
                    </div>
                    <div className=" w-[500px]">
                        <div className="flex flex-row items-center ">
                            <h2 className="text-white mt-2">
                                Password
                            </h2>
                        </div>
                        
                        <input
                            className="w-full h-10 mb-1 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            placeholder="••••••••"/>
                    </div>
                    <div className=" w-[500px]">
                        <div className="flex flex-row items-center ">
                            <h2 className="text-white mt-2">
                                Confirm Password
                            </h2>
                        </div>
                        
                        <input
                            className="w-full h-10 mb-1 p-2 rounded bg-[#0D1020] border-2 border-[#40424C] text-white"
                            placeholder="••••••••"/>
                    </div>
                    <div className="flex flex-row gap-2 flex justify-center mt-1">
                        <a href="" className="text-purple-700 hover:text-purple-900">Resend Code</a>
                    </div>
                    <div className="mt-3 flex flex-row items-center justify-center">
                        <button
                        className="h-12 w-full justify-center flex items-center rounded-md text-white bg-indigo-700 gap-2 cursor-pointer p-4 hover:bg-[#1f2a3d]">
                            Reset Password
                        </button>
                    </div>
                    
                </div>
            </div>
             
        </div>
    );
}

export default ForgetPassword;

