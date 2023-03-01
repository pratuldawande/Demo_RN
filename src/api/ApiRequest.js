import axios from "axios";
import { BaseUrl, GeoCodeBaseUrl } from "./ApiEndPoints";
import { geoCodeStatusMessage_OK, REQUEST_ISSUE, RESPONSE_ISSUE, HEADERS_TOKEN } from "../constants/StringConstants";
import { methodTypeGet, methodTypePost } from "../constants/StringConstants";
import AppAsyncStorage from '../util/AppAsyncStorage'

const headerTokens = {
    accessToken: null,
    refreshToken: null
}

export async function request({ endPoint, body, headers, method, params }) {
    const baseHeaders = { 'Content-Type': 'application/json' }
    const commonHeader = {
        'Authorization': 'Bearer ' + headerTokens.accessToken,
        'Refresh-Token': headerTokens.refreshToken
    };
    return new Promise((resolve, reject) => {
        axios({
            url: BaseUrl.baseUrl + endPoint,
            method: method || (body ? methodTypePost : methodTypeGet),
            headers: {
                ...commonHeader,
                ...headers,
                ...baseHeaders
            },
            params,
            data: JSON.stringify(body)
        }).then(async (response) => {
            if (response.data?.data?.accessToken !== undefined) {
                headerTokens.accessToken = response?.data?.data?.accessToken
                headerTokens.refreshToken = response?.data?.data?.refreshToken
                await AppAsyncStorage.setValue(HEADERS_TOKEN, JSON.stringify(headerTokens))
            } else if (response.headers?.access_token !== undefined) {
                headerTokens.accessToken = response.headers?.access_token
                headerTokens.refreshToken = response.headers?.refresh_token
                await AppAsyncStorage.setValue(HEADERS_TOKEN, JSON.stringify(headerTokens))
            }
            resolve(response.data);
        }).catch((error) => {
            if (error.response) {
                // internal server error
                let errorObj = {
                    errorType: RESPONSE_ISSUE,
                    errorBody: error.response.data,
                    ErrorStatus: error.request.status,
                };
                reject(errorObj);
            } else if (error.request) {
                // request time out network error
                let errorObj = {
                    errorType: REQUEST_ISSUE,
                    errorBody: error._response,
                    ErrorStatus: error.request.status,
                };
                reject(errorObj);
            }
        })
    })
}

export async function googleRequest({ endPoint, params }) {

    const commonHeader = {
        'Content-Type': 'application/json',
    };

    return new Promise((resolve, reject) => {
        axios({
            url: GeoCodeBaseUrl.baseUrl + endPoint,
            method: methodTypeGet,
            headers: commonHeader,
            params,
        }).then((response) => {
            const data = response.data
            if (data.status === geoCodeStatusMessage_OK)
                resolve(data);
            else
                reject(data)
        }).catch((error) => {
            reject(error)
        })
    })
}