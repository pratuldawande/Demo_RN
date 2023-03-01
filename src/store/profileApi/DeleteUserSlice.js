import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const deleteProfile = createAsyncThunk(
    EndPoints.deleteProfile,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.deleteProfile(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const DeleteProfileSlice = createSlice({
    name: EndPoints.deleteProfile,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [deleteProfile.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [deleteProfile.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [deleteProfile.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetdeleteProfileApiError(state, action) {
            state.error = null
        },
        resetdeleteProfileApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetdeleteProfileApiError, resetdeleteProfileApiStatus } = DeleteProfileSlice.actions
export default DeleteProfileSlice.reducer