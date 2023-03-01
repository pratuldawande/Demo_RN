import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const checkEmail = createAsyncThunk(
    EndPoints.checkEmail ,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.checkEmail(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const CheckEmailSlice = createSlice({
    name: EndPoints.checkEmail,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [checkEmail.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [checkEmail.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [checkEmail.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetCheckEmailApiError(state, action) {
            state.error = null
        },
        resetCheckEmailApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetCheckEmailApiError, resetCheckEmailApiStatus } = CheckEmailSlice.actions
export default CheckEmailSlice.reducer