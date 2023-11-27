import React, { RefObject } from "react";
import "./Header.css"; // CSS 파일 import

interface landingProps {
    scrollToRef: RefObject<HTMLDivElement>;
}

const Footer: React.FC<landingProps> = ({ scrollToRef }) => {
    const handleScroll = () => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <section>
            Footer
            <div>아주대학교 파란학기를 통해 만들어졌다 어쩌구저쩌구</div>
            <button
                className="scroll-down-button"
                onClick={handleScroll}
            ></button>
        </section>
    );
};

export default Footer;
