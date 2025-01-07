import { getPasswordResetToken } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({
                variant: "destructive",
                title: "Email Address is Invalid",
                description: "Please enter a valid Email Address.",
            });
            return;
        }
        dispatch(getPasswordResetToken(email, setEmailSent));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-[30%] bg-[#f1f5f9] rounded-xl p-6 shadow-sm">
                <div className="flex flex-col justify-center items-center gap-1">
                    <h1 className="text-center text-2xl md:text-3xl font-bold text-[#1e3a8a]">
                        Reset Your Password
                    </h1>
                    <p className="text-center text-sm md:text-base text-gray-600">
                        {!emailSent
                            ? "We'll email you instructions to reset your password."
                            : `We have sent the reset email to ${email}`}
                    </p>
                </div>

                <form onSubmit={handleOnSubmit} className="flex flex-col mt-3 gap-5">
                    {!emailSent && (
                        <div>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-0 h-5 w-5 text-gray-500" />
                                <Input
                                    disabled={loading}
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"
                                    className="bg-transparent border-none focus:outline-none placeholder:text-gray-500 text-lg placeholder:text-lg pl-7"
                                />
                            </div>
                            <Separator className="border-t-2 border-[#1e3a8a] w-full" />
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 rounded-lg bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 border-2 border-[#1e3a8a] text-white h-12 text-lg font-semibold "
                    >
                        {loading ? (
                            <>
                                <ClipLoader className="invert brightness-100" size={18} />
                                Loading...
                            </>
                        ) : !emailSent ? (
                            "Submit"
                        ) : (
                            "Resend Email"
                        )}
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

export default ForgotPassword;
