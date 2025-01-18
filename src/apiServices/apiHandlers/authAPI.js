import { setLoading, setToken } from "@/redux/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "@/components/ui/use-toast";
import { setUser } from "@/redux/profileSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

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

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      // console.log("LOGIN API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        variant: "destructive",
        title: "Login Successfully",
        description: "Welcome back! You have Logged in Successfully.",
      });
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      // console.log("LOGIN API ERROR............", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed to Login",
        description: errorMessage,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      // console.log("RESET PASSWORD TOKEN RESPONSE....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        variant: "destructive",
        title: "Reset Email Sent",
        description: "Please check your email for the reset link.",
      });

      setEmailSent(true);
    } catch (error) {
      // console.log("RESET PASSWORD TOKEN Error", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Error Sending Reset Email",
        description: errorMessage,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const resetPassword = (
  password,
  confirmPassword,
  resetPasswordToken
) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        resetPasswordToken,
      });
      //console.log("RESET PASSWORD RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        variant: "destructive",
        title: "Password Reset Successful",
        description: "Your password has been reset successfully.",
      });
    } catch (error) {
      console.log("RESET PASSWORD UPDATE", error);
      toast({
        variant: "destructive",
        title: "Error Resetting Password",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const logout = (navigate, isProfileDeleted = false) => {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (!isProfileDeleted) {
      toast({
        variant: "destructive",
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    }
    navigate("/");
  };
};
