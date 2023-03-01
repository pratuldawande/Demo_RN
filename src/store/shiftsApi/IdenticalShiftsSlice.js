import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getIdenticalShifts = createAsyncThunk(
    EndPoints.getIdenticalShifts,
    async (payload, { rejectWithValue }) => {
        try {
            const timeZoneOffset= new Date().getTimezoneOffset() 
            const response = await Api.getIdenticalShifts(payload,timeZoneOffset);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const IdenticalShiftsSlice = createSlice({
    name: EndPoints.getIdenticalShifts,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getIdenticalShifts.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getIdenticalShifts.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getIdenticalShifts.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetIdenticalShiftsApiError(state, action) {
            state.error = null
        },
        resetIdenticalShiftsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetIdenticalShiftsApiError, resetIdenticalShiftsApiStatus } = IdenticalShiftsSlice.actions
export default IdenticalShiftsSlice.reducer