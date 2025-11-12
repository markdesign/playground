import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AzureCLI = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  useEffect(() => {
    if (recording && mediaRecorder) {
      mediaRecorder.start();
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audioData", audioBlob);

        try {
          const response = await axios.post(
            "http://localhost:8100/api/azure-cli",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("[AzureCLI.tsx 36] response : ", response);
          if (response.data.DisplayText) {
            setTranscript(response.data.DisplayText);
            return;
          }
          if (response.data.DisplayText === "") {
            setTranscript("Error: empty string");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
    }
  }, [recording, mediaRecorder]);

  const startRecording = async () => {
    setTranscript("Recording");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-2 rounded-xl p-4">
      <div>
        <h1 className="text-2xl">Azure - CLI</h1>
        <p className="text-lg">TODO: not working in chrome again</p>
      </div>
      <Button
        onClick={recording ? stopRecording : startRecording}
        className={`rounded-full ${
          recording ? "bg-red-500 " : "bg-green-500 "
        }`}
      ></Button>
      <div className="m-10">
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default AzureCLI;
