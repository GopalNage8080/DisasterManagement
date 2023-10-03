import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const registerUser = createAsyncThunk(
    "registerUser",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.post("/users", userData)
            return true
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })
export const insertData = createAsyncThunk(
    "insertData",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.post("/temp", userData)
            return true
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })
export const loginUser = createAsyncThunk(
    "loginUser",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.get("/users", {
                params: {
                    email: userData.email,
                    password: userData.password
                }
            })
            if (data.length === 0) {
                return rejectWithValue("Enter Valid Email And Passowrd")
            }
            else {
                localStorage.setItem("auth", JSON.stringify(data[0]))
                return data[0]
            }
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })
export const getData = createAsyncThunk(
    "getData",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await API.get("/temp", userData)
            return data
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })