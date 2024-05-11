import * as fs from 'fs';
import * as path from 'path';

const directoriesToRemove = ['.wwebjs_auth', '.wwebjs_cache'];

function removeDirectories(directories: string[]): void {
    const rootDir = process.cwd();

    directories.forEach((dir) => {
        const dirPath = path.join(rootDir, dir);

        try {
            if (fs.existsSync(dirPath)) {
                fs.rmSync(dirPath, { recursive: true });
                console.log(`Removed directory: ${dirPath}`);
            } else {
                console.log(`Directory not found: ${dirPath}`);
            }
        } catch (error) {
            console.error(`Error removing directory ${dirPath}: ${error.message}`);
        }
    });
}

removeDirectories(directoriesToRemove);
