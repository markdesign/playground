import { Basic } from './Basic';
import { GeminiTTS } from './GeminiTTS';
import { Conversation } from './Conversation';
import { Chirp } from './Chirp';
import { StudioMultiSpeaker } from './StudioMultiSpeaker';

export default function GoogleTTS() {
    return (
        <div className="flex flex-col gap-4 p-4 bg-neutral-200">
            <h2 className="text-2xl">Google TTS Demo</h2>
            <Basic />
            <GeminiTTS />
            <Conversation />
            <Chirp />
            <StudioMultiSpeaker />
        </div>
    );
}

export { GoogleTTS };
