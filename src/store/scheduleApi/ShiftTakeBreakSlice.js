import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const shiftTakeBreak = createAsyncThunk(
    EndPoints.shiftTakeBreak,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.shiftTakeBreak(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftTakeBreakSlice = createSlice({
    name: EndPoints.shiftTakeBreak,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [shiftTakeBreak.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [shiftTakeBreak.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [shiftTakeBreak.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftTakeBreakApiError(state, action) {
            state.error = null
        },
        resetShiftTakeBreakApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftTakeBreakApiError, resetShiftTakeBreakApiStatus } = ShiftTakeBreakSlice.actions
export default ShiftTakeBreakSlice.reducer