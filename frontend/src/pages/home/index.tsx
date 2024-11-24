import React from "react";
import Game from "@/components/game";
import Navbar from "@/components/navbar";
import { Axios } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/loader";

const Home = () => {
  const [skip, setSkip] = React.useState(0);
  const [take, setTake] = React.useState(10);

  const getAllGames = async () => {
    try {
      const response = await Axios.get(`/game`);
      return response.data.data;
    } catch (error: unknown) {
      console.log(error);
      toast.error("An error occured");
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

        {error && <h2 className="capitalize text-center">{error.message}</h2>}

        {isPending && <Loader isLoading={isPending} />}

        <div className="mx-auto flex flex-wrap gap-5">
          {/* {games.map((game, _i) => {
            return (
              <Game
                key={_i}
                name={game.name}
                imageUrl={game.imageUrl}
                genre={game.genre}
                gameId={_i.toString()}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
