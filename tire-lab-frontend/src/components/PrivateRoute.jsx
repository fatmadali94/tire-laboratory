import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { token, initialized } = useSelector((s) => s.auth);

  // Wait until we know whether the user is signed in
  if (!initialized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <HashLoader color="#5271ff" />
      </div>
    );
  }

  return token ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
