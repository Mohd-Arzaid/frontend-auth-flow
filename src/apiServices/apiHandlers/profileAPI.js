import { setLoading, setUser } from "@/redux/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { toast } from "@/components/ui/use-toast";
import { logout } from "./authAPI";

const { 
  UPDATE_DISPLAY_PICTURE_API, 
  UPDATE_PROFILE_API, 
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API
} = profileEndpoints;

export const updateDisplayPicture = (token, formData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast({
        variant: "destructive",
        title: "Profile Picture Updated",
        description: "Your display picture has been updated successfully.",
      });

      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed to Update Profile Picture",
        description: errorMessage,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateProfile = (token, formData, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      // console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      );
      toast({
        variant: "destructive",
        title: "Profile Updated Successfully",
        description: "Your profile has been updated successfully.",
      });
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast({
        variant: "destructive",
        title: "Failed to Update Profile",
        description: "Could Not Update Profile",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updatePassword = (token, formData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        CHANGE_PASSWORD_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast({ 
        variant: "destructive",
        title: "Password Changed Successfully",
        description: "Your password has been changed successfully.",
      });

    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error);
      toast({
        variant: "destructive",
        title: "Failed to Change Password",
        description: error.response.data.message || "Something went wrong",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Will complete after logout
export const deleteProfile = (token, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast({
        variant: "destructive",
        title: "Profile Deleted",
        description: "Your account has been deleted successfully.",
      });
      dispatch(logout(navigate,true));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast({
        variant: "destructive",
        title: "Failed to Change Password",
        description: error.response.data.message || "Could Not Delete Profile",
      });

    } finally {
      dispatch(setLoading(false));
    }
  };
};
