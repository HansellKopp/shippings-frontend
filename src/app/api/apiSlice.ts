import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState
        const token = state.auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

type ErrorData = {
    message: string;
}

type Error = {
    status: number;
    data: ErrorData;
}
type RefreshData = {
    accessToken: string;
}

type RefreshResponse = {
    data: RefreshData;
    error: Error;
}

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions) as unknown as  RefreshResponse

        if (refreshResult?.data) {

            // store the new token 
            const { accessToken } = refreshResult.data
            api.dispatch(setCredentials({ accessToken }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users', 'Clients','Services','Shippings'],
    endpoints: builder => ({})
})