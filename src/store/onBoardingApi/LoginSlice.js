import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const login = createAsyncThunk(
    EndPoints.login,
    async (payload, { rejectWithValue }) => {
        try {
            const timeZoneOffset= new Date().getTimezoneOffset() 
            const response = await Api.login({...payload,timeZoneOffset});
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const LoginSlice = createSlice({
    name: EndPoints.login,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [login.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [login.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetLoginApiError(state, action) {
            state.error = null
        },
        resetLoginApiStatus(state, action) {
            state.status = null
        },
        updateLoginDataFromSignUpResponse(state, action) {
            state.data = action.payload
        },
    }
})

export const { resetLoginApiError, resetLoginApiStatus, updateLoginDataFromSignUpResponse } = LoginSlice.actions
export default LoginSlice.reducer