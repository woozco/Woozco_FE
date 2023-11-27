"use client";
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = () => {
  const playerRef = useRef(null);
  const [minutes, setMinutes] = useState(0); // 분 입력
  const [seconds, setSeconds] = useState(0); // 초 입력
  const videoUrl = "https://woozco.s3.ap-northeast-2.amazonaws.com/video/id1/base.m3u8";

  // 분과 초를 합쳐서 총 초로 변환하고 해당 위치로 이동
  const handleSeek = () => {
    const totalTime = minutes * 60 + seconds;
    console.log(playerRef.current)
    if (playerRef.current) {
      playerRef.current.seekTo(totalTime);
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
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          placeholder="분"
        />
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
          placeholder="초"
        />
        <button onClick={handleSeek}>이동</button>
      </div>
    </div>
  );
};

export default VideoPlayer;