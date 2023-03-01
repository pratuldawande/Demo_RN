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
import { formatDate } from '../../util/date'

export const stafferProfileDocumentsSubmit = createAsyncThunk(
    EndPoints.stafferProfileDocumentsSubmit,
    async (payload, { rejectWithValue }) => {
        try {
            const { roleId, image, values, documentId, stafferId } = payload;

            const formData = new FormData();
            formData.append('image', {
                uri: image.path,
                name: 'image.filename',
                type: 'image/jpeg',
            });
            formData.append('stafferId', stafferId);
            formData.append('expirationDate', formatDate(values.date));
            formData.append('title', values.title);
            formData.append('jobRoleDocumentsRequiredId', documentId);
            formData.append('status', 0);
            formData.append('jobRoleId', roleId);
            const header = await AppAsyncStorage.getValue(HEADERS_TOKEN);
            let commonHeader = {};
            if (header !== null) {
                const headerTokens = JSON.parse(header);
                commonHeader = {
                    Authorization: 'Bearer ' + headerTokens.accessToken,
                    'Refresh-Token': headerTokens.refreshToken,
                };
            }

            const response = await fetch(`${BaseUrl.baseUrl}${EndPoints.stafferProfileDocumentsSubmit}`, {
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

const StafferProfileDocumentsSubmitSlice = createSlice({
    name: EndPoints.stafferProfileDocumentsSubmit,
    initialState: {
        data: null,
        status: null,
        error: null
    },
    extraReducers: {
        [stafferProfileDocumentsSubmit.pending]: (state, action) => {
            state.status = apiStatusLoading
        },
        [stafferProfileDocumentsSubmit.fulfilled]: (state, action) => {
            state.status = apiStatusSuccess
            state.data = action.payload
        },
        [stafferProfileDocumentsSubmit.rejected]: (state, action) => {
            state.status = apiStatusFailed
            state.error = action.payload
        },
    },
    reducers: {
        resetStafferProfileDocumentsSubmitApiError(state, action) {
            state.error = null
        },
        resetStafferProfileDocumentsSubmitApiStatus(state, action) {
            state.status = null
        },
    }
})

export const { resetStafferProfileDocumentsSubmitApiError, resetStafferProfileDocumentsSubmitApiStatus } = StafferProfileDocumentsSubmitSlice.actions
export default StafferProfileDocumentsSubmitSlice.reducer