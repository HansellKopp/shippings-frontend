import { apiSlice } from '../../app/api/apiSlice'

export type Client = {
  id: string
  _id: string
  name: string
  street: string
  city: string
  state: string
  zipcode: string
  country: string
  phone: string
  email: string
  active: boolean
}

const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => '/clients',
      transformResponse: (responseData: Client[]) => {
        return responseData
      },
      providesTags: ['Clients']
    }),
    getClient: builder.query({
      query: (id: string) => `/clients/${id}`,
      transformResponse: (responseData: Client) => {
        return responseData
      },
      providesTags: ['Clients']
    }),
    addClient: builder.mutation({
      query: (client: Client) => ({
        body: { ...client },
        url: `/clients`,
        method: 'POST'
      }),
      invalidatesTags: ['Clients']
    }),
    updateClient: builder.mutation({
      query: (client: Client) => ({
        url: `/clients`,
        method: 'PUT',
        body: { ...client }
      }),
      invalidatesTags: ['Clients']
    }),
    deleteClient: builder.mutation({
      query: (client: Client) => ({
        url: `/clients`,
        method: 'DELETE',
        body: { ...client }
      }),
      invalidatesTags: ['Clients']
    })
  })
})

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useLazyGetClientQuery,
  useAddClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation
} = clientApi
