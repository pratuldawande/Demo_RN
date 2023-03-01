import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const changeProfileCompleteStatus = createAsyncThunk(
    EndPoints.changeProfileCompleteStatus,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.changeProfileCompleteStatus(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const ChangeProfileCompleteStatusSlice = createSlice({
    name: EndPoints.changeProfileCompleteStatus,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [changeProfileCompleteStatus.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [changeProfileCompleteStatus.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [changeProfileCompleteStatus.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetChangeProfileCompleteStatusApiError(state, action) {
            state.error = null
        },
        resetChangeProfileCompleteStatusApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetChangeProfileCompleteStatusApiError, resetChangeProfileCompleteStatusApiStatus } = ChangeProfileCompleteStatusSlice.actions
export default ChangeProfileCompleteStatusSlice.reducer