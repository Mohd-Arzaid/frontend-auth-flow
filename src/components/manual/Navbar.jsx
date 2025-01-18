import { LogOut, Shield } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/apiServices/apiHandlers/authAPI";
import {  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter  } from "../ui/dialog";


const Navbar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className="max-w-[1350px] m-auto">
      <div className="sticky top-0 backdrop-blur-lg border-b-2 border-white/10 justify-between flex items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 px-2 py-5 cursor-pointer"
        >
          <Shield className="h-8 w-8 text-emerald-400" />
          <h1 className="text-emerald-300 text-2xl uppercase tracking-wide font-bold">
            AuthFlow
          </h1>
        </Link>

        <div className="flex items-center justify-center gap-12">
          <Link
            to="/"
            className="text-emerald-300 hover:text-emerald-400 text-lg font-medium transition-colors"
          >
            Home
          </Link>

          <Link
            to="/dashboard/my-profile"
            className="text-emerald-300 hover:text-emerald-400 text-lg font-medium transition-colors"
          >
            Dashboard
          </Link>

          <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <DialogTrigger asChild>
              <button className="flex items-center space-x-2 bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-600/30 transition-colors border border-emerald-600/50">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
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
                <button
                  onClick={() => setShowLogoutDialog(false)}
                  className="text-base bg-gray-800 hover:bg-gray-700 text-white hover:text-white border-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    dispatch(logout(navigate));
                  }}
                  className="text-base bg-red-600/50 text-white hover:bg-red-600/60 border border-red-600/50 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
