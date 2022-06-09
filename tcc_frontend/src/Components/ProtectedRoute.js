import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  // Check if user is authenticated
  const checkAuthentication = async (token) => {
    try {
      const url = "http://localhost:5001/checkIsAuthenticated";
      const res = await axios.get(url, {
        params: {
          token: token,
        },
      });

      if (res.status === 200) {
        console.log("authenticated");
        setIsAuth(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAuthEvent = new Event("storage");

  useEffect(() => {
    window.addEventListener("storage", () => {
      checkAuthentication(JSON.parse(localStorage.getItem("token")));
    });
    window.dispatchEvent(checkAuthEvent);

    return () => {
      window.removeEventListener("storage", () => {
        checkAuthentication(JSON.parse(localStorage.getItem("token")));
      });
    };
  }, []);

  const renderController = () => {
    if (location.state == undefined) {
      return <Navigate to="/login" replace />;
    }

    if (location.state.isLoggedIn || isAuth) {
      return children;
    }

    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }
  };

  return <>{renderController()}</>;
}

export default ProtectedRoute;
