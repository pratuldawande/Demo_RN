import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getUnReadMessages = createAsyncThunk(
    EndPoints.getUnReadMessages,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getUnReadMessages(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UnReadMessagesSlice = createSlice({
    name: EndPoints.getUnReadMessages,
    initialState: {
        data: [],
        messages: [],
        status: null,
        error: null
    },
    extraReducers: {
        [getUnReadMessages.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getUnReadMessages.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getUnReadMessages.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUnReadMessagesApiError(state, action) {
            state.error = null
        },
        resetUnReadMessagesApiStatus(state, action) {
            state.status = null
        },
        updateMessages(state, action) {
            state.messages = action.payload
        },
    }
})

export const { resetUnReadMessagesApiError, resetUnReadMessagesApiStatus, updateMessages } = UnReadMessagesSlice.actions
export default UnReadMessagesSlice.reducer