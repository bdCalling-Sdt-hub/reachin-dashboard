import { api } from "../api/baseApi";

const blogSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createBlog: builder.mutation({
            query: (payloadData)=> {
                return{
                    url: `/blog`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        getBlog: builder.query({
            query: ({category, page})=> {
                const params = new URLSearchParams();
                if(category) params.append("category", category);
                if(page) params.append("page", page);

                return{
                    url: `/blog?${params.toString()}`
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        deleteBlog: builder.mutation({
            query: (id)=> {
                return{
                    url: `/blog/${id}`,
                    method: "DELETE"
                }
            }
        }),
        updateBlog: builder.mutation({
            query: ({id, payloadData})=> {
                return{
                    url: `/blog/${id}`,
                    method: "PATCH",
                    body: payloadData
                }
            }
        }),
    })
})

export const {
    useCreateBlogMutation,
    useGetBlogQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} = blogSlice;