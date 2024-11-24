import { Badge } from "../ui/badge";
interface GameProps {
  name: string;
  imageUrl: string;
  genre: string;
}

const Game = ({ name, imageUrl, genre }: GameProps) => {
  return (
    <div className="border rounded-md md:w-48 cursor-pointer">
      <img
        src={imageUrl}
        alt={`Image relating to ${name}`}
        className="rounded-t-md"
      />

      <div className="flex items-center justify-between p-1">
        <p className="font-semibold py-2 truncate">{name}</p>
        <Badge className="capitalize" variant={"outline"}>
          {genre}
        </Badge>
      </div>
    </div>
  );
};

export default Game;
