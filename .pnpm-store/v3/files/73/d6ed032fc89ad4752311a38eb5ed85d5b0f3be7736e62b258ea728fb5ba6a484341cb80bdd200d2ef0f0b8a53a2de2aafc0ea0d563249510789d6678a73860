/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'node:http';
import { type InternalRequest, type Middleware } from '@modern-js/server-core';
import type { NextFunction } from '@modern-js/types';
/** Types: Mock  */
type MockHandler = {
    data: any;
} | ((req: IncomingMessage, res: ServerResponse, next: NextFunction) => Promise<void> | void);
type MockAPI = {
    method: string;
    path: string;
    handler: MockHandler;
};
export declare const getMatched: (request: InternalRequest, mockApis: MockAPI[]) => MockAPI | undefined;
export declare function initOrUpdateMockMiddlewares(pwd: string): Promise<void>;
export declare function getMockMiddleware(pwd: string): Promise<Middleware>;
export {};
