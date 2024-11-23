import { api } from "../api/baseApi";

const contactSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createContact: builder.mutation({
            query: (payloadData)=> {
                return{
                    url: `/contact`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        getContact: builder.query({
            query: (page)=> {
                const params = new URLSearchParams();
                if(page) params.append("page", page);

                return{
                    url: `/contact?${params.toString()}`
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        deleteContact: builder.mutation({
            query: (id)=> {
                return{
                    url: `/contact/${id}`,
                    method: "DELETE"
                }
            }
        }),
        deleteBulkContact: builder.mutation({
            query: (ids)=> {
                console.log(ids)
                return{
                    url: `/contact`,
                    method: "DELETE",
                    body: ids
                }
            }
        })
    })
})

export const {
    useCreateContactMutation,
    useGetContactQuery,
    useDeleteContactMutation,
    useDeleteBulkContactMutation
} = contactSlice;