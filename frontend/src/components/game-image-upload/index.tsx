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
import { Axios } from "@/config/axios";
import React from "react";
import toast from "react-hot-toast";
import Loader from "../loader";
import { useQueryClient } from "@tanstack/react-query";

interface GameImageUpload {
  gameId: string;
}

const GameImageUpload = ({ gameId }: GameImageUpload) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [dialogOpened, setDialogOpened] = React.useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      await Axios.put(`/game/${gameId}`, formData);

      toast.success("Game image updated successfully");
      setDialogOpened(false);
      setSelectedFile(null);

      queryClient.invalidateQueries({ queryKey: ["GetGameDetails", gameId] });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);

        const firstErrorKey = Object.keys(error.response.data.errors)[0];
        const firstError = error.response.data.errors[firstErrorKey][0];
        toast.error(firstError);
      } else {
        toast.error(
          error.response?.data?.title ||
            "An error occurred while uploading image"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
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

        <div className="my-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <div className="flex items-center">
            <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <UploadCloud className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600 truncate w-[200px] overflow-hidden text-ellipsis">
                {selectedFile ? selectedFile.name : "Choose file"}
              </span>
              <input
                type="file"
                className="hidden"
                name="file"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {errors.File && (
            <p className="text-sm text-red-500 mt-1">{errors.File[0]}</p>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={handleImageUpload}
          >
            {isLoading ? (
              <>
                <Loader isLoading color="#fff" /> <p>Uploading</p>
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameImageUpload;
