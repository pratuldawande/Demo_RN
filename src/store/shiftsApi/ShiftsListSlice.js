import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getShiftsList = createAsyncThunk(
    EndPoints.getShiftsList,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getShiftsList(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftsListSlice = createSlice({
    name: EndPoints.getShiftsList,
    initialState: {
        availableAndNonAvailableShiftsData: [],
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getShiftsList.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getShiftsList.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getShiftsList.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftsListApiError(state, action) {
            state.error = null
        },
        resetShiftsListApiStatus(state, action) {
            state.status = null
        },
        updateAvailableAndNonAvailableData(state, action) {
            state.availableAndNonAvailableShiftsData = action.payload
        },
    }
})

export const { resetShiftsListApiError, resetShiftsListApiStatus, updateAvailableAndNonAvailableData } = ShiftsListSlice.actions
export default ShiftsListSlice.reducer