import React from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { getAllBoard } from "../apis/api/board/board";
import { PostBoardData } from "../apis/api/board/types";
import Link from "next/link";
import CustomButton from "../components/Custombutton";
import MarkdownViewer from "../components/mdedit/MdViewer";

const BoardsPage: React.FC = () => {
    const { data, error, isLoading } = useQuery<
        AxiosResponse<PostBoardData[]>,
        Error
    >("boards", getAllBoard);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>에러가 발생했습니다: {error.message}</div>;

    return (
        <div>
            <Link href="/posting/writing">
                <CustomButton buttonText="게시물 쓰기" />
            </Link>
            <br />
            {data?.data.map((board) => (
                <div className="post" key={board.id}>
                    <div className="post-content">
                        <h2 className="post-author">{board.title}</h2>
                        <p className="post-text">{board.type}</p>
                        <MarkdownViewer markdown={board.body} />
                        <p className="post-text">{board.date}</p>
                        <p className="post-text">{board.startTime}</p>
                        <p className="post-text">{board.endTime}</p>
                        <a className="post-text" href={board.linkOfProblem}>
                            {board.linkOfProblem}
                        </a>
                        <p className="post-text">{board.wantLanguage}</p>
                        <br />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardsPage;
