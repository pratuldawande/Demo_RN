import { googleRequest, request } from "./ApiRequest"
import { EndPoints } from "./ApiEndPoints";
import { methodTypeDelete, methodTypeGet, methodTypePatch, methodTypePost } from "../constants/StringConstants";

export const Api = {
    login: (body) => {
        return request({ endPoint: EndPoints.login, method: methodTypePost, body: body })
    },
    signup: (body) => {
        return request({ endPoint: EndPoints.signup, method: methodTypePost, body: body })
    },
    updateUser: (body) => {
        return request({ endPoint: EndPoints.updateUser, method: methodTypePatch, body: body })
    },
    getShiftsList: (body) => {
        return request({ endPoint: EndPoints.getShiftsList, method: methodTypePost, body: body })
    },
    getShiftsFilter: (body) => {
        return request({ endPoint: EndPoints.getShiftsFilter, method: methodTypeGet, body: body })
    },
    getFacilityUpComingShifts: (body) => {
        return request({ endPoint: EndPoints.getFacilityUpComingShifts, method: methodTypePost, body: body })
    },
    getFacilityOverview: (id) => {
        return request({ endPoint: `${EndPoints.getFacilityOverview}${id}`, method: methodTypeGet })
    },
    getIdenticalShifts: (params) => {
        return request({ endPoint: EndPoints.getIdenticalShifts, method: methodTypeGet, params: params })
    },
    getBlockedShifts: (params) => {
        return request({ endPoint: EndPoints.getBlockedShifts, method: methodTypeGet, params: params })
    },
    acceptIdenticalShift: (body) => {
        return request({ endPoint: EndPoints.acceptIdenticalShift, method: methodTypePost, body: body })
    },
    acceptBlockedShift: (body) => {
        return request({ endPoint: EndPoints.acceptBlockedShift, method: methodTypePost, body: body })
    },
    getShiftDetails: (body) => {
        return request({ endPoint: EndPoints.getShiftDetails, method: methodTypePost, body: body })
    },
    getUserNotificationSettings: (id) => {
        return request({ endPoint: `${EndPoints.getUserNotificationSettings}${id}`, method: methodTypeGet })
    },
    updateUserNotificationSettings: (body) => {
        return request({ endPoint: EndPoints.updateUserNotificationSettings, method: methodTypePatch, body: body })
    },
    getUserProfileDetails: (id) => {
        return request({ endPoint: `${EndPoints.getUserProfileDetails}${id}`, method: methodTypeGet })
    },
    updateUserBio: (id, body) => {
        return request({ endPoint: `${EndPoints.updateUserBio}${id}`, method: methodTypePatch, body: body })
    },
    updateUserAvatar: (id, body) => {
        return request({ endPoint: `${EndPoints.updateUserAvatar}${id}`, method: methodTypePost, body: body })
    },
    getStafferProfileDocuments: (id) => {
        return request({ endPoint: `${EndPoints.getStafferProfileDocuments}${id}`, method: methodTypeGet })
    },
    stafferProfileDocumentsSubmit: (body) => {
        return request({ endPoint: EndPoints.stafferProfileDocumentsSubmit, method: methodTypePost, body: body })
    },
    deleteStafferProfileDocument: (id) => {
        return request({ endPoint: `${EndPoints.deleteStafferProfileDocument}${id}`, method: methodTypeDelete })
    },
    updateStafferProfileDocument: (id) => {
        return request({ endPoint: `${EndPoints.updateStafferProfileDocument}${id}`, method: methodTypePatch })
    },
    stafferProfileBonusDocumentSubmit: (body) => {
        return request({ endPoint: EndPoints.stafferProfileBonusDocumentSubmit, method: methodTypePost, body: body })
    },
    deleteStafferProfileBonusDocument: (id) => {
        return request({ endPoint: `${EndPoints.deleteStafferProfileBonusDocument}${id}`, method: methodTypeDelete })
    },
    changeProfileCompleteStatus: (body) => {
        return request({ endPoint: EndPoints.changeProfileCompleteStatus, method: methodTypePatch, body: body })
    },
    getScheduleShifts: (id,timeZoneOffset) => {
        return request({ endPoint: `${EndPoints.getScheduleShifts}${id}?timeZoneOffset=${timeZoneOffset}`, method: methodTypeGet })
    },
    getShiftTimeLine: (body) => {
        return request({ endPoint: EndPoints.getShiftTimeLine, method: methodTypePost, body: body })
    },
    shiftClockIn: (body) => {
        return request({ endPoint: EndPoints.shiftClockIn, method: methodTypePost, body: body })
    },
    shiftClockOut: (body) => {
        return request({ endPoint: EndPoints.shiftClockOut, method: methodTypePost, body: body })
    },
    shiftTakeBreak: (body) => {
        return request({ endPoint: EndPoints.shiftTakeBreak, method: methodTypePost, body: body })
    },
    shiftResume: (body) => {
        return request({ endPoint: EndPoints.shiftResume, method: methodTypePost, body: body })
    },
    shiftRating: (body) => {
        return request({ endPoint: EndPoints.shiftRating, method: methodTypePost, body: body })
    },
    shiftCalledOff: (body) => {
        return request({ endPoint: EndPoints.shiftCalledOff, method: methodTypePost, body: body })
    },
    getStatsTiles: (params) => {
        return request({ endPoint: EndPoints.getStatsTiles, method: methodTypeGet, params: params })
    },
    getEarningHours: (id, params) => {
        return request({ endPoint: `${EndPoints.getEarningHours}${id}`, method: methodTypeGet, params: params })
    },
    getGraph: (id, params) => {
        return request({ endPoint: `${EndPoints.getGraph}${id}`, method: methodTypeGet, params: params })
    },
    getNotifications: (params) => {
        return request({ endPoint: EndPoints.notifications, method: methodTypeGet, params: params })
    },
    deleteNotification: (body) => {
        return request({ endPoint: EndPoints.notifications, method: methodTypeDelete, body: body })
    },
    updateNotification: (body) => {
        return request({ endPoint: EndPoints.notifications, method: methodTypePatch, body: body })
    },
    getMessages: (body) => {
        return request({ endPoint: EndPoints.getMessages, method: methodTypePost, body: body })
    },
    sendMessages: (body) => {
        return request({ endPoint: EndPoints.sendMessages, method: methodTypePost, body: body })
    },
    deleteChat: (id, chatId) => {
        return request({ endPoint: `${EndPoints.getMessages}${id}/${chatId}`, method: methodTypeDelete })
    },
    getUnReadMessages: (body) => {
        return request({ endPoint: EndPoints.getUnReadMessages, method: methodTypePost, body: body })
    },
    reportChat: (body) => {
        return request({ endPoint: EndPoints.reportChat, method: methodTypePatch, body: body })
    },
    resetPassword: (body) => {
        return request({ endPoint: EndPoints.resetPassword, method: methodTypePost, body: body })
    },
    geoCode: (params) => {
        return googleRequest({ endPoint: EndPoints.geoCode, params: params })
    },
    messageGigworx: (body) => {
        return request({ endPoint: EndPoints.messageGigworx, method: methodTypePost, body: body })
    },
    getAppVersion: (platformType) => {
        return request({ endPoint: `${EndPoints.getAppVersion}${platformType}`, method: methodTypeGet })
    },
    requestOTP: (params) => {
        return request({ endPoint: `${EndPoints.forgotPasswordOtp}`, params: params, method: methodTypeGet })
    },
    updatePasswordWithOTP: (body) => {
        return request({ endPoint: `${EndPoints.forgotPasswordOtp}`, body: body, method: methodTypePost })
    },
    checkEmail: (body) => {
        return request({ endPoint: EndPoints.checkEmail, body: body, method: methodTypePost })
    },
    deleteProfile: (id) => {
        return request({ endPoint: `${EndPoints.deleteProfile}${id}`, method: methodTypeDelete })
    },
    locationOffset: (params) => {
        return googleRequest({ endPoint: EndPoints.locationOffset, params: params })
    },
}