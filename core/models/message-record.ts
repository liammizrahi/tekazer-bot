import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Conversation } from './conversation';

@Entity()
export class MessageRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sender: string;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation: Conversation;
}
