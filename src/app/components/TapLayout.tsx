"use client";
import React, { useState } from "react";
import Link from "next/link";
import Custombutton from "./Custombutton";
import Board from "../posting/page";
import RoomList from "../room/list/page";
import Modal from "../components/Modal";
import LoginForm from "./login/GoogleLoginButton";
import useUserStore from "../store/useUserStore";
import { useRouter } from "next/navigation";
import "./TapLayout.css";

const TapLayout = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("게시판");
    const [showModal, setShowModal] = useState(false);
    const { isLogged, logout, username, profilePicture } = useUserStore();

    const defaultProfilePicture =
        "https://woozco-picture.s3.ap-northeast-2.amazonaws.com/Default.png"; // 여기에 기본 이미지 경로 입력

    console.log(profilePicture);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleMoveMypage = () => {
        router.push(
            "/mypage/t9krr4tPCHS5RmWhirQgATTBHw0cKJKshAx89INoQOzuEXENTrx4R8rK1C00"
        );
    };

    const handlelogout = () => {
        logout();
    };
    const getSelectedPageComponent = () => {
        switch (selectedTab) {
            case "게시판":
                return <Board />;
            case "스터디방":
                return <RoomList />;
            default:
                return <Board />;
        }
    };

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };

    return (
        <div>
            <div className="top-nav">
                <div>
                    <a>Woozco</a>
                </div>
                <div className="login-menu">
                    {isLogged ? (
                        <>
                            <Custombutton
                                buttonText="마이페이지"
                                onClick={handleMoveMypage}
                            />
                            <Custombutton
                                buttonText="로그아웃"
                                onClick={handlelogout}
                            />
                            <div className="user-info">
                                <img
                                    src={
                                        profilePicture || defaultProfilePicture
                                    }
                                    alt="Profile"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                    }}
                                />
                                <span className="ml-2 mr-3">{username}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/register">
                                <Custombutton buttonText="회원가입" />
                            </Link>{" "}
                            <Custombutton
                                buttonText="로그인"
                                onClick={handleOpenModal}
                            />
                        </>
                    )}

                    {showModal && (
                        <Modal onClose={handleCloseModal}>
                            <LoginForm />
                        </Modal>
                    )}
                </div>
            </div>
            <div className="tab-menu">
                <Custombutton
                    buttonText="게시판"
                    onClick={() => handleTabClick("게시판")}
                />
                <Custombutton
                    buttonText="스터디방"
                    onClick={() => handleTabClick("스터디방")}
                />
            </div>
            <div>{getSelectedPageComponent()}</div>
        </div>
    );
};

export default TapLayout;
