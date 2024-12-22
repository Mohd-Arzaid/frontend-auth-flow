import { sendOtp } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { setSignupData } from "@/redux/authSlice";
import { Eye, EyeOff, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
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

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords Do Not Match",
        description: "Please make sure both Passwords are the Same.",
      });
      return;
    }

    // console.log(formData);

    const signupData = {
      ...formData,
    };

    //set signup data to state
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate)).finally(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-1/3 bg-[#f1f5f9] rounded-xl p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-[#1e3a8a]">
          Create Account
        </h1>

        <form onSubmit={handleOnSubmit} className="flex flex-col mt-3 gap-4">
          <div>
            <div className="relative flex items-center">
              <UserRound className="absolute left-0 h-5 w-5 text-gray-500" />
              <Input
                disabled={loading}
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Your First Name"
                className="bg-transparent border-none focus:outline-none  placeholder:text-gray-500 text-lg placeholder:text-lg pl-7"
              />
            </div>
            <Separator className="border-t-2 border-[#1e3a8a] w-full" />
          </div>

          <div>
            <div className="relative flex items-center">
              <UserRound className="absolute left-0 h-5 w-5 text-gray-500" />
              <Input
                disabled={loading}
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Your Last Name"
                className="bg-transparent border-none focus:outline-none  placeholder:text-gray-500 text-lg placeholder:text-lg pl-7"
              />
            </div>
            <Separator className="border-t-2 border-[#1e3a8a] w-full" />
          </div>

          <div>
            <div className="relative flex items-center">
              <Mail className="absolute left-0 h-5 w-5 text-gray-500" />
              <Input
                disabled={loading}
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Your Email Address"
                className="bg-transparent border-none focus:outline-none  placeholder:text-gray-500 text-lg placeholder:text-lg pl-7"
              />
            </div>
            <Separator className="border-t-2 border-[#1e3a8a] w-full" />
          </div>

          <div>
            <div className="relative flex items-center">
              <Input
                disabled={loading}
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Create Password"
                className="bg-transparent border-none focus:outline-none  placeholder:text-gray-500 text-lg placeholder:text-lg pl-0"
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
                disabled={loading}
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="bg-transparent border-none focus:outline-none  placeholder:text-gray-500 text-lg placeholder:text-lg pl-0"
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
            className="w-full mt-2 rounded-lg bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 border-2 border-[#1e3a8a] text-white h-12 text-lg font-semibold "
          >
            {loading ? (
              <>
                <ClipLoader className="invert brightness-100" size={18} />Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>

          <p className="text-center text-lg text-gray-800 ">
            Already have an account?{" "}
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

export default Signup;
