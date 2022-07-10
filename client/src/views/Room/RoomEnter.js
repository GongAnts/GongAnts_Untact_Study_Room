import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Button, Select } from 'antd';
import { useParams } from 'react-router';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // 서버 주소

function RoomEnter(req) {
  const myFaceSrc = useRef(null);
  const peerFaceSrc = useRef(null);
  const [muted, setmuted] = useState(false);
  const [muteBtn, setmuteBtn] = useState('Mute');
  const [cameraOff, setcameraOff] = useState(true);
  const [cameraBtn, setcameraBtn] = useState('Turn Camera Off');
  let options = [];
  let roomName = useParams()['id'];

  useEffect(() => {
    console.log('useEffect', options);
  }, [options]);

  let myStream;
  let myPeerConnection;
  let selected;

  initCall();

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(
        (devices) => devices.kind === 'videoinput',
      );
      const currentCamera = myStream.getVideoTracks()[0];

      cameras.forEach((camera) => {
        var cameraLabel = camera.label;
        var cameraDeviceId = camera.deviceId;
        options.push(
          <Option key={cameraLabel} value={cameraLabel}>
            {cameraDeviceId}
          </Option>,
        );

        //
        if (currentCamera.label == cameraLabel) {
          selected = cameraLabel;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getMedia(deviceId) {
    const initialConstraints = {
      audio: true,
      video: { facingMode: 'user' },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints,
      );
      myFaceSrc.current.srcObject = myStream;
      console.log(myStream);
      if (!deviceId) {
        await getCameras();
        console.log('opt', options);
      }
    } catch (e) {
      console.log(e);
    }
  }

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

  async function handleCameraChange() {
    await getMedia(camerasSelect.value);
    console.log('handle!');
    if (myPeerConnection) {
      const videoTrack = myStream.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind == 'video');
      videoSender.replaceTrack(videoTrack);
    }
  }

  async function initCall() {
    console.log('room-name', roomName);
    socket.emit('join_room', roomName);
    await getMedia();
    makeConnection();
  }

  socket.on('welcome', async () => {
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log('someone joined!');
    console.log('sent the offer');
    socket.emit('offer', offer, roomName);
  });

  socket.on('offer', async (offer) => {
    console.log('received the offer');
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit('answer', answer, roomName);
    console.log('sent the answer');
  });

  socket.on('answer', (answer) => {
    console.log('received the answer');
    myPeerConnection.setRemoteDescription(answer);
  });

  socket.on('ice', (ice) => {
    console.log('received candidate');
    myPeerConnection.addIceCandidate(ice);
  });

  // RTC Code
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection();

    myPeerConnection.addEventListener('icecandidate', handleIce);
    myPeerConnection.addEventListener('addstream', handleAddStream);
    myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));
  }

  function handleIce(data) {
    socket.emit('ice', data.candidate, roomName);
    console.log('sent candidate');
  }

  function handleAddStream(data) {
    console.log("Peer's Stream", data.stream);
    console.log('My Stream', myStream);
    peerFaceSrc.current.srcObject = data.stream;
  }

  return (
    <>
      <Container fluid>
        <div>
          RoomEnter 테스트
          <video
            ref={myFaceSrc}
            autoPlay={cameraOff}
            playsInline
            muted={muted}
            width="400"
            height="400"
          />
          <Button type="primary" onClick={handleMuteClick}>
            {muteBtn}
          </Button>
          <Button type="primary" onClick={handleCameraClick}>
            {cameraBtn}
          </Button>
          <Select
            style={{ width: 300 }}
            defaultValue={selected}
            onChange={handleCameraChange}
          >
            {options}
            {console.log('what', { options })}
          </Select>
          <video
            ref={peerFaceSrc}
            autoPlay
            playsInline
            muted
            width="400"
            height="400"
          />
        </div>
      </Container>
    </>
  );
}

export default RoomEnter;
