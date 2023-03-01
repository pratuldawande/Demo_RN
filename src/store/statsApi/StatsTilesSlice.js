import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getStatsTiles = createAsyncThunk(
    EndPoints.getStatsTiles,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getStatsTiles(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const StatsTilesSlice = createSlice({
    name: EndPoints.getStatsTiles,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getStatsTiles.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getStatsTiles.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getStatsTiles.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetStatsTilesApiError(state, action) {
            state.error = null
        },
        resetStatsTilesApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetStatsTilesApiError, resetStatsTilesApiStatus } = StatsTilesSlice.actions
export default StatsTilesSlice.reducer