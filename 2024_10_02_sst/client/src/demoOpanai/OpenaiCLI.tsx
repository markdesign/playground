import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function OpenaiCLI() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      audioChunks.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        await sendAudioForTranscription(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const sendAudioForTranscription = async (audioBlob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");

    try {
      const response = await fetch("http://localhost:8100/api/openai-cli", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.text) {
        setTranscript(data.text);
      }
    } catch (error) {
      console.error("Error sending audio for transcription:", error);
      setTranscript("Error transcribing audio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-2 rounded-xl p-4">
      <div>
        <h1 className="text-2xl">Open AI - CLI</h1>
      </div>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading}
        className={`rounded-full ${
          isRecording ? "bg-red-500 " : "bg-green-500 "
        }`}
      ></Button>
      <div className="m-10">
        <p>{transcript}</p>
      </div>
    </div>
  );
}
