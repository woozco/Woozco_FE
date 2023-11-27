import React, { RefObject } from "react";
import "./Header.css"; // CSS 파일 import

interface landingProps {
    scrollToRef: RefObject<HTMLDivElement>;
}

const Service: React.FC<landingProps> = ({ scrollToRef }) => {
    const handleScroll = () => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <section>
            Service
            <div>결론적으로 어떤 걸 만들었는 가 + 서비스 플로우</div>
            <button
                className="scroll-down-button"
                onClick={handleScroll}
            ></button>
        </section>
    );
};

export default Service;
