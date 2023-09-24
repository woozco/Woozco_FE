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