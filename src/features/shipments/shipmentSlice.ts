import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    client: null,
    shipment: null,
    currentPage: 0
}
export const shipmentSlice = createSlice({
    name: 'shipment',
    initialState: { ...initialState },
    reducers: {
        setClient: (state, action) => {
            state.client = action.payload
        },
        setShipment: (state, action) => {
            state.shipment = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
    }
})

export const { setShipment, setCurrentPage, setClient } = shipmentSlice.actions

export default shipmentSlice.reducer

export const selectShipment = (state) => state.shipment.shipment

export const selectCurrentPage = (state) => state.shipment.currentPage

export const selectClient = (state) => state.shipment.client