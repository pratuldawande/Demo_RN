import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const updateUserBio = createAsyncThunk(
    EndPoints.updateUserBio,
    async (payload, { rejectWithValue }) => {
        try {
            const { id, bio } = payload
            const response = await Api.updateUserBio(id, { bio });
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UpdateUserBioSlice = createSlice({
    name: EndPoints.updateUserBio,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [updateUserBio.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [updateUserBio.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [updateUserBio.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUpdateUserBioApiError(state, action) {
            state.error = null
        },
        resetUpdateUserBioApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUpdateUserBioApiError, resetUpdateUserBioApiStatus } = UpdateUserBioSlice.actions
export default UpdateUserBioSlice.reducer