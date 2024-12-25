import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { login } from '@/apiServices/apiHandlers/authAPI';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Email Address is Invalid",
        description: "Please enter a valid Email Address.",
      });
      setLoading(false);
      return;
    }

    dispatch(login(email, password, navigate)).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[30%] bg-[#f1f5f9] rounded-xl p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-[#1e3a8a]">
          Welcome Back
        </h1>

        <form onSubmit={handleOnSubmit} className="flex flex-col mt-3 gap-4">
          <div>
            <div className="relative flex items-center">
              <Mail className="absolute left-0 h-5 w-5 text-gray-500" />
              <Input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter Your Email Address"
                className="bg-transparent border-none focus:outline-none placeholder:text-gray-500 text-lg placeholder:text-lg pl-7"
              />
            </div>
            <Separator className="border-t-2 border-[#1e3a8a] w-full" />
          </div>

          <div>
            <div className="relative flex items-center">
              <Input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Your Password"
                className="bg-transparent border-none focus:outline-none placeholder:text-gray-500 text-lg placeholder:text-lg pl-0"
              />
              <div
                className="absolute right-0 h-6 w-6 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <Separator className="border-t-2 border-[#1e3a8a] w-full" />
          </div>

          <Link
            to="/forgot-password"
            className="text-[#1e3a8a] text-right text-base font-semibold"
          >
            Forgot Password?
          </Link>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 border-2 border-[#1e3a8a] text-white h-12 text-lg font-semibold"
          >
            {loading ? "Loading..." : "Submit"}
          </Button>

          <p className="text-center text-lg text-gray-800">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#1e3a8a] font-semibold transition-all duration-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;