import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MessageRecord } from './message-record';

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    phone: string;

    @Column({ default: 'initial_state' })
    state: string;

    @OneToMany(() => MessageRecord, (message) => message.conversation)
    messages: MessageRecord[];

    @Column({ nullable: true })
    lastMessage: string;

    @Column({ type: 'json', nullable: true }) // Specify type: 'json'
    jsonData: Record<string, any>;

    @Column({ default: false })
    closed: boolean;
}
