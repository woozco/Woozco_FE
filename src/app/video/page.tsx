// VideoPlayer.tsx
"use client";
import React, { useRef } from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = () => {
  const playerRef = useRef(null);
  const videoUrl = "https://woozco.s3.ap-northeast-2.amazonaws.com/video/id1/base.m3u8";

  // 시간 배열 - 예를 들어 [60, 120, 180]은 각각 1분, 2분, 3분에 해당합니다.
  const timeStamps = [60, 120, 180];

  // 특정 시간으로 이동하는 함수
  const handleSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls
        width="100%"
        height="auto"
      />
      <div>
        {timeStamps.map((time, index) => (
          <button key={index} onClick={() => handleSeek(time)}>
            {time}초로 이동
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
