import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUtil } from './utils/file.util';

export class TempFile {
    private filePath: string | null = null;

    constructor(
        private buffer: Buffer,
        private mimetype: string,
    ) {
        this.createTempFile();
    }

    private createTempFile(): void {
        const uniqueFilename = uuidv4();
        const tempFileName = `${uniqueFilename}${FileUtil.mimeTypeToExtension(this.mimetype) || '.tmp'}`;
        this.filePath = path.join(__dirname, '../../temp', tempFileName);
        fs.writeFileSync(this.filePath, this.buffer);
    }

    done(): void {
        if (this.filePath) {
            // Delete the temporary file
            fs.unlinkSync(this.filePath);
            this.filePath = null; // Reset the filePath after deletion
        } else {
            console.warn('No file path available. File may have already been deleted or not created.');
        }
    }

    getFilePath(): string | null {
        return this.filePath;
    }

    getMimeType(): string {
        return this.mimetype;
    }

    getBuffer(): Buffer {
        return this.buffer;
    }
}
