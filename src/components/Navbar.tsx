import { BiSolidLogOut } from "react-icons/bi";
import PageContainer from "./PageContainer";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ModalLogin from "./ModalLogin";




const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [openNav, setOpenNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    target: string
  ) => {
    e.preventDefault();
    if (!isLogin) {
      setShowModal(true);
      return;
    }
    navigate(`/${target}`);
  };

  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="bg-primary text-white py-4">
      <PageContainer>
        <div className="flex justify-between">
          <a
            href="/"
            className="font-poppins tracking-[0.5rem] text-5xl font-black"
          >
            CINEMA
          </a>
          <button onClick={toggleNav} className="flex items-center md:hidden">
            {openNav ? <HiXMark size={35} /> : <HiOutlineMenuAlt3 size={35} />}
          </button>
          {openNav ? (
            <ul className="md:flex items-center space-x-8 absolute top-16 right-0 bg-primary p-4 md:p-0 md:static w-full md:w-auto z-50">
              <li>
                <a
                  href="/favorites"
                  className="font-roboto text-xl font-normal"
                >
                  Favorite
                </a>
              </li>
              <li>
                <a
                  href="/watchlist"
                  className="font-roboto text-xl font-normal"
                >
                  Watchlist
                </a>
              </li>
              {isLogin ? (
                <li>
                  <button
                    onClick={logout}
                    className="font-roboto text-xl font-normal cursor-pointer text-red-500"
                  >
                    Logout
                  </button>
                </li>
              ) : null}
            </ul>
          ) : null}

          <ul className="md:flex items-center space-x-8 hidden">
            <li>
              <button
                onClick={(e) => handleNavigate(e, "favorites")}
                className="font-roboto text-xl font-normal cursor-pointer"
              >
                Favorite
              </button>
              {/* <a href="/favorites" className="font-roboto text-xl font-normal">
                Favorite
              </a> */}
            </li>
            <li>
              <button
                onClick={(e) => handleNavigate(e, "watchlist")}
                className="font-roboto text-xl font-normal cursor-pointer"
              >
                Watchlist
              </button>
              {/* <a href="/watchlist" className="font-roboto text-xl font-normal">
                Watchlist
              </a> */}
            </li>
            {isLogin ? (
              <li>
                <button
                  onClick={logout}
                  className="cursor-pointer flex items-center"
                >
                  <BiSolidLogOut size={25} />
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </PageContainer>
      {showModal && (
        <ModalLogin
          onClose={() => setShowModal(false)}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default Navbar;
