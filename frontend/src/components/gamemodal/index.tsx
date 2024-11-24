import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { UploadCloud } from "lucide-react";
import { Axios } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const GameModal = () => {
  const handleGameCreation = async () => {
    
  }

  
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add game
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
          <DialogDescription>Add a new game</DialogDescription>
        </DialogHeader>

        <div className="w-full">
          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input id="name" />
          </div>

          <div className="my-2 space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea rows={5} />
          </div>
          <div className="my-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="flex items-center">
              <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <UploadCloud className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Choose file</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
