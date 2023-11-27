"use client"
import React, { useEffect } from "react";
import { parseCookies } from "nookies";
import useUserStore from "../store/useUserStore";
import { useRouter } from "next/navigation";

const SuccessPage: React.FC = () => {
    const login = useUserStore((state) => state.login);
    const router = useRouter()
    useEffect(() => {
        const { jwt } = parseCookies();
        console.log(jwt)
        if (jwt) {
            try {
                const userData = JSON.parse(jwt);
                const { email, firstName, lastName, picture } = userData;
                // Zustand를 사용하여 로그인 상태 업데이트
                login(`${firstName} ${lastName}`, picture);
                router.push('/')
            } catch (error) {
                console.error("JSON 파싱 에러:", error);
            }
        }
    }, [login]);

    return (
        <div>
            <p>인증이 완료되었습니다!</p>
        </div>
    );
};

export default SuccessPage;
