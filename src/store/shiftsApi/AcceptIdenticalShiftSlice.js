import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const acceptIdenticalShift = createAsyncThunk(
    EndPoints.acceptIdenticalShift,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.acceptIdenticalShift(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const AcceptIdenticalShiftSlice = createSlice({
    name: EndPoints.acceptIdenticalShift,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [acceptIdenticalShift.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [acceptIdenticalShift.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [acceptIdenticalShift.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetAcceptIdenticalShiftApiError(state, action) {
            state.error = null
        },
        resetAcceptIdenticalShiftApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetAcceptIdenticalShiftApiError, resetAcceptIdenticalShiftApiStatus } = AcceptIdenticalShiftSlice.actions
export default AcceptIdenticalShiftSlice.reducer