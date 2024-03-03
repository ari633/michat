import { useEffect } from "react";
import { useContext } from "react";
import { ChatForm } from "../components/ChatForm";
import { SocketContext } from "../context/socket";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const {
    messages,
    isConnected,
    doDisconnect,
    doSendMessage,
    username,
    roomId,
  } = useContext(SocketContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);


  function disconnect() {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("roomId");
    doDisconnect();
  }

  return (
    <div>
      <ChatForm
        messages={messages}
        doDisconnect={doDisconnect}
        doSendMessage={doSendMessage}
        username={username}
        roomId={roomId}
        disconnect={disconnect}
      />
    </div>
  );
}
