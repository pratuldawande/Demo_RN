import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const messageGigworx = createAsyncThunk(
    EndPoints.messageGigworx,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.messageGigworx(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const MessageGigworxSlice = createSlice({
    name: EndPoints.messageGigworx,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [messageGigworx.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [messageGigworx.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [messageGigworx.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetMessageGigworxApiError(state, action) {
            state.error = null
        },
        resetMessageGigworxApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetMessageGigworxApiError, resetMessageGigworxApiStatus } = MessageGigworxSlice.actions
export default MessageGigworxSlice.reducer