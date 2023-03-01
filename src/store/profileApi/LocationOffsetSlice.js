import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const locationOffset = createAsyncThunk(
    EndPoints.locationOffset,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.locationOffset(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const LocationOffsetSlice = createSlice({
    name: EndPoints.locationOffset,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [locationOffset.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [locationOffset.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [locationOffset.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetLocationOffsetApiError(state, action) {
            state.error = null
        },
        resetLocationOffsetApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetLocationOffsetApiError, resetLocationOffsetApiStatus } = LocationOffsetSlice.actions
export default LocationOffsetSlice.reducer