import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageContainer from "../components/PageContainer";
import type { Movie } from "./Home";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      navigate("/");
      return;
    }
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, [navigate]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <PageContainer>
        <h1 className="font-poppins text-5xl font-semibold mt-20">
          Your Favorites Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-16 mt-5">
          {favorites.length === 0 ? (
            <p className="col-span-full text-center text-lg mt-10">
              No favorites yet.
            </p>
          ) : (
            favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default Favorites;
