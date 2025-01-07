import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/apiServices/apiHandlers/authAPI";

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const resetPasswordToken = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, resetPasswordToken, navigate));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-[30%] bg-[#f1f5f9] rounded-xl p-6 shadow-sm">
                <h1 className="text-center text-3xl font-bold text-[#1e3a8a]">
                    Choose your password
                </h1>

                <form onSubmit={handleOnSubmit} className="flex flex-col mt-3 gap-4">
                    <div>
                        <div className="relative flex items-center">
                            <Input
                                required
                                disabled={loading}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter New Password"
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

                    <div>
                        <div className="relative flex items-center">
                            <Input
                                required
                                disabled={loading}
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm New Password"
                                className="bg-transparent border-none focus:outline-none placeholder:text-gray-500 text-lg placeholder:text-lg pl-0"
                            />
                            <div
                                className="absolute right-0 h-6 w-6 text-gray-500 cursor-pointer"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <Eye /> : <EyeOff />}
                            </div>
                        </div>
                        <Separator className="border-t-2 border-[#1e3a8a] w-full" />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 border-2 mt-3 border-[#1e3a8a] text-white h-12 text-lg font-semibold"
                    >
                        {loading ? "Loading..." : " Reset Password"}
                    </Button>

                    <p className="text-center text-lg text-gray-800 ">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="text-[#1e3a8a] font-semibold transition-all duration-300"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
