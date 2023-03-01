import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess,
    UPDATE_NOTIFICATIONS_SLICE
} from '../../constants/StringConstants';

export const updateNotification = createAsyncThunk(
    UPDATE_NOTIFICATIONS_SLICE,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.updateNotification(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UpdateNotificationSlice = createSlice({
    name: UPDATE_NOTIFICATIONS_SLICE,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [updateNotification.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [updateNotification.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [updateNotification.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUpdateNotificationApiError(state, action) {
            state.error = null
        },
        resetUpdateNotificationApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUpdateNotificationApiError, resetUpdateNotificationApiStatus } = UpdateNotificationSlice.actions
export default UpdateNotificationSlice.reducer