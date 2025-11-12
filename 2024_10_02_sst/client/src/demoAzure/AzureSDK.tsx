import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { SpeechRecognizer } from "microsoft-cognitiveservices-speech-sdk";
import axios, { AxiosError } from "axios";

const authorizationEndpoint =
  "http://localhost:8100/api/azure-sdk/get-speech-token";

const AzureSDK = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  async function getTokenOrRefresh() {
    try {
      const res = await axios.get(authorizationEndpoint);
      const token = res.data.token;
      const region = res.data.region;

      console.log("Token fetched from back-end: " + token);
      return { authToken: token, region: region };
    } catch (err) {
      const error = err as AxiosError; // Type assertion
      console.log(error.response?.data); // Optional chaining to avoid potential errors
      return { authToken: null, error: error.response?.data };
    }
  }

  const startRecording = async () => {
    setIsRecording(true);
    setTranscript("");
    console.log("startRecording");
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    recognizer.startContinuousRecognitionAsync();
    recognizerRef.current = recognizer;

    recognizer.recognizing = (_, event) => {
      setTranscript(`1 recognizing ${event.result.text}`);
    };

    recognizer.recognized = (_, event) => {
      if (event.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
        setTranscript(`2 recognized ${event.result.text}`);
      }
      if (event.result.reason === speechsdk.ResultReason.NoMatch) {
        console.log("No speech detected.");
      }
    };

    recognizer.canceled = (_, event) => {
      if (event.reason === speechsdk.CancellationReason.Error) {
        setError(`canceled: ${event.errorDetails}`);
      }
    };

    recognizer.speechStartDetected = () => {
      console.log("Speech start detected");
    };

    recognizer.speechEndDetected = () => {
      console.log("Speech end detected");
    };
  };

  const stopRecording = async () => {
    console.log("stopRecording");
    if (recognizerRef.current) {
      setIsRecording(false);
      try {
        await recognizerRef.current.stopContinuousRecognitionAsync();
      } catch (error) {
        console.error(
          "Error stopping recognition:",
          error instanceof Error ? error : new Error(String(error))
        );
        setError(error instanceof Error ? error.message : String(error));
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border-2 rounded-xl p-4">
      <h1 className="text-2xl">Azure - SDK</h1>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        className={`rounded-full ${
          isRecording ? "bg-red-500 " : "bg-green-500 "
        }`}
      ></Button>
      <div className="m-10">
        <p>{transcript}</p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AzureSDK;
