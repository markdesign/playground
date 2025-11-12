import "./App.css";
import ElevenLabsSDK from "./demoElevenLabs/ElevenLabsSDK";
import ElevenLabsWebSocket from "./demoElevenLabs/ElevenLabsWebSocket";
import OpenaiRealTime from "./demoOpanai/OpenaiRealTime";
import OpenaiCLI from "./demoOpanai/OpenaiCLI";
import AzureSDK from "./demoAzure/AzureSDK";
import AzureCLI from "./demoAzure/AzureCLI";
import DemoWebSocket from "./demoWebScoket/DemoWebSocket";

function App() {
  return (
    <div className="flex flex-col gap-4">
      <ElevenLabsSDK />
      <ElevenLabsWebSocket />

      <OpenaiRealTime />
      <OpenaiCLI />

      <AzureSDK />
      <AzureCLI />

      <DemoWebSocket />
    </div>
  );
}

export default App;
