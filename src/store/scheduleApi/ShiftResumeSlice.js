import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const shiftResume = createAsyncThunk(
    EndPoints.shiftResume,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.shiftResume(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ShiftResumeSlice = createSlice({
    name: EndPoints.shiftResume,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [shiftResume.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [shiftResume.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [shiftResume.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetShiftResumeApiError(state, action) {
            state.error = null
        },
        resetShiftResumeApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetShiftResumeApiError, resetShiftResumeApiStatus } = ShiftResumeSlice.actions
export default ShiftResumeSlice.reducer