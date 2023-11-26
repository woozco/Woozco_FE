"use client";
import { useEffect } from "react";
import { parseCookies } from "nookies";

const SuccessPage = () => {
  useEffect(() => {
    // 쿠키에서 토큰을 읽어옴
    const { jwt } = parseCookies();

    // 토큰을 사용하여 서버의 보호된 엔드포인트에 요청
    fetch("http://localhost:3000/api/auth/google/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${(jwt)}`, // 토큰을 인코딩하여 Authorization 헤더에 포함
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include', // 브라우저가 쿠키를 요청 헤더에 자동으로 포함하도록 함
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("보호된 리소스:", data);
      })
      .catch((error) => {
        console.error("보호된 리소스에 액세스하는 중 에러:", error);
      });
  }, []);

  return (
    <div>
      <p>인증이 완료되었습니다!</p>
      {/* 원하는 내용 표시 */}
    </div>
  );
};

export default SuccessPage;
