import { updatePassword } from "@/apiServices/apiHandlers/profileAPI";
import { useToast } from "@/components/ui/use-toast";
import { KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const UpdateProfilePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validateForm = () => {
    if (!formData.oldPassword.trim()) {
      toast({
        variant: "destructive",
        title: "Current Password Required",
        description: "Please enter your current password.",
      });
      return false;
    }
    if (!formData.newPassword.trim()) {
      toast({
        variant: "destructive",
        title: "New Password Required",
        description: "Please enter your new password.",
      });
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    dispatch(updatePassword(token, formData)).finally(() => {
      setLoading(false);
    });
  };
  return (
    <div className="mt-6 p-6 rounded-md border-2 border-white/10">
      <h2 className="text-xl font-semibold text-emerald-300 mb-6">
        Update Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            <KeyRound className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              disabled={loading}
              className="pl-10 pr-12 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Enter Current Password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300"
            >
              {showCurrentPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex flex-col relative">
            <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={loading}
              className="pl-10 pr-12 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Enter New Password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300"
            >
              {showNewPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <Link
            to="/dashboard/my-profile"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors border border-red-600/50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export default UpdateProfilePassword;
