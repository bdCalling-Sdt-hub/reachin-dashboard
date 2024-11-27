import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        notification: builder.query({
            query: (page)=> {
                const params = new URLSearchParams();
                if(page) params.append("page", page);

                return{
                    url: `/notification?${params.toString()}`,
                    method: "GET"
                }
            },
            transformResponse: (data)=>{
                return data.data;
            },
            providesTags: ["notification"]
        }),
        readNotification: builder.mutation({
            query: ()=> {
                return{
                    url: `/notification`,
                    method: "PATCH"
                }
            },
            invalidatesTags: ["notification"]
        }),
    })
})

export const {
    useNotificationQuery,
    useReadNotificationMutation
} = notificationSlice;