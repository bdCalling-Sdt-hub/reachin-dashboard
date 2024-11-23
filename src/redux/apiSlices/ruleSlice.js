import { api } from "../api/baseApi";

const ruleSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        createPrivacy: builder.mutation({
            query: (payloadData)=> {
                return{
                    url: `/rule/privacy-policy`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        createTerms: builder.mutation({
            query: (payloadData)=> {
                console.log(payloadData)
                return{
                    url: `/rule/terms-and-conditions`,
                    method: "POST",
                    body: payloadData
                }
            }
        }),
        getPrivacy: builder.query({
            query: ()=> {
                return{
                    url: `/rule/privacy-policy`
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        getTerms: builder.query({
            query: ()=> {
                return{
                    url: `/rule/terms-and-conditions`
                }
            },
            transformResponse: (data)=>{
                return data?.data
            }
        }),
    })
})

export const {
    useCreatePrivacyMutation,
    useCreateTermsMutation,
    useGetPrivacyQuery,
    useGetTermsQuery
} = ruleSlice;