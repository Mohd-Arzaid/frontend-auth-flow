import { setLoading } from "@/redux/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "@/components/ui/use-toast";

const { SENDOTP_API } = endpoints;

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
      const errorMessage = error.response?.data?.message || "Something went wrong";
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
