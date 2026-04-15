/// <reference types="node" />
/// <reference types="node" />
import { type Server as NodeServer } from 'node:http';
import type { Server as NodeHttpsServer } from 'node:https';
import type { NodeRequest, NodeResponse, RequestHandler } from '../../types';
export { writeReadableStreamToWritable } from './polyfills';
export declare const createWebRequest: (req: NodeRequest, res: NodeResponse, body?: BodyInit) => Request;
export declare const sendResponse: (response: Response, res: NodeResponse) => Promise<void>;
declare const getRequestListener: (handler: RequestHandler) => (req: NodeRequest, res: NodeResponse) => Promise<void>;
type NodeServerWrapper = (NodeServer | NodeHttpsServer) & {
    getRequestListener: () => ReturnType<typeof getRequestListener>;
    getRequestHandler: () => RequestHandler;
};
export declare const createNodeServer: (requestHandler: RequestHandler, httpsOptions?: Record<string, unknown>) => Promise<NodeServerWrapper>;
