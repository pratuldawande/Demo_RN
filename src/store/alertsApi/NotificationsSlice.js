import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess,
    notificationsDefaultPageNumber,
} from '../../constants/StringConstants';

export const getNotifications = createAsyncThunk(
    EndPoints.notifications,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getNotifications(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const NotificationsSlice = createSlice({
    name: EndPoints.notifications,
    initialState: {
        alertData: [],
        trashData: [],
        alertFiltersData: [],
        data: null,
        status: null,
        error: null,
        isAlertsApi: true,
        isAlertsNextPageExist: true,
        isTrashNextPageExist: true,
        alertsPageNumber: notificationsDefaultPageNumber,
        trashPageNumber: notificationsDefaultPageNumber,
    },
    extraReducers: {
        [getNotifications.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getNotifications.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
            const data = action.payload
            if (state.isAlertsApi) {
                if (data.page == data.totalPages)
                    state.isAlertsNextPageExist = false
                else {
                    state.isAlertsNextPageExist = true
                    state.alertsPageNumber += 1
                }
                state.alertData = [...state.alertData, ...data.data]
            } else {
                if (data.page == data.totalPages)
                    state.isTrashNextPageExist = false
                else {
                    state.isTrashNextPageExist = true
                    state.trashPageNumber += 1
                }
                state.trashData = [...state.trashData, ...data.data]
            }
        },
        [getNotifications.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetNotificationsApiError(state, action) {
            state.error = null
        },
        resetNotificationsApiStatus(state, action) {
            state.status = null
        },
        updateAlertsFilterData(state, action) {
            state.alertFiltersData = action.payload
        },
        updateTypeOfApiCalledEitherAlertsOrTrash(state, action) {
            state.isAlertsApi = action.payload
        },
        updateAlertsData(state, action) {
            state.alertData = action.payload
        },
        updateTrashData(state, action) {
            state.trashData = action.payload
        },
        resetAlertData(state, action) {
            state.isAlertsNextPageExist = true
            state.alertsPageNumber = notificationsDefaultPageNumber
            state.alertData = []
        },
        resetTrashData(state, action) {
            state.isTrashNextPageExist = true
            state.trashPageNumber = notificationsDefaultPageNumber
            state.trashData = []
        },
    }
})

export const {
    resetNotificationsApiError,
    resetNotificationsApiStatus,
    updateAlertsFilterData,
    updateTypeOfApiCalledEitherAlertsOrTrash,
    updateAlertsData,
    updateTrashData,
    resetAlertData,
    resetTrashData,
} = NotificationsSlice.actions
export default NotificationsSlice.reducer