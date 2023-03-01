import { createSlice } from '@reduxjs/toolkit';
import { defaultDistanceAwayFromHome, defaultLowestRate } from '../../constants/StringConstants';
import { getStartDate } from '../../util/date';

const CalendarSlice = createSlice({
    name: 'calendarState',
    initialState: {
        userSelectedDate: "0-" + ((new Date().getDate() - 1) + getStartDate(new Date())),
        shiftFilterResults: {
            currentLocation: true,
            count: 0,
            ratelowest: defaultLowestRate,
            rateHigest: '',
            shiftHoursFrom: '',
            shiftHoursTo: '',
            preferedDaysInText: '',
            preferedDaysInRadioButtons: [],
            distanceAway: defaultDistanceAwayFromHome,
            filterApplyed:false
        },
        calendarData: [],
        identicalShiftsCalendarData: [],
        blockedShiftsCalendarData: [],
        scheduleShiftsCalendarData: [],
        acceptMutilIdenticalShifts: {
            status: false,
            body: [],
        },
        displayShiftCalledOffDialog: false,
        userLocation: {},
    },
    reducers: {
        selectedDate(state, action) {
            state.userSelectedDate = action.payload;
        },
        updateShiftFilterResults(state, action) {
            state.shiftFilterResults = action.payload;
        },
        updateCalendarData(state, action) {
            state.calendarData = action.payload
            state.identicalShiftsCalendarData = action.payload
            state.blockedShiftsCalendarData = action.payload
            state.scheduleShiftsCalendarData = action.payload
        },
        updateIdenticalShiftsCalendarData(state, action) {
            state.identicalShiftsCalendarData = action.payload
        },
        updateBlockedShiftsCalendarData(state, action) {
            state.blockedShiftsCalendarData = action.payload
        },
        updateScheduleShiftsCalendarData(state, action) {
            state.scheduleShiftsCalendarData = action.payload
        },
        updateAcceptMutilIdenticalShifts(state, action) {
            state.acceptMutilIdenticalShifts = action.payload
        },
        resetAcceptMutilIdenticalShifts(state, action) {
            state.acceptMutilIdenticalShifts = {
                status: false,
                body: [],
            }
        },
        updateShiftCalledOffDialog(state, action) {
            state.displayShiftCalledOffDialog = action.payload
        },
        updateUserLocation(state, action) {
            state.userLocation = action.payload
        }
    },
});

export const {
    selectedDate,
    updateShiftFilterResults,
    updateCalendarData,
    updateIdenticalShiftsCalendarData,
    updateBlockedShiftsCalendarData,
    updateScheduleShiftsCalendarData,
    updateAcceptMutilIdenticalShifts,
    resetAcceptMutilIdenticalShifts,
    updateShiftCalledOffDialog,
    updateUserLocation,
} = CalendarSlice.actions;
export default CalendarSlice.reducer;
