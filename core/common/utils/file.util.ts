export class FileUtil {
    static mimeTypeToExtension(mimeType: string): string | null {
        const mimeToExtMap: Record<string, string> = {
            'image/jpeg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
            'video/mp4': '.mp4',
            'video/3gpp': '.3gp',
            'video/quicktime': '.mov',
            'video/x-msvideo': '.avi',
            'video/x-ms-wmv': '.wmv',
            'video/x-flv': '.flv',
            'video/webm': '.webm',
            'video/ogg': '.ogv',
            'audio/mpeg': '.mp3',
            'audio/wav': '.wav',
            'audio/ogg': '.ogg',
            'audio/m4a': '.m4a',
            'audio/mp4': '.mp4',
            'audio/aac': '.aac',
            'audio/flac': '.flac',
            'audio/x-ms-wma': '.wma',
            'application/pdf': '.pdf',
            'application/msword': '.doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
            'application/vnd.ms-excel': '.xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
            'application/vnd.ms-powerpoint': '.ppt',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
            'application/zip': '.zip',
            'application/x-rar-compressed': '.rar',
            'application/x-7z-compressed': '.7z',
        };

        const normalizedMimeType = mimeType.toLowerCase();

        return mimeToExtMap[normalizedMimeType] || null;
    }
}
