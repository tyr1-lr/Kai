import { NavLink, useNavigate } from "react-router-dom";
import bgAuth from "../assets/bgauth.png";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Eye, EyeOff } from "lucide-react";

function Login({ route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setError("");
    setLoading(true);

    try {
      const res = await api.post(route, {
        email: email.trim(),
        password,
      });

      if (rememberMe) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      } else {
        sessionStorage.setItem(ACCESS_TOKEN, res.data.access);
        sessionStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      }

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-full bg-[#010110] flex items-center justify-center px-2 py-4"
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 700,
      }}
    >
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

          <div className="mt-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome Back!
            </h1>

            <p className="mt-2 text-white/70">
              Login to continue to your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-lg mt-4">
            <div>
              <label className="text-white">Email</label>

              <input
                type="email"
                ref={emailRef}
                autoComplete="email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2 w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <label className="text-white">Password</label>

                <NavLink
                  to={loading ? "#" : "/forgot-password"}
                  onClick={(e) => loading && e.preventDefault()}
                  className={`text-sm ${
                    loading
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-violet-400 hover:text-violet-300"
                  }`}
                >
                  Forgot password?
                </NavLink>
              </div>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 pr-12 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                disabled={loading}
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-violet-600"
              />

              <label
                htmlFor="remember"
                className="text-sm text-white/70 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-12 w-full rounded-lg bg-violet-700 font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <div className="mt-5 text-center text-white/70">
              Don't have an account?{" "}
              <NavLink
                to={loading ? "#" : "/register"}
                onClick={(e) => loading && e.preventDefault()}
                className={`${
                  loading
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-violet-400 hover:text-violet-300"
                }`}
              >
                Register
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
