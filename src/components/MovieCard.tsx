import { Link } from "react-router-dom";
import type { Movie } from "../pages/Home";
import { useEffect, useState } from "react";
import ModalLogin from "./ModalLogin";
import { useAuth } from "../hooks/useAuth";
import ButtonBookmark from "./ButtonBookmark";
import ButtonFavorite from "./ButtonFavorite";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w500";
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsBookmarked(checkLocalStorage("bookmarks", movie.id));
    setIsFavorited(checkLocalStorage("favorites", movie.id));
  }, [movie.id]);

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
    };

    return new Date(date).toLocaleDateString("en-US", options);
  };

  const toggleLocalStorage = (key: string, movie: Movie): boolean => {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = existing.some((m: Movie) => m.id === movie.id);

    let updated;
    if (exists) {
      updated = existing.filter((m: Movie) => m.id !== movie.id); // remove
    } else {
      updated = [...existing, movie]; // add
    }

    localStorage.setItem(key, JSON.stringify(updated));
    return !exists; // return updated status
  };

  const checkLocalStorage = (key: string, movieId: number): boolean => {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    return existing.some((m: Movie) => m.id === movieId);
  };

  const handleBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLogin) {
      setShowModal(true);
      return;
    }
    const updated = toggleLocalStorage("bookmarks", movie);
    setIsBookmarked(updated);
  };

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLogin) {
      setShowModal(true);
      return;
    }
    const updated = toggleLocalStorage("favorites", movie);
    setIsFavorited(updated);
  };

  return (
    <div>
      <Link to={`/movie/${movie.id}`} key={movie.id} target="_blank">
        <div className="bg-[#050E12] rounded-lg min-w-52 min-h-80 group">
          <div className="relative">
            <img
              loading="lazy"
              src={`${imgBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover mb-4 rounded-t-lg"
            />
            <div className="gap-5 absolute bottom-2 right-2 hidden group-hover:flex">
              <ButtonBookmark
                handleBookmark={handleBookmark}
                isBookmarked={isBookmarked}
              />
              <ButtonFavorite
                handleFavorite={handleFavorite}
                isFavorited={isFavorited}
              />
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-inter text-xl font-bold line-clamp-1">
              {movie.title}
            </h2>
            <p className="font-inter text-sm">
              {formatDate(movie.release_date)}
            </p>
          </div>
        </div>
      </Link>
      {showModal && (
        <ModalLogin
          onClose={() => setShowModal(false)}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default MovieCard;
