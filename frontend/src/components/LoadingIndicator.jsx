const LoadingIndicator = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
        </div>
    );
};

export default LoadingIndicator;