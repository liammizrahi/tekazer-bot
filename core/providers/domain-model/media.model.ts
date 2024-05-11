export class MediaModel {
    private _mimeType: string;
    private _data: string;
    private _filename?: string;

    constructor(mimeType: string, data: string, filename: string = 'Media') {
        this.mimeType = mimeType;
        this.data = data;
        this.filename = filename;
    }

    get mimeType(): string {
        return this._mimeType;
    }

    set mimeType(value: string) {
        // const mimeTypePattern = /^[a-z]+\/[a-z0-9\-+]+$/i;
        //
        // if (!mimeTypePattern.test(value)) {
        //     throw new Error('Invalid mime type');
        // }

        this._mimeType = value;
    }

    get data(): string {
        return this._data;
    }

    set data(value: string) {
        this._data = value;
    }

    get filename(): string | undefined {
        return this._filename;
    }

    set filename(value: string | undefined) {
        this._filename = value;
    }
}
