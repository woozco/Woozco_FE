import React, { RefObject } from "react";
import "./Header.css"; // CSS 파일 import

interface landingProps {
  scrollToRef: RefObject<HTMLDivElement>;
}

const Benefits: React.FC<landingProps> = ({ scrollToRef }) => {
  const handleScroll = () => {
    if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section>Benefits
        <div>우리 서비스 사용하면 뭐가 더 좋은가</div>
        <button className="scroll-down-button" onClick={handleScroll}></button>
    </section>
  )
}

export default Benefits