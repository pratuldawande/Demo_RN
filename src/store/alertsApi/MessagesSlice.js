import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getMessages = createAsyncThunk(
    EndPoints.getMessages,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getMessages(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const MessagesSlice = createSlice({
    name: EndPoints.getMessages,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getMessages.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getMessages.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getMessages.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetMessagesApiError(state, action) {
            state.error = null
        },
        resetMessagesApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetMessagesApiError, resetMessagesApiStatus } = MessagesSlice.actions
export default MessagesSlice.reducer