import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";


const reduxStore = configureStore({
    reducer: {
        user: userSlice,
    },
})

export default reduxStore