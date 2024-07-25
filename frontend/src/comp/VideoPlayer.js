import { useEffect, useRef } from "react";
import { useState } from "react";

const VideoPlayer = (props) => {
  const [full, setFull] = useState(false);
  const ref = useRef();
  const elementRef = useRef(null);

  const requestFullScreen = () => {
    const element = elementRef.current;

    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setFull(true);
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setFull(false);
  };

  useEffect(() => {
    props.peer.on("stream", (stream) => (ref.current.srcObject = stream));
  }, []);

  return (
    <div className="videoPlayerWrapper" ref={elementRef}>
      <video playsInline autoPlay ref={ref} />
      <div className="videoBottom">
        <h6>{props.userName}</h6>
        <span
          className="material-symbols-outlined fullScreen"
          onClick={full ? exitFullScreen : requestFullScreen}
        >
          {full ? "close_fullscreen" : "fullscreen"}
        </span>
      </div>
    </div>
  );
};
export default VideoPlayer;
