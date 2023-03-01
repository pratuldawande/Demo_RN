import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getEarningHours = createAsyncThunk(
    EndPoints.getEarningHours,
    async (payload, { rejectWithValue }) => {
        try {
            const { userId, params } = payload
            const response = await Api.getEarningHours(userId, params);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const EarningHoursSlice = createSlice({
    name: EndPoints.getEarningHours,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getEarningHours.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getEarningHours.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getEarningHours.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetEarningHoursApiError(state, action) {
            state.error = null
        },
        resetEarningHoursApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetEarningHoursApiError, resetEarningHoursApiStatus } = EarningHoursSlice.actions
export default EarningHoursSlice.reducer