import { api } from "../api/baseApi";

const subscriptionSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        getSubscriptions: builder.query({
            query: ({search,limit, page, paymentType})=> {
                const params = new URLSearchParams();
                if(search) params.append("search", search);
                if(limit) params.append("limit", limit);
                if(page) params.append("page", page);
                if(paymentType) params.append("paymentType", paymentType);

                return{
                    url: `/subscription?${params.toString()}`,
                    method: "GET"
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        }),
        companySubscriptionDetails: builder.query({
            query: (id)=> {
                return{
                    url: `/subscription?${id}`,
                    method: "GET"
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }
        })
    })
})

export const {
    useGetSubscriptionsQuery,
    useCompanySubscriptionDetailsQuery
} = subscriptionSlice;