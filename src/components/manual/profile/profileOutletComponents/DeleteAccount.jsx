import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteAccount = () => {
  return (
    <div className="mt-6 mb-6 p-6 rounded-md border-2 border-red-500/20 bg-gradient-to-br from-red-950/20 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-7 h-7 text-red-400" />
            <h2 className="text-2xl font-bold text-red-400">Delete Account</h2>
          </div>
          <p className="text-white/60 max-w-2xl leading-relaxed italic">
            Would you like to delete your account ?
          </p>

          <p className="text-white/60 max-w-2xl leading-relaxed italic">
            Once you delete your account, all your data will be permanently
            removed.
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20">
          <Trash2 className="w-8 h-8 text-red-400" />
        </div>
      </div>

      <button className="mt-4 px-6 py-3 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-all duration-300 border border-red-600/50 flex items-center gap-2 ">
        <Trash2 className="w-5 h-5" />I want to delete my account
      </button>
    </div>
  );
};

export default DeleteAccount;
