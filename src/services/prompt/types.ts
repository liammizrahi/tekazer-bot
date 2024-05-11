export type PromptResponse = {
    model: string;
    created_at: string;
    message: {
        role: string;
        content: string;
    };
    done: boolean;
    total_duration: number;
    load_duration: number;
    prompt_eval_duration: number;
    eval_count: number;
    eval_duration: number;
};

export enum UserRoles {
    SYSTEM = 'system',
    USER = 'user',
    ASSISTANT = 'assistant',
}
