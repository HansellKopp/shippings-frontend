import { createSlice } from "@reduxjs/toolkit"

import { initialState, reducers } from "./appReducer"

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers,
})

export const { setMenuOptions, setMenuBreadcrumbs } = appSlice.actions