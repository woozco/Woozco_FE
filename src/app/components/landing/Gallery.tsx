import React, { useState, RefObject } from "react";
import "./Header.css";
import "./Gallery.css";

interface LandingProps {
  scrollToRef: RefObject<HTMLDivElement>;
}

const Gallery: React.FC<LandingProps> = ({ scrollToRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // 다음 이미지로 넘어가는 함수
  const handleImageClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // 다음 인덱스로 업데이트 (3개의 이미지 순환)
  };

  return (
    <section ref={scrollToRef}>
      <div className="image-gallery">
        <img
          src={`/1.png`}
          alt="Description of Image 1"
          className={activeIndex === 0 ? "active" : ""}
          onClick={handleImageClick}
        />
        <img
          src={`/2.png`}
          alt="Description of Image 2"
          className={activeIndex === 1 ? "active" : ""}
          onClick={handleImageClick}
        />
        <img
          src={`/3.png`}
          alt="Description of Image 3"
          className={activeIndex === 2 ? "active" : ""}
          onClick={handleImageClick}
        />
      </div>
    </section>
  );
};

export default Gallery;
