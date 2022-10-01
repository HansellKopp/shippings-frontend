import { apiSlice } from "../../app/api/apiSlice"

export type User = {
    _id: string;
    id: string;
    username: string;
    password: string;
    roles: string[];
    active: boolean;
}

export const usersApiSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
          getUsers: builder.query({
            query: () => '/users',
            transformResponse: (responseData: User[]) => {
              return responseData
            },
            providesTags: ['Users']
          }),
          getUser: builder.query({
            query: (id: string) => `/users/${id}`,
            transformResponse: (responseData: User) => {
              return responseData
            },
            providesTags: ['Users']
          }),
          addUser: builder.mutation({
            query: (user: User) => ({
              body: { ...user },
              url: `/users`,
              method: 'POST'
            }),
            invalidatesTags: ['Users']
          }),
          updateUser: builder.mutation({
            query: (user: User) => ({
              url: `/users`,
              method: 'PUT',
              body: { ...user }
            }),
            invalidatesTags: ['Users']
          }),
          deleteUser: builder.mutation({
            query: (user: User) => ({
              url: `/users`,
              method: 'DELETE',
              body: { ...user }
            }),
            invalidatesTags: ['Users']
          })
        })
      })
      
export const {
        useGetUsersQuery,
        useGetUserQuery,
        useLazyGetUserQuery,
        useAddUserMutation,
        useDeleteUserMutation,
        useUpdateUserMutation
      } = usersApiSlice