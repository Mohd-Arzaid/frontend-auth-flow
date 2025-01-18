import { setLoading, setUser } from "@/redux/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { toast } from "@/components/ui/use-toast";

const { UPDATE_DISPLAY_PICTURE_API } = profileEndpoints;

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
