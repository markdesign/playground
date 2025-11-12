import { useState } from "react";
import { Button } from "@/components/ui/button";

const DemoWebSocket = () => {
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  async function onWebsocketConnect() {
    const ws = new WebSocket("ws://localhost:8100/websocket");

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setMessage("");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error); // Added error handling
    };

    ws.onmessage = (event) => {
      console.log("Message from server: ", event.data); // Handle incoming messages
      setMessage(event.data);
    };

    setWebSocket(ws);
  }

  async function onWebsocketDisconnect() {
    if (webSocket) {
      webSocket.close(); // Close the WebSocket connection
      setWebSocket(null); // Reset the WebSocket state
      setIsConnected(false); // Update connection status
    }
  }

  const toggleConnection = () => {
    if (isConnected) {
      onWebsocketDisconnect(); // Disconnect if currently connected
    } else {
      onWebsocketConnect(); // Connect if currently disconnected
    }
  };

  const sendMessage = (message: string) => {
    if (webSocket && isConnected) {
      webSocket.send(message); // Send a message through the WebSocket
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-2 rounded-xl p-10">
      <h1 className="text-2xl">Web Socket Test</h1>
      <div className="flex space-x-4 items-center">
        <div
          className={`w-4 h-4 rounded-full ${
            isConnected ? "bg-red-500 " : "bg-green-500 "
          }`}
        ></div>
        <Button onClick={toggleConnection}>
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
        <Button onClick={() => sendMessage("Hello, WebSocket!")}>
          Send Message
        </Button>
      </div>
      <p>{` Message: ${message} `}</p>
    </div>
  );
};

export default DemoWebSocket;
