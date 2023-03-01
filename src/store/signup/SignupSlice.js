import { createSlice } from '@reduxjs/toolkit';

const SignupSlice = createSlice({
    name: 'signupState',
    initialState: {
        signupForm: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        zipcodeForm: {
            zipcode: '',
        },
        error: {
            requestId: '',
            message: '',
        },
    },
    reducers: {
        userSignupData(state, action) {
            state.signupForm = action.payload;
        },

        userZipcodeData(state, action) {
            state.zipcodeForm = { ...action.payload };
        },

        resetSignupData(state, action) {
            state.signupForm = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            };
            state.zipcodeForm = {
                zipcode: '',
            };
            state.error = {
                requestId: '',
                message: '',
            };
        },
    },
});

export const { userSignupData, userZipcodeData, resetSignupData } = SignupSlice.actions;
export default SignupSlice.reducer;
