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
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
