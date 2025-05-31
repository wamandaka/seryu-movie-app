import {
  BrowserRouter,
  // createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import MovieDetails from "./pages/MovieDetails.tsx";
import Watchlist from "./pages/Watchlist.tsx";
import Favorites from "./pages/Favorites.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";

// const router = createBrowserRouter([
//   { path: "/", element: Home() },
//   { path: "/movie/:id", element: MovieDetails() },
//   { path: "/watchlist", element: Watchlist() },
//   { path: "/favorites", element: Favorites() },
// ]);

// export default router;

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
