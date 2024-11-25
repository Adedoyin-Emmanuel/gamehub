import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

interface GameProps {
  name: string;
  imageUrl: string;
  genre: string;
  gameId: string;
}

const Game = ({ name, imageUrl, genre, gameId }: GameProps) => {
  const legitImageUrl = `${import.meta.env.VITE_API_URL}${imageUrl}`;

  return (
    <Link to={`/${gameId}`}>
      <div className="border rounded-md cursor-pointer h-auto flex flex-col">
        <div className="relative w-full aspect-square">
          <img
            src={legitImageUrl}
            alt={`Image relating to ${name}`}
            className="rounded-t-md absolute w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between p-3 mt-auto">
          <p className="font-semibold truncate max-w-[120px] sm:max-w-[140px] md:max-w-[160px]">
            {name}
          </p>
          <Badge className="capitalize" variant="outline">
            {genre}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default Game;
