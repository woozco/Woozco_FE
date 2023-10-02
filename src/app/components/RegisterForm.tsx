"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Custombutton from './Custombutton';
import InputOneLine from './InputOneLine';
import { postRegisterRequest } from '../apis/api/auth/auth';

const RegisterForm: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const SUBITFORM="/login"
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
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
      const response = await postRegisterRequest({
        name: formData.name,
        age: Number(formData.age),
        email: formData.email,
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
          <InputOneLine
            label="나이"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <InputOneLine
            label="이메일"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
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
        <Link href={SUBITFORM}>
            <Custombutton buttonText='등록'></Custombutton>
        </Link>
        {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;
