import { UserRoundCog, User, Phone, Calendar, UserRound } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { updateProfile } from "@/apiServices/apiHandlers/profileAPI";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.additionalDetails?.gender || "",
    contactNumber: user?.additionalDetails?.contactNumber || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    about: user?.additionalDetails?.about || "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast({
        variant: "destructive",
        title: "First Name is required",
        description: "Please enter your first name.",
      });
      return false;
    }
    if (!formData.lastName.trim()) {
      toast({
        variant: "destructive",
        title: "Last Name is required",
        description: "Please enter your last name.",
      });
      return false;
    }
    if (!formData.dateOfBirth) {
      toast({
        variant: "destructive",
        title: "Date of Birth is required",
        description: "Please enter your date of birth.",
      });
      return false;
    }
    if (!formData.gender.trim()) {
      toast({
        variant: "destructive",
        title: "Gender is required",
        description: "Please enter your gender (Male, Female, Other).",
      });
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
      });
      return false;
    }
    if (!formData.about.trim()) {
      toast({
        variant: "destructive",
        title: "About is required",
        description: "Please enter your bio details.",
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    dispatch(updateProfile(token, formData, navigate)).finally(() => {
      setLoading(false);
    });
  };
  return (
    <div className="mt-6 p-6 rounded-md border-2 border-white/10">
      <h2 className="text-xl font-semibold text-emerald-300 mb-6">
        Profile Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              disabled={loading}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Enter Your First Name"
            />
          </div>
          <div className="flex flex-col relative">
            <UserRound className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              disabled={loading}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Enter Your Last Name"
            />
          </div>
          <div className="flex flex-col relative">
            <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              disabled={loading}
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Date of Birth"
            />
          </div>
          <div className="flex flex-col relative">
            <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              disabled={loading}
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Enter Your Gender"
            />
          </div>
          <div className="flex flex-col relative">
            <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              disabled={loading}
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="flex flex-col relative">
            <UserRoundCog className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300" />
            <input
              disabled={loading}
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="pl-10 pr-3 p-3 rounded-md bg-emerald-600/10 text-emerald-300 w-full text-lg placeholder:text-emerald-300"
              placeholder="Enter Your Bio Details"
            />
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
export default EditProfile;
