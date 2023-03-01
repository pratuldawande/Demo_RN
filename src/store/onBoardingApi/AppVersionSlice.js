import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess,
    getPlatformTypeEnumValue
} from '../../constants/StringConstants';

export const getAppVersion = createAsyncThunk(
    EndPoints.getAppVersion,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getAppVersion(getPlatformTypeEnumValue(payload));
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const AppVersionSlice = createSlice({
    name: EndPoints.getAppVersion,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getAppVersion.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getAppVersion.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getAppVersion.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetAppVersionApiError(state, action) {
            state.error = null
        },
        resetAppVersionApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetAppVersionApiError, resetAppVersionApiStatus } = AppVersionSlice.actions
export default AppVersionSlice.reducer