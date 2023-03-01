import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const getUserProfileDetails = createAsyncThunk(
    EndPoints.getUserProfileDetails,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.getUserProfileDetails(payload);
            const data = response?.data;
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UserProfileDetailsSlice = createSlice({
    name: EndPoints.getUserProfileDetails,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [getUserProfileDetails.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [getUserProfileDetails.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [getUserProfileDetails.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUserProfileDetailsApiError(state, action) {
            state.error = null
        },
        resetUserProfileDetailsApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUserProfileDetailsApiError, resetUserProfileDetailsApiStatus } = UserProfileDetailsSlice.actions
export default UserProfileDetailsSlice.reducer