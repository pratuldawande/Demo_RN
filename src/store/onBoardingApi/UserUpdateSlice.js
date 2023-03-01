import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess
} from '../../constants/StringConstants';

export const userUpdate = createAsyncThunk(
    EndPoints.updateUser,
    async (payload, { rejectWithValue }) => {
        try {
            const response = await Api.updateUser(payload);
            return response;
        } catch (error) {
            return rejectWithValue(error)
        }
    },
);

const UserUpdateSlice = createSlice({
    name: EndPoints.updateUser,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [userUpdate.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [userUpdate.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [userUpdate.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUserUpdateApiError(state, action) {
            state.error = null
        },
        resetUserUpdateApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUserUpdateApiError, resetUserUpdateApiStatus } = UserUpdateSlice.actions
export default UserUpdateSlice.reducer