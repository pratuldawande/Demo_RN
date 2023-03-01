import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const updatePasswordWithOTP = createAsyncThunk(
    EndPoints.forgotPasswordOtp + 'UpdatePasswordWithOTP',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.updatePasswordWithOTP(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UpdatePasswordWithOTPSlice = createSlice({
    name: EndPoints.forgotPasswordOtp + 'UpdatePasswordWithOTP',
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [updatePasswordWithOTP.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [updatePasswordWithOTP.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [updatePasswordWithOTP.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUpdatePasswordWithOTPApiError(state, action) {
            state.error = null
        },
        resetUpdatePasswordWithOTPApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUpdatePasswordWithOTPApiError, resetUpdatePasswordWithOTPApiStatus } = UpdatePasswordWithOTPSlice.actions
export default UpdatePasswordWithOTPSlice.reducer