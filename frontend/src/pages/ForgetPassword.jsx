import bgAuth from "../assets/bgauth.png";
import logo from "../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("api/forgot-password/", {
        email: email.trim(),
      });

      setSuccess("Verification code sent.");

      const resendUntil = Date.now() + 60000;

      localStorage.setItem("resetEmail", email.trim());
      localStorage.setItem("resetCountdown", resendUntil);

      setTimeout(() => {
        navigate("/reset-password");
      }, 500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#010110] flex items-center justify-center px-6 py-10">
      <div
        style={{ backgroundImage: `url(${bgAuth})` }}
        className="w-full max-w-4xl rounded-2xl border border-white/20 bg-cover bg-center p-8 sm:p-10 lg:p-14 shadow-2xl"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-14 h-14 sm:w-16 sm:h-16" />

            <h1 className="text-3xl sm:text-4xl font-bold text-purple-200">
              Kai
            </h1>
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Forgot Password
            </h1>

            <p className="mt-2 max-w-md text-white/70">
              Enter your email address and we'll send you a verification code to
              reset your password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mt-8 space-y-6"
          >
            <div>
              <label className="text-white">Email</label>

              <input
                type="email"
                value={email}
                ref={emailRef}
                autoComplete="email"
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2 w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-violet-700 font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sending verification code...</span>
                </div>
              ) : (
                "Send Verification Code"
              )}
            </button>

            <div className="text-center text-white/70">
              Remember your password?{" "}
              <NavLink
                to={loading ? "#" : "/login"}
                onClick={(e) => loading && e.preventDefault()}
                className={`${
                  loading
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-violet-400 hover:text-violet-300"
                }`}
              >
                Back to Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
