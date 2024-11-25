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
import { PencilIcon, TrashIcon, CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GameImageUpload from "@/components/game-image-upload";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Axios } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";

dayjs.extend(relativeTime);

const GamePage = () => {
  const { gameId } = useParams();

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
                <Dialog>
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
                        Make changes to your game here. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
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
