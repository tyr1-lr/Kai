import Sidebar from "../components/Sidebar.jsx";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-[#0D1020] overflow-y-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;
