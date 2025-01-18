import React, { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "@/apiServices/apiHandlers/profileAPI";

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDeleteAccount = (e)=>{
    dispatch(deleteProfile(token, navigate));
  }

  return (
    <div className="mt-6 mb-6 p-6 rounded-md border-2 border-red-500/20 bg-red-950/60">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-7 h-7 text-red-400" />
            <h2 className="text-2xl font-bold text-red-400">Delete Account</h2>
          </div>
          <p className="text-white/60 max-w-2xl leading-relaxed italic">
            Would you like to delete your account?
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

  
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="mt-4 px-6 py-3 bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-600/50"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            I want to delete my account
          </Button>

        </DialogTrigger>
        <DialogContent className="bg-gray-950 border-red-500/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-400">
              Confirm Account Deletion?
            </DialogTitle>
            <DialogDescription className=" text-base text-white/60">
              This action cannot be undone and all your data will be permanently
              removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-1">
            <Button
              variant="secondary"
              className=" text-base bg-gray-800 hover:bg-gray-700 text-white hover:text-white border-gray-700"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className="text-base bg-red-600/50 text-white hover:text-white hover:bg-red-600/60 border border-red-600/50"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default DeleteAccount;