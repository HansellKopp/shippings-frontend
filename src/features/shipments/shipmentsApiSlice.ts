import { apiSlice } from '../../app/api/apiSlice'

export type Shipment = {
  id: string
  _id: string
  user_id: string
  shipment_id: string
  date: string
  dueDate: string
  referenc: string
  payMethod: string
  master: string
  arrivingDate: string
  sender: string
  packages: string
  weight: string
  receiver: string
  volume: string
  shippingDate: string
  description: string
  customNumber: string;
}

const shipmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShipments: builder.query({
      query: () => '/shipments',
      transformResponse: (responseData: Shipment[]) => {
        return responseData
      },
      providesTags: ['Shipments']
    }),
    getShipment: builder.query({
      query: (id: string) => `/shipments/${id}`,
      transformResponse: (responseData: Shipment) => {
        return responseData
      },
      providesTags: ['Shipments']
    }),
    addShipment: builder.mutation({
      query: (shipment: Shipment) => ({
        body: { ...shipment },
        url: `/shipments`,
        method: 'POST'
      }),
      invalidatesTags: ['Shipments']
    }),
    updateShipment: builder.mutation({
      query: (shipment: Shipment) => ({
        url: `/shipments`,
        method: 'PUT',
        body: { ...shipment }
      }),
      invalidatesTags: ['Shipments']
    }),
    deleteShipment: builder.mutation({
      query: (shipment: Shipment) => ({
        url: `/shipments`,
        method: 'DELETE',
        body: { ...shipment }
      }),
      invalidatesTags: ['Shipments']
    })
  })
})

export const {
  useGetShipmentsQuery,
  useGetShipmentQuery,
  useLazyGetShipmentQuery,
  useAddShipmentMutation,
  useDeleteShipmentMutation,
  useUpdateShipmentMutation
} = shipmentApi
