import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getFacilityOverview = createAsyncThunk(
    EndPoints.getFacilityOverview,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getFacilityOverview(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const FacilityOverviewSlice = createSlice({
    name: EndPoints.getFacilityOverview,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getFacilityOverview.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getFacilityOverview.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getFacilityOverview.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetFacilityOverviewApiError(state, action) {
            state.error = null
        },
        resetFacilityOverviewApiStatus(state, action) {
            state.status = null
        }
    }
})

export const { resetFacilityOverviewApiError, resetFacilityOverviewApiStatus } = FacilityOverviewSlice.actions
export default FacilityOverviewSlice.reducer