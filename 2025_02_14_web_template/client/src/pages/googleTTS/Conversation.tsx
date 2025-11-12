import { useState } from 'react';
const VITE_GOOGLE_TTS_API_KEY = 'AIzaSyCxrQ-zHGx7fCJNXnKDmRht8D8L_PSvymo';

const GOOGLE_TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${VITE_GOOGLE_TTS_API_KEY}`;

export default function Conversation() {
    const [speaker1, setSpeaker1] = useState('hey, how are you, how is the weather');
    const [speaker2, setSpeaker2] = useState('hi, the weather is terrible, thanks for asking');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const voice1 = 'en-US-Wavenet-F';
    const voice2 = 'en-US-Wavenet-D';

    function buildSSML(text1: string, text2: string) {
        return `
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
  <voice name="${voice1}">${text1}</voice>
  <break time="700ms"/>
  <voice name="${voice2}">${text2}</voice>
</speak>
`;
    }

    async function synthesizeAndPlay() {
        setLoading(true);
        setError(null);
        try {
            const ssml = buildSSML(speaker1, speaker2);
            const response = await fetch(GOOGLE_TTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: { ssml },
                    voice: { languageCode: 'en-US' },
                    audioConfig: {
                        audioEncoding: 'LINEAR16',
                    },
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('API error: ' + response.status + ' - ' + errorText);
            }
            const data = await response.json();
            if (!data.audioContent) throw new Error('No audio content returned');
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
        <div className="p-4 bg-white">
            <h2 className="">Basic TTS with SSML</h2>
            <div>
                <label className="text-xs">speaker 1: en-US-Wavenet-F</label>
                <textarea
                    value={speaker1}
                    onChange={(e) => setSpeaker1(e.target.value)}
                    placeholder="Speaker 1 text..."
                    className="w-full border border-gray-300 p-2"
                />
            </div>
            <div>
                <label className="text-xs">speaker 2: en-US-Wavenet-D</label>
                <textarea
                    value={speaker2}
                    onChange={(e) => setSpeaker2(e.target.value)}
                    placeholder="Speaker 2 text..."
                    className="w-full border border-gray-300 p-2"
                />
            </div>
            <button
                onClick={synthesizeAndPlay}
                disabled={loading || !(speaker1 && speaker2)}
                className={`mb-2 bg-blue-500 px-2 py-1 font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300`}
            >
                {loading ? 'Synthesizing...' : 'Speak Conversation'}
            </button>
            {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
    );
}

export { Conversation };
