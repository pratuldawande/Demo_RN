import {EndPoints} from './ApiEndPoints';
import {useMutation} from 'react-query';
import apiServices from './axios-service';

export const loginApi = async data => {
  const res = await apiServices.post(EndPoints.login, data);
  return res ? res.data : {};
};

export const useLogin = () => useMutation(data => loginApi(data));

export const verifyOTPApi = async data => {
  const res = await apiServices.put(`${EndPoints.verifyOTP}${data.id}`, {
    ...data.res,
  });
  return res ? res.data : {};
};

export const useVerifyOTP = () => useMutation(data => verifyOTPApi(data));
