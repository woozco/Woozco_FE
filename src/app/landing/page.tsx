import React from 'react'
import Header from '../components/landing/Header'
import Team from '../components/landing/Team'
import Service from '../components/landing/Service'
import Benefits from '../components/landing/Benefits'
import Gallery from '../components/landing/Gallery'
import Footer from '../components/landing/Footer'
import Contact from '../components/landing/Contact'
import './landing.css'

const landing = () => {
  return (
    <>
        <Header></Header>
        <Team></Team>
        <Service></Service>
        <Benefits></Benefits>
        <Gallery></Gallery>
        <Contact></Contact>
        <Footer></Footer>
    </>
  )
}

export default landing