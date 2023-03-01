import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getStafferProfileDocuments = createAsyncThunk(
    EndPoints.getStafferProfileDocuments,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getStafferProfileDocuments(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const StafferProfileDocumentsSlice = createSlice({
    name: EndPoints.getStafferProfileDocuments,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getStafferProfileDocuments.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getStafferProfileDocuments.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getStafferProfileDocuments.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetStafferProfileDocumentsApiError(state, action) {
            state.error = null
        },
        resetStafferProfileDocumentsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetStafferProfileDocumentsApiError, resetStafferProfileDocumentsApiStatus } = StafferProfileDocumentsSlice.actions
export default StafferProfileDocumentsSlice.reducer