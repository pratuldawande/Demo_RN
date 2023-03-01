import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const shiftClockOut = createAsyncThunk(
    EndPoints.shiftClockOut,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.shiftClockOut(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftClockOutSlice = createSlice({
    name: EndPoints.shiftClockOut,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [shiftClockOut.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [shiftClockOut.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [shiftClockOut.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftClockOutApiError(state, action) {
            state.error = null
        },
        resetShiftClockOutApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftClockOutApiError, resetShiftClockOutApiStatus } = ShiftClockOutSlice.actions
export default ShiftClockOutSlice.reducer