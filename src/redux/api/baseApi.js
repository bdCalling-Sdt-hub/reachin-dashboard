import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.10.102:6001/api/v1",
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = Cookies.get("accessToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: () => ({})
});

export const imageUrl = "http://192.168.10.102:6001";