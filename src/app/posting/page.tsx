"use client";
import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { getAllBoard } from "../apis/api/board/board";
import { PostBoardData } from "../apis/api/board/types";
import Link from "next/link";
import CustomButton from "../components/Custombutton";

const BoardsPage: React.FC = () => {
    const [boardData, setBoardData] = useState<PostBoardData[]>([]);

    useEffect(() => {
        // 페이지가 로드될 때 getAllBoard 함수를 호출하여 게시판 데이터를 가져옴
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response: AxiosResponse = await getAllBoard();
            // API에서 받은 데이터를 상태에 저장
            setBoardData(response.data);
        } catch (error) {
            console.error("데이터 가져오기 오류:", error);
        }
    };

    return (
        <div>
            <h1>게시판</h1>
            {boardData.map((board) => (
                <div key={board.id}>
                    <h2>{board.title}</h2>
                    <p>{board.type}</p>
                    <p>{board.body}</p>
                    <p>{board.date}</p>
                    <p>{board.startTime}</p>
                    <p>{board.endTime}</p>
                    <p>{board.linkOfProblem}</p>
                    <p>{board.wantLanguage}</p>
                    <br></br>
                </div>
            ))}
            <Link href="/posting/writing">
                <CustomButton buttonText="게시물 쓰기" />
            </Link>
        </div>
    );
};

export default BoardsPage;
