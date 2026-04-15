import type { Monitors } from '@modern-js/types';
export declare const createErrorHtml: (status: number) => string;
export declare enum ErrorDigest {
    ENOTF = "Page could not be found",
    EINTER = "Internal server error",
    ERENDER = "SSR render failed"
}
export declare function onError(digest: ErrorDigest, error: Error | string, monitors?: Monitors, req?: Request): void;
