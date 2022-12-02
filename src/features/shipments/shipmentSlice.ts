import { createSlice } from '@reduxjs/toolkit'
import { Client } from 'features/clients/clientsApiSlice'
import { Shipment } from './shipmentsApiSlice'

export type ShipmentType = {
    client: Client | null,
    shipment: Shipment | null,
    currentPage: number;
}

const initialState = {
    client: null,
    shipment: null,
    currentPage: 0
} as ShipmentType
export const shipmentSlice = createSlice({
    name: 'shipment',
    initialState: { ...initialState },
    reducers: {
        setClient: (state, action) => {
            state.client = action.payload as Client
        },
        setShipment: (state, action) => {
            state.shipment = action.payload as Shipment
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload as number
        },
    }
})

export const { setShipment, setCurrentPage, setClient } = shipmentSlice.actions

export default shipmentSlice.reducer

export const selectShipment = (state) => state.shipment.shipment as Shipment

export const selectCurrentPage = (state) => state.shipment.currentPage

export const selectClient = (state) => state.shipment.client as Client