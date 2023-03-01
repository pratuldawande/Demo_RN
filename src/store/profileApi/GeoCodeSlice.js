import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const geoCode = createAsyncThunk(
    EndPoints.geoCode,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.geoCode(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const GeoCodeSlice = createSlice({
    name: EndPoints.geoCode,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [geoCode.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [geoCode.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [geoCode.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetGeoCodeApiError(state, action) {
            state.error = null
        },
        resetGeoCodeApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetGeoCodeApiError, resetGeoCodeApiStatus } = GeoCodeSlice.actions
export default GeoCodeSlice.reducer