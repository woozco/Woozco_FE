"use client";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { receiveRoomMessagePromise } from "@/app/apis/socket/once"; // 경로는 함수가 정의된 파일의 경로입니다.
import { socket, mediasoup } from "../../apis/utils/socket.context";
import * as mediasoupClient from "mediasoup-client";
import CustomButton from "@/app/components/Custombutton";

type MessageType = {
    senderId: string;
    content: string;
};

const RoomPage = ({ params }: { params: { roomid: string } }) => {
    const Pathname = params.roomid;
    const router = useRouter();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [messageContent, setMessageContent] = useState<string>("");
    const [clients, setClients] = useState<string[]>([]);
    const videoContainerRef = useRef(null);

    const leaveRoom = () => {
        socket.emit("leaveRoom", params.roomid);
        router.push("/");
    };

    mediasoup.on('connection-success', ({ socketId }) => {
        console.log(socketId)
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
        }
    }

    const joinRoom = () => {
        mediasoup.emit('joinRoom', { Pathname }, (data: any) => {
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

            console.log('Device RTP Capabilities', device.rtpCapabilities)

            createSendTransport()

        } catch (error: any) {
            console.log(error)
            if (error.name === 'UnsupportedError')
                console.warn('browser not supported')
        }
    }

    const createSendTransport = () => {
        mediasoup.emit('createWebRtcTransport', { consumer: false }, (mediasoupParams: any) => {
            if (mediasoupParams.error) {
                console.log(mediasoupParams.error)
                return
            }

            console.log(params)

            producerTransport = device.createSendTransport(params)

            producerTransport.on('connect', async ({ dtlsParameters }: any, callback: any, errback: any) => {
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
        producer = await producerTransport.produce(params)

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
        const params = {
            track,
            ...mediasoupParams
        };
        mediasoupParams = params;

        joinRoom();
    }

    const getLocalStream = () => {
        const localVideo = document.getElementById('localVideo'); // 로컬 비디오 엘리먼트 추가

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
            console.log(producerIds)
            producerIds.forEach(signalNewConsumerTransport)
        })
    }

    const signalNewConsumerTransport = async (remoteProducerId: any) => {
        await socket.emit('createWebRtcTransport', { consumer: true }, (mediasoupParams: any) => {
            if (mediasoupParams.error) {
                console.log(mediasoupParams.error)
                return
            }
            console.log(`PARAMS... ${params}`)

            let consumerTransport
            try {
                consumerTransport = device.createRecvTransport(params)
            } catch (error) {
                console.log(error)
                return
            }

            consumerTransport.on('connect', async ({ dtlsParameters }: any, callback: any, errback: any) => {
                try {
                    await socket.emit('transport-recv-connect', {
                        dtlsParameters,
                        serverConsumerTransportId: mediasoupParams.id,
                    })

                    callback()
                } catch (error) {
                    errback(error)
                }
            })

            connectRecvTransport(consumerTransport, remoteProducerId, mediasoupParams.id)
        })
    }

    const connectRecvTransport = async (consumerTransport: any, remoteProducerId: any, serverConsumerTransportId: any) => {
        await mediasoup.emit('consume', {
            rtpCapabilities: device.rtpCapabilities,
            remoteProducerId,
            serverConsumerTransportId,
        }, async (mediasoupParams: any) => {
            if (mediasoupParams.error) {
                console.log('Cannot Consume')
                return
            }

            console.log(`Consumer Params ${mediasoupParams}`)
            const consumer = await consumerTransport.consume({
                id: mediasoupParams.id,
                producerId: mediasoupParams.producerId,
                kind: mediasoupParams.kind,
                rtpParameters: mediasoupParams.rtpParameters
            })

            consumerTransports = [
                ...consumerTransports,
                {
                    consumerTransport,
                    serverConsumerTransportId: mediasoupParams.id,
                    producerId: remoteProducerId,
                    consumer,
                },
            ]

            const { track } = consumer

            const vidElement = document.getElementById('videoContainer');

            const newElem = document.createElement('div')
            newElem.setAttribute('id', `td-${remoteProducerId}`)
            newElem.setAttribute('class', 'remoteVideo')
            newElem.innerHTML = '<video id="' + remoteProducerId + '" autoplay class="video" ></video>'
            vidElement?.appendChild(newElem)

            document.getElementById(remoteProducerId).srcObject = new MediaStream([track])

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
            <br></br>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message.senderId}: {message.content}
                    </div>
                ))}
            </div>
            <div>
                <div id="video">
                    <table className="mainTable">
                        <tbody>
                            <tr>
                                <td className="localColumn">
                                    <video id="localVideo" autoPlay className="video" muted ></video>
                                </td>
                                <td className="localColumn">
                                    <video id="shareVideo" autoPlay className="video" muted ></video>
                                </td>
                                <td className="remoteColumn">
                                    <div id="videoContainer"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CustomButton onClick={handleStartShare} buttonText="화면 공유 시작" />
                <CustomButton onClick={handleStartFace} buttonText="얼굴 공유 시작" />
                <CustomButton onClick={handleSireo} buttonText="싫어" />
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
        </div >
    );
};

export default RoomPage;
