import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const deleteStafferProfileBonusDocument = createAsyncThunk(
    EndPoints.deleteStafferProfileBonusDocument,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.deleteStafferProfileBonusDocument(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const DeleteStafferProfileBonusDocumentSlice = createSlice({
    name: EndPoints.deleteStafferProfileBonusDocument,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [deleteStafferProfileBonusDocument.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [deleteStafferProfileBonusDocument.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [deleteStafferProfileBonusDocument.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetDeleteStafferProfileBonusDocumentApiError(state, action) {
            state.error = null
        },
        resetDeleteStafferProfileBonusDocumentApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetDeleteStafferProfileBonusDocumentApiError, resetDeleteStafferProfileBonusDocumentApiStatus } = DeleteStafferProfileBonusDocumentSlice.actions
export default DeleteStafferProfileBonusDocumentSlice.reducer