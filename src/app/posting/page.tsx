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
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response: AxiosResponse = await getAllBoard();
            setBoardData(response.data);
        } catch (error) {
            console.error("데이터 가져오기 오류:", error);
        }
    };

    return (
        <div>
                <br></br>
                {boardData.map((board) => (
                    <div className="post" key={board.id}>
                        <div className="post-content">
                            <h2 className="post-author">{board.title}</h2>
                            <p className="post-text">{board.type}</p>
                            <p className="post-text">{board.body}</p>
                            <p className="post-text">{board.date}</p>
                            <p className="post-text">{board.startTime}</p>
                            <p className="post-text">{board.endTime}</p>
                            <p className="post-text">{board.linkOfProblem}</p>
                            <p className="post-text">{board.wantLanguage}</p>
                            <br></br>
                        </div>
                    </div>
                ))}
            <Link href="/posting/writing">
                <CustomButton buttonText="게시물 쓰기" />
            </Link>
        </div>
    );
};

export default BoardsPage;
