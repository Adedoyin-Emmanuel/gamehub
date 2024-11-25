import React from "react";
import Game from "@/components/game";
import Navbar from "@/components/navbar";
import { Axios } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/loader";

interface IGame {
  name: string;
  imageUrl: string;
  genre: string;
  id: string;
}

const Home = () => {
  // const [skip, setSkip] = React.useState(0);
  // const [take, setTake] = React.useState(10);

  const getAllGames = async () => {
    try {
      const response = await Axios.get(`/game`);
      return response.data.data;
    } catch (error: unknown) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["GetAllGames"],
    queryFn: getAllGames,
  });

  return (
    <div className="w-full">
      <Navbar />
      <br />
      <div className="mx-auto md:w-[900px] w-11/12">
        <h2 className="text-2xl font-semibold">All Games</h2>
        <br />

        {error && (
          <h2 className="capitalize text-center mx-auto">{error.message}</h2>
        )}

        {isPending && <Loader isLoading={isPending} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!isPending &&
            data.map((game: IGame, _i: number) => {
              return (
                <Game
                  key={_i}
                  name={game.name}
                  imageUrl={game.imageUrl}
                  genre={game.genre}
                  gameId={game.id}
                />
              );
            })}

          {!isPending && data.length === 0 && (
            <h3 className="text-center capitalize mx-auto">No games found!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
