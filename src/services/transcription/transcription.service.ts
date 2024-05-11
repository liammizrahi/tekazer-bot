import { SpeechClient } from '@google-cloud/speech';
import { google } from '@google-cloud/speech/build/protos/protos';
import { OpusEncoder } from '@discordjs/opus';

import { LanguageCode } from './types';

/**
 * Service to transcribe voice messages to text
 * @class SpeechToTextService
 */
export class TranscriptionService {
    private readonly buffer: Buffer;

    constructor(buffer: Buffer) {
        this.buffer = Buffer.from(buffer);
    }

    /**
     * Transcribe a voice message
     */
    public async transcribe(): Promise<string | null> {
        try {
            const speechClient = new SpeechClient();

            const file = {
                content: this.buffer,
            };

            const config = {
                encoding: google.cloud.speech.v1.RecognitionConfig.AudioEncoding.OGG_OPUS,
                sampleRateHertz: 16000,
                languageCode: LanguageCode.HEBREW,
                alternativeLanguageCodes: [LanguageCode.ENGLISH],
            };

            const request = {
                audio: file,
                config: config,
            };

            const [response] = await speechClient.recognize(request);
            return response.results.map((result) => result.alternatives[0].transcript).join('\n');
        } catch (error) {
            console.error('Error during transcription:', error.message);
            return undefined;
        }
    }

    /**
     * Check voice recording duration
     */
    public getAudioDuration(): number {
        const data = this.buffer;
        const encoder = new OpusEncoder(48000, 2);
        const pcm = encoder.decode(data as Buffer);
        return pcm.length / 48000;
    }
}
