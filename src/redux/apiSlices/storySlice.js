import { api } from "../api/baseApi";

const storySlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createStory: builder.mutation({
            query: (payloadData)=> {
                return{
                    url: `/story`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        getStory: builder.query({
            query: (page)=> {
                const params = new URLSearchParams();
                if(page) params.append("page", page);

                return{
                    url: `/story?${params.toString()}`
                }
            },
            transformResponse: (data)=>{
                console.log(data)
                return data?.data;
                
            }
        }),
        deleteStory: builder.mutation({
            query: (id)=> {
                return{
                    url: `/story/${id}`,
                    method: "DELETE"
                }
            }
        }),
        updateStory: builder.mutation({
            query: ({id, payloadData})=> {
                return{
                    url: `/story/${id}`,
                    method: "PATCH",
                    body: payloadData
                }
            }
        }),
    })
})

export const {
    useCreateStoryMutation,
    useGetStoryQuery,
    useUpdateStoryMutation,
    useDeleteStoryMutation
} = storySlice;