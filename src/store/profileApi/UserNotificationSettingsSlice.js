import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getUserNotificationSettings = createAsyncThunk(
    EndPoints.getUserNotificationSettings,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getUserNotificationSettings(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UserNotificationSettingsSlice = createSlice({
    name: EndPoints.getUserNotificationSettings,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getUserNotificationSettings.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getUserNotificationSettings.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getUserNotificationSettings.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUserNotificationSettingsApiError(state, action) {
            state.error = null
        },
        resetUserNotificationSettingsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUserNotificationSettingsApiError, resetUserNotificationSettingsApiStatus } = UserNotificationSettingsSlice.actions
export default UserNotificationSettingsSlice.reducer