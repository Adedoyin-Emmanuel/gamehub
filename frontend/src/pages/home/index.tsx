import Game from "@/components/game";
import Navbar from "@/components/navbar";

const Home = () => {
  const games = [
    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },

    {
      name: "CODM",
      imageUrl: "https://github.com/adedoyin-emmanuel.png",
      genre: "action",
    },
  ];
  return (
    <div className="w-full">
      <Navbar />
      <br />
      <div className="mx-auto md:w-[900px] w-11/12">
        <h2 className="text-2xl font-semibold">All Games</h2>
        <br />
        <div className="mx-auto flex flex-wrap gap-5">
          {games.map((game, _i) => {
            return (
              <Game
                key={_i}
                name={game.name}
                imageUrl={game.imageUrl}
                genre={game.genre}
                gameId={_i.toString()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
