"use client";
import React, { useRef } from "react";
import Header from "../components/landing/Header";
import Team from "../components/landing/Team";
import Service from "../components/landing/Service";
import Benefits from "../components/landing/Benefits";
import Gallery from "../components/landing/Gallery";
import Footer from "../components/landing/Footer";
import Contact from "../components/landing/Contact";
import "./landing.css";

const landing = () => {
    const teamRef = useRef(null);
    const serviceRef = useRef(null);
    const benefitsRef = useRef(null);
    const galleryRef = useRef(null);
    const contactRef = useRef(null);
    const footerRef = useRef(null);
    const headerRef = useRef(null);

    return (
        <>
            <div ref={headerRef}>
                <Header scrollToRef={teamRef}></Header>
            </div>
            <div ref={teamRef}>
                <Team scrollToRef={serviceRef}></Team>
            </div>
            <div ref={serviceRef}>
                <Service scrollToRef={benefitsRef}></Service>
            </div>
            <div ref={benefitsRef}>
                <Benefits scrollToRef={galleryRef}></Benefits>
            </div>
            <div ref={galleryRef}>
                <Gallery scrollToRef={contactRef}></Gallery>
            </div>
            <div ref={contactRef}>
                <Contact scrollToRef={footerRef}></Contact>
            </div>
            <div ref={footerRef}>
                <Footer scrollToRef={headerRef}></Footer>
            </div>
        </>
    );
};

export default landing;
