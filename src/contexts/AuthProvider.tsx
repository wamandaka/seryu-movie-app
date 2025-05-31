import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

interface childrenProps {
  children: React.ReactNode;
}

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const REDIRECT_URL = import.meta.env.VITE_TMDB_REDIRECT_URL;

export const AuthProvider: React.FC<childrenProps> = ({ children }) => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("session_id");
    if (stored) setSession(stored);
  }, []);

  const login = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      // const data = await res.json();
      if (res.data.success) {
        const requestToken = res.data.request_token;
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${REDIRECT_URL}`;
      }
    } catch (err) {
      console.error("Failed to get request token", err);
    }
  };

  const logout = async () => {
    try {
      const sessionId = localStorage.getItem("session_id");
      if (!sessionId) return;
      await axios.delete(
        `https://api.themoviedb.org/3/authentication/session`,
        {
          data: { session_id: sessionId },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      localStorage.removeItem("session_id");
      setSession(null);
      window.location.reload(); // reload page setelah logout
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
