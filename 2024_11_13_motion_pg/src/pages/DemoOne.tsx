// import React, { useState } from "react";
import { Monitor } from "../components/Monitor";
import "./DemoOne.module.css";

function DemoOne() {
    // const [inputValue, setInputValue] = useState("");
    // const [commands, setCommands] = useState<string[]>([]);

    // const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setInputValue(event.target.value);
    // };

    // const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (event.key === "Enter" && !event.shiftKey) {
    //         event.preventDefault();
    //         setCommands([...commands, inputValue]);
    //         setInputValue("");
    //     }
    // };

    return (
        <div data-id="DemoOne" className="w-dvw h-dvh">
            {/* <div className="w-full bg-black text-green-500 font-mono flex flex-col justify-start items-start p-4">
                {commands.map((cmd, index) => (
                    <div key={index} className="flex items-center">
                        <span className="pr-2">user@terminal:~$</span>
                        <pre className="whitespace-pre-wrap break-words">{cmd}</pre>
                    </div>
                ))}
                <div className="flex items-center">
                    <span className="pr-2">user@terminal:~$</span>
                    <textarea
                        className="bg-black text-green-500 w-full p-0 border-none focus:outline-none resize-none"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        rows={1}
                        autoFocus
                    />
                </div>
            </div> */}
            <Monitor />
        </div>
    );
}

export { DemoOne };
