import { MediaModel } from '../domain-model';

export interface IClient {
    sendMessage(to: string, message: string): Promise<void>;
    sendMediaByUrl(to: string, url: string): Promise<void>;
    sendMedia(to: string, media: MediaModel): Promise<void>;

    leaveChat?(): Promise<void>;

    getCoreClient(): any;
}
