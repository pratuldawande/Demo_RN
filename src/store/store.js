import { configureStore } from '@reduxjs/toolkit';

import SignupSlice from './signup/SignupSlice';
import CalendarSlice from './schedule/CalendarSlice';
import ShiftsListSlice from './shiftsApi/ShiftsListSlice';
import ShiftsFilterSlice from './shiftsApi/ShiftsFilterSlice';
import FacilityUpComingShiftsSlice from './shiftsApi/FacilityUpComingShiftsSlice';
import FacilityOverviewSlice from './shiftsApi/FacilityOverviewSlice';
import IdenticalShiftsSlice from './shiftsApi/IdenticalShiftsSlice';
import BlockedShiftsSlice from './shiftsApi/BlockedShiftsSlice';
import AcceptIdenticalShiftSlice from './shiftsApi/AcceptIdenticalShiftSlice';
import AcceptBlockedShiftSlice from './shiftsApi/AcceptBlockedShiftSlice';
import ShiftDetailsSlice from './shiftsApi/ShiftDetailsSlice';
import LoginSlice from './onBoardingApi/LoginSlice';
import SignUpSlice from './onBoardingApi/SignUpSlice';
import UserUpdateSlice from './onBoardingApi/UserUpdateSlice';
import UserNotificationSettingsSlice from './profileApi/UserNotificationSettingsSlice';
import UpdateUserNotificationSettingsSlice from './profileApi/UpdateUserNotificationSettingsSlice';
import UserProfileDetailsSlice from './profileApi/UserProfileDetailsSlice';
import UpdateUserBioSlice from './profileApi/UpdateUserBioSlice';
import UpdateUserAvatarSlice from './profileApi/UpdateUserAvatarSlice';
import StafferProfileDocumentsSlice from './profileApi/StafferProfileDocumentsSlice';
import StafferProfileDocumentsSubmitSlice from './profileApi/StafferProfileDocumentsSubmitSlice';
import DeleteStafferProfileDocumentSlice from './profileApi/DeleteStafferProfileDocumentSlice';
import UpdateStafferProfileDocumentSlice from './profileApi/UpdateStafferProfileDocumentSlice';
import StafferProfileBonusDocumentSubmitSlice from './profileApi/StafferProfileBonusDocumentSubmitSlice';
import DeleteStafferProfileBonusDocumentSlice from './profileApi/DeleteStafferProfileBonusDocumentSlice';
import ChangeProfileCompleteStatusSlice from './profileApi/ChangeProfileCompleteStatusSlice';
import ScheduleShiftsSlice from './scheduleApi/ScheduleShiftsSlice';
import ShiftTimeLineSlice from './scheduleApi/ShiftTimeLineSlice';
import ShiftClockInSlice from './scheduleApi/ShiftClockInSlice';
import ShiftClockOutSlice from './scheduleApi/ShiftClockOutSlice';
import ShiftTakeBreakSlice from './scheduleApi/ShiftTakeBreakSlice';
import ShiftResumeSlice from './scheduleApi/ShiftResumeSlice';
import ShiftRatingSlice from './scheduleApi/ShiftRatingSlice';
import ShiftCalledOffSlice from './scheduleApi/ShiftCalledOffSlice';
import StatsTilesSlice from './statsApi/StatsTilesSlice';
import EarningHoursSlice from './statsApi/EarningHoursSlice';
import GraphSlice from './statsApi/GraphSlice';
import NotificationsSlice from './alertsApi/NotificationsSlice';
import DeleteNotificationSlice from './alertsApi/DeleteNotificationSlice';
import MessagesSlice from './alertsApi/MessagesSlice';
import SendMessageSlice from './alertsApi/SendMessageSlice';
import DeleteChatSlice from './alertsApi/DeleteChatSlice';
import UpdateNotificationSlice from './alertsApi/UpdateNotificationSlice';
import UnReadMessagesSlice from './alertsApi/UnReadMessagesSlice';
import ReportChatSlice from './alertsApi/ReportChatSlice';
import ResetPasswordSlice from './onBoardingApi/ResetPasswordSlice';
import GeoCodeSlice from './profileApi/GeoCodeSlice';
import MessageGigworxSlice from './alertsApi/MessageGigworxSlice';
import AppVersionSlice from './onBoardingApi/AppVersionSlice';
import RequestOTPSlice from './onBoardingApi/RequestOTPSlice';
import UpdatePasswordWithOTPSlice from './onBoardingApi/UpdatePasswordWithOTPSlice';
import CheckEmailSlice from './onBoardingApi/CheckEmailSlice'
import DeleteProfileSlice from './profileApi/DeleteUserSlice'
import LocationOffsetSlice from './profileApi/LocationOffsetSlice';

