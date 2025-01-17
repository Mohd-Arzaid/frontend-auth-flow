import { Upload, UserRoundCog } from "lucide-react"
import { useSelector } from "react-redux";

const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile);

  return (
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
          Change Profile Picture
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <button className="px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-600/50">
            Select Image
          </button>

          <button className="px-4 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors border border-red-600/50 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>

  )
}

export default ChangeProfilePicture
