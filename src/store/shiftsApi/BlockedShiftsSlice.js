import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getBlockedShifts = createAsyncThunk(
    EndPoints.getBlockedShifts,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getBlockedShifts(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const BlockedShiftsSlice = createSlice({
    name: EndPoints.getBlockedShifts,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getBlockedShifts.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getBlockedShifts.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getBlockedShifts.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetBlockedShiftsApiError(state, action) {
            state.error = null
        },
        resetBlockedShiftsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetBlockedShiftsApiError, resetBlockedShiftsApiStatus } = BlockedShiftsSlice.actions
export default BlockedShiftsSlice.reducer