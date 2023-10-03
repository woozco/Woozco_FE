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