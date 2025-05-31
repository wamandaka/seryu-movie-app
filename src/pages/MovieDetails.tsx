import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, getMovieRecommendations } from "../services/tmdb";
import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import MovieCard from "../components/MovieCard";
import ButtonBookmark from "../components/ButtonBookmark";
import ButtonFavorite from "../components/ButtonFavorite";
import ModalLogin from "../components/ModalLogin";
import { useAuth } from "../hooks/useAuth";
interface MovieDetails {
  id: number;
  title: string;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  poster_path: string;
  release_date: string;
  runtime: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  popularity: number;
  overview: string;
  vote_average: number;
  vote_count: number;
  tagline?: string;
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [recommendation, setRecommendation] = useState<MovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const imgBaseUrl = "https://image.tmdb.org/t/p/original";
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("session_id"));
  }, []);

  useEffect(() => {
    if (movieDetails?.id !== undefined) {
      setIsBookmarked(checkLocalStorage("bookmarks", movieDetails.id));
      setIsFavorited(checkLocalStorage("favorites", movieDetails.id));
    }
  }, [movieDetails?.id]);

  useEffect(() => {
    if (id === undefined || isNaN(Number(id))) {
      navigate("/", { replace: true });
      return;
    }
    setIsLoading(true);
    getMovieDetails(Number(id))
      .then((res) => {
        if (res.data.success === false) {
          console.error("Movie not found");
          navigate("/", { replace: true });
          return;
        }
        setMovieDetails(res.data);
        console.log("Movie details fetched successfully", res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movie details", err);
      });
    // Fetch recommendations
    getMovieRecommendations(Number(id)).then((res) => {
      if (res.data.success === false) {
        console.error("Failed to fetch recommendations");
        return;
      }
      setRecommendation(res.data.results);
      console.log("Recommendations fetched successfully", res.data.results);
    });
    setIsLoading(false);
  }, [id, navigate]);

  const formatRuntime = (minutes?: number) => {
    if (!minutes || isNaN(minutes)) return "-";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ` : ""}${m}m`;
  };

  const formatUserScore = (voteAverage?: number) => {
    if (voteAverage === undefined || isNaN(voteAverage)) return "-";
    return `${(voteAverage * 10).toFixed(0)}`;
  };

  const toggleLocalStorage = (key: string, movie: MovieDetails): boolean => {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const exists = existing.some((m: MovieDetails) => m.id === movie.id);

    let updated;
    if (exists) {
      updated = existing.filter((m: MovieDetails) => m.id !== movie.id); // remove
    } else {
      updated = [...existing, movie]; // add
    }

    localStorage.setItem(key, JSON.stringify(updated));
    return !exists; // return updated status
  };

  const checkLocalStorage = (key: string, movieId: number): boolean => {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    return existing.some((m: MovieDetails) => m.id === movieId);
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
    if (!movieDetails) return;
    const updated = toggleLocalStorage("bookmarks", movieDetails);
    setIsBookmarked(updated);
  };

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!movieDetails) return;
    if (!isLogin) {
      setShowModal(true);
      return;
    }
    const updated = toggleLocalStorage("favorites", movieDetails);
    setIsFavorited(updated);
  };

  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };
  return (
    <div className="bg-black text-white min-h-screen xl:pb-10">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-white">Loading...</p>
        </div>
      ) : (
        <div className="relative">
          <img
            src={`${imgBaseUrl}${movieDetails?.backdrop_path}`}
            alt={`${movieDetails?.belongs_to_collection?.name} backdrop`}
            className="w-full h-auto md:h-[400px] object-cover opacity-40"
          />
          <div className="absolute top-0 left-32 hidden lg:block">
            <div className="flex items-center gap-5 justify-center h-[400px]">
              <img
                src={`${imgBaseUrl}${movieDetails?.poster_path}`}
                alt=""
                className="w-48 h-72 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h1 className="font-poppins text-3xl font-semibold">
                  {movieDetails?.title}{" "}
                  <span className="font-normal">{`(${
                    movieDetails?.release_date
                      ? new Date(movieDetails.release_date).getFullYear()
                      : ""
                  })`}</span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <p>{movieDetails?.release_date}</p>
                  <span className="w-1 h-1 rounded-full bg-white"></span>
                  <div className="flex items-center gap-1">
                    {movieDetails?.genres.map((genre, idx) => {
                      return <p key={idx}>{genre.name}</p>;
                    })}
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white"></span>
                  <p>{formatRuntime(movieDetails?.runtime)}</p>
                </div>
                <div className="flex mt-2 gap-3">
                  <div className="flex gap-2 items-center">
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                      <p className="text-primary font-bold">
                        {formatUserScore(movieDetails?.vote_average)}
                      </p>
                    </div>
                    <p className="w-10 text-sm">User Score</p>
                  </div>
                  <ButtonBookmark
                    handleBookmark={handleBookmark}
                    isBookmarked={isBookmarked}
                  />
                  <ButtonFavorite
                    handleFavorite={handleFavorite}
                    isFavorited={isFavorited}
                  />
                </div>
                <p className="mt-3 italic">{movieDetails?.tagline}</p>
                <div className="mt-3">
                  <p className="font-medium">Overview</p>
                  <p className="font-thin pr-32">{movieDetails?.overview}</p>
                </div>
              </div>
            </div>
          </div>

          <PageContainer>
            <div className="flex flex-col justify-center -translate-y-20 md:-translate-y-32 lg:hidden">
              <img
                src={`${imgBaseUrl}${movieDetails?.poster_path}`}
                alt=""
                className="w-26 md:w-32 h-44 object-cover rounded-lg mb-4"
              />
              <h1 className="font-poppins text-3xl font-semibold mb-1">
                {movieDetails?.title}{" "}
                <span className="font-normal">{`(${
                  movieDetails?.release_date
                    ? new Date(movieDetails.release_date).getFullYear()
                    : ""
                })`}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <p>{movieDetails?.release_date}</p>
                <span className="w-1 h-1 rounded-full bg-white"></span>
                <div className="flex items-center gap-1">
                  {movieDetails?.genres.map((genre, idx) => {
                    return <p key={idx}>{genre.name}</p>;
                  })}
                </div>
                <span className="w-1 h-1 rounded-full bg-white"></span>
                <p>{formatRuntime(movieDetails?.runtime)}</p>
              </div>
              <div className="flex mt-5 gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                    <p className="text-primary font-bold">
                      {formatUserScore(movieDetails?.vote_average)}
                    </p>
                  </div>
                  <p className="w-10 text-sm">User Score</p>
                </div>
                <ButtonBookmark
                  handleBookmark={handleBookmark}
                  isBookmarked={isBookmarked}
                />
                <ButtonFavorite
                  handleFavorite={handleFavorite}
                  isFavorited={isFavorited}
                />
              </div>
              <p className="mt-3 italic">{movieDetails?.tagline}</p>
              <div className="mt-3">
                <p className="font-medium">Overview</p>
                <p className="font-thin">{movieDetails?.overview}</p>
              </div>
            </div>
            {/* recommendation */}
            <div className="">
              <h1 className="font-poppins text-xl font-semibold md:mt-10 ">
                Recommendations
              </h1>
              <div className="flex overflow-x-auto w-full h-full mt-5 py-3 gap-5 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                {recommendation.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            </div>
          </PageContainer>
        </div>
      )}
      {showModal && (
        <ModalLogin
          onClose={() => setShowModal(false)}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default MovieDetails;
