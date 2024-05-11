import { State } from '@core/decorators';
import { MessageHandler, ConversationManager } from '@core/conversation';
import { ChatState } from '../domain/chat-state.enum';
import { TempFile } from '@core/common';
import { TranscriptionService } from '../services/transcription/transcription.service';

@State(ChatState.SPEECH_TO_TEXT)
export class SpeechToTextHandler implements MessageHandler {
    readonly MAX_DURATION_SECONDS = 30;

    async handleMessage(conversation: ConversationManager): Promise<void> {
        const timestamp: number = (await conversation.getSetting('timestamp')) as number;
        if (Date.now() - timestamp > 60 * 5 * 1000) {
            await conversation.sendMessage('עבר יותר מידי זמן בעיבוד הבקשה, נא לשלוח את ההקלטה מחדש.');
            await conversation.closeConversation();

            const file: TempFile = (await conversation.getSetting('file')) as TempFile;
            if (file.getFilePath()) {
                file.done();
            }

            return;
        }

        await conversation.sendMessage('סבלנות, אני עדיין ממלל את ההקלטה...');
    }

    async onEnterState(conversation: ConversationManager): Promise<void> {
        await conversation.sendMessage('אני מתמלל את ההקלטה, כמה רגעים...');

        const file = (await conversation.getSetting('file')) as TempFile;
        const transcriptionService = new TranscriptionService(file.getBuffer() as string);
        file.done();

        if (transcriptionService.getAudioDuration() > this.MAX_DURATION_SECONDS) {
            await conversation.sendMessage('ההקלטה ארוכה מידי. נא לשלוח הקלטה קצרה יותר, עד חצי דקה.');
            return await conversation.closeConversation();
        }

        const transcription = await transcriptionService.transcribe();

        await conversation.setSetting('transcription', transcription);
        await conversation.changeState(ChatState.ASK_FOR_SUMMARY);
    }
}
