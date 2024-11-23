import { api } from "../api/baseApi";

const packageSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createPackage: builder.mutation({
            query: (payloadData)=> {
                return{
                    url: `/package`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        getPackage: builder.query({
            query: (paymentType)=> {
                const params = new URLSearchParams();
                if(paymentType) params.append("paymentType", paymentType);
                return{
                    url: `/package?${params.toString()}`
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        deletePackage: builder.mutation({
            query: (id)=> {
                return{
                    url: `/package/${id}`,
                    method: "DELETE"
                }
            }
        }),
        updatePackage: builder.mutation({
            query: ({id, payloadData})=> {
                return{
                    url: `/package/${id}`,
                    method: "PATCH",
                    body: payloadData
                }
            }
        }),
    })
})

export const {
    useCreatePackageMutation,
    useGetPackageQuery,
    useUpdatePackageMutation,
    useDeletePackageMutation
} = packageSlice;