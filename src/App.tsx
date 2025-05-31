import { AuthProvider } from "./contexts/AuthProvider";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";
import AppRouter from "./router";
// import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <AuthProvider>
        {/* <RouterProvider router={router} /> */}
        <AppRouter />
        {/* <Home /> */}
      </AuthProvider>
      {/* <Home /> */}
    </>
  );
};

export default App;
