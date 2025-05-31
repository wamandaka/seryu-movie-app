import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageContainer from "../components/PageContainer";
import type { Movie } from "./Home";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
  const [bookmarks, setBookmarks] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      navigate("/");
      return;
    }
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(bookmarks);
  }, [navigate]);

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <PageContainer>
          <h1 className="font-poppins text-5xl font-semibold mt-20">
            Your Watchlist Movies
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-16 mt-5">
            {bookmarks.length === 0 ? (
              <p className="col-span-full text-center text-lg mt-10">
                No watchlist yet.
              </p>
            ) : (
              bookmarks.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default WatchList;
