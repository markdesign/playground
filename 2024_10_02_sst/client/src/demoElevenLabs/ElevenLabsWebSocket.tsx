import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ElevenLabs() {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      // Initialize WebSocket connection to the backend server
      socketRef.current = new WebSocket("ws://localhost:8100/eleven-labs-websocket");
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.transcription) {
          setTranscription((prev) => prev + data.transcription + " ");
        }
      };

      setIsRecording(true);

      // Request microphone access and start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;

      // Send audio chunks to the WebSocket server
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current) {
          socketRef.current.send(event.data);
        }
      };

      mediaRecorder.start(200); // Record in 200ms chunks
    } catch (error) {
      console.error("Error accessing microphone:", error);
      stopRecording();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-2 rounded-xl p-4">
      <div>
        <h1 className="text-2xl">Eleven Labs - Web Socket</h1>
      </div>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        className={`rounded-full ${
          isRecording ? "bg-red-500 " : "bg-green-500 "
        }`}
      ></Button>
      <div className="m-10">
        <p>{transcription}</p>
      </div>
    </div>
  );
}
