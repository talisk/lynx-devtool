import type { UNSAFE_DeferredData as DeferredData } from '@modern-js/runtime-utils/remix-router';
export declare const getRequestUrl: ({ params, request, routeId, }: {
    params: Record<string, string>;
    request: Request;
    routeId: string;
}) => URL;
export declare const createRequest: (routeId: string, method?: string) => ({ params, request, }: {
    params: Record<string, string>;
    request: Request;
}) => Promise<DeferredData | Response>;
export declare const createActionRequest: (routeId: string) => ({ params, request, }: {
    params: Record<string, string>;
    request: Request;
}) => Promise<Response>;
