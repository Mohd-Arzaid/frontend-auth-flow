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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { logout } from "@/apiServices/apiHandlers/authAPI";
import { useDispatch } from "react-redux";

export const ProfileSidebar = () => {
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    return matchingLink ? matchingLink.id : 1;
  });

  useEffect(() => {
    const currentLink = adminSidebarLinks.find(
      (link) => link.path === location.pathname
    );
    if (currentLink) {
      setActiveLink(currentLink.id);
    }
  }, [location.pathname]);

  return (
    <div className="fixed left-0 top-0 z-10 h-full w-72 bg-black text-white border-r-2 border-white/10 flex flex-col">
      <div className="flex items-center gap-2 justify-center py-6 border-b-2 border-white/10">
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
                  className={`group flex items-center justify-between rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600/20 text-emerald-300"
                      : "text-emerald-100/70 hover:bg-emerald-600/10 hover:text-emerald-300"
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
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogTrigger asChild>
            <Button className="w-full flex items-center justify-center gap-2 text-lg font-medium bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-600/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <LogOut className="w-5 h-5" />
              Log Out
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-950 border-red-500/20">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-red-400">
                Are you sure?
              </DialogTitle>
              <DialogDescription className="text-base text-white/60">
                You will be logged out of your account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-1">
              <Button
                variant="secondary"
                onClick={() => setShowLogoutDialog(false)}
                className=" text-base bg-gray-800 hover:bg-gray-700 text-white hover:text-white border-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  dispatch(logout(navigate));
                }}
                variant="destructive"
                className="text-base bg-red-600/50 text-white hover:text-white hover:bg-red-600/60 border border-red-600/50"
              >
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
