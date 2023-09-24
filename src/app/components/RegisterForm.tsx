"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Custombutton from './Custombutton';

const RegisterForm: React.FC = () => {
  const SUBITFORM="/"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    univ: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="univ" className="block text-gray-600 font-semibold mb-2">대학교:</label>
          <input
            type="univ"
            id="univ"
            name="univ"
            value={formData.univ}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <Link href={SUBITFORM}>
            <Custombutton buttonText='등록'></Custombutton>
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
