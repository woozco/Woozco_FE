import React, { RefObject } from "react";
import "./Header.css"; // CSS 파일 import

interface landingProps {
  scrollToRef: RefObject<HTMLDivElement>;
}

const Gallery: React.FC<landingProps> = ({ scrollToRef }) => {
  const handleScroll = () => {
    if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section>Gallery
        <div>대충 사진 갤러리 처럼 사진 넣기</div>
        <button className="scroll-down-button" onClick={handleScroll}></button>
    </section>
  )
}

export default Gallery