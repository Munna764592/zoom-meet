import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Controls = ({
  muteVideo,
  cameraActive,
  muteAudio,
  micActive,
  screenSharing,
  screenShare,
  leave,
  playSound,
}) => {
  return (
    <div className="controlsWrapper">
      <button className="cntBtn" onClick={muteVideo}>
        {cameraActive ? (
          <span className="material-symbols-outlined">videocam</span>
        ) : (
          <span className="material-symbols-outlined">videocam_off</span>
        )}
      </button>
      <button className="cntBtn" onClick={muteAudio}>
        {micActive ? (
          <span className="material-symbols-outlined">mic</span>
        ) : (
          <span className="material-symbols-outlined">mic_off</span>
        )}
      </button>
      <DropdownButton
        key="up-centered"
        id="dropdown-button-drop-up-centered"
        drop="up-centered"
        variant="none"
        title="♫"
        className="cntBtn"
      >
        <Dropdown.Item eventKey="1" onClick={() => playSound("baja")}>
          Baja
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => playSound("clap")}>
          Clap
        </Dropdown.Item>
        <Dropdown.Item eventKey="3" onClick={() => playSound("duck")}>
          Duck
        </Dropdown.Item>
        <Dropdown.Item eventKey="4" onClick={() => playSound("fart")}>
          Fart
        </Dropdown.Item>
        <Dropdown.Item eventKey="5" onClick={() => playSound("fun")}>
          Fun
        </Dropdown.Item>
        <Dropdown.Item eventKey="6" onClick={() => playSound("moye")}>
          Moye
        </Dropdown.Item>
        <Dropdown.Item eventKey="7" onClick={() => playSound("kiss")}>
          Kiss
        </Dropdown.Item>
      </DropdownButton>
      <button className="cntBtn" onClick={screenSharing}>
        {screenShare ? (
          <span className="material-symbols-outlined">stop_screen_share</span>
        ) : (
          <span className="material-symbols-outlined">screen_share</span>
        )}
      </button>
      <button className="cntBtn leave" onClick={leave}>
        <span className="material-symbols-outlined">call_end</span>
      </button>
    </div>
  );
};

export default Controls;
