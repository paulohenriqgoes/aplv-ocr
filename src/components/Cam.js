import React, { useEffect, useState, useRef } from 'react';

function Thumb(props) {
  const canvasRef = useRef();

  function onDraw(imgBase64) {
    if (props.onDraw) {
      props.onDraw(imgBase64);
    }
  }

  useEffect(() => {
    const currentVideo = props.video.current;
    const currentCanvas = canvasRef.current;
    const cx = canvasRef
      .current
      .getContext('2d');
    currentCanvas.width = currentVideo.videoWidth;
    currentCanvas.height = currentVideo.videoWidth;


    cx.drawImage(currentVideo, 0, 0, currentCanvas.width, currentCanvas.height);
    onDraw(currentCanvas.toDataURL('image/jpeg', 1.0));
  }, []);

  return <canvas
    ref={canvasRef}
    width={props.video.width}
    height={props.video.height}
    className={props.className}/>;
}

function Cam(props) {
  const videoRef = useRef();

  const constraints = {
    audio: false,
    video: true
  };

  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);

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

  function captureImg() {
    setCaptured(true);
  }

  function clearImg() {
    setCaptured(false);
    if (props.onClear) {
      props.onClear();
    }
  }

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted className={props.className}/>
      {captured && <Thumb video={videoRef} className={props.className} onDraw={props.onDraw}/>}
      {
        !captured &&
        <button className="btn-capture" onClick={captureImg}>
          <span className="icon" role="img" aria-label="Fazer a magía">💫</span>
          <span>Fazer magía</span>
        </button>
      }
      {
        captured &&
        <button className="btn-capture" onClick={clearImg}>
          <span className="icon" role="img" aria-label="Capturar outra imagen">🔄</span>
          <span>Capturar outra imagem</span>
        </button>
      }
    </div>
  );
}

export default Cam;
