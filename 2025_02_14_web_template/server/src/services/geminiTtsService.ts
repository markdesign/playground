import { GoogleAuth } from 'google-auth-library';

interface SpeakerConfig {
  speakerAlias: string;
  speakerId: string;
}

export interface GeminiTtsRequest {
  prompt: string;
  text: string;
  speakers: SpeakerConfig[];
  languageCode?: string;
  modelName?: string; // gemini-2.5-flash-tts default
  audioEncoding?: string; // LINEAR16 default
  sampleRateHertz?: number; // 24000 default
}

export async function synthesizeGeminiMultiSpeaker(req: GeminiTtsRequest, projectId: string) {
  const {
    prompt,
    text,
    speakers,
    languageCode = 'en-us',
    modelName = 'gemini-2.5-flash-tts',
    audioEncoding = 'LINEAR16',
    sampleRateHertz = 24000,
  } = req;

  const url = 'https://texttospeech.googleapis.com/v1/text:synthesize';

  const body = {
    input: { prompt, text },
    voice: {
      languageCode,
      modelName,
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: speakers.map((s) => ({ speakerAlias: s.speakerAlias, speakerId: s.speakerId })),
      },
    },
    audioConfig: { audioEncoding, sampleRateHertz },
  };

  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  const client = await auth.getClient();
  const token = await (client as any).getAccessToken();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.token || token}`,
      'Content-Type': 'application/json',
      'x-goog-user-project': projectId,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`TTS API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  if (!data.audioContent) {
    throw new Error('No audioContent field in response');
  }
  return data.audioContent as string; // base64
}
