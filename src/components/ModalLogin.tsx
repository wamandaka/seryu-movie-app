import logoTMDB from "../assets/logo-tmdb.png";
const ModalLogin = ({
  onClose,
  handleLogin,
}: {
  onClose: () => void;
  handleLogin: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 grid place-content-center bg-black/50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalTitle"
    onClick={onClose}
  >
    <div className="w-full max-w-md rounded-lg bg-white py-5 px-6 shadow-lg">
      <div className="flex flex-col items-center">
        <button className="cursor-pointer" onClick={handleLogin}>
          <img src={logoTMDB} alt="Logo TMDB" />
        </button>
        <p className="text-pretty text-gray-700">Login with TMDB</p>
        {/* <button
            className="mt-6 px-4 py-2 bg-primary text-white rounded"
            onClick={onClose}
          >
            Close
          </button> */}
      </div>
    </div>
  </div>
);
export default ModalLogin;
