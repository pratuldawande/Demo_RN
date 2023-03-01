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

export const stafferProfileBonusDocumentSubmit = createAsyncThunk(
    EndPoints.stafferProfileBonusDocumentSubmit,
    async (payload, { rejectWithValue }) => {
        try {
            const { image, values, stafferId } = payload;

            const formData = new FormData();
            formData.append('image', {
                uri: image.path,
                name: 'image.filename',
                type: 'image/jpeg',
            });
            formData.append('stafferId', stafferId);
            formData.append('expirationDate', values.date);
            formData.append('title', values.title);
            formData.append('status', 0);
            const header = await AppAsyncStorage.getValue(HEADERS_TOKEN);
            let commonHeader = {};
            if (header !== null) {
                const headerTokens = JSON.parse(header);
                commonHeader = {
                    Authorization: 'Bearer ' + headerTokens.accessToken,
                    'Refresh-Token': headerTokens.refreshToken,
                };
            }

            const response = await fetch(`${BaseUrl.baseUrl}${EndPoints.stafferProfileBonusDocumentSubmit}`, {
                headers: commonHeader,
                method: methodTypePost,
                body: formData,
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

const StafferProfileBonusDocumentSubmitSlice = createSlice({
    name: EndPoints.stafferProfileBonusDocumentSubmit,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [stafferProfileBonusDocumentSubmit.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [stafferProfileBonusDocumentSubmit.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [stafferProfileBonusDocumentSubmit.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetStafferProfileBonusDocumentSubmitApiError(state, action) {
            state.error = null
        },
        resetStafferProfileBonusDocumentSubmitApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetStafferProfileBonusDocumentSubmitApiError, resetStafferProfileBonusDocumentSubmitApiStatus } = StafferProfileBonusDocumentSubmitSlice.actions
export default StafferProfileBonusDocumentSubmitSlice.reducer