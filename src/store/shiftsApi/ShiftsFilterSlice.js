import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getShiftsFilter = createAsyncThunk(
    EndPoints.getShiftsFilter,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getShiftsFilter(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftsFilterSlice = createSlice({
    name: EndPoints.getShiftsFilter,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getShiftsFilter.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getShiftsFilter.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getShiftsFilter.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftsFilterApiError(state, action) {
            state.error = null
        },
        resetShiftsFilterApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftsFilterApiError, resetShiftsFilterApiStatus } = ShiftsFilterSlice.actions
export default ShiftsFilterSlice.reducer