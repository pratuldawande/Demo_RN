import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const shiftCalledOff = createAsyncThunk(
    EndPoints.shiftCalledOff,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.shiftCalledOff(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftCalledOffSlice = createSlice({
    name: EndPoints.shiftCalledOff,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [shiftCalledOff.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [shiftCalledOff.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [shiftCalledOff.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftCalledOffApiError(state, action) {
            state.error = null
        },
        resetShiftCalledOffApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftCalledOffApiError, resetShiftCalledOffApiStatus } = ShiftCalledOffSlice.actions
export default ShiftCalledOffSlice.reducer