import { useState } from 'react';

interface SpeakerConfigUI {
    alias: string;
    voice: string;
}

export default function GeminiTTS() {
    const [text, setText] = useState('Sam: Hi Bob, how are you?\nBob: I am doing well, and you?');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('Say the following as a conversation between friends.');
    const speakers = [
        { alias: 'Sam', voice: 'Kore' },
        { alias: 'Bob', voice: 'Charon' },
    ];

    console.log('[GeminiTTS.tsx 27] speakers : ', speakers);
    async function synthesizeAndPlay() {
        setLoading(true);
        setError(null);
        try {
            const body = {
                prompt,
                text,
                speakers: speakers.map((s) => ({ speakerAlias: s.alias, speakerId: s.voice })),
                modelName: 'gemini-2.5-flash-tts',
            };
            console.log('[GeminiTTS.tsx 38] body : ', body);
            const response = await fetch('http://localhost:4200/api/v1/tts/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
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
        <div className="space-y-3 bg-white p-4">
            <h2 className="">Gemini Multi-Speaker TTS</h2>
            <div className="mb-4 flex gap-10">
                <span className="text-sm font-medium">Speakers</span>
                {speakers.map((s, i) => (
                    <div key={i} className="flex gap-2">
                        <p className="text-xs">
                            {s.alias}: {s.voice}{' '}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium">Prompt</label>
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Script</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Sam: Hi Bob...\nBob: I am doing well..."
                    className="w-full border border-gray-300 p-2"
                />
            </div>

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

export { GeminiTTS };
