import { getState } from '@core/decorators';
import { MessageHandler } from '@core/conversation';
import { HandlerLoaderUtil } from './handler-loader.util';
import * as path from 'path';

/**
 * StateHandlerUtil
 * This class is responsible for handling the state
 * @class StateHandlerUtil
 */
export class StateHandlerUtil {
    /**
     * Get a handler by state
     * @param state
     */
    static getByState(state: string): MessageHandler | null {
        const handlerClasses = HandlerLoaderUtil.loadHandlers(path.join(__dirname, '../../../src/handlers'));
        const handlerClass = handlerClasses.find((handler) => getState(handler) === state);

        if (handlerClass) {
            return new handlerClass();
        }

        return null;
    }
}
