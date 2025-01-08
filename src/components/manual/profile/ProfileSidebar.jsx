import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  LogOut,
  Settings,
  Sparkles,
  User2Icon,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const ProfileSidebar = () => {
  const location = useLocation();

  const adminSidebarLinks = [
    {
      id: 1,
      name: "My Profile",
      icon: <User2Icon className="w-5 h-5" />,
      path: "/dashboard/my-profile",
    },
    {
      id: 2,
      name: "Profile Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/dashboard/Settings",
    },
  ];

  const [activeLink, setActiveLink] = useState(() => {
    const matchingLink = adminSidebarLinks.find(
      (link) => link.path === location.pathname
    );
    return matchingLink ? matchingLink.id : 1; // Default to 1 (Dashboard) if no match
  });

  useEffect(() => {
    // On every URL change, update the active link based on the path
    const currentLink = adminSidebarLinks.find(
      (link) => link.path === location.pathname
    );
    if (currentLink) {
      setActiveLink(currentLink.id); // Set the active link by id
    }
  }, [location.pathname]);

  return (
    <div className="fixed left-0 top-0 z-10 h-full w-72 bg-black text-white border-r-2 border-white/10 flex flex-col ">
      <div className="flex items-center gap-2 justify-center py-6  border-b-2 border-white/10">
        <h3 className="text-2xl font-semibold">User Dashboard</h3>
        <UserRoundCog className="w-6 h-6" />
      </div>

      <nav className="flex-grow overflow-y-auto py-6">
        <ul className="flex flex-col gap-2 px-4">
          {adminSidebarLinks.map((link) => {
            const isActive = activeLink === link.id;
            return (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={`group  flex items-center justify-between rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600/20 text-emerald-300" // Active link styles
                      : "text-emerald-100/70 hover:bg-emerald-600/10 hover:text-emerald-300" // Inactive link styles
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`transition-transform duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    >
                      {link.icon}
                    </div>
                    {link.name}
                  </div>
                  <div
                    className={`transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  >
                    {isActive ? (
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-emerald-600/20 py-6 px-4">
        <Button className="w-full flex items-center justify-center gap-2 text-lg font-medium bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-600/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
};
