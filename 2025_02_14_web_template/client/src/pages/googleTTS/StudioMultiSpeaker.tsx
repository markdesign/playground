import { useState } from 'react';
const VITE_GOOGLE_TTS_API_KEY = 'AIzaSyCxrQ-zHGx7fCJNXnKDmRht8D8L_PSvymo';

const GOOGLE_TTS_URL = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${VITE_GOOGLE_TTS_API_KEY}`;

export default function StudioMultiSpeaker() {
    const [dialogue, setDialogue] = useState([
        { speaker: 'A', text: 'hey, how are you, how is the weather?' },
        { speaker: 'B', text: 'hi, the weather is terrible, thanks for asking.' },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleDialogueChange(index: number, value: string) {
        setDialogue((prev) => prev.map((turn, i) => (i === index ? { ...turn, text: value } : turn)));
    }

    async function synthesizeAndPlay() {
        setLoading(true);
        setError(null);
        try {
            // Build SSML for Studio MultiSpeaker
            const ssmlDialogue = dialogue
                .map((turn) => `<voice name="en-US-Studio-MultiSpeaker" speaker="${turn.speaker}">${turn.text}</voice>`)
                .join('');
            const ssml = `<speak>${ssmlDialogue}</speak>`;

            const response = await fetch(GOOGLE_TTS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: { ssml },
                    voice: { languageCode: 'en-US', name: 'en-US-Studio-MultiSpeaker' },
                    audioConfig: { audioEncoding: 'MP3' },
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('API error: ' + response.status + ' - ' + errorText);
            }
            const data = await response.json();
            if (!data.audioContent) throw new Error('No audio content returned');
            const audioBuffer = Uint8Array.from(atob(data.audioContent), (c) => c.charCodeAt(0));
            const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
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
            <h2 className="">Studio MultiSpeaker Demo (Deprecated)</h2>
            {dialogue.map((turn, idx) => (
                <div key={idx} className="mb-2">
                    <label className="mr-2 text-sm">Speaker {turn.speaker}</label>
                    <textarea
                        value={turn.text}
                        onChange={(e) => handleDialogueChange(idx, e.target.value)}
                        className="w-full border border-gray-300 p-2"
                    />
                </div>
            ))}
            <button
                onClick={synthesizeAndPlay}
                disabled={loading || dialogue.some((turn) => !turn.text)}
                className={`mb-2 bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300`}
            >
                {loading ? 'Synthesizing...' : 'Speak MultiSpeaker'}
            </button>
            {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
    );
}

export { StudioMultiSpeaker };
