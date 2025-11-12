import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ElevenLabsSDK() {
  const [text, setText] = useState(
    "Now is the time for all good men to come to the aid of their country."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const startRecording = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8100/api/eleven-labs-sdk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();

      if (data.audio) {
        // Convert base64 to audio URL
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0))],
          { type: "audio/mpeg" }
        );
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-2 rounded-xl p-4">
      <div>
        <h1 className="text-2xl">Eleven Labs - SDK</h1>
      </div>
      <Button
        onClick={startRecording}
        className={`rounded-full ${
          isLoading ? "bg-red-500 " : "bg-green-500 "
        }`}
      ></Button>
      <Textarea
        placeholder="Enter text to convert to speech..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="w-full"
      />
      {audioUrl && (
        <audio controls className="w-full mt-4">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
