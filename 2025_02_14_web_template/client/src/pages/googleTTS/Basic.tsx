import { useState } from 'react';
// const VITE_GOOGLE_TTS_API_KEY = import.meta.env.VITE_GOOGLE_TTS_API_KEY;
const VITE_GOOGLE_TTS_API_KEY = 'AIzaSyCxrQ-zHGx7fCJNXnKDmRht8D8L_PSvymo';

const GOOGLE_TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${VITE_GOOGLE_TTS_API_KEY}`;

export default function Basic() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function synthesizeAndPlay() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(GOOGLE_TTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: {
                        text,
                    },
                    voice: {
                        languageCode: 'en-us',
                        // name: 'en-US-Chirp-HD-F',
                        // model_name: 'gemini-2.5-flash-tts',
                    },
                    audioConfig: {
                        audioEncoding: 'LINEAR16',
                    },
                }),
            });
            if (!response.ok) throw new Error('API error: ' + response.status);
            const data = await response.json();
            if (!data.audioContent) throw new Error('No audio content returned');
            // Decode base64 audio
            const audioBuffer = Uint8Array.from(atob(data.audioContent), (c) => c.charCodeAt(0));
            const blob = new Blob([audioBuffer], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-4">
            <h2 className="">Basic TTS</h2>
            {/* <p className="text-sm">voice name: en-US-Chirp-HD-F</p> */}
            {/* <p className="text-sm">model name: gemini-2.5-flash-tts </p> */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to synthesize..."
                className="w-full border border-gray-300 p-2"
            />
            <button
                onClick={synthesizeAndPlay}
                disabled={loading || !text}
                className={`mb-2 block bg-blue-500 px-2 py-1 font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300`}
            >
                {loading ? 'Synthesizing...' : 'Speak'}
            </button>
            {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
    );
}

export { Basic };
