import { useState } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!localStorage.getItem("session_id");
  const [showModal, setShowModal] = useState(!isLoggedIn);

  if (isLoggedIn) return children;

  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Login Required</h2>
          <p className="mb-6 text-black">You must login to access this page.</p>
          <button
            className="bg-primary text-white px-6 py-2 rounded font-semibold"
            onClick={() => {
              setShowModal(false);
              window.location.href = "/"; // Tetap di home
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  );
};

export default PrivateRoute;
