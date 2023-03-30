import io from "socket.io-client";
import { useEffect, useMemo } from "react";
const SOCKET_URL = "http://localhost:5000";

export default function ChatPage() {
  const socket = useMemo(() => {
    return io(SOCKET_URL);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.disconnect();
      }
    };
  }, [socket]);

  return <div>Chat Page</div>;
}
