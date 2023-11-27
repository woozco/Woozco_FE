"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Custombutton from './Custombutton';
import InputOneLine from './InputOneLine'; // InputOneLine 컴포넌트 추가
import { postdLoginRequest } from '../apis/api/auth/auth';

const LoginForm: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const REGISTERURL = "/register";
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      // postRegisterRequest 함수 호출
      const response = await postdLoginRequest({
        email: formData.id,
        password: formData.password,
      });

      // 응답 정보를 상태에 저장
      setResponseMessage(`POST 요청 성공: ${JSON.stringify(response)}`);
    } catch (error) {
      console.error('POST 요청 오류:', error);

      // 에러 메시지를 상태에 저장
      setResponseMessage('POST 요청 오류');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">로그인</h2>
      <form onSubmit={handleSubmit}>
        {/* InputOneLine 컴포넌트 사용 */}
        <InputOneLine
          label="아이디"
          id="name"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          className="focus:border-blue-500"
          required
        />
        {/* InputOneLine 컴포넌트 사용 */}
        <InputOneLine
          label="비번"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="focus:border-blue-500"
          required
        />
        <Custombutton buttonText='로그인' />
        <Link href="/register">
            <Custombutton buttonText='회원가입' />
        </Link> 
        {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
