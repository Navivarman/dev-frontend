import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed:(state,action) => {
            return action.payload
        },
        removeFeed: () => {
            return null;
        },
        removeUserFromFeed : (state,action) => {
            return state.filter(item => item._id !== action.payload)
        }
    }
})

export const { addFeed, removeFeed,removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;