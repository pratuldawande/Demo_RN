import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const sendMessages = createAsyncThunk(
    EndPoints.sendMessages,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.sendMessages(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const SendMessagesSlice = createSlice({
    name: EndPoints.sendMessages,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [sendMessages.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [sendMessages.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [sendMessages.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetSendMessagesApiError(state, action) {
            state.error = null
        },
        resetSendMessagesApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetSendMessagesApiError, resetSendMessagesApiStatus } = SendMessagesSlice.actions
export default SendMessagesSlice.reducer