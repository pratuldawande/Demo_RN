import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const reportChat = createAsyncThunk(
    EndPoints.reportChat,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.reportChat(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ReportChatSlice = createSlice({
    name: EndPoints.reportChat,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [reportChat.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [reportChat.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [reportChat.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetReportChatApiError(state, action) {
            state.error = null
        },
        resetReportChatApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetReportChatApiError, resetReportChatApiStatus } = ReportChatSlice.actions
export default ReportChatSlice.reducer