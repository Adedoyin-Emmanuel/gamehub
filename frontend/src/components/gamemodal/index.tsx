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

const GameModal = () => {
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
            <label htmlFor="name">Name</label>
            <Input id="name" />
          </div>

          <div className="my-2">
            <label htmlFor="name">Name</label>
            <Input id="name" />
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
