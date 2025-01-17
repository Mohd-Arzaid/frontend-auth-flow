import { KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const UpdateProfilePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="mt-6 p-6 rounded-md border-2 border-white/10">
      <h2 className="text-xl font-semibold text-emerald-300 mb-6">
        Update Password
      </h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            <KeyRound className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              type={showCurrentPassword ? "text" : "password"}
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
          <button className="px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-600/50">
            Update
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors border border-red-600/50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePassword;