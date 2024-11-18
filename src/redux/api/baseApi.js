import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({
            baseUrl: "http://192.168.10.102:6001/api/v1",
            credentials: 'include',
            prepareHeaders: (headers) => {
                const token = Cookies.get("accessToken");
                if (token) {
                    headers.set("authorization", `Bearer ${token}`);
                }
                return headers;
            }
        });

        const result = await baseQuery(args, api, extraOptions);

        /* // Check for 401 status and redirect to login
        if (result?.error?.status === 401) {
            // Cookies.remove("authToken"); // Clear the token cookie
            window.location.href = "/auth/login"; // Redirect to login page
        } */

        return result;
    },
    endpoints: () => ({}),
});

export const imageUrl = "http://192.168.10.102:6001";