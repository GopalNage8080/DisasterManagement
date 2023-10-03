import { createSlice } from "@reduxjs/toolkit";
import { getData, insertData, loginUser, registerUser } from "../actions/userActions";

const userSlice = createSlice({
    name: "userSlice",
    initialState: { auth: localStorage.getItem("auth") },
    reducers: {
        invalidate: (state, { payload }) => {
            state.dataInserted = false

        }
    },
    extraReducers: builder => builder
        .addCase(registerUser.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userRegistered = true
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(insertData.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(insertData.fulfilled, (state, { payload }) => {
            state.loading = false
            state.dataInserted = true
        })
        .addCase(insertData.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(getData.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getData.fulfilled, (state, { payload }) => {
            state.loading = false
            state.Data = payload
        })
        .addCase(getData.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(loginUser.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.auth = payload
        })
        .addCase(loginUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

})

export const { invalidate } = userSlice.actions
export default userSlice.reducer