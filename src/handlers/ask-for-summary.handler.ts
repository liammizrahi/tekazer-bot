import { State } from '@core/decorators';
import { MessageHandler, ConversationManager } from '@core/conversation';
import { ChatState } from '../domain/chat-state.enum';

@State(ChatState.ASK_FOR_SUMMARY)
export class AskForSummaryHandler implements MessageHandler {
    async handleMessage(conversation: ConversationManager): Promise<void> {
        const positiveResponses = ['כן', 'yes', 'ok', 'אוקי', 'אישור', '👍'];
        const negativeResponses = ['לא', 'no', 'לא תודה', '👎'];

        const confirmation = conversation.message.body.toLowerCase();
        if (positiveResponses.includes(confirmation)) {
            await conversation.changeState(ChatState.SUMMARIZE);
        } else if (negativeResponses.includes(confirmation)) {
            const transcription = (await conversation.getSetting('transcription')) as string;
            await conversation.sendMessage(transcription);
            await conversation.closeConversation();
        } else {
            await conversation.sendMessage('יש לענות כן או לא בלבד.');
        }
    }

    async onEnterState(conversation: ConversationManager): Promise<void> {
        await conversation.sendMessage('שמעתי את ההקלטה! לקצר עבורך? (יש לרשום כן או לא)');
    }
}
