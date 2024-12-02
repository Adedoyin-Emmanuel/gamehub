import { Plus, UploadCloud } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Axios } from "@/config/axios";
import React from "react";
import toast from "react-hot-toast";
import Loader from "../loader";
import { useQueryClient } from "@tanstack/react-query";

const GameModal = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    genre: "",
  });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const [dialogOpened, setDialogOpened] = React.useState(false);
  const queryClient = useQueryClient();

  const genres = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Racing",
    "Fighting",
    "Puzzle",
    "Shooter",
    "Platform",
    "Horror",
    "MMORPG",
    "Battle Royale",
    "Card Game",
    "Educational",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: [] });
    }
  };

  const handleGenreChange = (value: string) => {
    setFormData({ ...formData, genre: value });
    if (errors.Genre) {
      setErrors({ ...errors, Genre: [] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

 

  const handleGameCreation = async () => {
    try {
      setIsLoading(true);
      setErrors({});

      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("description", formData.description);
      dataToSend.append("genre", formData.genre);

      if (selectedFile) {
        dataToSend.append("file", selectedFile);
      }

      await Axios.post("/game", dataToSend);
      toast.success("Game created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["GetAllGames"],
      });
      setDialogOpened(false);
      setFormData({ name: "", description: "", genre: "" });
      setSelectedFile(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);

        const firstErrorKey = Object.keys(error.response.data.errors)[0];
        const firstError = error.response.data.errors[firstErrorKey][0];
        toast.error(firstError);
      } else {
        toast.error(
          error.response?.data?.title || "An error occurred while creating game"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <DialogTrigger asChild>
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

        <div className="my-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.Name && (
            <p className="text-sm text-red-500 mt-1">{errors.Name[0]}</p>
          )}
        </div>

        <div className="my-2 space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.Description && (
            <p className="text-sm text-red-500 mt-1">{errors.Description[0]}</p>
          )}
        </div>

        <div className="my-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <Select value={formData.genre} onValueChange={handleGenreChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre.toLowerCase()}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.Genre && (
            <p className="text-sm text-red-500 mt-1">{errors.Genre[0]}</p>
          )}
        </div>

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
            className="w-full"
            disabled={isLoading}
            onClick={handleGameCreation}
          >
            <Loader isLoading={isLoading} color="#fff" size={20} />
            {isLoading ? "Loading" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
