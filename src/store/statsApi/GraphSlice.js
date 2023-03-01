import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getGraph = createAsyncThunk(
    EndPoints.getGraph,
    async (payload, { rejectWithValue }) => {
        try {
            const { userId, params } = payload
            const response = await Api.getGraph(userId, params);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const GraphSlice = createSlice({
    name: EndPoints.getGraph,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getGraph.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getGraph.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getGraph.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetGraphApiError(state, action) {
            state.error = null
        },
        resetGraphApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetGraphApiError, resetGraphApiStatus } = GraphSlice.actions
export default GraphSlice.reducer