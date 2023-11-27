import React, { RefObject } from "react";
import "./Header.css"; // CSS 파일 import

interface landingProps {
  scrollToRef: RefObject<HTMLDivElement>;
}

const Team: React.FC<landingProps> = ({ scrollToRef }) => {
  const handleScroll = () => {
    if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section>Team
        <div>우리에 대한 설명</div>
        <button className="scroll-down-button" onClick={handleScroll}></button>
    </section>
  )
}

export default Team