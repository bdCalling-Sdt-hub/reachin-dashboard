import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        otpVerify: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/verify-email",
                    body: data,
                }
            }
        }),
        login: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/login",
                    body: data
                }
            },
            transformResponse: (data)=>{
                return data;
            },
            transformErrorResponse: ({data})=>{
                const { message } = data;
                return message;
            }
        }),
        forgotPassword: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/forgot-password",
                    body: data
                }
            }
        }),
        resetPassword: builder.mutation({
            query: (value) => {
                return{
                    method: "POST",
                    url: "/auth/reset-password",
                    body: value
                }
            }
        }),
        changePassword: builder.mutation({
            query: (data) => {
                return{
                    method: "POST",
                    url: "/auth/change-password",
                    body: data
                }
            }
        }),

        companyDetails: builder.query({
            query: (id) => {
                return{
                    method: "GET",
                    url: `/user/${id}`
                }
            },
            transformResponse: (data)=>{
                return data?.data;
            }

        }),

        updateProfile: builder.mutation({
            query: (data) => {
                return{
                    method: "PATCH",
                    url: "/user",
                    body: data
                }
            }
        }),

        profile: builder.query({
            query: () => {
                return{
                    method: "GET",
                    url: "/user/profile"
                    
                }
            }
        }),
    })
});

export const {
    useOtpVerifyMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useProfileQuery,
    useCompanyDetailsQuery
} = authSlice;