import { useState } from "react";

const SidePanel = ({
  people,
  showSidePanel,
  sendMessage,
  sendFile,
  messages,
}) => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const user = sessionStorage.getItem("user");

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected) {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  const send = () => {
    if (file) {
      sendFile(file);
      setFile(null);
    } else {
      let temp = msg;
      setMsg("");
      sendMessage(temp);
    }
  };

  const handleDownload = (body, mimeType) => {
    const blob = new Blob([body], { type: mimeType });
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = "filename";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="sidePanelWrapper">
      <h4 className="top">{showSidePanel}</h4>
      <div className="panel">
        {showSidePanel === "Chats"
          ? messages.map((m) => (
              <div
                className={m.userName === user ? "message self" : "message"}
                style={{
                  fontWeight: "400",
                  alignSelf: m.userName === user ? "flex-end" : "flex-start",
                }}
              >
                <p style={{ margin: "2px", textAlign: "left" }}>{m.userName}</p>
                {m.file ? (
                  <div
                    className="msgFile"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <p
                      style={{
                        margin: "2px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      {m.message.fileName}
                    </p>
                    <button
                      className="downBtn"
                      onClick={() =>
                        handleDownload(m.message.body, m.message.mimeType)
                      }
                    >
                      <span className="material-symbols-outlined">
                        download_2
                      </span>
                    </button>
                  </div>
                ) : (
                  <h6 style={{ margin: "2px", fontWeight: "600" }}>
                    {m.message}
                  </h6>
                )}
                <p
                  style={{
                    margin: "2px",
                    fontSize: "12px",
                    textAlign: "right",
                  }}
                >
                  {m.time}
                </p>
              </div>
            ))
          : people.map((p) => (
              <div className="person">
                <p
                  style={{
                    margin: "2px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  {p.userName}
                </p>
              </div>
            ))}
      </div>
      <div
        className="inputPanel"
        hidden={showSidePanel === "Chats" ? false : true}
      >
        <label className="fileInput">
          <input type="file" onChange={changeHandler} hidden />
          <span className="material-symbols-outlined">attach_file</span>
        </label>
        <input
          className="messageInput"
          type="text"
          placeholder="write message here"
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="send" onClick={send}>
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
