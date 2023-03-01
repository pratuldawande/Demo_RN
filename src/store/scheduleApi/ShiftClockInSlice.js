import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const shiftClockIn = createAsyncThunk(
    EndPoints.shiftClockIn,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.shiftClockIn(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftClockInSlice = createSlice({
    name: EndPoints.shiftClockIn,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [shiftClockIn.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [shiftClockIn.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [shiftClockIn.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftClockInApiError(state, action) {
            state.error = null
        },
        resetShiftClockInApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftClockInApiError, resetShiftClockInApiStatus } = ShiftClockInSlice.actions
export default ShiftClockInSlice.reducer