"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Custombutton from './Custombutton';
import Board from '../posting/page';
import RoomList from '../room/list/page';
import Modal from '../components/Modal';
import LoginForm from '../components/LoginForm';

const TapLayout = () => {
    const [selectedTab, setSelectedTab] = useState('게시판');
    const [showModal, setShowModal] = useState(false);
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const getSelectedPageComponent = () => {
        switch (selectedTab) {
            case '게시판':
                return <Board />;
            case '스터디방':
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
                    <Link href="/register">
                        <Custombutton buttonText='회원가입' />
                    </Link>
                    <Custombutton buttonText='로그인' onClick={handleOpenModal} />
                    {showModal && (
                        <Modal onClose={handleCloseModal}>
                            <LoginForm />
                        </Modal>
                    )}
                </div>
            </div>
            <div className="tab-menu">
                <Custombutton buttonText='게시판' onClick={() => handleTabClick('게시판')} />
                <Custombutton buttonText='스터디방' onClick={() => handleTabClick('스터디방')} />
            </div>
            <div>
                {getSelectedPageComponent()}
            </div>
        </div>
    );
}

export default TapLayout;
