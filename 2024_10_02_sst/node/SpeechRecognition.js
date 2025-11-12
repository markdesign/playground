const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const AZURE_API_KEY = "b6c3e0661b4b4367b2be97b4900a8323";
const AZURE_REGION = "westus2";

const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE_API_KEY, AZURE_REGION);
speechConfig.speechRecognitionLanguage = "en-US";

function fromFile() {
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("whatstheweatherlike.wav"));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case sdk.ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}
fromFile();