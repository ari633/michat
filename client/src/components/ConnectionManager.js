import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket";


export function ConnectionManager() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const { doConnect, errorMsg } = useContext(SocketContext);

  useEffect(() => {
    setTimeout(() => {
      const sessionId = localStorage.getItem("sessionId");
      if (sessionId) {
        const user = { sessionId };
        doConnect(user);
      }
    }, 1000);
  }, [doConnect]);

  function connect() {
    const user = { username, roomId };
    doConnect(user);
  }

  return (
    <>
      <h1>Join Chatroom</h1>
      <div className="flex-container">
        <div>
          <div className="form-group">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="form-input"
            />
            <p>{errorMsg}</p>
          </div>
          <div className="form-group">
            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Room ID"
              className="form-input"
            />
          </div>
        </div>
        <div>
          <button
            className="button"
            disabled={username === "" || roomId === ""}
            onClick={connect}
          >
            JOIN
          </button>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
