import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getScheduleShifts = createAsyncThunk(
    EndPoints.getScheduleShifts,
    async (payload, { rejectWithValue }) => {
        try {
            const timeZoneOffset= new Date().getTimezoneOffset() 
            const response = await Api.getScheduleShifts(payload,timeZoneOffset);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ScheduleShiftsSlice = createSlice({
    name: EndPoints.getScheduleShifts,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getScheduleShifts.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getScheduleShifts.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getScheduleShifts.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetScheduleShiftsApiError(state, action) {
            state.error = null
        },
        resetScheduleShiftsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetScheduleShiftsApiError, resetScheduleShiftsApiStatus } = ScheduleShiftsSlice.actions
export default ScheduleShiftsSlice.reducer