import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const deleteStafferProfileDocument = createAsyncThunk(
    EndPoints.deleteStafferProfileDocument,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.deleteStafferProfileDocument(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const DeleteStafferProfileDocumentSlice = createSlice({
    name: EndPoints.deleteStafferProfileDocument,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [deleteStafferProfileDocument.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [deleteStafferProfileDocument.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [deleteStafferProfileDocument.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetDeleteStafferProfileDocumentApiError(state, action) {
            state.error = null
        },
        resetDeleteStafferProfileDocumentApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetDeleteStafferProfileDocumentApiError, resetDeleteStafferProfileDocumentApiStatus } = DeleteStafferProfileDocumentSlice.actions
export default DeleteStafferProfileDocumentSlice.reducer