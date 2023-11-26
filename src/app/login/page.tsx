"use client";
import React, { useState } from "react";

import LoginForm from "../components/login/GoogleLoginButton";
import Modal from "../components/Modal";
import CustomButton from "../components/Custombutton";
import GoogleLoginFrom from "../components/login/GoogleLoginFrom";

const LoginPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>로그인 페이지</h1>
            <div>
                <GoogleLoginFrom></GoogleLoginFrom>
            </div>
            <CustomButton
                buttonText="로그인"
                onClick={handleOpenModal}
            ></CustomButton>
            {showModal && (
                <Modal onClose={handleCloseModal}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    );
};

export default LoginPage;
