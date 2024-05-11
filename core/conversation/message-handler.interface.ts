import { ConversationManager } from './conversation-manager';

/**
 * Message handler interface
 */
export interface MessageHandler {
    canProcessMedia?: boolean;

    handleMessage(conversation: ConversationManager): Promise<void>;
    onEnterState?(conversation: ConversationManager): Promise<void>;
}
