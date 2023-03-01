import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess,
    DELETE_NOTIFICATIONS_SLICE
} from '../../constants/StringConstants';

export const deleteNotification = createAsyncThunk(
    DELETE_NOTIFICATIONS_SLICE,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.deleteNotification(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const DeleteNotificationSlice = createSlice({
    name: DELETE_NOTIFICATIONS_SLICE,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [deleteNotification.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [deleteNotification.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [deleteNotification.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetDeleteNotificationApiError(state, action) {
            state.error = null
        },
        resetDeleteNotificationApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetDeleteNotificationApiError, resetDeleteNotificationApiStatus } = DeleteNotificationSlice.actions
export default DeleteNotificationSlice.reducer