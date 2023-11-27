"use client";
import React, { useState } from "react";
import Custombutton from "./Custombutton";
import InputOneLine from "./InputOneLine";
import { PostBoardData } from "../apis/api/board/types";
import { postBoardRequest } from "../apis/api/board/board";
import MdEditor from "./mdedit/MdEditor";
import { useRouter } from "next/navigation";
import "./BoardForm.css";

const BoardForm: React.FC = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<PostBoardData>({
        id: 0,
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        linkOfProblem: "",
        wantLanguage: "",
        body: "",
        type: "",
    });
    const [markdownContent, setMarkdownContent] = useState(""); // 별도의 상태로 Markdown 내용 관리

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;;
        setFormData({ ...formData, [name]: value });
    };

    const handleMarkdownChange = (value: string | undefined) => {
        setMarkdownContent(value || "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalFormData = { ...formData, body: markdownContent }; // 폼 데이터에 Markdown 내용 통합
        console.log(formData);

        try {
            await postBoardRequest(finalFormData); // 수정된 데이터로 요청
        } catch (error) {
            console.error("POST 요청 오류:", error);
        }
        router.push("/")
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
                        <label htmlFor="date" className="label">
                            날짜:
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="date-time-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="startTime" className="label">
                            시작 시간:
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="date-time-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="endTime" className="label">
                            종료 시간:
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className="date-time-input"
                        />
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
                <div>본문:</div>
                <MdEditor onMarkdownChange={handleMarkdownChange} />
                <Custombutton buttonText="등록" />
            </form>
            <div></div>
        </div>
    );
};

export default BoardForm;
