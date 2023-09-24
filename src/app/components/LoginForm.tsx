"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Custombutton from './Custombutton';

const LoginForm: React.FC = () => {
  const REGISTERURL = "/register"
  const [formData, setFormData] = useState({
    id: '',
    password: '',
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
      <h2 className="text-xl font-semibold mb-4">로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">아이디:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.id}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">비번:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <Custombutton buttonText='로그인' />
        <Link href={REGISTERURL}>
            <Custombutton buttonText='회원가입' />
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
