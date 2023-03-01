import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getShiftDetails = createAsyncThunk(
    EndPoints.getShiftDetails,
    async (payload, { rejectWithValue }) => {
        try {
            const timeZoneOffset= new Date().getTimezoneOffset() 
            const response = await Api.getShiftDetails({...payload,timeZoneOffset});
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftDetailsSlice = createSlice({
    name: EndPoints.getShiftDetails,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getShiftDetails.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getShiftDetails.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getShiftDetails.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftDetailsApiError(state, action) {
            state.error = null
        },
        resetShiftDetailsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftDetailsApiError, resetShiftDetailsApiStatus } = ShiftDetailsSlice.actions
export default ShiftDetailsSlice.reducer