import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/home" />;
  }

  return children;
};

/*
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.rol !== "admin") {
    return <Navigate to="/home" />;
  }
  return children;
};
*/

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;