import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdateProfilePassword from "./UpdateProfilePassword";

const ProfileSettings = () => {
  return (
    <div className="bg-black min-h-screen py-5">
      <div className="max-w-6xl mx-auto text-white">

        {/* Change Profile Picture */}
        <ChangeProfilePicture />

        {/* Profile */}
        <EditProfile />

        {/* Password */}
        <UpdateProfilePassword />

        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  );
};

export default ProfileSettings;
