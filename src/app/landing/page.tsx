"use client";
import React, { useRef, useEffect } from "react";
import Header from "../components/landing/Header";
import Service from "../components/landing/Service";
import Gallery from "../components/landing/Gallery";
import Footer from "../components/landing/Footer";

import "./landing.css";

const landing = () => {
    const serviceRef = useRef(null);
    const galleryRef = useRef(null);
    const footerRef = useRef(null);
    const headerRef = useRef(null);

    return (
        <>
            <div ref={headerRef}>
                <Header scrollToRef={serviceRef}></Header>
            </div>

            <div ref={serviceRef}>
                <Service scrollToRef={galleryRef}></Service>
            </div>

            <div ref={galleryRef}>
                <Gallery scrollToRef={footerRef}></Gallery>
            </div>

            <div ref={footerRef}>
                <Footer scrollToRef={headerRef}></Footer>
            </div>
        </>
    );
};

export default landing;
