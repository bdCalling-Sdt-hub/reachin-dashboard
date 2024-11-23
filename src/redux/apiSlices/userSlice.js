import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        getUser: builder.query({
            query: ({search, limit, page, status})=> {
                const params = new URLSearchParams();
                if(search) params.append("search", search);
                if(limit) params.append("limit", limit);
                if(page) params.append("page", page);
                if(status) params.append("status", status);

                return{
                    url: `/admin/user?${params.toString()}`,
                    method: "GET"
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        getSubscription: builder.query({
            query: (id)=> {
                return{
                    url: `/admin/${id}`,
                    method: "GET"
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        blockUser: builder.mutation({
            query: (id)=> {
                return{
                    url: `/admin/${id}`,
                    method: "PATCH"
                }
            }
        }),
        blockBulkUser: builder.mutation({
            query: (ids)=> {
                return{
                    url: `/admin/block`,
                    method: "PATCH",
                    body: ids
                }
            }
        }),
        activeBulkUser: builder.mutation({
            query: (ids)=> {
                return{
                    url: `/admin/active`,
                    method: "PATCH",
                    body: ids
                }
            }
        }),

    })
})

export const {
    useGetUserQuery,
    useGetSubscriptionQuery,
    useBlockUserMutation,
    useActiveBulkUserMutation,
    useBlockBulkUserMutation
} = userSlice;