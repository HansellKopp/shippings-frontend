import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"

type ErrorData = {
    message: String;
}
export type ErrorResponse = {
    status: Number;
    errorData: ErrorData;
}
export type LoginResponse = {
    accessToken: string
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            }),
            transformResponse: (responseData: unknown) => (
                responseData as LoginResponse
            )
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    //const { data } = 
                    await queryFulfilled
                    //console.log(data)
                    dispatch(logOut({}))
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 