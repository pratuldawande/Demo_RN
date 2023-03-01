import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getShiftTimeLine = createAsyncThunk(
    EndPoints.getShiftTimeLine,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getShiftTimeLine(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftTimeLineSlice = createSlice({
    name: EndPoints.getShiftTimeLine,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getShiftTimeLine.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getShiftTimeLine.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getShiftTimeLine.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftTimeLineApiError(state, action) {
            state.error = null
        },
        resetShiftTimeLineApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftTimeLineApiError, resetShiftTimeLineApiStatus } = ShiftTimeLineSlice.actions
export default ShiftTimeLineSlice.reducer