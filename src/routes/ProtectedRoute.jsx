import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useProfileQuery } from '../redux/apiSlices/authSlice';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const token = Cookies.get('accessToken');
    const {data: profile, isLoading , isError, isFetching} = useProfileQuery(undefined, { skip: !token });

    if (isLoading || isFetching) {
        return <div className='w-screen h-screen flex items-center justify-center'>
            <img src="/logo.svg" alt="" />
        </div>;
    }
    
    if (isError) {
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }
    
    if (profile?.data?.role && (profile?.data?.role === "ADMIN" || profile?.data?.role === "SUPER_ADMIN")) {
        return children;
    }
    
    return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;