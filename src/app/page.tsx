import React from 'react'
import Link from 'next/link';
import Custombutton from './components/Custombutton';
import type { NextPage } from "next";

const Home: NextPage = () => {
    return(
      <>
        <div>Main</div>
        <Link href="/register">
            <Custombutton buttonText='회원가입' />
        </Link>
        <Link href="/login">
            <Custombutton buttonText='로그인' />
        </Link>
        <Link href="/posting">
            <Custombutton buttonText='게시판' />
        </Link>
        <Link href="/room/create">
            <Custombutton buttonText='방 만들기' />
        </Link>
        <Link href="/room/entrance">
            <Custombutton buttonText='방 입장' />
        </Link>
        <Link href="/room/list">
            <Custombutton buttonText='방 목록' />
        </Link>
      </>
    )
}

const App: React.FC = () => {
  return (
    <div>
      <Home/>
    </div>
  )
}

export default App