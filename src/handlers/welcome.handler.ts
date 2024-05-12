import { State } from '@core/decorators';
import { MessageHandler, ConversationManager } from '@core/conversation';
import { ChatState } from '../domain/chat-state.enum';

@State(ChatState.INITIAL_STATE)
export class WelcomeHandler implements MessageHandler {
    canProcessMedia = true;

    async handleMessage(conversation: ConversationManager): Promise<void> {
        if (!conversation.message.hasMedia) {
            await conversation.sendMessage('ברוכים הבאים לתקצר בוט 🤖\nיש לשלוח הקלטה קולית בלבד.');
            await conversation.closeConversation();
            return;
        }

        const file = await conversation.downloadMediaToTempFile();

        const allowedMimeTypes = ['audio/wav', 'audio/ogg', 'audio/aac', 'audio/amr'];
        if (!allowedMimeTypes.includes(this.cleanMimeType(file.getMimeType()))) {
            await conversation.sendMessage('יש לשלוח הודעות קול בלבד.');
            await conversation.closeConversation();
            await file.done();
            return;
        }

        await conversation.setSetting('file', file);
        await conversation.setSetting('timestamp', Date.now());

        await conversation.changeState(ChatState.SPEECH_TO_TEXT);
    }

    private cleanMimeType(mimeType: string): string {
        return mimeType.split(';')[0];
    }
}
