import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const requestToken = searchParams.get("request_token");

    const createSession = async () => {
      if (!requestToken) return;

      try {
        const res = await axios.post(
          `https://api.themoviedb.org/3/authentication/session/new`,
          { request_token: requestToken },
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );

        const data = res.data;
        if (data.success) {
          localStorage.setItem("session_id", data.session_id);
          navigate("/"); // redirect ke home
        } else {
          console.error("Gagal membuat session", data);
        }
      } catch (error) {
        console.error("Gagal membuat session", error);
      }
    };

    createSession();
  }, [searchParams, navigate]);

  return <p>Membuat session...</p>;
}
