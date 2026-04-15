import type { RequestHandler, RequestHandlerOptions } from '@modern-js/app-tools';
import type React from 'react';
import { type RuntimeContext } from '../context';
export type { RequestHandlerConfig as HandleRequestConfig } from '@modern-js/app-tools';
export type HandleRequestOptions = Exclude<RequestHandlerOptions, 'staticGenerate'> & {
    runtimeContext: RuntimeContext;
};
export type HandleRequest = (request: Request, ServerRoot: React.ComponentType, // App, routes,
options: HandleRequestOptions) => Promise<Response>;
export type CreateRequestHandler = (handleRequest: HandleRequest) => Promise<RequestHandler>;
export declare const createRequestHandler: CreateRequestHandler;
