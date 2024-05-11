import { State } from '@core/decorators';
import { MessageHandler, ConversationManager } from '@core/conversation';
import { ChatState } from '../domain/chat-state.enum';
import { PromptSession } from '../services/prompt/prompt.service';

@State(ChatState.SUMMARIZE)
export class SummarizeHandler implements MessageHandler {
    async handleMessage(conversation: ConversationManager): Promise<void> {
        const transcription = (await conversation.getSetting('transcription')) as string;

        const message = conversation.message.body.toLowerCase();
        if (message === 'תמלול') {
            await conversation.sendMessage(transcription);
            await conversation.closeConversation();
            return;
        }

        const timestamp: number = (await conversation.getSetting('timestamp')) as number;
        if (Date.now() - timestamp > 60 * 10 * 1000) {
            await conversation.sendMessage('בגלל שעבר יותר מידי זמן, אני שולח את התמלול המלא');
            await conversation.sendMessage(transcription);
            await conversation.closeConversation();
            return;
        }

        await conversation.sendMessage(
            'סבלנות, אני עדיין מסכם את התמלול...\nניתן לקבל את התמלול המלא של ההקלטה בשליחת ״תמלול״ בשיחה',
        );
    }

    async onEnterState(conversation: ConversationManager): Promise<void> {
        await conversation.sendMessage('אין בעיה אני כבר שולח סיכום מסודר.');
        await conversation.sendMessage('⚠️ הפעולה עלולה לקחת זמן עקב עומס בתשתיות');

        const transcription = (await conversation.getSetting('transcription')) as string;

        const promptSession = new PromptSession();
        const promptResponse = await promptSession.summarize(transcription);

        const summary = promptResponse.message.content;

        await conversation.sendMessage(summary);
        await conversation.closeConversation();
    }
}
