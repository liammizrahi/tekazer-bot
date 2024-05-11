import * as path from 'path';
import * as fs from 'fs';

/**
 * Utility class to load handlers from a directory.
 * @class HandlerLoaderUtil
 */
export class HandlerLoaderUtil {
    /**
     * Load all handlers from a directory.
     * @param directoryPath
     */
    static loadHandlers(directoryPath: string): (new () => any)[] {
        const handlers: (new () => any)[] = [];

        fs.readdirSync(directoryPath).forEach((file) => {
            if (file.endsWith('.handler.ts')) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const handlerModule = require(path.join(directoryPath, file));
                Object.values(handlerModule).forEach((handlerClass) => {
                    if (typeof handlerClass === 'function') {
                        // Ensure handlerClass is a constructor function
                        if (handlerClass.prototype && handlerClass.prototype.constructor) {
                            handlers.push(handlerClass as new () => any);
                        }
                    }
                });
            }
        });

        return handlers;
    }
}
