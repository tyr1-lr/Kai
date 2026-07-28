import { NavLink, useNavigate } from "react-router-dom";
import bgAuth from "../assets/bgauth.png";
import logo from "../assets/logo.png";
import api from "../api";
import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";

function Register({ route }) {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post(route, {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Unable to create account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-full bg-[#010110] flex items-center justify-center px-6 py-10"
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

          <div className="mt-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-white/70">
              Join Kai and start your productivity journey.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mt-8 space-y-5"
          >
            <div>
              <label className="text-white">Username</label>

              <input
                type="text"
                disabled={loading}
                ref={usernameRef}
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yourname"
                className="mt-2 w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-white">Email</label>

              <input
                type="email"
                disabled={loading}
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2 w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-white">Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  disabled={loading}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 pr-12 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-white/60">
                Password must be at least 8 characters long.
              </p>
            </div>

            <div>
              <label className="text-white">Confirm Password</label>

              <div className="relative mt-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  disabled={loading}
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 pr-12 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-violet-700 font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center text-white/70">
              Already have an account?{" "}
              <NavLink
                to={loading ? "#" : "/login"}
                onClick={(e) => loading && e.preventDefault()}
                className={`${
                  loading
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-violet-400 hover:text-violet-300"
                }`}
              >
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
