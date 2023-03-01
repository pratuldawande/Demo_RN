import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const updateStafferProfileDocument = createAsyncThunk(
    EndPoints.updateStafferProfileDocument,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.updateStafferProfileDocument(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UpdateStafferProfileDocumentSlice = createSlice({
    name: EndPoints.updateStafferProfileDocument,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [updateStafferProfileDocument.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [updateStafferProfileDocument.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [updateStafferProfileDocument.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUpdateStafferProfileDocumentApiError(state, action) {
            state.error = null
        },
        resetUpdateStafferProfileDocumentApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUpdateStafferProfileDocumentApiError, resetUpdateStafferProfileDocumentApiStatus } = UpdateStafferProfileDocumentSlice.actions
export default UpdateStafferProfileDocumentSlice.reducer