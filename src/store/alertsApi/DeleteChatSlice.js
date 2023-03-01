import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess,
    DELETE_CHAT_SLICE
} from '../../constants/StringConstants';

export const deleteChat = createAsyncThunk(
    DELETE_CHAT_SLICE,
    async (payload, { rejectWithValue }) => {
        try {
            const { id, chatId } = payload
            const response = await Api.deleteChat(id, chatId);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const DeleteChatSlice = createSlice({
    name: DELETE_CHAT_SLICE,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [deleteChat.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [deleteChat.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [deleteChat.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetDeleteChatApiError(state, action) {
            state.error = null
        },
        resetDeleteChatApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetDeleteChatApiError, resetDeleteChatApiStatus } = DeleteChatSlice.actions
export default DeleteChatSlice.reducer