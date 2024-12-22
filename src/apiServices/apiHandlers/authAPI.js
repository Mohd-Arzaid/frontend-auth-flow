import { setLoading } from "@/redux/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "@/components/ui/use-toast";

const { SENDOTP_API, SIGNUP_API } = endpoints;

export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      // console.log("SEND OTP API RESPONSE............", response);
      // console.log(response.data.success);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast({
        variant: "destructive",
        title: "OTP Sent Successfully",
        description: "Please Verify your Email to Continue.",
      });
      navigate("/verify-email");
    } catch (error) {
      // console.log("SEND OTP API ERROR............", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed to Send OTP",
        description: errorMessage,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const signUp = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      // console.log("SIGNUP API RESPONSE............", response);
      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        variant: "destructive",
        title: "Account Created Successfully",
        description: "Please Login to Continue.",
      });
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed to Create Account",
        description: errorMessage,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};
