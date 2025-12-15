export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string | undefined;

    constructor(message: string, statusCode: number, errorCode?: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}