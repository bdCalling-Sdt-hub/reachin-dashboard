import { api } from "../api/baseApi";

const adminSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createAdmin: builder.mutation({
            query: (payloadData)=> {
                return{
                    url: `/admin`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        getAdmin: builder.query({
            query: ()=> {
                return{
                    url: "/admin",
                    method: "GET"
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        deleteAdmin: builder.mutation({
            query: (id)=> {
                return{
                    url: `/admin/${id}`,
                    method: "DELETE"
                }
            }
        }),
    })
})

export const {
    useCreateAdminMutation,
    useGetAdminQuery,
    useDeleteAdminMutation
} = adminSlice;