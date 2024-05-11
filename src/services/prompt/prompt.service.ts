import axios from 'axios';

import { PromptResponse, UserRoles } from './types';
import * as process from 'process';

export class PromptSession {
    async summarize(message: string): Promise<PromptResponse> {
        const model = process.env.LLV_MODEL || 'llama3';

        const taskResponse = await axios({
            url: 'http://localhost:11434/api/chat',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                model: model,
                stream: false,
                options: {
                    seed: Math.random() * 99 + 1,
                    temperature: 0.2,
                },
                keep_alive: '5m',
                messages: [
                    {
                        role: UserRoles.SYSTEM,
                        content:
                            'You are summarizing a transcription of voice messages in Hebrew, keep it short and simple. do not be official and speak in everyday speech, Please answer in Hebrew.',
                    },
                    {
                        role: UserRoles.USER,
                        content:
                            'תקשיב אני רוצה ללכת עוד מעט לקניון כי יש לי חתונה מחר בוא נלך אולי לפוט לוקר לקנות נעל',
                    },
                    {
                        role: UserRoles.ASSISTANT,
                        content: 'יש לו חתונה מחר אז הוא רוצה ללכת לקניון, אולי לקנות נעל.',
                    },
                    {
                        role: UserRoles.USER,
                        content: 'שמעת שדניאל המטומטם עשה תאונה אתמול הוא החליק עם האופנוע והוא בבית חולים עם אבא שלו',
                    },
                    {
                        role: UserRoles.ASSISTANT,
                        content: 'דניאל עשה תאונה עם האופנוע והוא בבית חולים',
                    },
                    {
                        role: UserRoles.USER,
                        content: message,
                    },
                ],
            },
        });

        return taskResponse.data;
    }
}
