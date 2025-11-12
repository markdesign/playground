import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import "./DemoTwo.module.css";

function DemoTwo() {
    const terminalLineData = [
        <TerminalOutput>Demo Two: Using react-terminal-ui</TerminalOutput>,
        <TerminalOutput></TerminalOutput>,
        <TerminalOutput>Enter Password</TerminalOutput>,
    ];

    return (
        <div data-id="DemoTwo" className="w-dvw h-dvh overflow-hidden" key="DemoTwo">
            <Terminal
                name="React Terminal Usage Example"
                prompt="c:/northropgrumman $ "
                height="100dvh"
                colorMode={ColorMode.Dark}
                onInput={(terminalInput) => console.log(terminalInput)}
                startingInputValue=""
                // redBtnCallback?: () => void;
                // yellowBtnCallback?: () => void;
                // greenBtnCallback?: () => void;
                // scrollToPosition?: boolean;
            >
                {terminalLineData}
            </Terminal>
        </div>
    );
}

export { DemoTwo };