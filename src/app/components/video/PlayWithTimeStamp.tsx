"use client"
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import "./PlayWithTimeStamp.css"; 

const PlayWithTimeStemp: React.FC = () => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [isClient, setIsClient] = useState(false); 
    const videoUrl = "https://woozco.s3.ap-northeast-2.amazonaws.com/video/id1/base.m3u8";

    const timeStamps = [
        { time: [0, 10], memo: "시작 - 요구사항" },
        { time: [1, 49], memo: "Golong 설치 파일 다운로드" },
        { time: [3, 40], memo: "Golang 설치" },
        { time: [8, 50], memo: "코드 입력" },
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSeek = (minutes: number, seconds: number) => {
        const totalTime = minutes * 60 + seconds;
        if (playerRef.current) {
            playerRef.current.seekTo(totalTime, "seconds");
        }
    };

    return (
        <div>
            {isClient && (
                <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    controls
                    width="100%"
                    height="auto"
                />
            )}
            <div className="timestamps-container">
                {timeStamps.map(({ time: [min, sec], memo }, index) => (
                    <div key={index} className="timestamp">
                        <button onClick={() => handleSeek(min, sec)} className="timestamp-button">
                            {min}분 {sec}초
                        </button>
                        <span className="timestamp-memo">{memo}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayWithTimeStemp;
