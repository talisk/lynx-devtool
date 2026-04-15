import type React from 'react';
import type { LoaderResult } from '../../loader/loaderManager';
import type { HandleRequestOptions } from '../requestHandler';
import type { SSRConfig } from '../shared';
import { type Tracer } from '../tracer';
export declare const prefetch: (App: React.ReactElement, request: Request, options: HandleRequestOptions, ssrConfig: SSRConfig, { onError, onTiming }: Tracer) => Promise<{
    initialData: Record<string, unknown> | undefined;
    i18nData: any;
    loadersData?: undefined;
    storeState?: undefined;
} | {
    loadersData: Record<string, LoaderResult>;
    initialData: Record<string, unknown> | undefined;
    i18nData: any;
    storeState: any;
}>;
