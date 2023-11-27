import { AxiosResponse } from 'axios';
import apiInstance  from "../../utils/createAxioInstance";
import { PostRegisterData, PostLoginData, PostChangePWData, PostConfirmVerify, PostVerifyEmail } from "./types"

export async function postRegisterRequest(postRegisterData: PostRegisterData): Promise<void> {
  try {
    const response: AxiosResponse = await apiInstance.post('/api/auth/register', postRegisterData);
    console.log('POST 요청 성공:', response.data);
  } catch (error) {
    console.error('POST 요청 오류:', error);
  }
}

export async function postdLoginRequest(postLoginData: PostLoginData): Promise<void> {
  try {
    const response: AxiosResponse = await apiInstance.post('/api/auth/login', postLoginData);
    console.log('POST 요청 성공:', response.data);
    localStorage.setItem('token', response.data.access_token);
  } catch (error) {
    console.error('POST 요청 오류:', error);
  }
}

export async function postChangePasswordRequest(postChangePWData: PostChangePWData): Promise<void> {
  try {
    const response: AxiosResponse = await apiInstance.post('/api/auth/changepw', postChangePWData);
    console.log('POST 요청 성공:', response.data);
  } catch (error) {
    console.error('POST 요청 오류:', error);
  }
}

export async function getProfile(): Promise<AxiosResponse | undefined> {
  try {
    const response: AxiosResponse = await apiInstance.get('/api/auth/profile');
    return response;
  } catch (error) {
    console.error('GET Profile', error);
    return undefined; // 에러 발생 시 undefined 반환
  }
}

export async function postVerifyEmailRequest(postVerifyEmail: PostVerifyEmail): Promise<AxiosResponse | undefined> {
  try {
    const response: AxiosResponse = await apiInstance.post('/api/auth/verifyemail', postVerifyEmail);
    console.log('POST 요청 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('POST 요청 오류:', error);
    return undefined;
  }
}

export async function postConfirmVerifyRequest(postConfirmVerify: PostConfirmVerify): Promise<AxiosResponse | undefined> {
  try {
    const response: AxiosResponse = await apiInstance.post('/api/auth/confirm-verifyemail', postConfirmVerify);
    console.log('POST 요청 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('POST 요청 오류:', error);
    return undefined;
  }
}