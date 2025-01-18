import { LogOut, Shield } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-[1350px] m-auto">
      <div className="sticky top-0 backdrop-blur-lg border-b-2 border-white/10 justify-between top-0 flex items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 px-2 py-5  cursor-pointer"
        >
          <Shield className="h-8 w-8 text-emerald-400" />
          <h1 className="text-emerald-300 text-2xl uppercase tracking-wide font-bold">
            AuthFlow
          </h1>
        </Link>

        <div className="flex items-center  justify-center gap-12">
          <Link
            to="/"
            className="text-emerald-300 hover:text-emerald-400 text-lg font-medium  transition-colors"
          >
            Home
          </Link>

          <Link
            to="/dashboard/my-profile"
            className="text-emerald-300 hover:text-emerald-400 text-lg font-medium  transition-colors"
          >
            Dashboard
          </Link>

          <button
            // onClick={handleLogout}
            className="flex items-center space-x-2 bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-600/30 transition-colors border border-emerald-600/50"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
