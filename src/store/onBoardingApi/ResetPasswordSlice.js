import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const resetPassword = createAsyncThunk(
    EndPoints.resetPassword,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.resetPassword(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ResetPasswordSlice = createSlice({
    name: EndPoints.resetPassword,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [resetPassword.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [resetPassword.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetResetPasswordApiError(state, action) {
            state.error = null
        },
        resetResetPasswordApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetResetPasswordApiError, resetResetPasswordApiStatus } = ResetPasswordSlice.actions
export default ResetPasswordSlice.reducer