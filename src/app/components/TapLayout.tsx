"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Custombutton from './Custombutton';
import Board from '../posting/page';
import CreateRoom from '../room/create/page';
import JoinRoom from '../room/entrance/page';
import RoomList from '../room/list/page';

const TapLayout = () => {
    const [selectedTab, setSelectedTab] = useState('게시판');

    const getSelectedPageComponent = () => {
        switch (selectedTab) {
            case '게시판':
                return <Board />;
            case '방 만들기':
                return <CreateRoom />;
            case '방 입장':
                return <JoinRoom />;
            case '방 목록':
                return <RoomList />;
            default:
                return null;
        }
    };

    const handleTabClick = (tabName : string) => {
        setSelectedTab(tabName);
    };

    return (
        <div>
            <div className="top-nav">
                <div>
                    <a>woozco</a>
                </div>
                <div className="login-menu">
                    <Link href="/register">
                        <Custombutton buttonText='회원가입' />
                    </Link>
                    <Link href="/login">
                        <Custombutton buttonText='로그인' />
                    </Link>
                </div>
            </div>
            <div className="tab-menu">
                <Custombutton buttonText='게시판' onClick={() => handleTabClick('게시판')} />
                <Custombutton buttonText='방 만들기' onClick={() => handleTabClick('방 만들기')} />
                <Custombutton buttonText='방 입장' onClick={() => handleTabClick('방 입장')} />
                <Custombutton buttonText='방 목록' onClick={() => handleTabClick('방 목록')} />
            </div>
            <div>
                {getSelectedPageComponent()}
            </div>
        </div>
    );
}

export default TapLayout;
