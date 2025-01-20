import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProfileQuery } from "../redux/apiSlices/authSlice";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { data: profile, isFetching, isLoading, isError } = useProfileQuery();

    // Show loading state while fetching data
    if (isLoading || isFetching) {
        return <div className="w-full h-screen flex items-center justify-center">
            <img src="/logo.svg" alt="" />
        </div>;
    }

    if (isError || !profile?.data) {
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }

    if (profile?.data?.role === "ADMIN" || profile?.data?.role === "SUPER_ADMIN") {
        return children;
    }

    // Default redirect if conditions aren't met
    return <Navigate to="/auth/login" />;
};

export default PrivateRoute;