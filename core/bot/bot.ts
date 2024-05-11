import { Webserver } from '@core/webserver';

export abstract class Bot {
    name: string;
    webserver: Webserver;

    protected constructor(name: string, webserver: Webserver) {
        this.name = name;
        this.webserver = webserver;
    }

    abstract initialize(): Promise<void>;
}
