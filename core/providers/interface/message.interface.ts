import { Location, MessageType, MediaModel } from '../domain-model';

export interface IMessage {
    /** If the message was sent to a group, this field will contain the user that sent the message. */
    author?: string;
    /** String that represents from which device type the message was sent */
    deviceType?: string;
    /** Message content */
    body: string;
    /** Indicates if the message will disappear after it expires */
    isEphemeral: boolean;
    /** ID for the Chat that this message was sent to, except if the message was sent by the current user */
    from: string;
    /** Indicates if the message was sent by the current user */
    fromMe: boolean;
    /** Indicates if the message has media available for download */
    hasMedia: boolean;
    /** ID that represents the message */
    id: string;
    /** Indicates if the message was forwarded */
    isForwarded: boolean;
    /**
     * Indicates how many times the message was forwarded.
     * The maximum value is 127.
     */
    forwardingScore: number;
    /** Location information contained in the message, if the message is type "location" */
    location: Location;
    /** List of vCards contained in the message */
    vCards: string[];
    /** MediaKey that represents the sticker 'ID' */
    mediaKey?: string;
    /** Indicates the mentions in the message body. */
    mentionedIds: [];
    /** Unix timestamp for when the message was created */
    timestamp: number;
    /**
     * ID for who this message is for.
     * If the message is sent by the current user, it will be the Chat to which the message is being sent.
     * If the message is sent by another user, it will be the ID for the current user.
     */
    to: string;
    /** Message type */
    type: MessageType;
    /** Links included in the message. */
    links: Array<{
        link: string;
        isSuspicious: boolean;
    }>;
    /** title */
    title?: string;
    /** description*/
    description?: string;
    /** Returns message in a raw format */
    rawData: object;
    /** Deletes the message from the chat */
    delete: (everyone?: boolean) => Promise<void>;
    /** Downloads and returns the attached message media */
    downloadMedia: () => Promise<MediaModel>;
    /** Returns the Chat this message was sent in */
    getChat: () => Promise<string>;
    /** Returns the Contact this message was sent from */
    // getContact: () => Promise<Contact>;
    /** Returns the Contacts mentioned in this message */
    // getMentions: () => Promise<string[]>;
    /**
     * Sends a message as a reply to this message.
     * If chatId is specified, it will be sent through the specified Chat.
     * If not, it will send the message in the same Chat as the original message was sent.
     */
    // reply: (content: string, chatId?: string, options?: MessageSendOptions) => Promise<IMessage>;
    /** React to this message with an emoji*/
    // react: (reaction: string) => Promise<void>;
    /**
     * Forwards this message to another chat (that you chatted before, otherwise it will fail)
     */
    // forward: (chat: Chat | string) => Promise<void>;
    /** Star this message */
    // star: () => Promise<void>;
    /** Unstar this message */
    // unstar: () => Promise<void>;
    /**
     * Gets the reactions associated with the given message
     */
    // getReactions: () => Promise<ReactionList[]>;
    /** Edits the current message */
    // edit: (content: MessageContent, options?: MessageEditOptions) => Promise<Message | null>;
}
