import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        getSubscriptionStatistic: builder.query({
            query: ()=> {
                return{
                    url: `/admin/subscription-statistic`,
                    method: "GET"
                }
            },
            transformResponse: (data) => {
                return data?.data;
            }
        }),
        getUserStatistic: builder.query({
            query: ()=> {
                return{
                    url: `/admin/user-statistic`,
                    method: "GET"
                }
            },
            transformResponse: (data) => {
                return data?.data;
            }
        }),
        getSearchStatistic: builder.query({
            query: ()=> {
                return{
                    url: `/visitor`,
                    method: "GET"
                }
            },
            transformResponse: (data) => {
                
                return data?.data;
            }
        })
    })
})

export const {
    useGetSubscriptionStatisticQuery,
    useGetUserStatisticQuery,
    useGetSearchStatisticQuery
} = homeSlice;