import { apiSlice } from '../../app/api/apiSlice'

export type Service = {
    _id: string
    code: string;
    price: number;
    description: string
    pricePerVolume: boolean
    active: boolean
}

const servicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => '/services',
      transformResponse: (responseData: Service[]) => {
        console.log({ responseData })
        return responseData
      },
      providesTags: ['Services'],
    }),
    getService: builder.query({
      query: (id: string) => `/services/${id}`,
      transformResponse: (responseData: Service) => {
        return responseData
      },
      providesTags: ['Services'],
    }),
    addService: builder.mutation({
      query: (service: Service) => ({
        body: {...service},
        url: `/services`,
        method: 'POST'
      }),
      invalidatesTags: ['Services'],
    }),
    updateService: builder.mutation({
      query: (service: Service) => ({
        url: `/services`,
        method: 'PUT',
        body: {...service},
      }),
      invalidatesTags: ['Services'],
    }),
    deleteService: builder.mutation({
      query: (service: Service) => ({
        url: `/services`,
        method: 'DELETE',
        body: {...service},
      }),
      invalidatesTags: ['Services'],
    })
  })
})

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useLazyGetServiceQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation
} = servicesApi
