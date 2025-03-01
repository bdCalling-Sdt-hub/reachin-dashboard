import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://10.0.80.75:6001/api/v1",
        baseUrl: "http://178.16.138.188:5000/api/v1",
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
    tagTypes: ["notification", "user"]
});

export const imageUrl = "http://178.16.138.188:5000";
// export const imageUrl = "http://10.0.80.75:6001";
