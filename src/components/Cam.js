import React, { useEffect, useState, useRef } from 'react';

function Cam(props) {
  const videoRef = useRef();

  const constraints = {
    audio: false,
    video: true
  };

  const [stream, setStream] = useState(null);

  function getMedia() {
    navigator
      .mediaDevices
      .getUserMedia(constraints)
      .then(handlerSuccess)
      .catch(console.error);
  }

  function handlerSuccess(streamer) {
    setStream(streamer);
  }

  useEffect(() => {
    getMedia()
  }, []);

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream;
  }

  return <video ref={videoRef} autoPlay playsInline muted className={props.className}/>;
}

export default Cam;
