import React, { RefObject } from "react";
import "./Header.css"; // CSS 파일 import

interface HeaderProps {
    scrollToRef: RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ scrollToRef }) => {
    const handleScroll = () => {
      console.log("in")
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="header">
            <video autoPlay loop muted className="background-video">
                <source
                    src="https://woozco.s3.ap-northeast-2.amazonaws.com/landing.mp4"
                    type="video/mp4"
                />
            </video>
            <div className="overlay-content">
                <div className="woozico-container">
                    <h1 className="woozico-text">Woozco</h1>
                </div>
                <p className="woozco_under">우리들의 지혜로운 교육 플랫폼</p>
            </div>
            <button
                className="scroll-down-button"
                onClick={handleScroll}
            ></button>
        </section>
    );
};

export default Header;
