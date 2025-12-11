import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col">
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="p-6 md:p-8 lg:p-10 w-full overflow-auto">
          {/* 🔥 IMPORTANT: This renders nested pages */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
