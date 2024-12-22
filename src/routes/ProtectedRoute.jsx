import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
      const location = useLocation();
      const token = localStorage.getItem('accessToken');

      if (token) {
            return children;
      } else {
            return <Navigate to="/auth/login" state={{ from: location }} />;
      }
};

export default PrivateRoute;
