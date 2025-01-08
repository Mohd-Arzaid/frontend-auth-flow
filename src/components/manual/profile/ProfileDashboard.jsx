import { Edit2, Mail, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileDashboard = () => {
  const user = {
    firstName: "Mohd",
    lastName: "Arzaid",
    email: "arzaid010103@gmail.com",
    image: "https://api.dicebear.com/5.x/initials/svg?seed=Abhay Raaj",
    additionalDetails: {
      about:
        "Passionate developer with a keen interest in building beautiful user interfaces and robust backend systems.",
      gender: "Male",
      dateOfBirth: "15 Aug 1999",
      contactNumber: "+91 9876543210",
      phoneNumber: "+91 9876543210",
    },
  };
  return (
    <div className="bg-black min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto text-white">
        <h1 className="text-3xl font-medium text-white">My Profile</h1>

        <div className="flex  items-center mt-8 justify-between p-6 rounded-md border-2 border-white/10">
          <div className="flex  items-center gap-6">
            <div className="relative group">
              <img
                src={user.image}
                alt={`profile-${user.firstName}`}
                className="w-24 h-24 rounded-full border-2 border-emerald-400/50 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-400 p-1.5 rounded-full transition-transform duration-300 group-hover:scale-110">
                <UserRoundCog className="w-4 h-4 text-black" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-emerald-300">
                {user.firstName + " " + user.lastName}
              </h1>
              <div className="flex items-center gap-2 text-emerald-100/70">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <Link
            to="/dashboard/Settings"
            className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-600/50"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
