import * as yup from 'yup';
import moment from 'moment';

export const loginValidation = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(/^[6-9]\d{9}$/i, 'Oops, Please enter valid 10 digit phone number')
    .required('Phone Number is required'),
});
