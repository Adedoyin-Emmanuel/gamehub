import Navbar from "@/components/navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
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
import { PencilIcon, TrashIcon, CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GameImageUpload from "@/components/game-image-upload";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Axios } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

dayjs.extend(relativeTime);

const GamePage = () => {
  const { gameId } = useParams();

  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const [dialogOpened, setDialogOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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

  const getGameDetails = async () => {
    try {
      const response = await Axios.get(`/game/${gameId}`);

      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to fetch game details");
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["GetGameDetails", gameId],
    queryFn: getGameDetails,
  });

  const [formData, setFormData] = React.useState({
    name: data?.name,
    description: data?.description,
    genre: data?.genre,
  });

  const handleGameUpdate = async () => {
    try {
      setIsLoading(true);
      setErrors({});

      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("description", formData.description);
      dataToSend.append("genre", formData.genre);

      await Axios.put(`/game/${gameId}`, dataToSend);
      toast.success("Game created successfully!");
      setDialogOpened(false);

      queryClient.invalidateQueries({ queryKey: ["GetGameDetails", gameId] });
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
          error.response?.data?.title || "An error occurred while updating game"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto py-8 p-1">
        {isPending && <Loader isLoading />}

        {error && <h3 className="text-center capitalize">{error.message}</h3>}

        {!isPending && data && (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className="mx-auto">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${data.imageUrl}`}
                    alt="Game Thumbnail"
                    className="w-48 h-48 rounded-full object-cover"
                  />
                  <GameImageUpload gameId={gameId as string} />
                </div>

                <h1 className="text-3xl font-bold mt-8">{data.name}</h1>

                <p className="text-gray-600 mt-4 max-w-2xl">
                  {data.description}
                </p>

                <p className="text-gray-600 mt-4 max-w-2xl">
                  <Badge variant={"outline"}> {data.genre}</Badge>
                </p>

                <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>Created {dayjs(data.createdAt).fromNow()}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>Updated {dayjs(data.updatedAt).fromNow()}</span>
                  </div>
                </div>
              </div>

              <br />

              <div className="w-full flex items-center justify-between">
                <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="secondary">
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Game</DialogTitle>
                      <DialogDescription>
                        Make changes to your game here. Click update when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
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
                          <p className="text-sm text-red-500 mt-1">
                            {errors.Name[0]}
                          </p>
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
                          <p className="text-sm text-red-500 mt-1">
                            {errors.Description[0]}
                          </p>
                        )}
                      </div>

                      <div className="my-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Genre
                        </label>
                        <Select
                          value={formData.genre}
                          onValueChange={handleGenreChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem
                                key={genre}
                                value={genre.toLowerCase()}
                              >
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.Genre && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.Genre[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                        onClick={handleGameUpdate}
                      >
                        <Loader isLoading={isLoading} color="#fff" size={20} />
                        {isLoading ? "Loading" : "Update"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Game</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this game? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GamePage;
