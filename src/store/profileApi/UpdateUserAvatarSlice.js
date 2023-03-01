import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EndPoints } from '../../api/ApiEndPoints';
import {
    apiStatusFailed,
    apiStatusLoading,
    apiStatusSuccess,
    methodTypePost,
    HEADERS_TOKEN
} from '../../constants/StringConstants';
import { BaseUrl } from '../../api/ApiEndPoints';
import AppAsyncStorage from '../../util/AppAsyncStorage'

export const updateUserAvatar = createAsyncThunk(
    EndPoints.updateUserAvatar,
    async (payload, { rejectWithValue }) => {
        try {
            const { image, id, key } = payload;
            const imageData = new FormData()
            imageData.append("image", {
                uri: image.path,
                name: 'image.filename',
                type: "image/jpeg",
                key: key,
            })
            const header = await AppAsyncStorage.getValue(HEADERS_TOKEN);
            let commonHeader = {};
            if (header !== null) {
                const headerTokens = JSON.parse(header);
                commonHeader = {
                    Authorization: 'Bearer ' + headerTokens.accessToken,
                    'Refresh-Token': headerTokens.refreshToken,
                };
            }

            const response = await fetch(`${BaseUrl.baseUrl}${EndPoints.updateUserAvatar}${id}`, {
                headers: commonHeader,
                method: methodTypePost,
                body: imageData,
            }).then((response) => response.json())

            if (response.code === 200) {
                return response
            } else {
                return rejectWithValue(response)
            }

        } catch (error) {
            return rejectWithValue(JSON.stringify(error))
        }
    },
);

const UpdateUserAvatarSlice = createSlice({
    name: EndPoints.updateUserAvatar,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [updateUserAvatar.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [updateUserAvatar.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [updateUserAvatar.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetUpdateUserAvatarApiError(state, action) {
            state.error = null
        },
        resetUpdateUserAvatarApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetUpdateUserAvatarApiError, resetUpdateUserAvatarApiStatus } = UpdateUserAvatarSlice.actions
export default UpdateUserAvatarSlice.reducer