"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Custombutton from "../Custombutton";
import InputOneLine from "../InputOneLine"; // InputOneLine 컴포넌트 추가
import { postdLoginRequest } from "../../apis/api/auth/auth";
import useUserStore from "@/app/store/useUserStore";
import GoogleLoginFrom from "./GoogleLoginFrom";

const LoginForm: React.FC = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    const { login } = useUserStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await postdLoginRequest({
                email: formData.id,
                password: formData.password,
            });
            login(formData.id, "URL 예시");
            router.push('/')
        } catch (error) {
            console.error("POST 요청 오류:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
            <h2 className=" text-gray-600 text-xl font-semibold mb-4">
                로그인
            </h2>
            <form onSubmit={handleSubmit}>
                <InputOneLine
                    label="아이디"
                    id="name"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    className=""
                    required
                />
                <InputOneLine
                    label="비번"
                    id="password"
                    name="password"
                    value={formData.password}
                    type="password"
                    onChange={handleInputChange}
                    className="focus:border-blue-500"
                    required
                />
                <Custombutton buttonText="로그인" />
                <Link href="/register">
                    <Custombutton buttonText="회원가입" />
                </Link>
                <GoogleLoginFrom></GoogleLoginFrom>
            </form>
        </div>
    );
};

export default LoginForm;
