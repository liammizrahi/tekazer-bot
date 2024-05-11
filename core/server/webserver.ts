import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as qrcode from 'qrcode';
import * as handlebars from 'express-handlebars';
import * as path from 'path';

import { router } from './routes/router';
import { ConnectionRequest } from './types';

/**
 * Web server
 */
export class Webserver {
    private app: express.Application;
    private connectionRequests: ConnectionRequest[];

    constructor() {
        this.app = express();
        this.connectionRequests = [];
    }

    /**
     * Initialize the web server
     * @returns {void}
     */
    public initialize() {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('handlebars', handlebars.engine());
        this.app.set('view engine', 'handlebars');

        this.app.use('/assets', express.static(path.join(__dirname, 'assets')));
        this.app.use(bodyParser.json());

        // Router
        this.app.use('/', router);

        // Endpoint for connecting the client and displaying QR code
        this.app.get('/connect/:botName', this.handleConnect.bind(this));

        // Start the web server
        const port = process.env.PORT || 7060;
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    /**
     * Handle the /connect endpoint
     * @param req
     * @param res
     * @private
     */
    private async handleConnect(req: express.Request, res: express.Response) {
        const botName = req.params.botName;
        const connectionRequest = this.getConnectionRequestByBotName(botName);

        if (!connectionRequest) {
            res.status(404).render('already-connected');
            return;
        }

        try {
            const url = await qrcode.toDataURL(connectionRequest.qrCode);
            res.render('connect', { qrCodeUrl: url, botName: connectionRequest.botName });
        } catch (error: any) {
            console.error('Error generating QR code:', error.message);
            res.status(500).render('server-error');
        }
    }

    /**
     * Get the connection request by bot name
     * @param botName
     * @private
     */
    private getConnectionRequestByBotName(botName: string): ConnectionRequest | undefined {
        return this.connectionRequests.find((request) => request.botName === botName);
    }

    /**
     * Insert a connection request
     * @param botName
     * @param qrCode
     */
    insertConnectionRequest(botName: string, qrCode: string): void {
        this.removeConnectionRequest(botName);

        const newConnectionRequest: ConnectionRequest = {
            botName,
            qrCode,
        };
        this.connectionRequests.push(newConnectionRequest);
    }

    /**
     * Remove a connection request
     * @param botName
     */
    removeConnectionRequest(botName: string): void {
        this.connectionRequests = this.connectionRequests.filter((request) => request.botName !== botName);
    }
}
