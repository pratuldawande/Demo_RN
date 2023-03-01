import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getFacilityUpComingShifts = createAsyncThunk(
    EndPoints.getFacilityUpComingShifts,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getFacilityUpComingShifts(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const FacilityUpComingShiftsSlice = createSlice({
    name: EndPoints.getFacilityUpComingShifts,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getFacilityUpComingShifts.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getFacilityUpComingShifts.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getFacilityUpComingShifts.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetFacilityUpComingShiftsApiError(state, action) {
            state.error = null
        },
        resetFacilityUpComingShiftsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetFacilityUpComingShiftsApiError, resetFacilityUpComingShiftsApiStatus } = FacilityUpComingShiftsSlice.actions
export default FacilityUpComingShiftsSlice.reducer