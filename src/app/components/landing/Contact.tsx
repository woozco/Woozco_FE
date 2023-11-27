import React, { RefObject } from "react";
import "./Header.css"; // CSS 파일 import

interface landingProps {
  scrollToRef: RefObject<HTMLDivElement>;
}

const Contact: React.FC<landingProps> = ({ scrollToRef }) => {
  const handleScroll = () => {
    if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section>Contact
        <div>우리 연락처 github 등등 연락 수단</div>
        <button className="scroll-down-button" onClick={handleScroll}></button>
    </section>
  )
}

export default Contact