import {
  Edit2,
  Mail,
  UserRoundCog,
  User,
  AtSign,
  Phone,
  Calendar,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="bg-black min-h-screen py-5">
      <div className="max-w-6xl mx-auto text-white">
        <div className="flex items-center mt-6 justify-between p-6 rounded-md border-2 border-white/10">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="w-24 h-24 rounded-full border-2 border-emerald-400/50 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-400 p-1.5 rounded-full transition-transform duration-300 group-hover:scale-110">
                <UserRoundCog className="w-4 h-4 text-black" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-emerald-300">
                {user?.firstName + " " + user?.lastName}
              </h1>
              <div className="flex items-center gap-2 text-emerald-100/70">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
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

        {/* About */}
        <div className="mt-6 p-6 rounded-md border-2 border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-emerald-300">About</h2>
            <Link
              to="/dashboard/Settings"
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-600/50"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
          <p className="text-emerald-100/70 leading-relaxed">
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>

        {/* Personal Details */}
        <div className="mt-6 p-6 rounded-md border-2 border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-emerald-300">
              Personal Details
            </h2>
            <Link
              to="/dashboard/Settings"
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-600/50"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600/10">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-300" />
                <span className="text-lg text-emerald-100/70">First Name</span>
              </div>
              <span className="text-lg text-emerald-300">
                {user?.firstName}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600/10">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-300" />
                <span className="text-lg text-emerald-100/70">Last Name</span>
              </div>
              <span className="text-lg text-emerald-300">{user?.lastName}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600/10">
              <div className="flex items-center gap-2">
                <AtSign className="w-5 h-5 text-emerald-300" />
                <span className="text-lg text-emerald-100/70">Email</span>
              </div>
              <span className="text-lg text-emerald-300">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600/10">
              <div className="flex items-center gap-2">
                <UserRound className="w-5 h-5 text-emerald-300" />
                <span className="text-lg text-emerald-100/70">Gender</span>
              </div>
              <span className="text-lg text-emerald-300">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600/10">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-300" />
                <span className="text-lg text-emerald-100/70">
                  Phone Number
                </span>
              </div>
              <span className="text-lg text-emerald-300">
                {user?.additionalDetails?.phoneNumber ?? "Add Contact Number"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-600/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-300" />
                <span className="text-lg text-emerald-100/70">
                  Date of Birth
                </span>
              </div>
              <span className="text-lg text-emerald-300">
                {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
