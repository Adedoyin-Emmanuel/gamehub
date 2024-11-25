import React from "react";
import Game from "@/components/game";
import Navbar from "@/components/navbar";
import { Axios } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface IGame {
  name: string;
  imageUrl: string;
  genre: string;
  id: string;
}

interface IGameResponse {
  items: IGame[];
  total: number;
  skip: number;
  take: number;
}

const Home = () => {
  const [page, setPage] = React.useState(1);
  const take = 10;

  const getAllGames = async () => {
    try {
      const response = await Axios.get("/game", {
        params: {
          skip: (page - 1) * take,
          take,
        },
      });
      return response.data.data as IGameResponse;
    } catch (error: unknown) {
      toast.error("An error occurred");
      throw error;
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["GetAllGames", page],
    queryFn: getAllGames,
  });

  const totalPages = data ? Math.ceil(data.total / take) : 0;
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
            data &&
            data.items.map((game: IGame, _i: number) => {
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

          {!isPending && data && data.items.length === 0 && (
            <h3 className="text-center capitalize mx-auto">No games found!</h3>
          )}
        </div>
        <br />

        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={cn(
                      page === 1 ? "pointer-events-none opacity-50" : "",
                      "cursor-pointer"
                    )}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index} className="cursor-pointer">
                    <PaginationLink
                      isActive={page === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={cn(
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : "",
                      "cursor-pointer"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
