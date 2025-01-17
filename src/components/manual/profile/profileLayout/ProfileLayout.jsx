import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import { useState } from "react";
import { ProfileSidebar } from "../profileSidebar/ProfileSidebar";


export const ProfileLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="flex h-screen overflow-hidden">
    {/* Mobile Sidebar Overlay */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-gray-800/50 z-20 lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 z-30 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ProfileSidebar onClose={() => setIsSidebarOpen(false)} />
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm lg:hidden">
        <div className="px-4 py-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-screen-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
  )
}