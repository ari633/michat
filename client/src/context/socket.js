import { createContext, useState, useCallback, useEffect } from "react";
import { socket } from "../socket";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onConnectError(e) {
      setErrorMsg(e.message);
      console.log('Error', e.message);
    }

    function onSession({sessionId, roomId, username, prevMessages}) {
      setErrorMsg('');
      setRoomId(roomId);
      setUsername(username);
      
      if (prevMessages) {
        setMessages(prevMessages);
      }

      localStorage.setItem("sessionId", sessionId);
    }

    function onMessageRoom(value) {
      setMessages((previous) => [...previous, value]);
    }

    socket.on("session", onSession);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("message_room", onMessageRoom);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message_room", onMessageRoom);
      socket.off("session", onSession);
      socket.off("connect_error", onConnectError);
    };
  }, []);

  const doConnect = useCallback((user) => {
    socket.auth = user;
    socket.connect();
  }, []);

  const doDisconnect = useCallback(() => {
    socket.emit('exit_session');
    socket.disconnect();
  }, []);


  const doSendMessage = useCallback((value, roomId, callback) => {
    socket.timeout(500).emit('message_room', {
      value,
      roomId
    }, () => {
      callback(true);
    });
  }, []);

  const values = {
    messages,
    roomId,
    username,
    isConnected,
    errorMsg,
    doSendMessage,
    doConnect,
    doDisconnect,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;