import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {

    const isAuthenticated = sessionStorage.getItem('user') === 'true';

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;