export const store = configureStore({
    reducer: {
        signup: SignupSlice,
        calendar: CalendarSlice,

        shiftsListApi: ShiftsListSlice,
        shiftsFilterApi: ShiftsFilterSlice,
        facilityUpComingShiftsApi: FacilityUpComingShiftsSlice,
        facilityOverviewApi: FacilityOverviewSlice,
        identicalShiftsApi: IdenticalShiftsSlice,
        blockedShiftsApi: BlockedShiftsSlice,
        acceptIdenticalShiftApi: AcceptIdenticalShiftSlice,
        acceptBlockedShiftApi: AcceptBlockedShiftSlice,
        shiftDetailsApi: ShiftDetailsSlice,

        loginApi: LoginSlice,
        signUpApi: SignUpSlice,
        userUpdateApi: UserUpdateSlice,
        resetPasswordApi: ResetPasswordSlice,
        appVersionApi: AppVersionSlice,
        requestOTPApi: RequestOTPSlice,
        updatePasswordWithOTPApi: UpdatePasswordWithOTPSlice,

        userNotificationSettingsApi: UserNotificationSettingsSlice,
        updateUserNotificationSettingsApi: UpdateUserNotificationSettingsSlice,
        userProfileDetailsApi: UserProfileDetailsSlice,
        updateUserBioApi: UpdateUserBioSlice,
        updateUserAvatarApi: UpdateUserAvatarSlice,
        stafferProfileDocumentsApi: StafferProfileDocumentsSlice,
        stafferProfileDocumentsSubmitApi: StafferProfileDocumentsSubmitSlice,
        deleteStafferProfileDocumentApi: DeleteStafferProfileDocumentSlice,
        updateStafferProfileDocumentApi: UpdateStafferProfileDocumentSlice,
        stafferProfileBonusDocumentSubmitApi: StafferProfileBonusDocumentSubmitSlice,
        deleteStafferProfileBonusDocumentApi: DeleteStafferProfileBonusDocumentSlice,
        changeProfileCompleteStatusApi: ChangeProfileCompleteStatusSlice,
        geoCodeApi: GeoCodeSlice,

        scheduleShiftsApi: ScheduleShiftsSlice,
        shiftTimeLineApi: ShiftTimeLineSlice,
        shiftClockInApi: ShiftClockInSlice,
        shiftClockOutApi: ShiftClockOutSlice,
        shiftTakeBreakApi: ShiftTakeBreakSlice,
        shiftResumeApi: ShiftResumeSlice,
        shiftRatingApi: ShiftRatingSlice,
        shiftCalledOff: ShiftCalledOffSlice,

        statsTilesApi: StatsTilesSlice,
        earningHoursApi: EarningHoursSlice,
        graphApi: GraphSlice,

        notificationsApi: NotificationsSlice,
        deleteNotificationApi: DeleteNotificationSlice,
        updateNotificationApi: UpdateNotificationSlice,
        messagesApi: MessagesSlice,
        sendMessagesApi: SendMessageSlice,
        deleteChatApi: DeleteChatSlice,
        unReadMessagesApi: UnReadMessagesSlice,
        reportChatApi: ReportChatSlice,
        messageGigworxApi: MessageGigworxSlice,
        checkEmailApi:CheckEmailSlice,
        deleteProfileApi:DeleteProfileSlice,
        locationOffsetApi:LocationOffsetSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})