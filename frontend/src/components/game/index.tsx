import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
interface GameProps {
  name: string;
  imageUrl: string;
  genre: string;
  gameId: string;
}

const Game = ({ name, imageUrl, genre, gameId }: GameProps) => {
  return (
    <Link to={`/${gameId}`}>
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
    </Link>
  );
};

export default Game;
