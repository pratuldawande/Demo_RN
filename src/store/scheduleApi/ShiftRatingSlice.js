import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const shiftRating = createAsyncThunk(
    EndPoints.shiftRating,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.shiftRating(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftRatingSlice = createSlice({
    name: EndPoints.shiftRating,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [shiftRating.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [shiftRating.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [shiftRating.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftRatingApiError(state, action) {
            state.error = null
        },
        resetShiftRatingApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftRatingApiError, resetShiftRatingApiStatus } = ShiftRatingSlice.actions
export default ShiftRatingSlice.reducer