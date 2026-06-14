import Navbar from "../components/Navbar";

function LandingLayout({ children }) {
    return(
        <div className="h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 relative w-full">
                {children}
            </main>
        </div>
    );
}

export default LandingLayout;