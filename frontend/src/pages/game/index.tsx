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
import { Pen } from "lucide-react";

dayjs.extend(relativeTime);

const GamePage = () => {
  const game = {
    title: "Super Adventure",
    description:
      "Embark on an epic journey filled with exciting challenges, hidden treasures, and mysterious lands.",
    createdAt: "2024-11-20T10:00:00Z",
    updatedAt: "2024-11-22T14:00:00Z",
    imageUrl: "https://github.com/adedoyin-emmanuel.png",
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto py-8 p-1">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="mx-auto">
                <img
                  src={game.imageUrl}
                  alt="Game Thumbnail"
                  className="w-48 h-48 rounded-full object-cover"
                />

                <div className="border rounded-full h-10 w-10 flex items-center justify-center absolute transform -translate-y-12 translate-x-36 bg-white cursor-pointer">
                  <Pen strokeWidth={1} height={20} />
                </div>
              </div>

              <h1 className="text-3xl font-bold mt-8">{game.title}</h1>

              <p className="text-gray-600 mt-4 max-w-2xl">{game.description}</p>

              <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>Created {dayjs(game.createdAt).fromNow()}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>Updated {dayjs(game.updatedAt).fromNow()}</span>
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
      </div>
    </div>
  );
};

export default GamePage;
