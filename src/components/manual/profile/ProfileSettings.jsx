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
import { useState } from "react";

const ProfileSettings = () => {
  const { user } = useSelector((state) => state.profile);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.additionalDetails?.gender || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user?.additionalDetails?.phoneNumber || ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.additionalDetails?.dateOfBirth || ""
  );
  const [about, setAbout] = useState(user?.additionalDetails?.about || "");

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
        </div>

        {/* Settings Form */}
        <div className="mt-6 p-6 rounded-md border-2 border-white/10">
          <h2 className="text-xl font-semibold text-emerald-300 mb-6">
            Profile Information
          </h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
                  placeholder="Enter Your First Name"
                />
              </div>
              <div className="flex flex-col relative">
                <UserRound className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
                  placeholder="Enter Your Last Name"
                />
              </div>

              <div className="flex flex-col relative">
                <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
                  placeholder="Date of Birth"
                />
              </div>

              <div className="flex flex-col relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
                  placeholder="Enter Your Gender"
                />
              </div>

              <div className="flex flex-col relative">
                <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
                  placeholder="Enter Your Phone Number"
                />
              </div>
              <div className="flex flex-col relative">
                <UserRoundCog className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
                  placeholder="Enter Your Bio Details"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="px-4 py-2  rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-600/50"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors border border-red-600/50"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
