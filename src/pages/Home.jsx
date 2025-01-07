import Navbar from "@/components/manual/Navbar";
import { Heart, Shield, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center flex-col min-h-[75vh] ">
        <div
          className={`flex flex-col items-center justify-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <Shield
              size={80}
              className="mx-auto mb-8 text-emerald-400 animate-pulse"
            />
            <Sparkles
              size={24}
              className="absolute top-0 right-0 text-emerald-300 animate-bounce"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-center text-emerald-300">
            Welcome to Arzaid's AuthFlow
          </h1>

          <p className="text-xl text-emerald-100 text-center mb-8 max-w-2xl">
            A complete authentication solution for efficient user management
          </p>

          <Link 
            to="/dashboard/my-profile"
            className="group relative px-8 py-3 text-lg font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(16,185,129,0.25)] transform hover:scale-105 active:scale-95"
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-emerald-600 group-hover:scale-110 transition-transform duration-300 rounded-xl" />

            {/* Button Content */}
            <div className="relative flex items-center gap-3">
              <span>Go To Dashboard</span>
              {/* Sparkles Icon */}
              <Sparkles size={20} className="group-hover:animate-none" />
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1300px] mx-auto absolute bottom-4 left-4 right-4 flex justify-between text-sm md:text-lg text-emerald-300">
        <span>© 2025 AuthFlow </span>

        <h1 className="flex gap-2 items-center">
          Built with <Heart className=" duration-200 hover:fill-red-500" /> by{" "}
          <a
            href="https://github.com/Mohd-Arzaid"
            target="_blank"
            className=" underline text-blue-500 font-bold"
          >
            Mohd Arzaid{" "}
          </a>
        </h1>

      </div>
    </div>
  );
};

export default Home;
