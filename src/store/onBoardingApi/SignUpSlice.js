import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const signUp = createAsyncThunk(
    EndPoints.signup,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.signup(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const SignUpSlice = createSlice({
    name: EndPoints.signup,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [signUp.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [signUp.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [signUp.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetSignUpApiError(state, action) {
            state.error = null
        },
        resetSignUpApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetSignUpApiError, resetSignUpApiStatus } = SignUpSlice.actions
export default SignUpSlice.reducer