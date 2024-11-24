interface GameProps {
  name: string;
  imageUrl: string;
  genre: string;
}

const Game = ({ name, imageUrl, genre }: GameProps) => {
  return (
    <div className="border rounded-md w-48">
      <img
        src={imageUrl}
        alt={`Image relating to ${name}`}
        className="rounded-t-md"
      />

      <div>
        <p className="font-semibold py-2">{name}</p>
        <p className="capitalize py-3">{genre}</p>
      </div>
    </div>
  );
};

export default Game;
