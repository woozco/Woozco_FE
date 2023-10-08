"use client"
import { useState, useEffect, useRef } from 'react'; // useRef 추가
import io from 'socket.io-client';

const socket = io('http://localhost:3001/webrtc');

export default function WebRTCVoice() {
  const [rtcPeerConnection, setRtcPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);  // audio 엘리먼트에 대한 참조 추가
    
  useEffect(() => {
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate);
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    socket.on('offer', async (offer) => {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', answer);
    });

    socket.on('answer', (answer) => {
      pc.setRemoteDescription(answer);
    });

    socket.on('ice-candidate', (iceCandidate) => {
      pc.addIceCandidate(iceCandidate);
    });

    setRtcPeerConnection(pc);
  }, []);

  useEffect(() => {
    if (audioRef.current && remoteStream) {
      audioRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => rtcPeerConnection?.addTrack(track, stream));

    const offer = await rtcPeerConnection?.createOffer();
    await rtcPeerConnection?.setLocalDescription(offer!);
    socket.emit('offer', offer);
  };

  return (
    <div>
      {remoteStream && <audio ref={audioRef} controls autoPlay />} {/* ref 속성 추가 */}
      <button onClick={startCall}>Start Call</button>
    </div>
  );
}
