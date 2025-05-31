import { createContext } from "react";

interface AuthContextType {
  session: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  login: () => {},
  logout: () => {},
});

export { AuthContext };
