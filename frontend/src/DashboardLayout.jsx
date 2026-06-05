
import Sidebar from "./Sidebar";

function DashboardLayout ({ children }){
    return(
        <div className="h-screen flex">
            <aside>
                <Sidebar />
            </aside>
            <main className="flex-1 w-full bg-[#0D1020]">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;