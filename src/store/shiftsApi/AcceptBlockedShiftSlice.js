import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const acceptBlockedShift = createAsyncThunk(
    EndPoints.acceptBlockedShift,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.acceptBlockedShift(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const AcceptBlockedShiftSlice = createSlice({
    name: EndPoints.acceptBlockedShift,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [acceptBlockedShift.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [acceptBlockedShift.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [acceptBlockedShift.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetAcceptBlockedShiftApiError(state, action) {
            state.error = null
        },
        resetAcceptBlockedShiftApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetAcceptBlockedShiftApiError, resetAcceptBlockedShiftApiStatus } = AcceptBlockedShiftSlice.actions
export default AcceptBlockedShiftSlice.reducer