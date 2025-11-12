import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function OpenaiRealTime() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [error, setError] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // useEffect(() => {
  //   connectWebSocket();
  //   return () => {
  //     socketRef.current?.close();
  //   };
  // }, []);

  const connectWebSocket = () => {
    socketRef.current = new WebSocket("ws://localhost:8100/openai-realtime");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setError("");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "transcript") {
        setTranscript((prev) => prev + " " + data.text);
      } else if (data.type === "assistant_message") {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.text },
        ]);
      } else if (data.type === "error") {
        setError(data.text);
      }
    };

    socketRef.current.onerror = () => {
      setError("WebSocket connection error");
    };
  };

  const startRecording = async () => {
    try {
      connectWebSocket();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (
          event.data.size > 0 &&
          socketRef.current?.readyState === WebSocket.OPEN
        ) {
          socketRef.current.send(event.data);
        }
      };

      mediaRecorder.start(1000); // Send audio data every second
      setIsRecording(true);
      setError("");
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Error accessing microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-2 rounded-xl p-4">
      <h1 className="text-2xl">OpenAI Real-Time API Demo</h1>
      {error && <div className="text-red-500">{error}</div>}
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        className={`rounded-full ${
          isRecording ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
        <p className="p-2 bg-gray-100 rounded">{transcript}</p>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Conversation:</h2>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded ${
              message.role === "assistant" ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>
    </div>
  );
}
