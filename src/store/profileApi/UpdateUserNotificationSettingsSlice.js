import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const updateUserNotificationSettings = createAsyncThunk(
    EndPoints.updateUserNotificationSettings,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.updateUserNotificationSettings(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UpdateUserNotificationSettingsSlice = createSlice({
    name: EndPoints.updateUserNotificationSettings,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [updateUserNotificationSettings.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [updateUserNotificationSettings.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [updateUserNotificationSettings.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUpdateUserNotificationSettingsApiError(state, action) {
            state.error = null
        },
        resetUpdateUserNotificationSettingsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUpdateUserNotificationSettingsApiError, resetUpdateUserNotificationSettingsApiStatus } = UpdateUserNotificationSettingsSlice.actions
export default UpdateUserNotificationSettingsSlice.reducer