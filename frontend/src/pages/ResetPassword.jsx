import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api";
import { Eye, EyeOff } from "lucide-react";
import bgAuth from "../assets/bgauth.png";
import logo from "../assets/logo.png";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [redirecting, setRedirecting] = useState(false);
  const codeRef = useRef(null);

  const [countdown, setCountdown] = useState(() => {
    const expires = Number(localStorage.getItem("resetCountdown"));

    if (!expires) return 0;

    return Math.max(0, Math.ceil((expires - Date.now()) / 1000));
  });

  useEffect(() => {
    codeRef.current?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      localStorage.removeItem("resetCountdown");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (email) return;

    setError("Please request a verification code first.");
    setRedirecting(true);

    const timer = setTimeout(() => {
      navigate("/forgot-password");
    }, 2500);

    return () => clearTimeout(timer);
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    if (!code || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      await api.post("api/verify-reset-code/", {
        email,
        code,
      });

      await api.post("api/reset-password/", {
        email,
        code,
        new_password: password,
      });

      setSuccess("Password reset successfully.");

      setTimeout(() => {
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetCountdown");

        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to reset password.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Missing email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("api/forgot-password/", {
        email,
      });

      setSuccess("A new verification code has been sent.");

      const resendUntil = Date.now() + 60000;

      localStorage.setItem("resetCountdown", resendUntil);

      setCountdown(60);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to resend verification code.",
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
              Reset Password
            </h1>

            <p className="mt-2 max-w-md text-white/70">
              Enter the verification code we sent to your email, then choose a
              new password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mt-8 space-y-5"
          >
            <div>
              <label className="text-white">Verification Code</label>

              <input
                type="text"
                ref={codeRef}
                inputMode="numeric"
                maxLength={6}
                disabled={loading || redirecting}
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="123456"
                className="mt-2 w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
              />

              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading || countdown > 0 || redirecting}
                className="mt-2 text-sm text-violet-400 hover:text-violet-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {countdown > 0
                  ? `Resend Code (${countdown}s)`
                  : loading
                    ? "Sending verification code..."
                    : "Resend Code"}
              </button>
            </div>

            <div>
              <label className="text-white">New Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  disabled={loading || redirecting}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 pr-12 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  disabled={loading || redirecting}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading || redirecting}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/20 bg-[#0D1020] p-3 pr-12 text-white outline-none focus:border-violet-500 disabled:bg-[#111827] disabled:cursor-not-allowed"
                />

                <button
                  type="button"
                  disabled={loading || redirecting}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
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
              disabled={loading || redirecting}
              className="h-12 w-full rounded-lg bg-violet-700 font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Resetting...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="text-center text-white/70">
              Remember your password?{" "}
              <NavLink
                to={loading || redirecting ? "#" : "/login"}
                onClick={(e) => {
                  if (loading || redirecting) {
                    e.preventDefault();
                    return;
                  }

                  localStorage.removeItem("resetEmail");
                  localStorage.removeItem("resetCountdown");
                }}
                className={`${
                  loading || redirecting
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

export default ResetPassword;
