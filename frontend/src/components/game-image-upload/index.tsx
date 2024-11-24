import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";
import { Button } from "../ui/button";

interface GameImageUpload {
  gameId: string;
}

const GameImageUpload = ({ gameId }: GameImageUpload) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border rounded-full h-10 w-10 flex items-center justify-center absolute transform -translate-y-12 translate-x-36 bg-white cursor-pointer">
          <Pen strokeWidth={1} height={20} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Game Image</DialogTitle>
          <DialogDescription>Upload a new game image</DialogDescription>
        </DialogHeader>

        <div className="flex items-center">
          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <UploadCloud className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Choose file</span>
            <input type="file" className="hidden" />
          </label>
        </div>
        <DialogFooter>
          <Button type="submit">Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameImageUpload;
