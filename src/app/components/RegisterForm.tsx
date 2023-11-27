"use client"
import React, { useState } from 'react';
import Custombutton from './Custombutton';
import InputOneLine from './InputOneLine';
import { postConfirmVerifyRequest, postRegisterRequest, postVerifyEmailRequest } from '../apis/api/auth/auth';

const RegisterForm: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verifyCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postRegisterRequest({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response?.status != 200) {
        setResponseMessage(response?.data);
      }
    } catch (error) {
      console.error('POST 요청 오류:', error);
      setResponseMessage('POST 요청 오류');
    }
  };

  const handleVerify = async () => {
    try {
      await postVerifyEmailRequest({
        email: formData.email
      });
      setResponseMessage('인증 메일 전송 완료')
    } catch (error) {
      console.error('POST 요청 오류:', error);
      setResponseMessage('POST 요청 오류');
    }
  };

  const handleCheckVerify = async () => {
    try {
      const response = await postConfirmVerifyRequest({
        verifyCode: Number(formData.verifyCode)
      });
      setResponseMessage(response?.data);
    } catch (error) {
      console.error('POST 요청 오류:', error);
      setResponseMessage('POST 요청 오류');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <InputOneLine
            label="이름"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputOneLine
              label="이메일"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <Custombutton type='button' buttonText='인증메일 전송' onClick={handleVerify}></Custombutton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputOneLine
              label="인증번호"
              id="verifyCode"
              name="verifyCode"
              value={formData.verifyCode}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <Custombutton type='button' buttonText='인증번호 확인' onClick={handleCheckVerify}></Custombutton>
          </div>
          <InputOneLine
            label="비밀번호"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <Custombutton type='submit' buttonText='등록'></Custombutton>

        {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;