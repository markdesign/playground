import { useState, useEffect } from "react";

interface TypeWriterProps {
    /** The text to be animated */
    text: string;
    /** Speed of typing in milliseconds per character */
    speed?: number;
    /** Callback function when typing animation completes */
    onComplete?: () => void;
    /** Custom cursor character (default: '|') */
    cursor?: string;
    /** Whether to show the cursor (default: true) */
    showCursor?: boolean;
}


function TypeWriter({ text, speed = 50, onComplete = () => {}, cursor = "|", showCursor = true }: TypeWriterProps) {
    const [displayText, setDisplayText] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else {
            onComplete();
        }
    }, [currentIndex, speed, text, onComplete]);

    return (
        <div className="font-mono">
            {displayText}
            {showCursor && <span className="animate-pulse">{cursor}</span>}
        </div>
    );
}

export { TypeWriter };

// // Example usage with types
// interface DemoState {
//   completed: boolean;
// }

// const Demo: React.FC = () => {
//   const [completed, setCompleted] = useState<boolean>(false);

//   return (
//     <div className="p-4 max-w-lg">
//       <TypeWriter
//         text="Hello! This is a TypeScript typing animation component for React."
//         speed={75}
//         onComplete={() => setCompleted(true)}
//         showCursor={true}
//         cursor="|"
//       />
//       {completed && (
//         <p className="mt-4 text-gray-600">Animation completed!</p>
//       )}
//     </div>
//   );
// };

// export default Demo;
