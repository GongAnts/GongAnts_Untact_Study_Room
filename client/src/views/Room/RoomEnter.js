require('dotenv').config();
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
// import io from 'socket.io-client';

// UI component //
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import { Button, Select } from 'antd';

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 4000;
// const socket = io(`http://${SERVER_HOST}:${SERVER_PORT}`, {
// transports: ['websocket', 'polling', 'flashsocket'],
// });

function RoomEnter(req) {
  const myFaceSrc = useRef(null);
  const peerFaceSrc = useRef(null);
  const [muted, setmuted] = useState(true);
  const [muteBtn, setmuteBtn] = useState('UnMute');
  const [cameraOff, setcameraOff] = useState(true);
  const [cameraBtn, setcameraBtn] = useState('Turn Camera Off');
  // let options = [];
  //   const location = useLocation();
  //   const roomName = location.state.roomName;

  //   useEffect(() => {
  //     console.log('useEffect', options);
  //   }, [options]);

  //   let myStream;
  //   let myPeerConnection;
  //   let selected;

  //   initCall();

  //   async function getCameras() {
  //     try {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const cameras = devices.filter(
  //         (devices) => devices.kind === 'videoinput',
  //       );
  //       const currentCamera = myStream.getVideoTracks()[0];

  //       cameras.forEach((camera) => {
  //         var cameraLabel = camera.label;
  //         var cameraDeviceId = camera.deviceId;
  //         options.push(
  //           <Option key={cameraLabel} value={cameraLabel}>
  //             {cameraDeviceId}
  //           </Option>,
  //         );

  //         //
  //         if (currentCamera.label == cameraLabel) {
  //           selected = cameraLabel;
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async function getMedia(deviceId) {
  //     const initialConstraints = {
  //       audio: true,
  //       video: { facingMode: 'user' },
  //     };
  //     const cameraConstraints = {
  //       audio: true,
  //       video: { deviceId: { exact: deviceId } },
  //     };
  //     try {
  //       myStream = await navigator.mediaDevices.getUserMedia(
  //         deviceId ? cameraConstraints : initialConstraints,
  //       );
  //       myFaceSrc.current.srcObject = myStream;
  //       console.log(myStream);
  //       if (!deviceId) {
  //         await getCameras();
  //         console.log('opt', options);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  function handleMuteClick() {
    myStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!muted) {
      setmuted(true);
      setmuteBtn('Unmute');
    } else {
      setmuted(false);
      setmuteBtn('Mute');
    }
  }
  function handleCameraClick() {
    myStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (cameraOff) {
      setcameraOff(false);
      setcameraBtn('Turn Camera On');
    } else {
      setcameraOff(true);
      setcameraBtn('Turn Camera Off');
    }
    return;
  }

  // async function handleCameraChange() {
  //   await getMedia(camerasSelect.value);
  //   console.log('handle!');
  //   if (myPeerConnection) {
  //     const videoTrack = myStream.getVideoTracks()[0];
  //     const videoSender = myPeerConnection
  //       .getSenders()
  //       .find((sender) => sender.track.kind == 'video');
  //     videoSender.replaceTrack(videoTrack);
  //   }
  // }

  // async function initCall() {
  //   console.log('room-name', roomName);
  //   // socket.emit('join_room', roomName);
  //   await getMedia();
  //   makeConnection();
  // }

  // socket.on('welcome', async () => {
  //   const offer = await myPeerConnection.createOffer();
  //   myPeerConnection.setLocalDescription(offer);
  //   console.log('someone joined!');
  //   console.log('sent the offer');
  //   socket.emit('offer', offer, roomName);
  // });

  // socket.on('offer', async (offer) => {
  //   console.log('received the offer');
  //   myPeerConnection.setRemoteDescription(offer);
  //   const answer = await myPeerConnection.createAnswer();
  //   myPeerConnection.setLocalDescription(answer);
  //   socket.emit('answer', answer, roomName);
  //   console.log('sent the answer');
  // });

  // socket.on('answer', (answer) => {
  //   console.log('received the answer');
  //   myPeerConnection.setRemoteDescription(answer);
  // });

  // socket.on('ice', (ice) => {
  //   console.log('received candidate');
  //   myPeerConnection.addIceCandidate(ice);
  // });

  // RTC Code

  // function makeConnection() {
  //   // peerConnection을 각 브라우저에 만들어준다.
  //   myPeerConnection = new RTCPeerConnection({});
  //   myPeerConnection.addEventListener('icecandidate', handleIce);
  //   myPeerConnection.addEventListener('addstream', handleAddStream);
  //   myStream // 양쪽 브라우저의 카메라, 마이크 데이터 stream 을 받아와서 그걸 연결 안에 집어넣어줌
  //     .getTracks()
  //     .forEach((track) => myPeerConnection.addTrack(track, myStream));
  // }

  // function handleIce(data) {
  //   // socket.emit('ice', data.candidate, roomName);
  //   console.log('sent candidate');
  // }

  // function handleAddStream(data) {
  //   console.log("Peer's Stream", data.stream);
  //   console.log('My Stream', myStream);
  //   peerFaceSrc.current.srcObject = data.stream;
  // }

  // mediasoup

  //index.js
  const socketio = require('socket.io-client');
  const mediasoupClient = require('mediasoup-client');

  const roomName = window.location.pathname.split('/')[3];

  console.log('roomName', roomName);

  const socket = new socketio.io(
    `http://${SERVER_HOST}:${SERVER_PORT}/mediasoup`,
  );

  // 2. 서버와 소켓 연결
  socket.on('connection-success', ({ socketId }) => {
    console.log(socketId);
    getLocalStream();
  });

  let device;
  let rtpCapabilities;
  let producerTransport;
  let consumerTransports = [];
  let audioProducer;
  let videoProducer;
  let consumer;
  let isProducer = false;

  // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerOptions
  // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
  let params = {
    // mediasoup params
    encodings: [
      {
        rid: 'r0',
        maxBitrate: 100000,
        scalabilityMode: 'S1T3',
      },
      {
        rid: 'r1',
        maxBitrate: 300000,
        scalabilityMode: 'S1T3',
      },
      {
        rid: 'r2',
        maxBitrate: 900000,
        scalabilityMode: 'S1T3',
      },
    ],
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  };

  let audioParams;
  let videoParams = { params };
  let consumingTransports = [];

  // 4.
  const streamSuccess = (stream) => {
    videoRef.current.srcObject = stream;

    audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
    videoParams = { track: stream.getVideoTracks()[0], ...videoParams };

    joinRoom();
  };

  // 5.
  // 9.
  const joinRoom = () => {
    socket.emit('joinRoom', { roomName }, (data) => {
      console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`);
      // we assign to local variable and will be used when
      // loading the client Device (see createDevice above)
      rtpCapabilities = data.rtpCapabilities;

      // once we have rtpCapabilities from the Router, create Device
      createDevice();
    });
  };

  // 3.
  const getLocalStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: {
            min: 640,
            max: 1920,
          },
          height: {
            min: 400,
            max: 1080,
          },
        },
      })
      .then(streamSuccess)
      .catch((error) => {
        console.log(error.message);
      });
  };

  // 10.
  // A device is an endpoint connecting to a Router on the
  // server side to send/receive media
  const createDevice = async () => {
    try {
      device = new mediasoupClient.Device();

      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
      // Loads the device with RTP capabilities of the Router (server side)
      await device.load({
        // see getRtpCapabilities() below
        routerRtpCapabilities: rtpCapabilities,
      });

      console.log('Device RTP Capabilities', device.rtpCapabilities);

      // once the device loads, create transport
      createSendTransport();
    } catch (error) {
      console.log(error);
      if (error.name === 'UnsupportedError')
        console.warn('browser not supported');
    }
  };

  // 11.
  // 16.
  const createSendTransport = () => {
    // see server's socket.on('createWebRtcTransport', sender?, ...)
    // this is a call from Producer, so sender = true
    socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
      // The server sends back params needed
      // to create Send Transport on the client side
      if (params.error) {
        console.log(params.error);
        return;
      }

      console.log(params);

      // creates a new WebRTC Transport to send media
      // based on the server's producer transport params
      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
      producerTransport = device.createSendTransport(params);

      // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
      // this event is raised when a first call to transport.produce() is made
      // see connectSendTransport() below
      producerTransport.on(
        'connect',
        async ({ dtlsParameters }, callback, errback) => {
          try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-connect', ...)
            await socket.emit('transport-connect', {
              dtlsParameters,
            });

            // Tell the transport that parameters were transmitted.
            callback();
          } catch (error) {
            errback(error);
          }
        },
      );

      producerTransport.on('produce', async (parameters, callback, errback) => {
        console.log(parameters);

        try {
          // tell the server to create a Producer
          // with the following parameters and produce
          // and expect back a server side producer id
          // see server's socket.on('transport-produce', ...)
          await socket.emit(
            'transport-produce',
            {
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData,
            },
            ({ id, producersExist }) => {
              // Tell the transport that parameters were transmitted and provide it with the
              // server side producer's id.
              callback({ id });

              // if producers exist, then join room
              if (producersExist) getProducers();
            },
          );
        } catch (error) {
          errback(error);
        }
      });

      connectSendTransport();
    });
  };

  // 17.
  const connectSendTransport = async () => {
    // we now call produce() to instruct the producer transport
    // to send media to the Router
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
    // this action will trigger the 'connect' and 'produce' events above

    audioProducer = await producerTransport.produce(audioParams);
    videoProducer = await producerTransport.produce(videoParams);

    audioProducer.on('trackended', () => {
      console.log('audio track ended');

      // close audio track
    });

    audioProducer.on('transportclose', () => {
      console.log('audio transport ended');

      // close audio track
    });

    videoProducer.on('trackended', () => {
      console.log('video track ended');

      // close video track
    });

    videoProducer.on('transportclose', () => {
      console.log('video transport ended');

      // close video track
    });
  };

  // 23.
  // 27.
  const signalNewConsumerTransport = async (remoteProducerId) => {
    //check if we are already consuming the remoteProducerId
    if (consumingTransports.includes(remoteProducerId)) return;
    consumingTransports.push(remoteProducerId);

    await socket.emit(
      'createWebRtcTransport',
      { consumer: true },
      ({ params }) => {
        // The server sends back params needed
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error);
          return;
        }
        console.log(`PARAMS... ${params}`);

        let consumerTransport;
        try {
          consumerTransport = device.createRecvTransport(params);
        } catch (error) {
          // exceptions:
          // {InvalidStateError} if not loaded
          // {TypeError} if wrong arguments.
          console.log(error);
          return;
        }

        consumerTransport.on(
          'connect',
          async ({ dtlsParameters }, callback, errback) => {
            try {
              // Signal local DTLS parameters to the server side transport
              // see server's socket.on('transport-recv-connect', ...)
              await socket.emit('transport-recv-connect', {
                dtlsParameters,
                serverConsumerTransportId: params.id,
              });

              // Tell the transport that parameters were transmitted.
              callback();
            } catch (error) {
              // Tell the transport that something was wrong
              errback(error);
            }
          },
        );

        connectRecvTransport(consumerTransport, remoteProducerId, params.id);
      },
    );
  };

  // 22.
  // server informs the client of a new producer just joined
  socket.on('new-producer', ({ producerId }) =>
    signalNewConsumerTransport(producerId),
  );

  const getProducers = () => {
    socket.emit('getProducers', (producerIds) => {
      console.log(producerIds);
      // for each of the producer create a consumer
      // producerIds.forEach(id => signalNewConsumerTransport(id))
      producerIds.forEach(signalNewConsumerTransport);
    });
  };

  // 28.
  // 30.
  // 31.
  // 32.
  const connectRecvTransport = async (
    consumerTransport,
    remoteProducerId,
    serverConsumerTransportId,
  ) => {
    // for consumer, we need to tell the server first
    // to create a consumer based on the rtpCapabilities and consume
    // if the router can consume, it will send back a set of params as below
    await socket.emit(
      'consume',
      {
        rtpCapabilities: device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      },
      async ({ params }) => {
        if (params.error) {
          console.log('Cannot Consume');
          return;
        }

        console.log(`Consumer Params ${params}`);
        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters,
        });

        consumerTransports = [
          ...consumerTransports,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
          },
        ];

        // create a new div element for the new consumer media
        const newElem = document.createElement('div');
        newElem.setAttribute('id', `${remoteProducerId}`);

        if (params.kind == 'audio') {
          //append to the audio container
          newElem.innerHTML =
            '<audio id="' + remoteProducerId + '" autoplay></audio>';
        } else {
          //append to the video container
          newElem.setAttribute('class', 'remoteVideo');
          newElem.innerHTML =
            '<video id="' +
            remoteProducerId +
            '" autoplay class="video" ></video>';
        }

        videoContainer.appendChild(newElem);

        // destructure and retrieve the video track from the producer
        const { track } = consumer;

        document.getElementById(remoteProducerId).srcObject = new MediaStream([
          track,
        ]);

        // the server consumer started with media paused
        // so we need to inform the server to resume
        socket.emit('consumer-resume', {
          serverConsumerId: params.serverConsumerId,
        });
      },
    );
  };

  socket.on('producer-closed', ({ remoteProducerId }) => {
    // server notification is received when a producer is closed
    // we need to close the client-side consumer and associated transport
    const producerToClose = consumerTransports.find(
      (transportData) => transportData.producerId === remoteProducerId,
    );
    producerToClose.consumerTransport.close();
    producerToClose.consumer.close();

    // remove the consumer transport from the list
    consumerTransports = consumerTransports.filter(
      (transportData) => transportData.producerId !== remoteProducerId,
    );

    // remove the video div element
    videoContainer.removeChild(document.getElementById(`${remoteProducerId}`));
  });

  const videoRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, []);
  // mediasoup end

  return (
    <>
      <Container fluid>
        <div className="w-full">
          <div className="flex justify-between float-left w-6/12 p-7 h-80">
            <div
              className="flex-initial w-full min-w-min"
              style={{ flexBasis: '330px', flexGrow: 0, flexShrink: 0 }}
            >
              <video
                ref={videoRef}
                autoPlay={cameraOff}
                playsInline
                muted={muted}
                width="330"
                height="330"
              />
            </div>
            <div className="flex-initial" style={{ flexShrink: 1 }}>
              {muteBtn === 'Mute' ? (
                <Button onClick={handleMuteClick}>
                  <FontAwesomeIcon className="text-3xl" icon={faMicrophone} />
                </Button>
              ) : (
                <Button onClick={handleMuteClick}>
                  <FontAwesomeIcon
                    className="text-3xl"
                    icon={faMicrophoneSlash}
                  />
                </Button>
              )}
              {cameraBtn === 'Turn Camera Off' ? (
                <Button type="primary" onClick={handleCameraClick}>
                  <FontAwesomeIcon className="text-3xl" icon={faVideo} />
                </Button>
              ) : (
                <Button type="primary" onClick={handleCameraClick}>
                  <FontAwesomeIcon className="text-3xl" icon={faVideoSlash} />
                </Button>
              )}
              {/* <Select
                style={{ width: 300 }}
                defaultValue={selected}
                onChange={handleCameraChange}
              >
                {options}
                {console.log('what', { options })}
              </Select> */}
            </div>
          </div>
          <div className="float-left w-6/12">
            <div class="remoteColumn">
              <h3> remoteColumn </h3>
              <div id="videoContainer"></div>
            </div>
            {/* <video
              ref={peerFaceSrc}
              autoPlay
              playsInline
              muted
              width="400"
              height="400"
            /> */}
          </div>
        </div>
        <div class="divider w-full h-px"></div>
      </Container>
    </>
  );
}

export default RoomEnter;
