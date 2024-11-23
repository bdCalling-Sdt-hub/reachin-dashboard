import { api } from "../api/baseApi";

const faqSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createFaq: builder.mutation({
            query: (payloadData)=> {
                return{
                    url: `/faq`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        getFaq: builder.query({
            query: (page)=> {
                const params = new URLSearchParams();
                if(page) params.append("page", page);

                return{
                    url: `/faq`
                }
            },
            transformResponse: (data)=>{
                console.log(data)
                return data?.data;
            }
        }),
        deleteFaq: builder.mutation({
            query: (id)=> {
                return{
                    url: `/faq/${id}`,
                    method: "DELETE"
                }
            }
        }),
        updateFaq: builder.mutation({
            query: ({id, payloadData})=> {
                return{
                    url: `/faq/${id}`,
                    method: "PATCH",
                    body: payloadData
                }
            }
        }),
    })
})

export const {
    useCreateFaqMutation,
    useGetFaqQuery,
    useUpdateFaqMutation,
    useDeleteFaqMutation
} = faqSlice;