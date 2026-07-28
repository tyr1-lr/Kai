function LoadingIndicator() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D0A1F]">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-indigo-500/20"></div>

          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-indigo-500 border-r-violet-500"></div>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-white">
          Loading Kai...
        </h2>

        <p className="mt-2 text-sm text-gray-400">Preparing your workspace</p>
      </div>
    </div>
  );
}

export default LoadingIndicator;
