"use client"
import React, { useState } from "react";
import Custombutton from "./Custombutton";
import InputOneLine from "./InputOneLine";
import { PostBoardData } from "../apis/api/board/types";
import { postBoardRequest } from "../apis/api/board/board";
import MdEditor from "./mdedit/MdEditor";

const BoardForm: React.FC = () => {
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<PostBoardData>({
        // Post 인터페이스로 타입 변경
        id: 0, // 임시 값
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        linkOfProblem: "",
        wantLanguage: "",
        body: "",
        type: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMarkdownChange = (value: string | undefined) => {
        setFormData({ ...formData, body: value || "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        try {
            // postRegisterRequest 함수 호출
            const response = await postBoardRequest(formData);

            // 응답 정보를 상태에 저장
            setResponseMessage(`POST 요청 성공: ${JSON.stringify(response)}`);
        } catch (error) {
            console.error("POST 요청 오류:", error);

            // 에러 메시지를 상태에 저장
            setResponseMessage("POST 요청 오류");
        }
    };

    return (
        <div className="ml-10">
            <h2 className="text-xl font-semibold mb-4">글 쓰기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputOneLine
                        label="제목"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <InputOneLine
                        label="멘토/멘티"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <div>
                        <label htmlFor="date">날짜:</label>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label htmlFor="startTime">시작 시간:</label>
                        <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label htmlFor="endTime">종료 시간:</label>
                        <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleInputChange} />
                    </div>
                    <InputOneLine
                        label="문제 링크"
                        id="linkOfProblem"
                        name="linkOfProblem"
                        value={formData.linkOfProblem}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <InputOneLine
                        label="원하는 언어"
                        id="wantLanguage"
                        name="wantLanguage"
                        value={formData.wantLanguage}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <MdEditor onMarkdownChange={handleMarkdownChange} />
                <Custombutton buttonText="등록"/>
                {responseMessage && (
                    <p className="mt-4 text-green-600">{responseMessage}</p>
                )}      
            </form>
        </div>
    );
};

export default BoardForm;
