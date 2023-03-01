import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const requestOTP = createAsyncThunk(
    EndPoints.forgotPasswordOtp + 'RequestOTP',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.requestOTP(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const RequestOTPSlice = createSlice({
    name: EndPoints.forgotPasswordOtp + 'RequestOTP',
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [requestOTP.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [requestOTP.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [requestOTP.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetRequestOTPApiError(state, action) {
            state.error = null
        },
        resetRequestOTPApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetRequestOTPApiError, resetRequestOTPApiStatus } = RequestOTPSlice.actions
export default RequestOTPSlice.reducer