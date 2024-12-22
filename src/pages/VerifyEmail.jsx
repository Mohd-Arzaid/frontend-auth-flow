import { sendOtp, signUp } from "@/apiServices/apiHandlers/authAPI";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const VerifyEmail = () => {
  const { signupData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    ).finally(() => {
      setLoading(false);
    });
  };

  const handleResendOtp = () => {
    setResendLoading(true);
    dispatch(sendOtp(signupData.email, navigate)).finally(() => {
      setResendLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-[90%] md:max-w-[50%] lg:max-w-[50%] bg-[#f1f5f9] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-[#1e3a8a]">
            Verify Your Email
          </h1>
          <p className="text-center text-sm md:text-base text-gray-600">
            Please enter the 6-digit code sent to your email
          </p>
        </div>

        <form onSubmit={handleOnSubmit} className="flex flex-col gap-5 mt-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[40px] md:w-[48px] lg:w-[60px] border border-gray-600 bg-white rounded-[0.5rem] text-[#1e3a8a] text-bold text-2xl aspect-square text-center focus:border-0 focus:outline-2 focus:outline-[#1e3a8a]"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 8px",
            }}
          />

          <Separator className="border-t-2 md:my-2 border-[#1e3a8a]/40 w-full" />

          <Button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 border-2 border-[#1e3a8a] text-white h-10 md:h-12 text-lg font-semibold "
          >
            {loading ? (
              <>
                <ClipLoader className="invert brightness-100" size={18} />
                Loading...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </form>

        <div className="mt-5 flex items-center justify-between">
          <Link
            to="/signup"
            className="flex text-[#1e3a8a] gap-1 font-semibold items-center cursor-pointer justify-center"
          >
            <ArrowLeft className="w-4 h-4 mt-0.5 " />
            <p>Back to Signup</p>
          </Link>

          <button
            disabled={resendLoading}
            onClick={handleResendOtp}
            className="flex text-[#1e3a8a] gap-1 font-semibold items-center cursor-pointer justify-center"
          >
            {resendLoading ? (
              <ClipLoader size={15} className="mx-1" color="#1e3a8a" />
            ) : (
              <Timer className="w-4 h-4" />
            )}
            <p>{resendLoading ? "Sending..." : "Resend OTP"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
