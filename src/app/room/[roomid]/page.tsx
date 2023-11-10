"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { receiveRoomMessagePromise } from "@/app/apis/socket/once";
import * as mediasoupClient from "mediasoup-client";
import CustomButton from "@/app/components/Custombutton";
import { socket, mediasoup } from '../../apis/utils/socket.context';

type MessageType = {
    senderId: string;
    content: string;
};

interface RemoteVideoProps {
    remoteProducerId: string;
    track: MediaStreamTrack;
}

const RoomPage = ({ params }: { params: { roomid: string } }) => {
    const Pathname = params.roomid;
    const router = useRouter();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [messageContent, setMessageContent] = useState<string>("");
    const [clients, setClients] = useState<string[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);

    const leaveRoom = () => {
        socket.emit("leaveRoom", params.roomid);
        mediasoup.emit("disconnect");
        router.push("/");
    };

    mediasoup.on('connection-success', ({ socketId }) => {
        console.log("connect : " + socketId)
    });

    let device: any;
    let rtpCapabilities: any;
    let producerTransport: any;
    let consumerTransports: any = []
    let producer: any
    let consumer: any
    let isProducer: any = false
    let mediasoupParams = {
        encodings: [
            {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S3T3',
            },
            {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S3T3',
            },
            {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S3T3',
            },
        ],
        codecOptions: {
            videoGoogleStartBitrate: 1000
        },
        track: null
    }

    const joinRoom = () => {
        mediasoup.emit('joinRoom', Pathname, (data: any) => {
            console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
            rtpCapabilities = data.rtpCapabilities
            createDevice()
        })
    }

    const createDevice = async () => {
        try {
            device = new mediasoupClient.Device()
            await device.load({
                routerRtpCapabilities: rtpCapabilities
            })

            console.log('Create Device', device);

            createSendTransport()

        } catch (error: any) {
            console.log(error)
            if (error.name === 'UnsupportedError')
                console.warn('browser not supported')
        }
    }

    const createSendTransport = () => {
        mediasoup.emit('createWebRtcTransport', { consumer: false }, (socketParmas: any) => {
            if (socketParmas.error) {
                console.log(socketParmas.error)
                return
            }

            producerTransport = device.createSendTransport(socketParmas);

            producerTransport.on('connect', async ({ dtlsParameters }: any, callback: any, errback: any) => {
                console.log(dtlsParameters);
                try {
                    await mediasoup.emit('transport-connect', {
                        dtlsParameters,
                    })

                    callback()

                } catch (error) {
                    errback(error)
                }
            })

            producerTransport.on('produce', async (parameters: any, callback: any, errback: any) => {
                console.log(parameters)

                try {
                    await mediasoup.emit('transport-produce', {
                        kind: parameters.kind,
                        rtpParameters: parameters.rtpParameters,
                        appData: parameters.appData,
                    }, ({ id, producersExist }: any) => {
                        callback({ id })
                        if (producersExist) getProducers()
                    })
                } catch (error) {
                    errback(error)
                }
            })

            connectSendTransport()
        })
    }

    const connectSendTransport = async () => {
        producer = await producerTransport.produce(mediasoupParams);

        producer.on('trackended', () => {
            console.log('track ended')
        })

        producer.on('transportclose', () => {
            console.log('transport ended')
        })
    }

    const streamSuccess = (stream: any, videoElement: any) => {
        videoElement.srcObject = stream;  // 화면 공유 비디오 엘리먼트 또는 로컬 비디오 엘리먼트로 스트림 설정
        const track = stream.getVideoTracks()[0];
        mediasoupParams.track = track;
        console.log(mediasoupParams);
        joinRoom();
    }

    const getLocalStream = () => {
        const localVideo = document.getElementById('localVideo');
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: {
                    min: 640,
                    max: 1920,
                },
                height: {
                    min: 400,
                    max: 1080,
                }
            }
        })
            .then(stream => streamSuccess(stream, localVideo))  // 로컬 비디오 엘리먼트 전달
            .catch(error => {
                console.log(error.message);
            })
    }

    const getScreenShareStream = () => {
        const shareVideoElement = document.getElementById('shareVideo'); // 화면 공유 비디오 엘리먼트
        navigator.mediaDevices.getDisplayMedia({
            video: true
        })
            .then(stream => streamSuccess(stream, shareVideoElement))  // 화면 공유 비디오 엘리먼트 전달
            .catch(error => {
                console.error('화면 공유 에러:', error);
            });
    }

    const handleStartShare = () => {
        console.log("startShare clicked")
        getScreenShareStream();
    };

    const handleStartFace = () => {
        console.log("startFace clicked")
        getLocalStream();
    }

    const handleSireo = () => {
        console.log("나도 싫어")
    }

    mediasoup.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId))

    const getProducers = () => {
        mediasoup.emit('getProducers', (producerIds: any) => {
            console.log("pIds : " + producerIds);
            producerIds.forEach(signalNewConsumerTransport);
        })
    }

    const signalNewConsumerTransport = async (remoteProducerId: any) => {
        await mediasoup.emit('createWebRtcTransport', { consumer : true }, (mediasoupParams: any) => {
            if (mediasoupParams.error) {
                console.log(mediasoupParams.error)
                return
            }

            console.log(JSON.stringify(device));
            let consumerTransport
            try {
                consumerTransport = device.createRecvTransport(mediasoupParams)
            } catch (error) {
                console.log(error)
                return
            }
            console.log("consumerTransport : " + consumerTransport);
            consumerTransport.on('connect', async ({ dtlsParameters }: any, callback: any, errback: any) => {
                try {
                    await mediasoup.emit('transport-recv-connect', {
                        dtlsParameters,
                        serverConsumerTransportId: mediasoupParams.id,
                    })
                    callback()
                } catch (error) {
                    errback(error)
                }
            });

            connectRecvTransport(consumerTransport, remoteProducerId, mediasoupParams.id);
        })
    }

    const connectRecvTransport = async (consumerTransport: any, remoteProducerId: any, serverConsumerTransportId: any) => {
        await mediasoup.emit('consume', {
            rtpCapabilities: device.rtpCapabilities,
            remoteProducerId,
            serverConsumerTransportId,
        }, async (mediasoupParams: any) => {
            if (mediasoupParams.error) {
                console.log('Cannot Consume');
                return;
            }

            console.log(`Consumer Params > ` + JSON.stringify(mediasoupParams));
            const consumer = await consumerTransport.consume({
                id: mediasoupParams.id,
                producerId: mediasoupParams.producerId,
                kind: mediasoupParams.kind,
                rtpParameters: mediasoupParams.rtpParameters
            });
            console.log("consumer > " + consumer);

            consumerTransports = [
                ...consumerTransports,
                {
                    consumerTransport,
                    serverConsumerTransportId: mediasoupParams.id,
                    producerId: remoteProducerId,
                    consumer,
                },
            ]

            const { track } = consumer;

            console.log("videoRef", track);
            const videoElement = videoRef.current;
            if (videoElement) {
                console.log("videoEle : " + videoElement);
                videoElement.srcObject = new MediaStream([track]);
            }

            mediasoup.emit('consumer-resume', { serverConsumerId: mediasoupParams.serverConsumerId })
        })
    }

    mediasoup.on('producer-closed', ({ remoteProducerId }) => {
        const producerToClose = consumerTransports.find((transportData: any) => transportData.producerId === remoteProducerId)
        producerToClose.consumerTransport.close()
        producerToClose.consumer.close()

        consumerTransports = consumerTransports.filter((transportData: any) => transportData.producerId !== remoteProducerId);

        const vidElement = document.getElementById('videoContainer');
        vidElement?.removeChild(document.getElementById(`td-${remoteProducerId}`))
    })

    useEffect(() => {
        const fetchPreviousMessages = async () => {
            try {
                socket.emit("getMessages", Pathname);
                const previousMessages = await receiveRoomMessagePromise();
                setMessages(previousMessages);
            } catch (error) {
                console.error("Error fetching previous messages:", error);
            }
        };

        fetchPreviousMessages();

        const handleNewMessage = (msg: MessageType) => {
            console.log("handleNewMessage");
            setMessages((prevMessages) => [...prevMessages, msg]);
        };

        socket.on("newMessage", handleNewMessage);

        const handleClientsList = (clientIds: string[]) => {
            setClients(clientIds);
        };

        socket.on("clientsList", handleClientsList);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("clientsList", handleClientsList);
        };
    }, []);

    const handleSendMessage = () => {
        if (messageContent.trim() === "") return;
        socket.emit("sendMessage", {
            room: Pathname,
            content: messageContent,
        });
        setMessageContent("");
    };

    return (
            <div className="chat-room">
                <div className="chat-title">
                    <a>{Pathname}</a>
                </div>
                <div>
                    <div id="video">
                        <video id="localVideo" autoPlay className="video" muted />
                        <video id="shareVideo" autoPlay className="video" muted />
                        <video ref={videoRef} autoPlay className="video" />
                    </div>
                    <CustomButton onClick={handleStartShare} buttonText="화면 공유 시작" />
                    <CustomButton onClick={handleStartFace} buttonText="얼굴 공유 시작" />
                    <CustomButton onClick={handleSireo} buttonText="싫어" />
                </div>
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            {message.senderId}: {message.content}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        className="message-input"
                        type="text"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="메시지 입력"
                    />
                    <CustomButton onClick={handleSendMessage} buttonText="전송" />
                </div>
                <br></br>
                <CustomButton onClick={leaveRoom} buttonText="나가기" />
            </div>
    );
};

export default RoomPage;
