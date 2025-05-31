import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageContainer from "../components/PageContainer";
import { getNowPlaying, getTopRated } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  useEffect(() => {
    getNowPlaying().then((res) => setNowPlaying(res.data.results));
    getTopRated().then((res) => setTopRated(res.data.results));
  }, []);
  console.log("Now Playing:", nowPlaying);
  console.log("Top Rated:", topRated);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <PageContainer>
        <h1 className="font-poppins text-5xl font-semibold mt-20">
          Now Playing
        </h1>
        <div className="flex overflow-x-auto w-full h-full mt-5 py-3 gap-5 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
          {nowPlaying.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

        <h1 className="font-poppins text-5xl font-semibold mt-20">Top Rated</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-16 mt-5">
          {topRated.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default Home;
