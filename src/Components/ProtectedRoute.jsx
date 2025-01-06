// src/Components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('AccessToken');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;