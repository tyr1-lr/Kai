import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0A1F] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-8xl font-bold text-indigo-500">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>

        <p className="mt-3 text-gray-400">
          This page doesn't exist, or your session may have expired. Please log
          in again to continue.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
          >
            Go to Login
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-white/20 px-6 py-3 text-white transition hover:bg-white/10"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
